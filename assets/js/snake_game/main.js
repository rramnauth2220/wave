var f; 
var s; 
var scl = 20;

function setup() {
	createCanvas(400, 400);
	frameRate(5);
	s = new Snake();
	f = new Food();
}

// @Override keyPressed()
function keyPressed() {
	if (keyCode === UP_ARROW)			//38
		s.dir(0, -1);
	else if (keyCode === DOWN_ARROW)	//40
		s.dir(0, 1);
	else if (keyCode === RIGHT_ARROW)	//39
		s.dir(1, 0);
	else if (keyCode === LEFT_ARROW)	//37
		s.dir(-1, 0);
}

function draw() {
	background(51);
	s.eat(f);
	s.loss();
	s.update();
	s.show();
	f.show();
}