var game;

var climbs = [];
var climbColors = [0xff0000, 0x0000ff];
var climbTurnSpeed = 300;
var climbTurnSpeedSlow = 2000;

var climbGroup;
var obstacleGroup;

var UpobstacleSpeed = 150;
var UpobstacleDelay = 900;

var updelay = 0;
var downdelay = 0;

var DownobstacleSpeed = -240;
var DownobstacleDelay = 700;

window.onload = function() {	
	game = new Phaser.Game(640, 480, Phaser.AUTO, "");
     game.state.add("PlayGame",playGame);
     game.state.start("PlayGame");
}

var playGame = function(game){};

playGame.prototype = {
	preload: function(){
          game.load.image("road", "road.png");
          game.load.image("climb", "climb.png");
          game.load.image("plane", "climb.png");
          game.load.image("obstacle", "obstacle.png");
	},
  	create: function(){
          game.add.image(0, 0, "road");
          game.physics.startSystem(Phaser.Physics.ARCADE);
          climbGroup = game.add.group();
          obstacleGroup = game.add.group();
          for(var i = 0; i < 2; i++){
              if(i == 0){
               climbs[i] = game.add.sprite(0, game.height - 40, "climb");
              }else{
               climbs[i] = game.add.sprite(0, game.height - 40, "plane");   
              }
               climbs[i].positions = [game.width * (i * 4 + 1) / 8, game.width * (i * 4 + 3) / 8];
               climbs[i].anchor.set(0.5);
               climbs[i].tint = climbColors[i];  
               climbs[i].canMove = true;
               climbs[i].side = i;
               climbs[i].x = climbs[i].positions[climbs[i].side];
               game.physics.enable(climbs[i], Phaser.Physics.ARCADE); 
               climbs[i].body.allowRotation = false;
               climbs[i].body.moves = false;  
               climbGroup.add(climbs[i]);
               if(i == 1){
                   climbs[i].y = 100;
               }
          }
          game.input.onDown.add(moveclimb);
          updelay = game.rnd.between(UpobstacleDelay, UpobstacleDelay*4);
          game.time.events.loop(updelay, function(){
               //fire up obstacles (left screen)
               var upobstacle = new UpObstacle(game);
               game.add.existing(upobstacle);
               obstacleGroup.add(upobstacle);
          }); 
          downdelay = game.rnd.between(DownobstacleDelay, DownobstacleDelay*2.2);
          game.time.events.loop(downdelay, function(){
               //fire down obstacles (right screen)
               var downobstacle = new DownObstacle(game);
               game.add.existing(downobstacle);
               obstacleGroup.add(downobstacle);
          });          
	},
     update: function(){
          game.physics.arcade.collide(climbGroup, obstacleGroup, function(){
               game.state.start("PlayGame");     
          });
     }
}

function moveclimb(e){
     var climbToMove = Math.floor(e.position.x / (game.width / 2));
     if(climbs[climbToMove].canMove){
          climbs[climbToMove].canMove = false;
          climbs[climbToMove].side = 1 - climbs[climbToMove].side;
          //left player
          if(climbToMove == 0){
            var moveTween = game.add.tween(climbs[climbToMove]).to({ 
                x: climbs[climbToMove].positions[climbs[climbToMove].side],
            }, climbTurnSpeedSlow, Phaser.Easing.Linear.None, true);
            moveTween.onComplete.add(function(){
                climbs[climbToMove].canMove = true;
            })
          }
          //right player
          if(climbToMove == 1){
            var moveTween = game.add.tween(climbs[climbToMove]).to({ 
                x: climbs[climbToMove].positions[climbs[climbToMove].side],
            }, climbTurnSpeed, Phaser.Easing.Linear.None, true);
            moveTween.onComplete.add(function(){
                climbs[climbToMove].canMove = true;
            })
          }
     }
}
//up obstacle
UpObstacle = function (game) {
     var position = game.rnd.between(0, 1);
	Phaser.Sprite.call(this, game, game.width * (position * 2 + 1) / 8, -20, "obstacle");
	game.physics.enable(this, Phaser.Physics.ARCADE);
     this.anchor.set(0.5);
     this.tint = climbColors[Math.floor(position / 2)];
};

UpObstacle.prototype = Object.create(Phaser.Sprite.prototype);
UpObstacle.prototype.constructor = UpObstacle;

UpObstacle.prototype.update = function() {
	this.body.velocity.y = UpobstacleSpeed;
	if(this.y > game.height){
		this.destroy();
	}
};

//down obstacle
DownObstacle = function (game) {
     var position = game.rnd.between(2, 3);
	Phaser.Sprite.call(this, game, game.width * (position * 2 + 1) / 8, 490, "obstacle");
	game.physics.enable(this, Phaser.Physics.ARCADE);
     this.anchor.set(0.5);
     this.tint = climbColors[Math.floor(position / 2)];
};

DownObstacle.prototype = Object.create(Phaser.Sprite.prototype);
DownObstacle.prototype.constructor = DownObstacle;

DownObstacle.prototype.update = function() {
	this.body.velocity.y = DownobstacleSpeed;
	if(this.y < 0){
		this.destroy();
	}
};
