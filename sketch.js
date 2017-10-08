var x = 0;
var y = 0;
var spacing = 10;
var sizeSlider, colorSlider;
var separator = 200;
var resetButton, stopButton;
var canvas;


function setup() {
	canvas = createCanvas(window.innerWidth, window.innerHeight*0.66);
	background(0);
	colorMode(HSB);

	resetButton = createButton('Reset');
	resetButton.mousePressed(resetBackground);
	resetButton.addClass('waves-effect waves-light btn');
	resetButton.parent('reset-list');

	strokeSlider = createSlider(1,10,4,1);
	strokeSlider.style('width');
	strokeSlider.parent('stroke-list');

	colorSlider = createSlider(0,255,255,1);
	colorSlider.style('width');
	colorSlider.parent('color-list');

	sizeSlider = createSlider(1,50,20,1);
	sizeSlider.style('width');
	sizeSlider.parent('size-list');

}

function draw() {
	
	let strokeLine = strokeSlider.value()
	let color = colorSlider.value();
	spacing = sizeSlider.value();

	stroke(color, 100, 100, 1);
	strokeWeight(strokeLine);

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

}

function resetBackground(){
	background(0);
	x = 0;
	y = 0;
}
