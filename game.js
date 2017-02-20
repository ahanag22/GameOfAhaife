// setup canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d')

// canvas and grid size defaults
var gridWidth = 300;
var gridHeight = 150;
var gridSquareWidth = 8;

canvas.width = gridWidth * gridSquareWidth;
canvas.height = gridHeight * gridSquareWidth;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

var grid = [];
var gridNext = [];

// create default grid array
// sudo random noise
for (var x = 0; x < gridWidth; x++) {
	grid[x] = [];
	gridNext[x] = [];
	for (var y = 0; y < gridHeight; y++) {
		//grid[x][y] = [];
		//gridNext[x][y] = []

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
	// touch each grid coord
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {

			// counts alive or dead for neighbours
			
			var count_red = countNearby_red(x,y);
			var count_black = countNearby_black(x,y);

			if(grid[x][y] == 0){
				if(count_black == 3 && count_red == 3){
					gridNext[x][y] = 0;
				}
				else if(count_red == 3 ){
					// life is born
					gridNext[x][y] = 1;
				}
				else if(count_black == 3){
					// life is born
					gridNext[x][y] = 2;
				}
				else{
					gridNext[x][y] = 0;
				}
				
			}else {
				//if((count_black < 2 || count_black > 3 )&&(count_red < 2 || count_red > 3)){
					// underpopulation & overpopulation
					//gridNext[x][y] = 0;
				//}//else if((count_black == 2 || count_black == 3) && (count_red == 2 || count_red== 3)){
					//gridNext[x][y] = 3;
				//}
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
	/**for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {
	    gridNext[x][y] = 0;
		}
		
	}**/
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
		
		if(x > 0 && x < gridWidth && y > 0 && y < gridHeight){
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
		
		if(x > 0 && x < gridWidth && y > 0 && y < gridHeight){
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
// clear canvas
   // var r_a = 0.3; 
    //ctx.fillStyle = "rgba(32, 45, 21, " + r_a + ")";
	//ctx.fillStyle = "grey";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {

			if (grid[x][y] == 1) {
				//ctx.fillStyle = "#FF0000";
				//var r_a = 0.5; 
                ctx.fillStyle = "red";
			}
			
		   else if (grid[x][y] == 2) {
				//ctx.fillStyle = "#FF0000";
				//var r_a = 0.5; 
                ctx.fillStyle =  "black";
				
			}
			else{
				  ctx.fillStyle =  "grey";
			}
			
			ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);	
			
		}
		
	}
}

/**function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}**/

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
