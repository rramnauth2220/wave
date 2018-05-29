var song;
var fft;
var button;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('music/file0.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.95, 256);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  //stroke(255);
  noStroke();
  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 20, 100);
    fill(255);
    var x = r * cos(angle) * 2;
    var y = r * sin(angle) * 2;
    //stroke(i , 255, 255);
    //line(0, 0, x, y);
    vertex(x, y);
    //var y = map(amp, 0, 256, height, 0);
    //rect(i * w, y, w - 2, height - y);
  }
  endShape();
}