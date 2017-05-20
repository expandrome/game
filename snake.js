$(document).ready(function(e) {
//variables for canvas
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();
//variables for the game
var score = 0;
var food;
var cw = 40;
var d = "right";
var currentlyPlaying = true
$('.start').on('click', function(){
	if(currentlyPlaying == false){
   	    init();
	}
})
function init(){
currentlyPlaying = true
score = 0;
var highscore = localStorage.getItem("highscore");
create_food();
create_snake();
d = "right";
if(typeof game_loop != "undefined")
clearInterval(game_loop);
var move_time = 100;
game_loop = setInterval(paint, move_time);
}

function stop(){
	currentlyPlaying = false
	ctx.drawImage(document.getElementById("lose"), 0, 0,w,h)

	ctx.fillStyle = "rgb(120,0,0)";
	
	ctx.font ="bold 50px Times New Roman";
	var highscore_text = "HIGHSCORE: " + localStorage.getItem("highscore");
	ctx.fillText(highscore_text,200, 250);

	ctx.font ="bold 50px Times New Roman";
	var score_text = "SCORE: " + score;
	ctx.fillText(score_text,250, 350);
	
	
        clearInterval(game_loop);
    }

function create_snake(){
var length = 1;
snake_array = [];
for(var i = length-1; i >=0; i--){
snake_array.push({x:i, y:0});
}
}
function create_food(){
food = {
x:Math.round(Math.random()*(w-cw)/cw),
y:Math.round(Math.random()*(h-cw)/cw),
};
}

function paint(){
//begin by drawing the background
ctx.drawImage(document.getElementById("map"), 0, 0,w,h)
//ctx.fillStyle = "white";
//ctx.fillRect(0,0, w, h);
//ctx.strokeStyle = "blue";
//ctx.strokeRect(0,0, w, h);

//the movement code for the snake
//pop out the tail and place it in the front
var nx = snake_array[0].x;
var ny = snake_array[0].y;
//check the direction and increment or decrement the x or y value
if(d=="right")
nx++;
else if(d=="left")
nx--;
else if(d=="up")
ny--;
else if(d=="down")
ny++;
//check and see if there is a collision with the wall or the snake
if(nx == -1 || nx >= w/cw || ny == -1 || ny >= h/cw || check_collision(nx,ny,snake_array)){
stop();
return;
}
//check and see if the snake eats the food
if(nx == food.x && ny == food.y){
var tail = {x:nx, y:ny};
score++;
if (score > localStorage.getItem("highscore")) {                
localStorage.setItem("highscore", score);
}
create_food();
}
else{
var tail = snake_array.pop();
tail.x = nx;
tail.y = ny;
}
snake_array.unshift(tail);
for(var i = 0; i<snake_array.length; i++){
var c = snake_array[i];
paint_cell(c.x, c.y);
}
//paint food
paint_foodcell(food.x, food.y);
//paint the score
ctx.fillStyle = "white";
var score_text = "SCORE: " + score;
ctx.fillText(score_text,w-200, 75); //ctx.fillText(score_text,5, h-5);
ctx.font ="bold 35px Times New Roman";
ctx.strokeStyle="black";
ctx.strokeText(score_text,w-200, 75);

var highscore_text = "HIGHSCORE: " + localStorage.getItem("highscore");;
ctx.fillText(highscore_text,w-300, 45); //ctx.fillText(score_text,5, h-5);
ctx.font ="bold 35px Times New Roman";
ctx.strokeStyle="black";
ctx.strokeText(highscore_text,w-300, 45);

}
function paint_cell(x,y){
//ctx.fillStyle = "blue";
ctx.drawImage(document.getElementById("soldier"),x * cw, y * cw, cw, cw)
//ctx.fillRect(x * cw, y * cw, cw, cw);
//ctx.strokeStyle = "white";
//ctx.strokeRect(x * cw, y * cw, cw, cw);
}
function paint_foodcell(x,y){
ctx.drawImage(document.getElementById("castle"),x * cw, y * cw, cw, cw)
}

function check_collision(x,y, array){
for(var i = 0; i<array.length; i++){
if(array[i].x == x && array[i].y == y)
return true;
}
return false;
}
$(document).keydown(function(e){
	var key = e.which;
	if((key == "65" || key == "37") && d != "right" && currentlyPlaying == true){
		d="left";
		e.preventDefault();
	}else if((key == "87" || key == "38") && d != "down" && currentlyPlaying == true){
		d="up";
		e.preventDefault();
	}else if((key == "68" || key == "39") && d != "left" && currentlyPlaying == true){
		d="right";
		e.preventDefault();
	}else if((key == "83" || key == "40") && d != "up" && currentlyPlaying == true){
		d="down"
		e.preventDefault();
	}
});

init();
});
