package;

/**
 * canvaSnake - A quick HaxeJS game example using canvas2d
 * Based (pretty closely) on the Snake example at http://thecodeplayer.com/
 *
 * @author Mike Almond - https://github.com/mikedotalmond - https://github.com/MadeByPi
 */

import js.Browser;

import js.html.KeyboardEvent;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;


typedef Point = {
	x:Int,
	y:Int,
}


enum SnakeDirection {
	LEFT;
	RIGHT;
	UP;
	DOWN;
}


class Main {
	
	// entry point...
	static function main() {
		var s = new Snake();
	}
}


/**
 *
 */
class Snake {
	
	var canvas		:CanvasElement;
	var context		:CanvasRenderingContext2D;
	
	var width		:Int;
	var height		:Int;
	var cellWidth	:Int;
	
	var bodySegments:Array<Point>;
	var food		:Point;
	
	var score		:Int;
	
	var direction	:SnakeDirection;
	
	
	public function new() {
		
		direction 	= SnakeDirection.RIGHT;
		canvas 		= cast Browser.document.getElementById("snakeCanvas");
		
		if (canvas != null) {
			
			context 	= canvas.getContext('2d');
			if (context == null) throw "Error accessing canvas2d context...";
			
			width 		= canvas.width;
			height 		= canvas.height;
			
			cellWidth 	= 10;
			
			reset();
			
			Browser.document.onkeydown = function(e:KeyboardEvent) {
				var c = e.keyCode;
				if		(c == 37 && direction != SnakeDirection.RIGHT)	direction = SnakeDirection.LEFT;
				else if	(c == 38 && direction != SnakeDirection.DOWN) 	direction = SnakeDirection.UP;
				else if	(c == 39 && direction != SnakeDirection.LEFT) 	direction = SnakeDirection.RIGHT;
				else if	(c == 40 && direction != SnakeDirection.UP)		direction = SnakeDirection.DOWN;
			};
			
			Browser.window.setInterval(update, 66);
			
		} else {
			Browser.window.alert("Oh noes! Something's not right here...");
		}
	}
	
	
	function reset() {
		
		score 		= 0;
		
		direction 	= SnakeDirection.RIGHT;
		
		createBody();
		
		createFood();
	}
	
	
	function createBody() {
		bodySegments = [for (i in 0...5) {x:5 - i, y:0} ];
	}
	
	
	function createFood() {
		food = {
			x:Math.round(Math.random() * (width - cellWidth) / cellWidth),
			y:Math.round(Math.random() * (height - cellWidth) / cellWidth)
		};
	}
	
	
	function update() {
		
		// clear the entire canvas
		context.fillStyle = "#112211";
		context.fillRect(0, 0, width, height);
		
		//bodySegments[0] is the 'head'
		var nx = bodySegments[0].x;
		var ny = bodySegments[0].y;
		
		switch(direction) {
			case SnakeDirection.RIGHT	: nx++;
			case SnakeDirection.LEFT	: nx--;
			case SnakeDirection.UP		: ny--;
			case SnakeDirection.DOWN	: ny++;
		}
		
		if(nx == -1 || nx == width/cellWidth || ny == -1 || ny == height/cellWidth || hasCollision(nx, ny, bodySegments)) {
			reset();
			return;
		}
		
		var tail:Point;
		
		if(nx == food.x && ny == food.y) { // nom nom hisssss nom. food eaten!
			tail = {x:nx, y:ny};
			createFood();
			score++;
		} else {
			tail = bodySegments.pop();
			tail.x = nx; tail.y = ny;
		}
		
		bodySegments.unshift(tail); // move tail to head
		
		// draw body
		for(segment in bodySegments) drawCell(segment.x, segment.y);
		
		// draw food
		drawCell(food.x, food.y);
		
		// draw score text
		context.fillText('Score: ${score}', 5, height - 5);
	}
	
	
	function drawCell(x:Float, y:Float) {
		context.fillStyle = "white";
		context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		context.strokeStyle = "gray";
		context.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	}
	
	
	function hasCollision(x:Int, y:Int, points:Array<Point>):Bool {
		for (point in points) if (point.x == x && point.y == y) return true;
		return false;
	}
}