function Goal () {
	this.total = 0;
}
Goal.prototype = {
	updateTotal: function ( value ) {
		this.total += value;
		document.getElementById( 'total-minutes' ).innerHTML = "<num>" + this.total + "</num> min"
	},
}

function Day ( dayId, goal ) {
	this.goal = goal;
	this.dayElement = document.getElementById( dayId ).getElementsByClassName( 'slider' )[ 0 ];
	this.stage = new Kinetic.Stage({
			container: this.dayElement.id, 
			width: 60,
	    	height: 250
			});
	this.counter = document.getElementById( dayId ).getElementsByClassName( 'minute-counter' )[ 0 ];
	this.count = 0;
	this.toggle = new Kinetic.Rect({
			x: (this.stage.getWidth() / 2) - 20,
			y: 210,
			shadowColor: '#95BA91',
			shadowOffsetX: 5,
			shadowOffsetY: 5,
			width: 40,
			height: 15,
			fill: '#FFF',
			cornerRadius: 3,
			draggable: true,
			dragBoundFunc: function( pos ) {
				return {
					x: this.getAbsolutePosition().x,
					y: pos.y
					}
				},
			});
	this.slider = new Kinetic.Rect({
			x: (this.stage.getWidth() / 2) - 2.5,
			y: 10,
			width: 5,
			height: 220,
			fill: '#95BA91',
			cornerRadius: 3,
		});
	new DayBinder ( this );

}
Day.prototype = {
	render: function () {
		this.drawToggle();
		this.displayCount();
	},
	drawToggle: function () {
		var layer = new Kinetic.Layer();
		layer.add( this.slider );
		layer.add( this.toggle );
		this.stage.add( layer );
	},
	displayCount: function () {
		this.counter.innerHTML = "<num>"+ this.count + "</num> min";
	},

	incrementCountByToggle: function ( toggleY ) {
		var incremented = (Math.floor((230 - toggleY) / 14))*5
		var oldCount = this.count
		var difference = incremented - oldCount
		this.count = incremented
		this.displayCount();
		this.goal.updateTotal( difference );
	}
}

function DayBinder ( controller ) {
	this.toggleY = 210;
	this.dayElement = controller.dayElement;
	this.toggle = controller.toggle;
	this.controller = controller;
	var self = this

	this.listenForToggling = function () {
		this.toggle.addEventListener( 'mousedown', this.togglePositionY );
		document.addEventListener( 'mouseup', this.unbindDrag );
	}

	this.calculateY = function (e) {
			    var $div = $( "#"+ self.dayElement.id +"" );
			    self.toggleY = e.pageY - $div.offset().top;
			    self.controller.incrementCountByToggle( Math.floor( self.toggleY ) ); 
	}

	this.togglePositionY = function () {
		$(document).mousemove( self.calculateY );
	}

	this.unbindDrag = function () {
		$( document ).off( 'mousemove', self.calculateY );
	}

	this.listenForToggling()
}

goal = new Goal();
mon = new Day ( "mon", goal );
mon.render();
tue = new Day ( "tue", goal );
tue.render();
wed = new Day ( "wed", goal );
wed.render();
thu = new Day ( "thu", goal );
thu.render();
fri = new Day ( "fri", goal );
fri.render();
sat = new Day ( "sat", goal );
sat.render();
sun = new Day ( "sun", goal );
sun.render();