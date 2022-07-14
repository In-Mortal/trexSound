
var trex ,trex_running;
var ground ,groundimg;
var sueloInvisble;
var cloudImage;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var Cactus6;
var cactus;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cactusGroup;
var nubesGroup;
var restart ,restartIMG;
var GameOver ,GameOverIMG;
var TrexCollided;
var dieSound, jumpSound, checkpointSound;


function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png"); 

groundimg = loadImage("ground2.png");

cloudImage = loadImage("cloud.png");

cactus1 = loadImage("obstacle1.png");
cactus2 = loadImage("obstacle2.png");
cactus3 = loadImage("obstacle3.png");
cactus4 = loadImage("obstacle4.png");
cactus5 = loadImage("obstacle5.png");
cactus6 = loadImage("obstacle6.png");

GameOverIMG = loadImage("gameOver.png");
restartIMG = loadImage("restart.png");

TrexCollided = loadAnimation("trex_collided.png");

dieSound = loadSound("die.mp3");
jumpSound = loadSound("jump.mp3");
checkpointSound = loadSound("checkpoint.mp3");

}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
 
  trex = createSprite(150,160,20,50);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collided",TrexCollided);
 trex.scale = 0.5;

 ground = createSprite(120,160);
 ground.addImage(groundimg);

sueloInvisible = createSprite(200,190,400,10);
sueloInvisible.visible = false;

GameOver = createSprite(300,100);
GameOver.addImage(GameOverIMG);
GameOver.scale = 0.8;

restart = createSprite(300,150);
restart.addImage(restartIMG);
restart.scale = 0.6;

cactusGroup = new Group();
nubesGroup = new Group();

}

function draw(){
  background("white")
  text("score"+score,500,50);
  
  if (gameState == PLAY){
    ground.velocityX = -(3 +3* score/100);
    score = score + Math.round(frameCount/60);
    if(score > 0 && score %100 == 0){
      checkpointSound.play();
    }
    if(keyDown("space") && trex.y >= 150) {
    trex.velocityY = -10;
    jumpSound.play();
 }
trex.velocityY = trex.velocityY +0.5;
if(cactusGroup.isTouching(trex)){
  gameState = END;
  dieSound.play();
}
GameOver.visible = false;
restart.visible = false;
nubesInicia(); 
cactusZ();

  }
  else if(gameState == END){
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0); 
    nubesGroup.setVelocityXEach(0);
    GameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided",TrexCollided);
    cactusGroup.setLifetimeEach(-1);
    nubesGroup.setLifetimeEach(-1);
  }



  if(ground.x < 0){
    ground.x = ground.width/2;
  } 
 trex.collide(sueloInvisible); 

drawSprites();
}

function nubesInicia(){
  if(frameCount %60 == 0){
    var nube = createSprite(600,60);
    nube.addImage(cloudImage);
    nube.y = Math.round(random(10,60));
    nube.velocityX = -10;
    nube.scale = 0.5;

    nube.lifetime = 200;

  nube.depth = trex.depth;
  trex.depth = trex.depth +1;
  nubesGroup.add(nube);
  }




}


function cactusZ(){
if(frameCount %60 == 0){
cactus = createSprite(600,160);
cactus.scale = 0.6;
cactus.velocityX = -(8 +score/100);
var rand = Math.round(random(1,6));
switch (rand){
case 1: cactus.addImage(cactus1);
break;
case 2: cactus.addImage(cactus2);
break;
case 3: cactus.addImage(cactus3);
break;
case 4: cactus.addImage(cactus4);
break;
case 5: cactus.addImage(cactus5);
break;
case 6: cactus.addImage(cactus6);
default:break;

}
cactus.lifetime = 190;
cactusGroup.add(cactus);

}


}