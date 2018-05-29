var cols, rows;
var scl = 20;
var w = 1400;
var h = 1600;
var song, analyzer;
var rms;

var flying = 0;

var terrain = [];

function preload() {
  song = loadSound('music/havana.mp3');	//0
}

function setup() {
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight, WEBGL);
  canvas.parent('sketch-holder');
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  song.play();
  
  //fft = new p5.FFT(0.9, 256);
}

function draw() {
  //spectrum = fft.analyze();
  rms = analyzer.getLevel(0);
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
	  //console.log("index" + ((x*y)%256) + ": " + spectrum[(x*y)%256]);
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  rotateX(PI/3);
  rotateZ(radians(frameCount*0.2));	//rotate camera
  stroke(51, 10)
  var red = map(rms, 0, 1, 0, 255);	//lighting
  fill(red, 255, 255, 50);
  translate(-w/2, -h/2 + 100);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]*rms);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]*rms);
    }
    endShape();
  }
}