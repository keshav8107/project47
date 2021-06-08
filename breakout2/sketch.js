var ball,bricks,paddle,edges,brick,paddle2,ball2;
var score = 0,score2=0;
var canvas
var ballImg,ballImg2


function preload(){
  ballImg=loadImage("red.png")  
  ballImg2=loadImage("blue.png")  
}
function setup(){
    canvas=createCanvas(400,400)
        ball = createSprite(250,200,10,10);
      ball.addImage("ball",ballImg)
        //ball.setAnimation("golfball_1");
       ball.scale = 0.05;
        paddle = createSprite(100, 350, 70, 10);
        paddle.shapeColor = "blue";
        ball2 = createSprite(150,200,10,10);
        ball2.addImage("ball",ballImg2)
          //ball.setAnimation("golfball_1");
         ball2.scale = 0.05;
          paddle2 = createSprite(300, 350, 70, 10);
          paddle2.shapeColor = "red";
        edges=createEdgeSprites();

        bricks = createGroup();
        createBrickRow(65, "red");
        createBrickRow(65+29, "orange");
        createBrickRow(65+29+29, "green");
        createBrickRow(65+29+29+29, "yellow");
}

function createBrickRow(y, color) {
    for(c=0; c<6; c++)
    {
      brick = createSprite(65+54*c,y,50, 25);
      brick.shapeColor = color;
      bricks.add(brick);
    }
  
 
  }


function draw() {
  background("black");

  textSize(20);
  text("Score: "+score,40,47);
  text("Score2: "+score2,280,47);
  
  
  if(keyDown("left")){
    paddle2.x=paddle2.x-5;
  }
  if(keyDown("right")){
    paddle2.x=paddle2.x+5;
  }
  if(keyDown("a")){
    paddle.x=paddle.x-5;
  }
  if(keyDown("d")){
    paddle.x=paddle.x+5;
  }
  if(paddle.x < 10)
  {
    paddle.x = 10;
  }
    
  if(paddle.x > 390)
  {
    paddle.x = 390;
  }
  if(paddle2.x < 10)
  {
    paddle2.x = 10;
  }
    
  if(paddle2.x > 390)
  {
    paddle2.x = 390;
  }


  drawSprites();

  
  ball.bounceOff(edges[2]);
  
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[0]);
  ball.bounceOff(paddle);
  ball.bounceOff(paddle2);
  ball.bounceOff(bricks, brickHit);
  ball2.bounceOff(edges[2]);
  
  ball2.bounceOff(edges[1]);
  ball2.bounceOff(edges[0]);
  ball2.bounceOff(paddle);
  ball2.bounceOff(paddle2);
  ball2.bounceOff(bricks, brickHit2);
  
 // if(ball.bounceOff(paddle)){
   //playSound("sound://category_hits/puzzle_game_button_02.mp3");
 // }
 end();
}

function keyPressed()
{
  if (keyCode===32){
  ball.velocityX = 7;
  ball.velocityY = 7;
  ball2.velocityX = -7;
  ball2.velocityY = 7;
  }
}

function brickHit(ball,brick) {
 brick.destroy();
 score = score + 5;
  
}
function brickHit2(ball2,brick) {
  brick.destroy();
  score2= score2 + 5;
   
 }
 function end(){
   if(ball.x<0||ball2.x<0){
     textSize(50)
     if(score>score2){
       text("blue Wins",130,220)
     }
     else if(score2>score){
      text("red Wins",130,220)
     }
     else{
       text("DRAW",130,220)
     }
   }
 }