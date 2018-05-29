class Planet {
	constructor(radius, distance, orbitspeed, angle) {
		this.radius = radius;
		this.distance = distance;
		this.orbitspeed = orbitspeed;
		this.angle = angle;
		this.planets = [];
	}
	
	//circle around parent planet
	orbit() {
		this.angle += this.orbitspeed;
		for (let p in this.planets)
			this.planets[p].orbit();
	}
	
	//have children planets (aka moons)
	spawnMoons(total, level) {
		for (let i = 0; i < total; i++) {
			let r = this.radius/(level * 1.8);	//size of planet
			let d = random((this.radius + r), (this.radius + r)*2);			//distance from parent planet
			let o = random(-0.05, 0.05);			//orbitspeed
			let a = random(TWO_PI);				//polar angle
			this.planets.push(new Planet(r, d, o, a));
			if (level < 3){
				let num = Math.floor(random(0,4));
				this.planets[i].spawnMoons(num, level++);
			}
		}
	}
	
	//show planet
	show() {
		push();
		noStroke();
		fill(255);
		rotate(this.angle);
		translate(this.distance, 0);
		sphere(this.radius);
		//ellipse(0, 0, this.radius * 2);
		for (let p in this.planets) {
			this.planets[p].show();
		}
		pop();
	}
}