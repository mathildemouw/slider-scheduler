function Goal ( days ) {
	this.days = days;
	this.total = 0;
}
Goal.prototype = {
	displayTotal: function () {
		sum = 0;
		for (var i = 0; i < this.days.length; i++) {
			sum += this.days[ i ].count
		};
		this.total = sum;
		document.getElementById( 'total-minutes' ).innerHTML = "<num>" + this.total + "</num> min"
	},
	attachListeners: function () {
		for (var i = 0; i < this.days.length; i++) {
			this.days[ i ].binder.listenForToggling( this.toggling );
		};
	},
}
// each day ///
function Day ( dayId ) {
	this.canvas = document.getElementById( dayId ).getElementsByClassName( 'slider' )[ 0 ];
	this.counter = document.getElementById( dayId ).getElementsByClassName( 'minute-counter' )[ 0 ];
	this.count = 0;
	this.binder = new DayBinder ( this.canvas );
	this.toggling = false;
}
Day.prototype = {
	render: function () {
		this.drawSlider( 10, 220, "#95BA91" ); //210 in length, each 3 px = 1 min.
		this.drawToggle();
		this.displayCount();
	},
	drawSlider: function ( start, dist, fillColor ) {
		context = this.canvas.getContext( "2d" );
		context.fillStyle = fillColor;
		context.fillRect( 27, start, 5, dist );
	},
	drawToggle: function () {
		context = this.canvas.getContext( "2d" );
		var centerX = 0;
		var centerY = 100;
		var radius = 8;
		var toggledDist = 210;
		var toggleStart = 220 ;
		context.save();
		context.translate(this.canvas.width / 2, this.canvas.height / 2);
		context.scale(3, 1);
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.restore();
		context.fillStyle = '#FFF';
		context.fill();
		this.drawSlider( toggleStart, (227- (toggledDist)),'#FFF');
	},
	displayCount: function () {
		this.counter.innerHTML = "<num>"+ this.count + "</num> min";
	},
	adjustToggleHeight: function () {
		if ( this.toggling ) {
			this.getMousePositionY();
		}
	},
	incrementCountByToggle: function () {},
}
function DayBinder ( canvas ) {
	this.toggling = false;
	this.canvas = canvas
}
DayBinder.prototype = {
	listenForToggling: function ( flag ) {
		today = this;
		this.canvas.addEventListener( 'mousedown', today.bindDrag.bind( today ) );
		this.canvas.addEventListener( 'mouseup', today.unbindDrag.bind( today ) );
	},
	bindDrag: function () {
		this.canvas.addEventListener( 'mousemove', today.getMousePositionY);
	},
	unbindDrag: function () {
		debugger
		this.canvas.removeEventListener( 'mousemove');
	},
	getMousePositionY: function ( event ) {
		var rect = this.getBoundingClientRect();
		console.log(rect.top)
		console.log(event.clienty);
		// return {
		// 	y: event.clienty - rect.top
		// };
	},
}

mon = new Day ( "mon" );
mon.render();
tue = new Day ( "tue" );
tue.render();
wed = new Day ( "wed" );
wed.render();
thu = new Day ( "thu" );
thu.render();
fri = new Day ( "fri" );
fri.render();
sat = new Day ( "sat" );
sat.render();
sun = new Day ( "sun" );
sun.render();
goal = new Goal([mon, tue, wed, thu, fri, sat, sun]);
goal.attachListeners();

//UNBIND NOT WORKING OMIGOD
