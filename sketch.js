var player , bullet ;
var bg , ground;
var ObstaclesGroup;
var ammo = 0;
var gun , gimg , pimg;
function preload (){
  gimg = loadImage ("download-removebg-preview (1).png")
  pimg = loadImage ("images-removebg-preview.png")
  r = loadImage("erob.png")
}
function setup (){
  createCanvas (displayWidth,displayHeight);
  player = createSprite (200,height - 250 , 50,100);
  player.addImage(pimg)
  player.scale = 0.8
  ground = createSprite (displayWidth/2 , height-10  , width , 10);
  gun = createSprite (player.x+50,player.y-70,20,20)
  gun.addImage(gimg)
  gun.scale = 0.8
  ground.visible = false;
  ObstaclesGroup = new Group ();
  player.debug = true
}
function draw (){
  background (0);
  text("ammo :" + ammo,500,500)
  edges = createEdgeSprites();
  if (keyDown("space")){
    player.velocityY = -12;
    gun.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;
  gun.velocityY = player.velocityY + 0.8;
  player.y == gun.y
  player.collide(ground);
  gun.collide(ground);
  spawnObstacles()
  drawSprites();
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(width,random(50,height-50),10,40);
    obstacle.velocityX = - 20 //(6 + 3*count/100);
    obstacle.addImage(r)
    obstacle.scale = 0.7    
   //generate random obstacles
   // var rand = randomNumber(1,6);
   // obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
    obstacle.lifetime = 5000;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
var x = document.getElementById("gun reload.mp3");function playAudio() {
  
}
function playAudio() {
  x.play();
}

function reloadammo(){
   ammo = 5
   text("ammo reloaded ",500,500)
   
}
function keyPressed (){
  if ( keyCode == 82){
    playAudio()  
    setTimeout(reloadammo,10000)
    
  }
}