var pos;
//var prev;

function setup() {
  createCanvas(500, 500);
  pos = createVector(200, 200);
  prev = pos.copy();
  background(51);
}

function draw() {
  
  stroke(255);
  strokeWeight(3);
  point(pos.x, pos.y);
  //line(pos.x, pos.y, prev.x, prev.y);
  
  var r = random(100);	//probability
  var step = p5.Vector.random2D();
  
  if (r < 5) {
	step.mult(random(5, 20));
  }	// Levy Flight
  else {
	  step.setMag(5);
  }
  //prev.set(pos);
  pos.add(step);
	
}