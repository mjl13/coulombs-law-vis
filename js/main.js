JXG.Options.text.fontSize = 16;
JXG.Options.text.cssStyle = 'font-family: Avenir';
JXG.Options.text.useMathJax = true;
// JXG.Options.axis.ticks.majorHeight = 0;
// JXG.Options.axis.ticks.minorHeight = 0;
JXG.Options.axis.ticks.insertTicks = false;
// JXG.Options.precision = {
//   touch: 30,
//   touchMax: 100,
//   mouse: 1,
//   epsilon: 0.0001,
//   hasPoint: 4
// }


JXG.Options.layer = {
	numlayers: 20, // only important in SVG
	text: 9,
	point: 9,
	glider: 9,
	arc: 8,
	line: 10,
	circle: 6,
	curve: 5,
	turtle: 5,
	polygon: 3,
	sector: 3,
	angle: 3,
	integral: 3,
	axis: 2,
	ticks: 2,
	grid: 1,
	image: 0,
	trace: 0
}



var board = JXG.JSXGraph.initBoard('box', { 
	boundingbox: [-1.5, 5, 5, -1.5],
	keepaspectratio: true,
	grid: false,
	axis: false,
	zoom: {
		factorX:1.025,
		factorY:1.025,
		wheel:true,
		needshift:false,
		eps: 0.1
	},
	pan: {
	  	enabled: true,
	  	needShift: false
 	},
	showZoom: false,
	showNavigation: false,
	showCopyright: false
});

var xaxis = board.create('axis', [[0, 0], [1,0]]);
var yaxis = board.create('axis', [[0, 0], [0,1]]);
xaxis.removeAllTicks();
yaxis.removeAllTicks();


var q = board.create('point', [1,3], {
	name: '\\( q_{(-)} \\)',
	size: 10,
	fillColor: '#716CA3',
	strokeColor: '#716CA3',
	highlightFillColor: '#514E74',
	highlightStrokeColor: '#514E74',
	label: {offset: [5, 22], highlight: false},
	showInfobox: false
	});


var Q = board.create('point', [4,2], {
	name: '\\( Q_{(+)} \\)',
	size: 10,
	fillColor: '#E06A6A',
	strokeColor: '#E06A6A',
	highlightFillColor: '#A35252',
	highlightStrokeColor: '#A35252',
	label: {offset: [15, 0], highlight: false},
	showInfobox: false
});

over = function () {
        if (!this.visProp.fixed) {
            board.containerObj.style.cursor = 'pointer';
        }
    },
out = function () {
        if (!this.visProp.fixed) {
            board.containerObj.style.cursor = 'default';
        }
    };

Q.on('over', over);
Q.on('out', out);
q.on('over', over);
q.on('out', out);

var zero_pt = board.create('point', [0,0], {
	visible: false,
	fixed: true,
});

var r1 = board.create('arrow', [zero_pt, q], {
	name: '\\( \\mathbf{r_1} \\)',
	visible: false,
	withLabel: true,
	label: {position: 'top', highlight: false},
	strokeColor: '#000',
	// strokeOpacity: '0.35',
	highlightStrokeColor: '#000',
	// highlightStrokeOpacity: '0.35',
	lineCap: 'round',
});

var r2 = board.create('arrow', [zero_pt, Q], {
	name: '\\( \\mathbf{r_2} \\)',
	visible: false,
	withLabel: true,
	label: {position: 'bot', highlight: false, offset: [-30, 15]},
	strokeColor: '#000',
	// strokeOpacity: '0.35',
	highlightStrokeColor: '#000',
	// highlightStrokeOpacity: '0.35',
	lineCap: 'round',
});

var r = board.create('segment', [q,Q], {
	name: '\\( r = \|\| \\mathrm{\\mathbf{r_2} - \\mathbf{r_1}} \|\| \\)',
	visible: false,
	withLabel: true,
	strokeColor: '#000',
	// strokeOpacity: '0.75',
	highlightStrokeColor: '#000',
	// highlightStrokeOpacity: '0.75',
	isDraggable: false,
	label: {position: 'bot', offset: [0, 20], highlight: false},
	lineCap: 'round',
	strokeWidth: 1
});

var pt2 = board.create('point', [
	function(){
		return ( q.X() + ( ( Q.X() - q.X() ) / ( 2*r.L() ) ) )
	},
	function(){ 
		return ( q.Y() + ( ( Q.Y() - q.Y() ) / ( 2*r.L() ) ) )
	}],
	{
		visible: false
	}
);


var r_hat = board.create('arrow', [q, pt2], {
	name: '\\( \\mathbf{\\hat{r}} = \\frac{ \\mathrm{\\mathbf{r_2} - \\mathbf{r_1}} }{ \|\| \\mathrm{\\mathbf{r_2} - \\mathbf{r_1}} \|\| } \\)',
	visible: false,
	lineCap: 'round',
	withLabel: true,
	label: {position: 'urt', highlight: false},
	strokeColor: '#000',
	highlightStrokeColor: '#000'
});



// var F = board.create('arrow', [Q, midpt], {
// 	name: '\\( \\mathbf{F} \\)',
// 	withLabel: true,
// 	label: {highlight: false, position: 'top'},
// 	strokeColor: '#000',
// 	highlightStrokeColor: '#000'
// })

// create unit vector in the direction of q-
// scale unit vector by the value of 1/(r^2)

var pt3 = board.create('point', [
	function(){
		// console.log(r.L());
		var x_f = ( Q.X() + ( ( ( q.X() - Q.X() ) / ( r.L() ) ) * ( 1 / r.L() ) ) );
		// console.log(x_f);
		return x_f;
	},
	function(){
		var y_f = ( Q.Y() + ( ( ( q.Y() - Q.Y() ) / ( r.L() ) ) * ( 1 / r.L() ) ) );
		// console.log(y_f);
		return y_f;
	}],
	{
		visible: false
	}
)

var f = board.create('arrow', [Q, pt3], {
	name: '\\( \\mathrm{\\mathbf{F}} \\)',
	visible: true,
	lineCap: 'round',
	withLabel: true,
	label: {position: 'top', offset: [-10, 0], highlight: false},
	strokeColor: '#000',
	highlightStrokeColor: '#000',
	// transitionDuration: 1000
});

var line = board.create('line', [q, Q], {
	visible: false
});


console.log(line.getSlope());
console.log(line.getRise());


$(document).ready(function(){
	$('#r-hat-button').click(function(event){
		r_hat.setAttribute({visible: !r_hat.getAttribute('visible')});
		r1.setAttribute({visible: !r1.getAttribute('visible')});
		r2.setAttribute({visible: !r2.getAttribute('visible')});
		$(this).toggleClass('viewing');
	});

	$('#r-button').click(function(event){
		r.setAttribute({visible: !r.getAttribute('visible')});
		$(this).toggleClass('viewing');
	});

	$('#f-button').click(function(event){
		f.setAttribute({visible: !f.getAttribute('visible')});
		$(this).toggleClass('viewing');
	});
})
















