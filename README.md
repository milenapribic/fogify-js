# fogify-js
a jQuery plugin that uses the canvas element to overlay a fog effect onto an existing image and then allows the user to write over it.
####Features:
1. Autofit the canvas to any image on the page.
2. Customize the fog particles, speed, and animation duration.
3. Customize the brush size when drawing on the page.

####Usage
1. Include the 'fogify.js' file in your scripts folder.
2. Call the function in your main Javascript file, adjusting the default parameters where you see fit. The following example uses the default settings:

####Paramaters:
<table class="tg">
  <tr>
    <th class="tg-031e">NAME</th>
    <th class="tg-031e">TYPE</th>
    <th class="tg-031e">DEFAULT</th>
    <th class="tg-031e">DESCRIPTION</th>
  </tr>
  <tr>
    <td class="tg-031e">particles</td>
    <td class="tg-031e">number</td>
    <td class="tg-031e">20</td>
    <td class="tg-031e">Amount of fog particles rendered on the screen</td>
  </tr>
  <tr>
    <td class="tg-031e">maxVelocity</td>
    <td class="tg-031e">number</td>
    <td class="tg-031e">.5</td>
    <td class="tg-031e">Speed of fog particles in each direction</td>
  </tr>
  <tr>
    <td class="tg-031e">canvasWidth</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e">element.width()</td>
    <td class="tg-031e">Width of the canvas element</td>
  </tr>
  <tr>
    <td class="tg-031e">canvasHeight</td>
    <td class="tg-031e">string</td>
    <td class="tg-031e">element.height()</td>
    <td class="tg-031e">Height of the canvas element</td>
  </tr>
  <tr>
    <td class="tg-031e">targetFPS</td>
    <td class="tg-031e">number</td>
    <td class="tg-031e">33</td>
    <td class="tg-031e">Target frames per second (how often the screen is updated or redrawn)</td>
  </tr>
  <tr>
    <td class="tg-031e">brushSize</td>
    <td class="tg-031e">number</td>
    <td class="tg-031e">20</td>
    <td class="tg-031e">Size of the brush the user draws with after the initial fog animation is run</td>
  </tr>
</table>

####Credits
This plugin was derived from user Jonny C's [JSFiddle on particles/ smoke effects](http://jsfiddle.net/jonnyc/Ujz4P/5/) with great help from William Malone's [canvas drawing tutorial](http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app).

