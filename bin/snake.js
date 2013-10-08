(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var SnakeDirection = { __constructs__ : ["LEFT","RIGHT","UP","DOWN"] }
SnakeDirection.LEFT = ["LEFT",0];
SnakeDirection.LEFT.toString = $estr;
SnakeDirection.LEFT.__enum__ = SnakeDirection;
SnakeDirection.RIGHT = ["RIGHT",1];
SnakeDirection.RIGHT.toString = $estr;
SnakeDirection.RIGHT.__enum__ = SnakeDirection;
SnakeDirection.UP = ["UP",2];
SnakeDirection.UP.toString = $estr;
SnakeDirection.UP.__enum__ = SnakeDirection;
SnakeDirection.DOWN = ["DOWN",3];
SnakeDirection.DOWN.toString = $estr;
SnakeDirection.DOWN.__enum__ = SnakeDirection;
var Main = function() { }
Main.main = function() {
	var s = new Snake();
}
var Snake = function() {
	var _g = this;
	this.direction = SnakeDirection.RIGHT;
	this.canvas = js.Browser.document.getElementById("snakeCanvas");
	if(this.canvas != null) {
		this.context = this.canvas.getContext("2d");
		if(this.context == null) throw "Error accessing canvas2d context...";
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.cellWidth = 10;
		this.reset();
		js.Browser.document.onkeydown = function(e) {
			var c = e.keyCode;
			if(c == 37 && _g.direction != SnakeDirection.RIGHT) _g.direction = SnakeDirection.LEFT; else if(c == 38 && _g.direction != SnakeDirection.DOWN) _g.direction = SnakeDirection.UP; else if(c == 39 && _g.direction != SnakeDirection.LEFT) _g.direction = SnakeDirection.RIGHT; else if(c == 40 && _g.direction != SnakeDirection.UP) _g.direction = SnakeDirection.DOWN;
		};
		js.Browser.window.setInterval($bind(this,this.update),66);
	} else js.Browser.window.alert("Oh noes! Something's not right here...");
};
Snake.prototype = {
	hasCollision: function(x,y,points) {
		var _g = 0;
		while(_g < points.length) {
			var point = points[_g];
			++_g;
			if(point.x == x && point.y == y) return true;
		}
		return false;
	}
	,drawCell: function(x,y) {
		this.context.fillStyle = "white";
		this.context.fillRect(x * this.cellWidth,y * this.cellWidth,this.cellWidth,this.cellWidth);
		this.context.strokeStyle = "gray";
		this.context.strokeRect(x * this.cellWidth,y * this.cellWidth,this.cellWidth,this.cellWidth);
	}
	,update: function() {
		this.context.fillStyle = "#112211";
		this.context.fillRect(0,0,this.width,this.height);
		var nx = this.bodySegments[0].x;
		var ny = this.bodySegments[0].y;
		var _g = this;
		switch( (_g.direction)[1] ) {
		case 1:
			nx++;
			break;
		case 0:
			nx--;
			break;
		case 2:
			ny--;
			break;
		case 3:
			ny++;
			break;
		}
		if(nx == -1 || nx == this.width / this.cellWidth || ny == -1 || ny == this.height / this.cellWidth || this.hasCollision(nx,ny,this.bodySegments)) {
			this.reset();
			return;
		}
		var tail;
		if(nx == this.food.x && ny == this.food.y) {
			tail = { x : nx, y : ny};
			this.createFood();
			this.score++;
		} else {
			tail = this.bodySegments.pop();
			tail.x = nx;
			tail.y = ny;
		}
		this.bodySegments.unshift(tail);
		var _g1 = 0, _g2 = this.bodySegments;
		while(_g1 < _g2.length) {
			var segment = _g2[_g1];
			++_g1;
			this.drawCell(segment.x,segment.y);
		}
		this.drawCell(this.food.x,this.food.y);
		this.context.fillText("Score: " + this.score,5,this.height - 5);
	}
	,createFood: function() {
		this.food = { x : Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), y : Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth)};
	}
	,createBody: function() {
		this.bodySegments = (function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				while(_g1 < 5) {
					var i = _g1++;
					_g.push({ x : 5 - i, y : 0});
				}
			}
			$r = _g;
			return $r;
		}(this));
	}
	,reset: function() {
		this.score = 0;
		this.direction = SnakeDirection.RIGHT;
		this.createBody();
		this.createFood();
	}
}
var js = {}
js.Browser = function() { }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
