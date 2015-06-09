$.fn.fogify = function(options){
	this.each(function() {
		
		var element= $(this);
		var imgHeight;
		var imgWidth;
		var settings;

		$(window).on('load', function(){

			imgHeight = element.find('img').height();
			imgWidth = element.find('img').width();
			element.css({
				position: 'relative',
				width: imgWidth,
				height: imgHeight
			});


		settings = $.extend({
			particles: 20,
			maxVelocity: .5,
			canvasWidth: element.width(),
			canvasHeight: element.height(),
			targetFPS: 33,
			brushSize: 20,
		}, options);

		// Create an array to store our particles
		var particles = [];

		// The amount of particles to render
		var particleCount = settings.particles;

		// The maximum velocity in each direction
		var maxVelocity = settings.maxVelocity;

		// The target frames per second (how often do we want to update / redraw the scene)
		var targetFPS = settings.targetFPS;

		// Set the dimensions of the canvas as variables so they can be used and altered.
		var canvasWidth = settings.canvasWidth;
		var canvasHeight = settings.canvasHeight;

		// A function to create a particle object.
		function Particle(context) {

		    // Set the initial x and y positions
		    this.x = 0;
		    this.y = 0;

		    // Set the initial velocity
		    this.xVelocity = 0;
		    this.yVelocity = 0;

		    // Set the radius
		    this.radius = 10;

		    // Store the context which will be used to draw the particle
		    this.context = context;

		    // The function to draw the particle on the canvas.
		    this.draw = function() {
		        
		        // If an image is set draw it
		        if(this.image){
		            this.context.drawImage(this.image, this.x-128, this.y-128);                      
		            return;
		        }
		        // Draw the circle as before, with the addition of using the position and the radius from this object.
		        this.context.beginPath();
		        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		        this.context.fillStyle = "rgba(0, 255, 255, 0)";
		        this.context.fill();
		        this.context.closePath();
		    };

		    // Update the particle.
		    this.update = function() {
		        // Update the position of the particle with the addition of the velocity.
		        this.x += this.xVelocity;
		        this.y += this.yVelocity;

		        // Check if has crossed the right edge
		        if (this.x >= canvasWidth) {
		            this.xVelocity = -this.xVelocity;
		            this.x = canvasWidth;
		        }
		        // Check if has crossed the left edge
		        else if (this.x <= 0) {
		            this.xVelocity = -this.xVelocity;
		            this.x = 0;
		        }

		        // Check if has crossed the bottom edge
		        if (this.y >= canvasHeight) {
		            this.yVelocity = -this.yVelocity;
		            this.y = canvasHeight;
		        }
		        
		        // Check if has crossed the top edge
		        else if (this.y <= 0) {
		            this.yVelocity = -this.yVelocity;
		            this.y = 0;
		        }
		    };

		    // A function to set the position of the particle.
		    this.setPosition = function(x, y) {
		        this.x = x;
		        this.y = y;
		    };

		    // Function to set the velocity.
		    this.setVelocity = function(x, y) {
		        this.xVelocity = x;
		        this.yVelocity = y;
		    };
		    
		    this.setImage = function(image){
		        this.image = image;
		    }
		} //End of Particle function

		// A function to generate a random number between 2 values
		function generateRandom(min, max){
		    return Math.random() * (max - min) + min;
		}

		// The canvas context if it is defined.
		var context;

		canvas = document.createElement('canvas');
		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('class', 'myCanvas');
		element.append(canvas);
		element.find('canvas').css({
			position: 'absolute',
			top: '0',
			bottom: '0',
			left: '0'
		});
		context = canvas.getContext('2d');
		//Set opacity of the fog in order to see the image behind it
		context.globalAlpha=0.1;

		// Initialize the scene and set the context if possible
		function init() {
		    element.find('canvas').off('click');
		    // Create the particles and set their initial positions and velocities
		    for(var i=0; i < particleCount; ++i){
		        var particle = new Particle(context);
		        
		        // Set the position to be inside the canvas bounds
		        particle.setPosition(generateRandom(0, canvasWidth), generateRandom(0, canvasHeight));
		        
		        // Set the initial velocity to be either random and either negative or positive
		        particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
		        particles.push(particle);            
		    }

		    // Create an image object (only need one instance)
		    var imageObj = new Image();

		    // Once the image has been downloaded then set the image on all of the particles
		    imageObj.onload = function() {
		        particles.forEach(function(particle) {
		                particle.setImage(imageObj);
		        });
		    };

		    // Once the callback is arranged then set the source of the image
		    imageObj.src = './styles/images/Smoke10.png';

		    var counter = 0;
		    if (context) {
		        var myVariable = setInterval(function() {
		            // Update the scene before drawing
		            update();

		            counter++

		            if(counter == 100){
		                window.clearInterval(myVariable);
		                userDraw();
		            }


		            // Draw the scene
		            draw();
		        }, 1000 / targetFPS);
		    }
		} //End of fog initialization function

// The function to draw the scene
		function draw() {
		    particles.forEach(function(particle) {
		        particle.draw();
		    });
		}


		//The function to allow the user to draw after fog loads
		function userDraw() {
		    element.mousedown(function(e){
		        var mouseX = e.pageX;
		        var mouseY = e.pageY;
		            
		        paint = true;
		        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		        redraw();
		    });

		    element.mousemove(function(e){
		        if(paint){
		        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		        redraw();
		        }
		    });

		    element.mouseup(function(e){
		      paint = false;
		    });

		    element.mouseleave(function(e){
		      paint = false;
		    });

		    var clickX = new Array();
		    var clickY = new Array();
		    var clickDrag = new Array();
		    var paint;

		    function addClick(x, y, dragging){
		          clickX.push(x);
		          clickY.push(y);
		          clickDrag.push(dragging);
		        }

		    function redraw(){ 
		        context.fill();
		        context.lineJoin = "round";
		        context.lineWidth = settings.brushSize;
		        context.fill();

		        for(var i=0; i < clickX.length; i++) {        
		            context.beginPath();
		            if(clickDrag[i] && i){
		              context.globalCompositeOperation="destination-out";
		              context.moveTo(clickX[i-1], clickY[i-1]);
		             }else{
		               context.globalCompositeOperation="destination-out";
		               context.moveTo(clickX[i]-1, clickY[i]);
		             }
		             context.lineTo(clickX[i], clickY[i]);
		             context.closePath();
		             context.stroke();
		        }
		    }

		} //End of userDraw function

		// Update the scene
		function update() {
		    particles.forEach(function(particle) {
		        particle.update();
		    });
		      
		}
		// Initialize the scene
		element.find('canvas').on('click', function() { 
		    	init();
		})

		});
	}); //End of each loop

} //End of plugin function

