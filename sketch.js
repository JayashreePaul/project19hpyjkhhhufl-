var PLAY= 1;
var END = 0;
var gameState = PLAY;

var HarryPotter,Hp_flying;
var  obstaclesGroup, obstacle1, obstacle2;
var backgroundImage;
var snitch, snitch_flying;
var scene

var score;
var gameOverImg,restartImg;
var checkpointSound, endSound;


function preload(){

HarryPotter_flying = loadAnimation("harrypotter.png","harrypotter2.png");

snitch_flying =loadAnimation("snitch1.png","snitch2.png");

backgroundImage = loadImage("quiditch.png");
obstacle = loadImage("obstacle1.png");
obstacles = loadImage("obs2.png");
 
restartImg = loadImage("retry.png")
gameOverImg = loadImage("download.png")
  
checkpointSound = loadSound("Harry Potter.mp3")
endSound = loadSound("Harry Potter Loop.mp3")




}

function setup() {
    createCanvas(windowWidth, windowHeight);

     scene = createSprite(0,windowHeight/2,windowWidth+30,windowHeight);
    scene.addImage(backgroundImage);
    scene.scale = 4.3;
    HarryPotter = createSprite(windowWidth/3,windowHeight-40,60,40);
    HarryPotter.addAnimation("flying", HarryPotter_flying);
    HarryPotter.scale=1;
    
    snitch = createSprite( windowWidth/4,windowHeight/2-150,20,10);
    snitch.addAnimation("flying",snitch_flying);
   snitch.scale=0.5;

    gameOver = createSprite(width/2,height/2);
 gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+30);
  restart.addImage(restartImg);

   obstacle1 = createSprite(1,height-170,50,20);
   obstacle1.addImage(obstacle)
  
 gameOver.scale = 0.5;
  restart.scale = 0.5;
  
 
  invisibleGround = createSprite(width/2,height-170,width,10);
  invisibleGround.visible = true;
  
  
  score= 0;
}

function draw() {
    background(153);
    text("Score: "+ score, windowWidth-200,50);
    
    if(gameState===PLAY){

 restart.visible= false;
 gameOver . visible =false;
 scene.velocityX = 3 

    if (scene.x > windowWidth/2-20){
      scene.x = scene.width/2;
    }

          score = score + Math.round(getFrameRate()/80);
      
      if(score>0 && score%100 === 0){
         checkPointSound.play() 
      }
      
      
      
      
      if(    keyDown("space")&& HarryPotter.y >= 100) {
          HarryPotter.velocityY = -10;
         
      }
      
     
      HarryPotter.velocityY = HarryPotter.velocityY + 0.8
    
      
      
    
      
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(HarryPotter)){
       
         
          gameState = END;
        
          endSound.play();
        
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
      
      if(mousePressedOver(restart) || touches.length>0) {
        reset();
        touches=[];
      }
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
     
     obstaclesGroup.setVelocityXEach(0);
      
   }

    HarryPotter.collide(invisibleGround);
    
     
    drawSprites();





}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
 
 
 score=0;
}


function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(width,height-170,10,40);
    obstacle.velocityX = -(3 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
    }}

