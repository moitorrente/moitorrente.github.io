var x = 0;
var y = 0;
var spacing = 10;
var sizeSlider, colorSlider;
var separator = 200;
var resetButton, stopButton;
var canvas;


function setup() {
//	canvas = createCanvas(window.innerWidth, window.innerHeight);
	createCanvas(800, 600);
	background(255);
	stroke(255);
	colorMode(HSB);
	textAlign(CENTER,CENTER);
	fill(0,0,255);
	noStroke();

	sizeSlider = createSlider(1,50,20,1);
	sizeSlider.style('width');
	sizeSlider.parent('size-list');

	colorSlider = createSlider(0,255,255,1);
	colorSlider.style('width');
	colorSlider.parent('color-list');

	resetButton = createButton('Reset');
//	resetButton.position(width * 0.01, height *0.015);
	resetButton.mousePressed(resetBackground);
	resetButton.addClass('waves-effect waves-light btn');
	resetButton.parent('reset-list');


}

function draw() {
	
	var color = colorSlider.value();
	stroke(color, 100, 100, 1);

	spacing = sizeSlider.value();
	if (random(1) > 0.5) {
		line (x, y, x + spacing, y + spacing);
	} else {
		line (x, y + spacing, x + spacing, y);
	}

	x = x + spacing;

	if (x > width) {
		x = 0;
		y = y + spacing;
	}

};

function resetBackground(){
	background(255);
	x = 0;
	y = 0;
};

// window.onresize = function() {
//   var w = window.innerWidth;
//   var h = window.innerHeight; 
//   canvas.size(w,h);
//   width = w;
//   height = h;
// };