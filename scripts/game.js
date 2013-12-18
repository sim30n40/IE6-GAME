(function() {
//select the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//some function that we will probably need :D
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//user width and height saved in vars (it isn't obvious :D)
var userWidth = 120;
var userHeight = 120;
var ieWidth = 120;
var ieHeight = 120;
//create object for the user
function User(x,y,speed,hitPower,hitPoints){
	//set object properties for x,y coordinate and speed
	this.x = x;
	this.y = y;
	this.speed = speed;
	//some indicators
	this.canIJump = true;
	this.isShotFired = false;
	this.imgReady = false;
	//will use this shits later :D
	this.hitPower = hitPower;
	this.hitPoints = hitPoints;
	//make draw function for the object, whick also clears the canvas after the img is loaded, but before drawing
	this.draw = function(ctx){
		//save this to another varaible so that you can use it in the onload function
		var _this = this;
		var userimg = new Image();
			userimg.onload = function(){
				_this.imgReady = true;
				ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
				ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
			};
			userimg.src = 'images/user.png';
	}
	//some movement functions
	this.moveRight = function(){
		var _this = this;
		var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.x += speed;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/user.png';
	}
	this.moveLeft = function(){
		var _this = this;
		var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.x -= speed;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/user.png';
	}
	this.jump = function(){
		//jump is activated so you can't jump again
		this.canIJump = false;
		//save this to another varaible so that you can use it in the timeout
		var _this = this;
		for(var i = 0; i < 30 ; i++){
			//go up
			setTimeout(function(){
				var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.y -= 4;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/user.png';
			},i*20);
			//go down after some seconds
			setTimeout(function(){
				var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.y += 4;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/user.png';
			},(i+30)*20);
		}
		//after the jump you can jump again
		setTimeout(function(){
			_this.canIJump = true;
		},1200);
	}
	//shoot a shot
	this.shoot = function(){
		//shot is fired and you can't shoot again before it leave the canvas
		this.isShotFired = true;
		//make shot visible and set the right coords and speed for it
		shot = new Shot(this.x + 100, this.y + 40, 2*this.speed, true);

	}
}
//set shot width and height
var shotWidth = 54;
var shotHeight = 18;
//create object for the shot
function Shot(x,y,speed,visibility){
	//set some shot properties
	this.x = x;
	this.y = y;
	this.speed = speed;

	this.imgReady = false;
	//will use this visibility in order to not to show the shot when it isn't fired
	this.amIvisible = visibility;
	this.draw = function(ctx){
		//if it is visible (existing) draw it
		if(this.amIvisible){
			var shotimg = new Image();
			//save this to another varaible so that you can use it in the onload function
			var _this = this;
				shotimg.onload = function(){
					_this.imgReady = true;
					ctx.clearRect(_this.x, _this.y, shotWidth, shotHeight);
					ctx.drawImage(shotimg, _this.x, _this.y, shotWidth, shotHeight);
				};
				shotimg.src = 'images/altf4.png';
		}
	}
	this.move = function(){
		//if it is visible (existing) move it
		if(this.amIvisible){
			var _this = this;
			var shotimg = new Image();
				shotimg.onload = function(){
					_this.imgReady = true;
					ctx.clearRect(_this.x, _this.y, shotWidth, shotHeight);
					_this.x += speed;
					ctx.drawImage(shotimg, _this.x, _this.y, shotWidth, shotHeight);
				};
				shotimg.src = 'images/altf4.png';
		}
	}
}
function InternetExporer(x,y,speed,hitPoints,hitPower){
		//set object properties for x,y coordinate and speed
	this.x = x;
	this.y = y;
	this.speed = speed;
	//some indicators
	this.canIJump = true;
	this.isShotFired = false;
	this.imgReady = false;
	//will use this shits later :D
	this.hitPower = hitPower;
	this.hitPoints = hitPoints;
	//make draw function for the object, whick also clears the canvas after the img is loaded, but before drawing
	this.draw = function(ctx){
		//save this to another varaible so that you can use it in the onload function
		var _this = this;
		var userimg = new Image();
			userimg.onload = function(){
				_this.imgReady = true;
				ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
				ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
			};
			userimg.src = 'images/ie6.png';
	}
	//some movement functions
	this.moveRight = function(){
		var _this = this;
		var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.x += speed;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/ie6.png';
	}
	this.moveLeft = function(){
		var _this = this;
		var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.x -= speed;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/ie6.png';
	}
	this.jump = function(){
		//jump is activated so you can't jump again
		this.canIJump = false;
		//save this to another varaible so that you can use it in the timeout
		var _this = this;
		for(var i = 0; i < 30 ; i++){
			//go up
			setTimeout(function(){
				var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.y -= 4;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/ie6.png';
			},i*20);
			//go down after some seconds
			setTimeout(function(){
				var userimg = new Image();
					userimg.onload = function(){
						_this.imgReady = true;
						ctx.clearRect(_this.x, _this.y, userWidth, userHeight);
						_this.y += 4;
						ctx.drawImage(userimg, _this.x, _this.y, userWidth, userHeight);
					};
			userimg.src = 'images/ie6.png';
			},(i+30)*20);
		}
		//after the jump you can jump again
		setTimeout(function(){
			_this.canIJump = true;
		},1200);
	}
	//shoot a shot
	this.shoot = function(){
		//shot is fired and you can't shoot again before it leave the canvas
		this.isShotFired = true;
		//make shot visible and set the right coords and speed for it
		shot = new Shot(this.x + 100, this.y + 40, 2*this.speed, true);

	}
}
//set shot width and height
var shotWidth = 54;
var shotHeight = 18;
//create object for the shot
function Shot(x,y,speed,visibility){
	//set some shot properties
	this.x = x;
	this.y = y;
	this.speed = speed;

	this.imgReady = false;
	//will use this visibility in order to not to show the shot when it isn't fired
	this.amIvisible = visibility;
	this.draw = function(ctx){
		//if it is visible (existing) draw it
		if(this.amIvisible){
			var shotimg = new Image();
			//save this to another varaible so that you can use it in the onload function
			var _this = this;
				shotimg.onload = function(){
					_this.imgReady = true;
					ctx.clearRect(_this.x, _this.y, shotWidth, shotHeight);
					ctx.drawImage(shotimg, _this.x, _this.y, shotWidth, shotHeight);
				};
				shotimg.src = 'images/altf4.png';
		}
	}
	this.move = function(){
		//if it is visible (existing) move it
		if(this.amIvisible){
			var _this = this;
			var shotimg = new Image();
				shotimg.onload = function(){
					_this.imgReady = true;
					ctx.clearRect(_this.x, _this.y, shotWidth, shotHeight);
					_this.x += speed;
					ctx.drawImage(shotimg, _this.x, _this.y, shotWidth, shotHeight);
				};
				shotimg.src = 'images/altf4.png';
		}
	}
}
/*add eventlistener
32 - space
37 - left
38- up
39 - right
40 - down
*/
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
//clear();
//create user object
var user = new User(0,ctx.canvas.height - userHeight,5,10,10);
//create shot
var shot = new Shot(0,ctx.canvas.height - userHeight,5,false);
//create ie
var ie  = new InternetExporer(ctx.canvas.width -ieWidth,ctx.canvas.height - ieHeight,5,10,10)
//animation frame
//
var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
//draw user and ie in the begining
user.draw(ctx);
ie.draw(ctx);
function animationFrame(){
	//when the function is executed we make a request to execute it again
	requestAnimationFrame(animationFrame);
	//
	now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
	        // update time stuffs
	         
	        // Just `then = now` is not enough.
	        // Lets say we set fps at 10 which means
	        // each frame must take 100ms
	        // Now frame executes in 16ms (60fps) so
	        // the loop iterates 7 times (16*7 = 112ms) until
	        // delta > interval === true
	        // Eventually this lowers down the FPS as
	        // 112*10 = 1120ms (NOT 1000ms).
	        // So we have to get rid of that extra 12ms
	        // by subtracting delta (112) % interval (100).
	        // Hope that makes sense.
	         
	        then = now - (delta % interval);
		//cache the keysDown array because you change it dynamicaly and shit things happen if you don't do this :D
		var cache = keysDown;
		//perform moves if some keys are down
		for(var i = 0; i < cache.length; i++){
			switch(cache[i]){
				case 37: {
					//left
					if(user.x >= user.speed)
						user.moveLeft();
					}
					break;
				case 39: {
					//right
					if(user.x <= ctx.canvas.width - userWidth - user.speed)
						user.moveRight();
					}
					break;
				case 38: {
					//up
					if(user.canIJump)
						user.jump();
				}
				break;
				case 32: {
					//space
					if(!user.isShotFired)
						user.shoot();
				}
				break;
			}
		}
		//move shot
		shot.move();
		//delete shot if it has left the canvas (make it not visible) and allow the user to shoot again
		if(shot.x >= ctx.canvas.width - shotWidth){
			shot.amIvisible = false;
			user.isShotFired = false;
		}
	}
}
//start animation
animationFrame();

}())
