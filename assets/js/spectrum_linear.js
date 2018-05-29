var song;
var fft;
var button;
var wid, hei;
var w;

/*function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
*/
function preload() {
  song = loadSound('music/perfect.mp3');
}

function setup() {
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight);
  canvas.parent('sketch-holder');
  hei = window.innerHeight;
  wid = window.innerWidth/2;
  
  colorMode(HSB);
  angleMode(DEGREES);
  //button = createButton('toggle');
  //button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 256);
  w = wid / 128;
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  //stroke(255);
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var r = map(amp, 0, 256, hei, 0);
    noStroke();
	fill(i, amp, amp);
    //stroke(255);
    //line(0, 0, x, y);
    //vertex(x, y);
    var y = map(amp, 0, 256, hei, 0);
    rect(i * w, y, w - 2, hei - y);
  }
  //endShape();
}