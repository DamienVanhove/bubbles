
var defaultScreenSizes = [
{"level": "0", "size": 5000 + 'px'},
{"level": "1", "size": 1000 + 'px'},
{"level": "2", "size": 1000 + 'px'},
{"level": "3", "size": 1000 + 'px'},
{"level": "4", "size": 1000 + 'px'},
{"level": "5", "size": 1000 + 'px'}
];

var defaultDataScales = [
{"level": "0", "dataScale": 100},
{"level": "1", "dataScale": 46},
{"level": "2", "dataScale": 11},
{"level": "3", "dataScale": 3},
{"level": "4", "dataScale": 1}
];

var defaultRadius = [
{"level": "0", "radius": 25000},
{"level": "1", "radius": 28000},
{"level": "2", "radius": 15000},
{"level": "3", "radius": 3500},
{"level": "4", "radius": 900}
];

var specificDataScales = {
"children": [
		{"parentId": "1.2.1",	"childrenDataScale": 1.4},
		{"parentId": "1.3",		"childrenDataScale": 3.8},
		{"parentId": "1.4.1",	"childrenDataScale": 1.9},
		{"parentId": "3.1",		"childrenDataScale": 4},
		{"parentId": "3.1.1",	"childrenDataScale": 1},
		{"parentId": "3.1.3",	"childrenDataScale": 0.8},
		{"parentId": "3.2",		"childrenDataScale": 3.5},
		{"parentId": "3.3",		"childrenDataScale": 3.3},
		{"parentId": "3.4",		"childrenDataScale": 3.4},
		{"parentId": "3.4.1",	"childrenDataScale": 0.6},
		{"parentId": "3.4.5",	"childrenDataScale": 0.7},
		{"parentId": "3.5", 	"childrenDataScale": 4},
		{"parentId": "3.5.1", 	"childrenDataScale": 0.9},
		{"parentId": "3.6",		"childrenDataScale": 4}
],
"single": [
		{"id": "1",			"dataScale": 50},
		{"id": "1.2.1",		"dataScale": 5},
		{"id": "1.3.1.1",	"dataScale": 2},
		{"id": "1.3.2.1",	"dataScale": 2},
		{"id": "1.3.3.1",	"dataScale": 2},
		{"id": "1.4.1",		"dataScale": 5},
		{"id": "2", 		"dataScale": 35},
		{"id": "3.4", 		"dataScale": 13},
		{"id": "3.5", 		"dataScale": 10}

]}


var specificRadius = {
"children": [
		{"parentId": "1",		"childrenRadius": 16500},
		{"parentId": "1.2.1",	"childrenRadius": 1500},
		{"parentId": "1.4.1",	"childrenRadius": 1200},
		{"parentId": "1.3",		"childrenRadius": 2700},
		{"parentId": "3.1",		"childrenRadius": 2700},
		{"parentId": "3.1.1",	"childrenRadius": 1200},
		{"parentId": "3.1.3",	"childrenRadius": 1300},
		{"parentId": "3.2",		"childrenRadius": 2900},
		{"parentId": "3.3",		"childrenRadius": 3200},
		{"parentId": "3.4",		"childrenRadius": 4200},
		{"parentId": "3.4.1",	"childrenRadius": 1200},
		{"parentId": "3.4.5",	"childrenRadius": 1100},
		{"parentId": "3.5",		"childrenRadius": 2200},
		{"parentId": "3.5.1",	"childrenRadius": 1000},
		{"parentId": "3.6",		"childrenRadius": 2700},
],
"single": [
		{"id": "1",		"radius": 35800},
		{"id": "2.1", 	"radius": 10000},
		{"id": "2.2", 	"radius": 10000},
		{"id": "3",		"radius": 26300}
]}

$(document).ready(function(e) {   
	console.log('i am ready!');

	var history = [$('#backGroundBubble')];
	var cursorPosition = 0;
	var navFlag = 0;

	$('.bubble, #backGroundBubble').not('.link').on("click", function() {
		console.log('1');
		if (!$(this).hasClass('present')) {
			if (navFlag != 1) {
				history.length = cursorPosition +1;
				history.push($(this));
				cursorPosition += 1;	
			}
			navFlag = 0;
		}
	})

	// When you click on the background: only level one and two bubbles should be visible. The logos of the level 2 bubbles 
	// need to be visible.
	$('.backBubble').on("click",function() {
		console.log('2');
		$('[level=2]').children('.logoSquare').show('scale',{ percent: 0 },1000);
		$('[level=3]').hide();
		$('[level=4]').hide();
	})

	// When you click on a level one bubble. The level 2 bubbles should be visible. 
	// For each Level 2 bubble, the logo should be visible.
	$('[level=1]').on("click",function(){
		console.log('3');
		$('[level=2]').children('.logoSquare').show('scale',{ percent: 0 },1000);
		$('[level=3]').children('.logoSquare').show();
		$('[level=3]').hide();
		$('[level=4]').hide();
	})

	// When you click on a level 2 bubble, all bubbles below should be visible. It's logo should also dissapear.
	$('[level=2]').on("click",function(event) {
		console.log('4');
		let id = escapeSelector(($(this).attr('id')));
		$(this).find('.logoSquare').hide();
		let nBubbles = $('[level=3]'+'[parent='+id+']');
		nBubbles.show();		
		nBubbles.each(function() {
			let id = escapeSelector(($(this).attr('id')));
			$('[level=4]'+'[parent='+id+']').show();	
		})
	})

	$('[level=3]').on("click",function(event) {
		console.log("5");
		$(this).show();
		$(this).find('.logoSquare').hide();
		let id = escapeSelector(($(this).attr('id')));
		let parent = ($(this).attr('parent'));
		$('[level=4]'+'[parent='+id+']').show();
		$('#' + escapeSelector(parent)).find('.logoSquare').hide();
	})

	$('.domaine').on("click",function(event) {
		console.log("6");
		$('[level=3]').children('.logoSquare').show('scale',{ percent: 0 },1000);
		$('[level=4]').hide();
		$('[level=5]').hide();
	})


	$('a').on("click",function(event) {
		console.log("7");		
		let id = escapeSelector(($(this).attr('href')));
		$(id).click();
		event.stopPropagation();
	})

	$(window).on("keyup",function(e) {
		let newWidth;
		let newHeight;
		let newRadius;
		let destination;
		let nBubbles;
		let parent;
		let level = parseFloat($('.active').attr('level'));
		let currentScale = parseFloat($('.active').attr('data-scale'));
		
		switch ( e.key) {
        	case "ArrowLeft":
        		if (cursorPosition > 0) {
        			cursorPosition -= 1;
        			destination = history[cursorPosition];
        			navFlag = 1;
        			console.log("8");
        			$(destination).click();
        		}
            	break;
            case "ArrowRight":  
            	if (cursorPosition !== history.length -1) {
        			cursorPosition += 1;
        			destination = history[cursorPosition];
        			navFlag = 1;
        			console.log("9");
        			$(destination).click();
            	}       	
            	break;

            case "+":      	
            	currentScale += currentScale/10;
            	$('.active').attr('data-scale', currentScale);
            	impress().goto($('.active').attr('id'));
            	break;

            case "-":
            	currentScale -= (currentScale/10);
            	$('.active').attr('data-scale', currentScale);
            	impress().goto($('.active').attr('id'));
            	break;            	

            case "8":
            	parent = escapeSelector($('.active').attr('id'));
            	nBubbles = $('[parent='+parent+']');
				nBubbles.each(function() {
					let childUpScale = parseInt($(this).attr('data-scale')) + 1;
					$(this).attr('data-scale', childUpScale);	
				})
            	impress().goto($('.active').attr('id'));

            	break;
            case "2":
            	parent = escapeSelector($('.active').attr('id'));
            	nBubbles = $('[parent='+parent+']');
				nBubbles.each(function() {
					let childDownScale = parseInt($(this).attr('data-scale')) - 1;
					$(this).attr('data-scale', childDownScale);	
				})
            	impress().goto($('.active').attr('id'));              

            case "4":
            	newRadius = parseInt($('.active').attr('radius')) + 100;
            	$('.active').attr('radius',newRadius);

            	distributeLevelnBubbles(level-1);

            	console.log('id',$('.active').attr('id'),'level',level, 'radius',$('.active').attr('radius'));
            	impress().goto($('.active').attr('id'));
            	break;
            
            case "6":
            	newRadius = parseInt($('.active').attr('radius')) - 100;
            	$('.active').attr('radius',newRadius);
				distributeLevelnBubbles(level-1);
				console.log('id',$('.active').attr('id'),'level',level);
            	impress().goto($('.active').attr('id'));
            	break;
        break;
        }
    });

});

document.addEventListener("DOMContentLoaded", function(event) {

	console.log("DOM fully loaded and parsed");
	var companyBadges = 1000 + 'px';

    $('.link').css({
    	"height": companyBadges,
		"width": companyBadges
    })

   	$('[level=3]').hide();
   	$('[level=4]').hide();

   	applyBubbleStyle();
	distributeLevelnBubbles(0);
	impress().init();
});


// Functions
function distributeLevelnBubbles(n) { 
	$("[level=" + n +"]").each(function() { 
		let id = escapeSelector($(this).attr('id'));
		let children = $('[level='+(n+1)+']'+'[parent='+id+']');
		let step = (2*Math.PI) / children.length;
    	let angle = 0;

    	if ((n == 3) && $(this).hasClass('technology')) {
			step = step/2;
			angle = parseInt($(this).attr("data-rotate")) * (Math.PI/180) + step/2;
		}

		children.each(function() {
			let radius = parseInt($(this).attr('radius'));
			((children.length == 1) && ($(this).hasClass('entreprise'))) ? radius = 0 : null;
	        let x = Math.round(parseInt($('#'+id).attr('data-x')) + radius * Math.cos(angle)); 
	        let y = Math.round(parseInt($('#'+id).attr('data-y')) + radius * Math.sin(angle)); 
			$(this).attr("data-x",x).attr("data-y",y);
	        angle += step;
		});

	});
	if (n == 5) {return;}
	distributeLevelnBubbles(n+1);
}

function applyBubbleStyle() {
	// On screen size when bubble is clicked on
	defaultScreenSizes.forEach(function(e) {
		$('[level='+e.level+']').css({        	
			"height": e.size,
			"width": e.size
    	});
	})

	// the size of the bubble when it is not active
	defaultDataScales.forEach(function(e) {
		$('[level='+e.level+']').attr("data-scale",e.dataScale);		
	})	

	// distance of bubble % center
	defaultRadius.forEach(function(e) {
		$('[level='+e.level+']').attr("radius",e.radius);		
	})	

	specificDataScales.children.forEach(function(e) {
		$('[parent='+escapeSelector(e.parentId)+']').attr("data-scale",e.childrenDataScale);	
	})

	specificDataScales.single.forEach(function(e) {
		$(jq(e.id)).attr("data-scale",e.dataScale);
	})

	specificRadius.children.forEach(function(e){
		$('[parent='+escapeSelector(e.parentId)+']').attr("radius",e.childrenRadius);	
	})

	specificRadius.single.forEach(function(e){
		$(jq(e.id)).attr("radius",e.radius);	
	})

}

function escapeSelector(s){
	return s.replace( /(:|\.|\[|\])/g, "\\$1" );
}	

function escapeHash(s){
    return s.replace(/\#/g,''); 
}

function jq( myid ) {
    return "#" + myid.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
}