var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var song, analyzer;
var rms;

function preload() {
  song = loadSound('music/stressed.mp3');
}

function setup() {
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight, WEBGL);
  canvas.parent('sketch-holder');
  cols = w / scl;
  rows = h/ scl;
  
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  song.play();
}

function draw() {
  rms = analyzer.getLevel(0);
  background(0);
  rotateX(PI/3);
  var jump = map(rms, 0, 1, 0, 100);
  stroke(51, 10)
  fill(200,200,200, 50);
  translate(-w/2, -h/2 + 100);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
     // vertex(x*scl, y*scl, noise(x, y) * random(-rms * 150, rms * 150));
     // vertex(x*scl, (y+1)*scl, noise(x, y) * random(-rms * 20, rms * 20));
		vertex(x*scl, y*scl, noise(x, y) * random(-jump, jump));
		vertex(x*scl, (y+1)*scl, noise(x, y) * random(-jump, jump));
    }
    endShape();
  }
}

/*function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h/ scl;
}

function draw() {
	background(0);
	rotateX(PI/3);
	fill(200,200,200, 50);
	translate(-w/2, -h/2);
	for (var y = 0; y < rows-1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (var x = 0; x < cols; x++) {
		  vertex(x*scl, y*scl, random(-10, 10));
		  vertex(x*scl, (y+1)*scl, random(-10, 10));
		}
		endShape();
	}
} */