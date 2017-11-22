$(document).ready(function(e) {   
	console.log('i am ready!');

	var history = [$('#backGroundBubble')];
	var cursorPosition = 0;
	var navFlag = 0;

	$('.bubble, #backGroundBubble').on("click", function() {
		if (!$(this).hasClass('present')) {
			if (navFlag != 1) {
				history.length = cursorPosition +1;
				history.push($(this));
				cursorPosition += 1;	
			}
			navFlag = 0;
		}
	})

	$('.backBubble').on("click",function(){
		$('[level=2]').children('.logoSquare').show('scale',{ percent: 0 },1000);
		$('[level=3]').hide();
		$('[level=4]').hide();
	})

	$('[level=1]').on("click",function(){
		$('[level=2]').children('.logoSquare').show('scale',{ percent: 0 },1000);
		$('[level=3]').hide();
		$('[level=4]').hide();
	})

	$('[level=2]').on("click",function(event){
		let id = escapeSelector(($(this).attr('id')));
		$(this).find('.logoSquare').hide();
		$('[level=3]'+'[parent='+id+']').show();
	})

	$('[level=3]').on("click",function(event){
		let id = escapeSelector(($(this).attr('id')));
		let parent = ($(this).attr('parent'));
		$(this).show();
		$('#' + escapeSelector(parent)).find('.logoSquare').hide();
	})

	$('a').on("click",function(){
		let id = escapeSelector(($(this).attr('href')));
		let hashlessID = escapeHash(id);
		$(id).find('.logoSquare').hide();
		$('[level=3]'+'[parent='+hashlessID+']').show();
		history.length = cursorPosition +1;
		history.push($(id));
		cursorPosition += 1;
	})

	$('.projectTitleSpan').on("click",function(event){
		if ( event.ctrlKey ) {
        	$(this).html(prompt("enter new title"));
    	}
	})

	$('.infoCollumn span').on("click",function(event){
		if ( event.ctrlKey ) {
			let content = prompt("enter content");
			if (content) {$(this).html(content);}
    	}
	})

	$('.techCollumn').on("click",function(event){
		event.stopPropagation();
		if ( event.ctrlKey ) {
			let content = prompt("Name of new link?");
			let link = prompt("Target for link?");
			if (content && link) {
				$('ul', this).append('<li>well that was easy</li>');
			}
    	}
	})

	$(window).on("keyup",function(e) {
		let newWidth;
		let newHeight;
		let newRadius;
		let destination;
		let level = parseInt($('.active').attr('level'));
		
		switch ( e.key) {
        	case "ArrowLeft":
        		if (cursorPosition > 0) {
        			cursorPosition -= 1;
        			destination = history[cursorPosition];
        			navFlag = 1;
        			$(destination).click();
        		}
            	break;
            case "ArrowRight":  
            	if (cursorPosition !== history.length -1) {
        			cursorPosition += 1;
        			destination = history[cursorPosition];
        			navFlag = 1;
        			$(destination).click();
            	}       	
            	break;

            case "+":            	
            	let upScale = parseInt($('.active').attr('data-scale')) + 1;
            	$('.active').attr('data-scale', upScale);
            	impress().goto($('.active').attr('id'));

            	break;
            case "-":
            	let downScale = parseInt($('.active').attr('data-scale')) - 1;
            	$('.active').attr('data-scale', downScale);
            	impress().goto($('.active').attr('id'));
            	break;            	
            

            case "4":
            	newRadius = parseInt($('.active').attr('radius')) + 100;
            	$('.active').attr('radius',newRadius);

            	level != 0? distributeLevelnBubbles(level +1): distributeBubbles(1);

            	console.log('id',$('.active').attr('id'),'level',level);
            	impress().goto($('.active').attr('id'));
            	break;
            

            case "6":
            	newRadius = parseInt($('.active').attr('radius')) - 100;
            	$('.active').attr('radius',newRadius);
				level != 0? distributeLevelnBubbles(level +1): distributeBubbles(1);
				console.log('id',$('.active').attr('id'),'level',level);
            	impress().goto($('.active').attr('id'));
            	break;
        break;
        }
    });

});

document.addEventListener("DOMContentLoaded", function(event) {

	console.log("DOM fully loaded and parsed");

	var back = 5000 + 'px';
	var lev1 = 1000 + 'px';
	var lev2 = 1000 + 'px';
	var lev3 = 1000 + 'px';
	var lev4 = 1000 + 'px';

	$('.backBubble').attr("data-scale",85);
	$('[level=1]').attr("data-scale",33); 
	$('[level=2]').attr("data-scale",9);
	$('[level=3]').attr("data-scale",3);
	$('[level=4]').attr("data-scale",1);

	$('.backBubble').attr("radius",20500);
	$('[level=1]').attr("radius",10000);	
	$('[level=2]').attr("radius",2700);		        
	$('[level=3]').attr("radius",8000);
	$('[level=4]').attr("radius",1000);

	$('.backBubble').css({        	
		"height": back,
		"width": back
    });

	$('[level=1]').css({        	
		"height": lev1,
		"width": lev1
    });

	$('[level=2]').css({        	
		"height": lev2,
		"width": lev2
    });

    $('[level=3]').css({        	
		"height": lev3,
		"width": lev3
    });

    $('[level=4]').css({        	
		"height": lev4,
		"width": lev4
    });

   	$('[level=3]').hide();
   	$('[level=4]').hide();

	distributeBubbles(1);
	// distributeLevelnBubbles(2)

	impress().init();
});


// Functions
function escapeSelector(s){
	return s.replace( /(:|\.|\[|\])/g, "\\$1" );
}	

function escapeHash(s){
    return s.replace(/\#/g,''); 

}

function distributeBubbles(n) {
			let nBubbles = $("[level=" + n +"]");
			let step = (2*Math.PI) / nBubbles.length;
	    	let angle = 0;
	    	let radius = parseInt($('.backBubble').attr('radius'));

			nBubbles.each(function() {				
		        let x = Math.round(radius * Math.cos(angle)); //- $(this).width()/2);
		        let y = Math.round(radius * Math.sin(angle)); //- $(this).height()/2);

				$(this).attr("data-x",x).attr("data-y",y);		        
		        angle += step;
			});
			distributeLevelnBubbles(n+1);
	}

function distributeLevelnBubbles(n) {
	$("[level=" + (n-1) +"]").each(function() { 
		
		let id = escapeSelector($(this).attr('id'));
		let nBubbles = $('[level='+n+']'+'[parent='+id+']');
		let step = (2*Math.PI) / nBubbles.length;
    	let angle = 0;
    	let that = this;

		nBubbles.each(function() {
			let radius = parseInt($(that).attr('radius')); // prendre celui du parent
	        let x = Math.round(parseInt($('#'+id).attr('data-x')) + radius * Math.cos(angle)); 
	        let y = Math.round(parseInt($('#'+id).attr('data-y')) + radius * Math.sin(angle)); 

			$(this).attr("data-x",x).attr("data-y",y);		
	        angle += step;
	        distributeLevelnBubbles(n+1);
		});
	 }); 
}

