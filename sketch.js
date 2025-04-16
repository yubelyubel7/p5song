var sound, analyzer, volume, string;
var img;

function preload(){
  sound = loadSound("data/Song.mp3");
  img = loadImage("data/udance.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  getAudioContext().suspend();
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound);
  fill(255);
  textAlign(CENTER, CENTER);
  string = "Tracing That Dream";
  imageMode(CENTER);
}

function draw() {
  background(0, 10);
  volume = analyzer.getLevel();
  mappedVol = volume * 400;
  
  push();
  translate(width/2, height/2);
  
  // Draw image that responds to music
  let imgSize = map(mappedVol, 0, 400, 100, 700); // Increased max size from 300 to 500
  let imgRotation = map(mappedVol, 0, 400, 0, PI/8);
  push();
  rotate(imgRotation * sin(frameCount * 0.05));
  tint(255, map(mappedVol, 0, 400, 150, 255));
  image(img, 0, 0, imgSize, imgSize);
  pop();
  
  // Draw text
  textSize(mappedVol/2);
  fill(255);
  
  textX = map(volume, 0, 1.0, 0, windowWidth);
  textY = map(volume, 0, 1.0, 0, windowHeight);
  
  rotate(mappedVol/100);
  text(string, 0, 0);
  pop();
  
  console.log(volume + '|' + mappedVol);
}

function mousePressed(){
  getAudioContext().resume();
  
  if(sound.isPlaying()){
    background(255);
    sound.stop();
    sound.noLoop();
  }
  else {
    background(0);
    sound.play();
    sound.loop();
  }
}

function keyPressed(){
  if(key=='b'){
    fill("blue");
  }
  else if(key=='c'){
    fill("pink");
  }
}