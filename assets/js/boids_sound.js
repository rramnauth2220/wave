/* Adapted from Dan Shiffman's Flocking Birds */

var flock;
var song;
var songidx = 0;

var slider;
var button_play, button_next;
var amp;
var histamp = 0;

var height, width;

function preload() {
  song = loadSound('music/despacito.mp3');	//0
}

function setup() {
  var x = window.innerWidth/2;
  var y = 0;
  
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight);
  //createP("Drag the mouse to generate new boids.");
  canvas.position(x, y);
  height = window.innerHeight;
  width = window.innerWidth/2;
  song.play();
  
  //song = loadSound("music/file0.mp3", loaded);
  amp = new p5.Amplitude();
  
  flock = new Flock();
  // Add an initial set of 30 boids into the system
  for (var i = 0; i < 10; i++) {
	var b = new Boid(width-(width/3),height-(height/3));
	var c = new Boid(width/2,height/2);
	var d = new Boid(width/3,height/3);
	flock.addBoid(b);
	flock.addBoid(c);
	flock.addBoid(d);
  }
}

/*function loaded(){
	button_play = createButton("play");
	//button = createImg("images/music-player-play.svg", 'my clickable image');
	button_play.mousePressed(togglePlaying);
	console.log("loaded");
}

function togglePlaying(){
	if(!song.isPlaying()){
		song.play();
		song.setVolume(0.3);
		button_play.html("pause");
	}
	else {
		song.pause();
		button_play.html("play");
	}
}*/

function draw() {
  background(51);
  flock.run();
  
  var vol = amp.getLevel();
  var volmap = map(vol, 0, 1, 0, 150);
  histamp = volmap;
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
	this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

function Boid(x,y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.position = createVector(x,y);
  this.r = 3.0;			// Size
  //histamp = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids);   // Separation
  var ali = this.align(boids);      // Alignment
  var coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(histamp);
  this.position.add(this.velocity);
  // Reset acceleration to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(histamp);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 25.0;
  var steer = createVector(0,0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
	var d = p5.Vector.dist(this.position,boids[i].position);
	// If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
	if ((d > 0) && (d < desiredseparation)) {
	  // Calculate vector pointing away from neighbor
	  var diff = p5.Vector.sub(this.position,boids[i].position);
	  diff.normalize();
	  diff.div(d);        // Weight by distance
	  steer.add(diff);
	  count++;            // Keep track of how many
	}
  }
  // Average -- divide by how many
  if (count > 0) {
	steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
	// Implement Reynolds: Steering = Desired - Velocity
	steer.normalize();
	steer.mult(histamp);
	steer.sub(this.velocity);
	steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
	var d = p5.Vector.dist(this.position,boids[i].position);
	if ((d > 0) && (d < neighbordist)) {
	  sum.add(boids[i].velocity);
	  count++;
	}
  }
  if (count > 0) {
	sum.div(count);
	sum.normalize();
	sum.mult(histamp);
	var steer = p5.Vector.sub(sum,this.velocity);
	steer.limit(this.maxforce);
	return steer;
  } else {
	return createVector(0,0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
	var d = p5.Vector.dist(this.position,boids[i].position);
	if ((d > 0) && (d < neighbordist)) {
	  sum.add(boids[i].position); // Add location
	  count++;
	}
  }
  if (count > 0) {
	sum.div(count);
	return this.seek(sum);  // Steer towards the location
  } else {
	return createVector(0,0);
  }
}

