var tower,towerImage;
var ghost,ghostImage;
var door,doorImage,doorGroup;
var climber, climberImage,climberGroup;
var invisibleblock,invisibleGroup;
var gameState ="play"
var edges;


function preload(){
towerImage =loadImage("tower.png")
ghostImage = loadImage("ghost-standing.png")
doorImage = loadImage("door.png")
climberImage = loadImage("climber.png")
}
function setup(){
createCanvas(600,600)

 
tower = createSprite(300,300) 
  tower.addImage(towerImage)
  
  ghost = createSprite(400,300,50,50) 
  ghost.addImage(ghostImage)
  ghost.scale = 0.3
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  background(0)
  drawSprites();

if(gameState=="play"){
   createDoors();
  
  tower.velocityY = 1
  if(tower.y>400){
     tower.y = 300
     }
  
  if(keyDown("right")){
     ghost.x = ghost.x+3
     }
  
    if(keyDown("left")){
     ghost.x = ghost.x-3

      
     } 
   if(keyDown("space")){
     ghost.velocityY = -12
     
     }
  ghost.velocityY =ghost.velocityY+0.5
  
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0
       }
  
  if(invisibleGroup.isTouching(ghost)){
     gameState = "end"
     
     }
  
   }
else if(gameState =="end"){
    tower.velocityY = 0    
    doorGroup.setVelocityEach(0)
     climberGroup.setVelocityEach(0)
    invisibleGroup.setVelocityEach(0)
  
  doorGroup.setLifetimeEach(-200)
     climberGroup.setLifetimeEach(-200)
    invisibleGroup.setLifetimeEach(-200)
  gameState = "over"
  textSize(20)
  text ("Press R to play again",250,300)
        }
  else if(keyDown("r")&&gameState ==="over"){
       gameState ="play"   
          
          
          }
  
  edges=createEdgeSprites()
  ghost.collide(edges)
  




}

function createDoors(){
if(frameCount%300==0){
  door = createSprite(200,0)
  door.addImage(doorImage)
  door.velocityY = 3
  door.lifetime = 800
  
  climber = createSprite(200,60) 
  climber.addImage(climberImage)
  climber.velocityY = door.velocityY
  climber.lifetime = 800
  
  invisibleblock = createSprite(200,65,climber.width-50,2) 
  invisibleblock.velocityY = door.velocityY
  invisibleblock.lifetime = 800
  invisibleblock.visible =false;
  
  ghost.depth = door.depth
  ghost.depth = ghost.depth+1
  
  doorGroup.add(door)
  climberGroup.add(climber)
  invisibleGroup.add(invisibleblock)
  
  door.x=Math.round(random(100,400))
  climber.x = door.x
  invisibleblock.x = door.x
   }


}
