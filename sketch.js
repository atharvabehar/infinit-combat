var player , bullet ;
var bg , ground;
var robotsGroup;
var ammo = 0;
var gun , gimg , pimg;
var bg , b,sound ;
var bgroup ;
var gameState = "menu" ;
var menu ,start ;

function preload (){
    gimg = loadImage ("download-removebg-preview (1).png")
    pimg = loadImage ("images-removebg-preview.png")
    r = loadImage("erob.png")
    bg = loadImage("lab1.jpg")
    b = loadImage("bulet-removebg-preview.png")
    sound = loadSound("gun reload.mp3")
    menu = loadImage ("menu1.jpg")
}

function setup (){
    createCanvas (displayWidth,displayHeight);
    player = createSprite (200,height - 250 , 50,100);
    player.addImage(pimg)
    player.scale = 0.8
    ground = createSprite (displayWidth/2 , height-20  , width , 10);
    gun = createSprite (player.x+50,player.y-70,20,20)
    gun.addImage(gimg)
    gun.scale = 0.8
    ground.visible = false;
    robotsGroup = new Group ();
    player.setCollider("rectangle",0,0,player.width/2,player.height)
    player.debug = true
    start = createSprite(width/2, height/2 , 450,200)
    start.visible = false
    player.visible = false
    gun.visible = false
}
function draw (){
  if (gameState == "menu"){
    background(menu)
    
    if(mousePressedOver(start)) {
     gameState = "play"
    }
  }else if (gameState == "play"){

    background (bg);
    player.visible = true
    gun.visible = true
    text("ammo :" + ammo,500,500)
    edges = createEdgeSprites();
    if (keyDown("space")){
      player.velocityY = -12;
    
    }
    player.velocityY = player.velocityY + 0.8;
    //gun.velocityY = player.velocityY + 0.8;
    gun.y = player.y + 25
    player.collide(ground);
    gun.collide(ground);
    spawnrobots()
    if ( ammo <= 0 ){
      textSize(55)
      stroke ("red")
      fill("red")
      textFont("Georgia");
      text("Reload!",width/2,height/2)
    }
    if (player.isTouching(robotsGroup)){
  
    }
    
  
  }
  drawSprites();
 
}
function spawnrobots() {
  if(World.frameCount % 60 === 0) {
      var robot = createSprite(width,random(50,height-50),10,40);
      robot.velocityX = - 20 //(6 + 3*count/100);
      robot.addImage(r)
      robot.scale = 0.7    
      robot.lifetime = 5000;
      robotsGroup.add(robot);
  }
}
//var x = document.getElementById("gun reload.mp3");function playAudio() {
  

function playAudio() {
    sound.play();
}

function reloadammo(){
   ammo = 5
   text("ammo reloaded ",500,500)
   
}
function keyPressed (){
  if ( keyCode == 82){
    playAudio()  
    setTimeout(reloadammo,5000)
    
  }
}

function mouseClicked (){
  if (ammo > 0){
    ammo -= 1
    var bullet = createSprite(400 , gun.y ,40 , 5);
    bullet.addImage(b);
    //bullet.collide(rightEdge);
    bullet.velocityX = 10;       
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
