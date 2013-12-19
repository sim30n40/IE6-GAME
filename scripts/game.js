(function() {
//select the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//some function that we will probably need :D
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//user width and height saved in vars (it isn't obvious :D)
var userWidth = 70;
var userHeight = 70;
var ieWidth = 70;
var ieHeight = 70;
//create object for the user
function User(x,y,speed,hitPower,hitPoints){
	//set object properties for x,y coordinate and speed
	this.x = x;
	this.y = y;
	this.speed = speed;
	//set health
	this.health = hitPoints;
	//creating image for the user
	this.img = new Image();
	this.img.src = "images/user.png";
	//controll brains
	this.moveRight = function(){
		this.x+= this.speed;
	}
	this.moveLeft = function(){
		this.x-= this.speed;
	}
	//activate jump by default
	this.canIJump = true;
	this.jump = function(){
		//jump is activated so you can't jump again
		//console.log(this.y)
		this.canIJump = false;
		//save this to another varaible so that you can use it in the timeout
		var _this = this;
		//go up
		for(var i = 0; i < 25 ; i++){
				setTimeout(function(){
				_this.y -= 5;
			},i*20);
		}
		//go down
		for(var i = 0; i < 25 ; i++){
				setTimeout(function(){
				_this.y += 5;
			},(i+25)*20);
		}
		//after the jump you can jump again
		setTimeout(function(){
			_this.canIJump = true;
		},1000);
   }
   this.canIShoot = true;

   this.isShotFired = false;
   this.shoot = function(){
   		this.shot = new Shot(this.x + 55,this.y + 20,this.speed*2.2);
   		this.canIShoot  = false;
   		this.isShotFired =  true;
   }
}
function Shot(x,y,speed){
		this.x = x
		this.y = y
		this.speed = speed;
		this.img = new Image();
		this.img.src = "images/altf4.png";
		this.moveRight = function(){
		this.x+= this.speed;
		}
		this.moveLeft = function(){
			this.x-= this.speed;
		}
}
function InternetExporer(x,y,speed,hitPower,hitPoints){
	//set object properties for x,y coordinate and speed
	this.x = x;
	this.y = y;
	this.canIJump = true;

	//set health
	this.health = hitPoints;
	this.speed = speed;
	this.userImg = new Image();
	this.userImg.src = "images/ie6.png";
	this.moveRight = function(){
		this.x+= this.speed;
	}
	this.moveLeft = function(){
		this.x-= this.speed;
	}
	this.moveDown = function(){
		this.y += this.speed;
	}
	 this.jump = function(){
	     //jump is activated so you can't jump again
	     //console.log(this.y)
	     this.canIJump = false;
	     //save this to another varaible so that you can use it in the timeout
	     var _this = this;
	     //go up
	     for(var i = 0; i < 25 ; i++){
	       	setTimeout(function(){
	        	_this.y -= 4;
	       },i*20);
	     }
	     //go down
	    for(var i = 0; i < 25 ; i++){
	       	setTimeout(function(){
	        	_this.y += 4;
	      },(i+25)*20);
	     }
	     //after the jump you can jump again
	     setTimeout(function(){
	       _this.canIJump = true;
	     },1000);
   }


}

var keysDown = [];
window.addEventListener("keydown", function(e) {
			//add the key to the keysDown array if it isn't there (indexOf used for that check) and if it is an arrow key or space
			if(((e.keyCode >= 37 && e.keyCode <=39) || e.keyCode == 32) && keysDown.indexOf(e.keyCode) == -1)
				keysDown.push(e.keyCode);
});
window.addEventListener("keyup", function(e) {
			if(e.keyCode >= 37 && e.keyCode <= 39 || e.keyCode == 32){
				//take the index of the key
				var index = keysDown.indexOf(e.keyCode);
				//remove it
				keysDown.splice(index,1);
			}
});

var user1 = new User(0,ctx.canvas.height - userHeight,5,10,100);
//create shot
//var shot = new Shot(0,ctx.canvas.height - userHeight,5,false);
//create ie
var ie  = new InternetExporer(ctx.canvas.width -ieWidth,ctx.canvas.height - ieHeight,5,10,100)
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function animationFrame(){
			canvas.width = canvas.width;
			/*
		
		ctx.fillStyle = "black";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("User: "+user1.health+" IE: "+ie.health , canvas.width/3, 32);*/
		if(user1.health>0)
			ctx.drawImage(user1.img, user1.x, user1.y, userWidth, userHeight);
		if(ie.health>0)
			ctx.drawImage(ie.userImg,ie.x,ie.y,ieWidth,ieHeight);	
		else{
			setTimeout(function(){
			ie.health = 10000000000000000000;
			ie.x = ctx.canvas.width -70;
			ie.y = canvas.height/2 + 50 ;
			ieHeight = 10;
			ieWidth = 10;
			ie.speed =   25;
		},1000)
			

		}
		if(ie.y<canvas.height - 70)
			{
				ie.y++;
				if(ieHeight<70){
				ieHeight++;
				ieWidth++;
			}
			}

		if(ie.y>=canvas.height - 70 && ie.health>10000000){
			ie.speed =   5;
			ie.health = 100;
		}

		
		var cache = keysDown;
		for(var i = 0; i < cache.length; i++){
			switch(cache[i]){
				case 37: {
					//left
					if(user1.x >= user1.speed){
						
						user1.moveLeft();
					 	
					}
					break;
				}					
				case 39: {
					//right
					if(user1.x <= ie.x - userWidth - user1.speed){
						user1.moveRight();		
					}
					break;
				}					
				case 38: {
					//up
					if(user1.canIJump)
						user1.jump();
					break;
				}
				case 32: {
					//space
					if(user1.canIShoot){
						user1.shoot();
					}
					break;
				}						
			}
		}
		if(user1.isShotFired){	
			if(user1.shot.x < ie.x || user1.shot.x > ie.x + userWidth)			{	
				ctx.drawImage(user1.shot.img,user1.shot.x,user1.shot.y,54,18);
				user1.shot.moveRight();
			}
			else{
				if(user1.shot.y < ie.y ||user1.shot.y>ie.y + userHeight){
					ctx.drawImage(user1.shot.img,user1.shot.x,user1.shot.y,54,18);
					user1.shot.moveRight();
				}
				else{
					ie.health -= 25;
					user1.canIShoot =true;
					user1.isShotFired = false;
					user1.shot.x = user1.x;
					user1.shot.y = user1.y+20;
				}
			}
			if(user1.shot.x <0 || user1.shot.x > canvas.width|| user1.shot.y <0 || user1.shot.y> canvas.height){
					user1.canIShoot =true;
					user1.isShotFired = false;
					user1.shot.x = user1.x;
					user1.shot.y = user1.y+50;
			}
		}
		
		//Loop it baby
		requestAnimationFrame(animationFrame);	 	
}
//start animation
animationFrame();

}())
