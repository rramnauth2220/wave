function Snake() {
	this.x = width/2;
	this.y = height/2;
	this.xspeed = 1;
	this.yspeed = 0;
	
	this.total = 0;
	this.tail = [];
	
	this.eat = function(food) {
		if(this.x == food.x && this.y == food.y) {	//should eat food
			food.reset();	//new food location
			this.total++;	//increase length
		}
	}
	
	this.loss = function() {
		for (var i = 0; i < this.tail.length; i++) {
			if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < 1){
				this.total = 0;	//reset
				this.tail = [];
			}
		}
	}
	
	this.dir = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}
	
	this.update = function() {
		for (var i = 0; i < this.tail.length - 1; i++) 
		  this.tail[i] = this.tail[i + 1];
		if (this.total >= 1)
		  this.tail[this.total - 1] = createVector(this.x, this.y);
	  
		if (this.x < 0) {
			this.x = width; 
			this.xspeed = -1; //adjust for up and left offviews
		}
		else if(this.y < 0) {
			this.y = height;
			this.yspeed = -1; //adjust for up and left offviews
		}
		else {
			this.x = (this.x + this.xspeed * scl)%width;	//adjust for up and left offviews
			this.y = (this.y + this.yspeed * scl)%height;
		}
	}
	
	this.show = function() {
		noStroke(0);
		fill(255);
		for (var i = 0; i < this.tail.length; i++) {
		  rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl); 	//draw snake
	}
}