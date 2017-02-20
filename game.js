// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d')

// canvas and grid size defaults
var theWidth = 300;
var theHeight = 150;
var gridSquareWidth = 8;

canvas.width = theWidth * gridSquareWidth;
canvas.height = theHeight * gridSquareWidth;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var grid = [];
var gridNext = [];


// create default grid array

for (var x = 0; x < theWidth; x++) {
	grid[x] = [];
	gridNext[x] = [];
	for (var y = 0; y < theHeight; y++) {
		
		var rand = Math.floor((Math.random() * 100) + 1);

		if (rand > 20 && rand < 30) {
			grid[x][y] = 1;
		}
	    else if (rand > 60 && rand < 70) {
	        grid[x][y] = 2;
	    }
		else{
		    grid[x][y] = 0;	
		}
		
		
	}
}

// life init grid
function life(){
	
	for (var x = 0; x < theWidth; x++) {
		for (var y = 0; y < theHeight; y++) {

			// counts alive or dead for neighbours
			
			var count_red = countNearby_red(x,y);
			var count_black = countNearby_black(x,y);

			if(grid[x][y] == 0){
				// no life is born if red and black count 3
				if(count_black == 3 && count_red == 3){
					gridNext[x][y] = 0;
				}
				else if(count_red == 3 ){
					// red life is born
					gridNext[x][y] = 1;
				}
				else if(count_black == 3){
					// black life is born
					gridNext[x][y] = 2;
				}
				else{
					gridNext[x][y] = 0;
				}
				
			}else {
				
				if ((count_red == 2 || count_red == 3) && (count_black == 2 || count_black == 3)){
					gridNext[x][y] = 0;
					
				}
				else if (count_black == 2 || count_black== 3){
					gridNext[x][y] = 2;
					
				}
				else if(count_red == 2 || count_red== 3){
					gridNext[x][y] = 1;
			    }
				else{
					gridNext[x][y] = 0;
				}
				
				
			}
		}
	}
	// replace old grid with new population grid
	grid = gridNext;
	};

// count grid neighbours
function countNearby_red(x,y){
	var count = 0;
	

	// count all nearby sqaures
	counter(x-1,y-1);
	counter(x-1,y);
	counter(x-1,y+1);
	counter(x,y-1);
	counter(x,y+1);
	counter(x+1,y-1);
	counter(x+1,y);
	counter(x+1,y+1);

	function counter(x,y){
		// if x and y on the grid
		
		if(x > 0 && x < theWidth && y > 0 && y < theHeight){
			if (grid[x][y] == 1) {
				count++;
			}	
		
		
		}
	}

	// return count value
	
	return count;
};
// count grid neighbours
function countNearby_black(x,y){
	var count = 0;
	
	// count all nearby sqaures
	counter(x-1,y-1);
	counter(x-1,y);
	counter(x-1,y+1);
	counter(x,y-1);
	counter(x,y+1);
	counter(x+1,y-1);
	counter(x+1,y);
	counter(x+1,y+1);

	function counter(x,y){
		// if x and y on the grid
		
		if(x > 0 && x < theWidth && y > 0 && y < theHeight){
			if (grid[x][y] == 2) {
				count++;
			}	
		
		
		}
	}

	// return count value
	
	return count;
};

// game update
function update(dt) {
	// iterate simulation rules
	life();

	// draw result
	draw();
};

function draw() {


	for (var x = 0; x < theWidth; x++) {
		for (var y = 0; y < theHeight; y++) {

			if (grid[x][y] == 1) {
				
                ctx.fillStyle = "red";
			}
			
		   else if (grid[x][y] == 2) {
				
                ctx.fillStyle =  "black";
				
			}
			else{
				  ctx.fillStyle =  "grey";
			}
			
			ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);	
			
		}
		
	}
}


// The main game loop
var lastTime = 0;
function gameLoop() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);

    lastTime = now;
	window.setTimeout(gameLoop, 100);
};

// start game
gameLoop();
