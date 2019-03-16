let initialAmplitude = 100;
let time = 0;
let sineWave = [];
let slider;
let waveFormSelect;

function setup() {
	canvas = createCanvas(1000, 600);
	background(0);
	smooth();

	var sliderDiv = createDiv('');
	slider = createSlider(1, 50, 5);
	slider.style('width', '200px');
	var sliderDiv2 = createDiv('');
	waveFormSelect = createSelect('Seleccion');
	waveFormSelect.option('Square', 0);
	waveFormSelect.option('Sawtooth', 1);
	waveFormSelect.option('Triangle', 2);
	waveFormSelect.option('Rectified', 3);
}

function draw() {
	background(0);
	translate(300, 600 / 2);

	let x = 0;
	let y = 0;

	for (let i = 0; i < slider.value(); i++) {
		let prevx = x;
		let prevy = y;
		let waveformIndex = int(waveFormSelect.value());

		let n = getNum(i, waveformIndex);
		let amplitude = getWaveForm(n, waveformIndex);
		x += getNewX(amplitude, n, waveformIndex);
		y += getNewY(amplitude, n, waveformIndex);

		stroke(255, 100);
		noFill();
		ellipse(prevx, prevy, amplitude * 2);

		stroke(255, 100);
		fill(255, 100);
		ellipse(x, y, 7);
		stroke(255);
		line(prevx, prevy, x, y);

	}
	sineWave.unshift(y);
	translate(200, 0);
	line(x - 200, y, 0, sineWave[0]);

	beginShape();
	noFill();
	for (points in sineWave) {
		vertex(int(points), sineWave[points]);
	}
	endShape();

	time += 0.03;

	if (sineWave.length > 500) {
		sineWave.pop();
	}
}


function getNum(i, waveformIndex) {
	let n;
	let sign;
	switch (waveformIndex) {
		case 0:
			n = i * 2 + 1;
			break;
		case 1:
			sign = (i % 2 ? -1 : 1);
			n = sign * (i + 1);
			break;
		case 2:
			n = i * 2 + 1;
			break;
		case 3:
			sign = (i % 2 ? 1 : -1);
			n = i +1;
			break;
		default:
			n = 0;
	}
	return n;
}

function getWaveForm(n, waveformIndex) {
	let amplitude;
	switch (waveformIndex) {
		case 0:
			amplitude = initialAmplitude * (4 / (PI * n));
			break;
		case 1:
			amplitude = initialAmplitude * (2 / (PI * n));
			break;
		case 2:
			amplitude = initialAmplitude * (4 / (PI * PI * n * n));
			break;
		case 3:
			amplitude = initialAmplitude * (2 / (n * PI));
			break;
		default:
			amplitude = 200;
	}
	return amplitude;
}

function getNewX(amplitude, n, waveformIndex) {
	let x;
	switch (waveformIndex) {
		case 0:
		case 1:
			x = amplitude * cos(n * time);
			break;
		case 2:
			x = amplitude * sin(3 * n * time);
			break;
		case 3:
			x = amplitude * sin(n * time);
			break;
		default:
			x = 0;
	}
	return x;
}

function getNewY(amplitude, n, waveformIndex) {
	let y;
	switch (waveformIndex) {
		case 0:
		case 1:
			y = amplitude * sin(n * time);
			break;
		case 2:
			y = amplitude * cos(3 * n * time);
			break;
		case 3:
			y = amplitude * cos(n * time);
			break;
		default:
			y = 0;
	}
	return y;
}
