$(function() {
    $('.myImage1').fogify({
    });
    $('.myImage2').fogify({
        brushSize: 100
    });
    $('.myImage3').fogify({
        particles: 70
    });
    $('.myImage4').fogify({
        maxVelocity: 25
    });
    $('.myImage5').fogify({
        brushSize: 50,
        particles: 25
    });
    $('.myImage6').fogify({
        particles: 75,
        maxVelocity: 10
    });
    smoothScroll.init();
});

