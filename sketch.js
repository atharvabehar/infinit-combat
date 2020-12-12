var player , bullet ;
var bg , ground;
var robotsGroup;
var ammo = 12;
var gun , gimg , pimg;
var bg , b,sound ;
var bgroup ;
var gameState = "menu" ;
var menu ,start,shoot , bmusic;
var jet , jeti ,mj;

function preload (){
    gimg = loadImage  ("ak-removebg-preview.png")
    pimg =  loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png")
    r = loadImage("erob.png")
    jeti = loadImage ("jet-removebg-preview (1).png")
    bg = loadImage("lab1.jpg")
    b = loadImage("bulet-removebg-preview.png")
    sound = loadSound("gun reload.mp3")
    menu = loadImage ("menu1.jpg")
    shoot = loadSound("shoot.mp3")
    mj = loadImage ("c-removebg-preview (1).png")
  //  bmusic = loadSound("Extreme - AShamaluevMusic.mp3")
}

function setup (){
    createCanvas (displayWidth,displayHeight);
    player = createSprite (200,height - 250 , 20,20);
    player.addAnimation("running", pimg)
    player.scale = 2.2
    ground = createSprite (displayWidth/2 , height-20  , width , 10);
    gun = createSprite (player.x+50,player.y-70,20,20)
    jet = createSprite (player.x-22,player.y-70,20,20)
    jet.addImage(jeti)
    jet.scale = 0.6
    gun.addImage(gimg)
    gun.scale = 0.6
    ground.visible = false;
    robotsGroup = new Group ();
    player.setCollider("rectangle",0,0,player.width/2,player.height)
 
    start = createSprite(width/2, height/2 , 450,200)
    start.visible = false
    player.visible = false
    gun.visible = false
    jet.visible = false
}
function draw (){
  if (gameState == "menu"){
    background(menu)
    
    if(mousePressedOver(start)) {
      setTimeout(playAudio,1000)
      gameState = "play"

    }
  }else if (gameState == "play"){

    background (bg);
   // bmusic.play()
    player.visible = true
    gun.visible = true
    jet.visible = true
    textSize (50)
    stroke ("red")
      fill("red")
      textFont("Georgia");
    text("Ammo : " + ammo /*,"/∞"*/,1000,700)
    text("Press R To Reload " ,950,750)
    edges = createEdgeSprites();
    if (keyDown("space")){
      player.velocityY = -12;
    
    }
    player.velocityY = player.velocityY + 0.8;
    //gun.velocityY = player.velocityY + 0.8;
    gun.y = player.y + 5
    jet.y = player.y - 25
    player.collide(ground);
    gun.collide(ground);
    spawnrobots()
    if ( ammo <= 0 ){
      textSize(105)
      stroke ("red")
      fill("red")
      textFont("Georgia");
      text("Reload!",width/2-160,height/2+50)
    }
    if (player.isTouching(robotsGroup)){
  
    }

    if (player.y > height - 250){
      player.addImage(mj)
    }else{
      player.addAnimation("running", pimg)
    }
  
  }
  drawSprites();
 
}
function spawnrobots() {
  if(World.frameCount % 60 === 0) {
      var robot = createSprite(width,random(50,height-50),10,40);
      robot.velocityX = - 26 //(6 + 3*count/100);
      robot.addImage(r)
      robot.scale = 0.7    
      robot.lifetime = 5000;
      robotsGroup.add(robot);
      robot.debug = true
  }
}
//var x = document.getElementById("gun reload.mp3");function playAudio() {
  

function playAudio() {
    sound.play();
}

function reloadammo(){
   ammo = 12
   textSize (50)
   text("ammo reloaded ",800,800)
   
}
function keyPressed (){
  if ( keyCode == 82){
    playAudio()  
    setTimeout(reloadammo,5000)
    
  }
}

function mouseClicked (){
  if (ammo > 0){
    shoot.play();
    ammo -= 1
    var bullet = createSprite(400 , gun.y ,40 , 5);
    bullet.addImage(b);
    //bullet.collide(rightEdge);
    bullet.velocityX = 50;       
    bullet.lifetime = 100;
    bullet.scale = 0.4
  }
    
  
}
/*function istouching(o1,o2){
  if (o1.x-o2.x < o1.width/2 + o2.width/2
    && o2.x - o1.x < o1.width/2 + o2.width/2
    && o1.y - o2.y < o1.height/2 + o2.height/2
    && o2.y - o1.y < o1.height/2 + o2.height/2 ){
      return  true;
    }else {
      return false
    }
    }*/
