//create the ball, playerPaddle and computerPaddle as sprite objects
var ball,playerPaddle,player2Paddle,canvas
//variable to store different state of game
var gameState = "serve";
var edges
//variables to keep the score
var player2Score = 0;
var playerScore = 0;
function setup(){
    canvas=createCanvas(400,400)
     ball = createSprite(200,200,10,10);
     playerPaddle = createSprite(380,200,10,70);
     player2Paddle = createSprite(10,200,10,70);
    edges=createEdgeSprites();
}

function draw() {
  //clear the screen
  background("white");
  
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(player2Score, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  if(keyDown("s")){
    playerPaddle.y=playerPaddle.y+5
  }
  if(keyDown("w")){
    playerPaddle.y=playerPaddle.y-5
  }
  
  //AI for the computer paddle
  //make it move with the ball's y position
  if(keyDown("down")){
    player2Paddle.y=player2Paddle.y+5
  }
  if(keyDown("up")){
    player2Paddle.y=player2Paddle.y-5
  }
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(player2Paddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || player2Score === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}