var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h/ scl;
}

function draw() {

  background(0);
  rotateX(PI/3);
  
  stroke(51, 10)
  fill(200,200,200, 50);
  translate(-w/2, -h/2 + 100);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, noise(x, y) * random(-50, 50));
      vertex(x*scl, (y+1)*scl, noise(x, y) * random(-50, 50));
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