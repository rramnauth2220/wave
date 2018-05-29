function Food() {
	this.x = floor(random(width/scl)) * scl;
	this.y = floor(random(height/scl)) * scl;
	
	this.reset = function() {
		this.x = floor(random(width/scl)) * scl;
		this.y = floor(random(height/scl)) * scl;
	}
	
	this.show = function() {
		noStroke();
		fill(0, 255, 255);
		rect(this.x, this.y, scl, scl); 	//draw food
	}
}