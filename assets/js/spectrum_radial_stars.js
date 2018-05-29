var song;
var fft;
var button;

var height, width;

/*function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}*/

function preload() {
  song = loadSound('music/x.mp3');
}

function setup() {
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight);
  canvas.parent('sketch-holder');
  width = window.innerWidth/2;
  height = window.innerHeight;
  
  colorMode(HSB);
  angleMode(DEGREES);
  //button = createButton('toggle');
  //button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 256);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  //stroke(255);
  noStroke();
  translate(width / 2, height / 2);
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);	//increase 5th parameter to create spiral
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 20, 100);
    //fill(i, 255, 255);
    var x = r * cos(angle) * 4.5;
    var y = r * sin(angle) * 4.5;
	strokeWeight(10);
    stroke(i , 255, 255);
    line(x, y, x, y);
    //vertex(x, y);
    //var y = map(amp, 0, 256, height, 0);
    //rect(i * w, y, w - 2, height - y);
  }
  //endShape();
}