$(document).ready(function(e) {   
	console.log('i am ready!');

	var history = ['backGroundBubble'];
	var cursorPosition = 0;
	var navFlag = 0;

	$('.bubble, #backGroundBubble, a').on("click", function() {
		if (!$(this).hasClass('present')) {
			history.length = cursorPosition +1;
			cursorPosition += 1;
			history.push($(this));
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

	$('[level=2]').on("click",function(){
		let id = escapeSelector(($(this).attr('id')));
		$(this).find('.logoSquare').hide();
		$('[level=3]'+'[parent='+id+']').show();
	})

	$('[level=3]').on("click",function(){
		let id = escapeSelector(($(this).attr('id')));
		$(this).find('.ProjectSquare').hide();
		$('[level=4]'+'[parent='+id+']').show();
	})

	$('a').on("click",function(){
		let id = escapeSelector(($(this).attr('href')));
		let hashlessID = escapeHash(id);
		$(id).find('.logoSquare').hide();
		$('[level=3]'+'[parent='+hashlessID+']').show();
	})

	$(window).on("keyup",function(e) {
		let newWidth;
		let newHeight;
		let newRadius;
		let level = parseInt($('.active').attr('level'));
		switch ( e.key) {
        	case "ArrowLeft":
        		if (cursorPosition > 0) {
        			cursorPosition -= 1;
        			window.history.back()
        		}
            	break;
            case "ArrowRight":  
            	if (cursorPosition !== history.length -1) {
            		window.history.forward();
            		cursorPosition += 1;
            	}       	
            	break;
            	// !! data-scale and radius modifications do not work "on the fly" with impressJS. migrate to and use jimpress //
            case "+":            	
            	newWidth = $('.active').width() + 10;
            	newHeight = $('.active').height() + 10;
            	let scale = parseInt($('.active').attr('data-scale')) + 1;
            	$('.active').attr('data-scale', scale);
            	console.log(scale);
            	impress().init();
            	/*$('.active').css({        	
					"height": newHeight,
					"width": newWidth,
    			});*/
            	break;
            case "-":
            	newWidth = $('.active').width() - 10;
            	newHeight = $('.active').height() - 10;
            	$('.active').css({        	
					"height": newHeight,
					"width": newWidth,
    			});
            	break;            	
            case "4":
            	newRadius = parseInt($('.active').attr('radius')) + 10;
            	$('.active').attr('radius',newRadius);
            	console.log('newRadius', newRadius);
            	break;
            case "6":
            	newRadius = parseInt($('.active').attr('radius')) - 10;
            	$('.active').attr('radius',newRadius);
            	console.log('newRadius', newRadius,'level',level);
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
	$('[level=2]').attr("data-scale",10);
	$('[level=3]').attr("data-scale",4);
	$('[level=4]').attr("data-scale",1.5);

	$('[level=1]').attr("radius",20500);	
	$('[level=2]').attr("radius",10000);		        
	$('[level=3]').attr("radius",2700);
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

	distributeTopBubbles(1);
	distributeLevelnBubbles(2)

	impress().init();
});


// Functions
function escapeSelector(s){
	return s.replace( /(:|\.|\[|\])/g, "\\$1" );
}	

function escapeHash(s){
    return s.replace(/\#/g,''); 

}

function distributeTopBubbles(n) {
			let nBubbles = $("[level=" + n +"]");
			let step = (2*Math.PI) / nBubbles.length;
	    	let angle = 0;

			nBubbles.each(function() {				
		        let radius = parseInt($(this).attr('radius'));
		        let x = Math.round(radius * Math.cos(angle)); //- $(this).width()/2);
		        let y = Math.round(radius * Math.sin(angle)); //- $(this).height()/2);

				$(this).attr("data-x",x).attr("data-y",y);		        
		        angle += step;
			});
	}

function distributeLevelnBubbles(n) {
	$("[level=" + (n-1) +"]").each(function() { 
		
		let id = escapeSelector($(this).attr('id'));
		let nBubbles = $('[level='+n+']'+'[parent='+id+']');
		let step = (2*Math.PI) / nBubbles.length;
    	let angle = 0;

		nBubbles.each(function() {
			let radius = parseInt($(this).attr('radius'));
	        let x = Math.round(parseInt($('#'+id).attr('data-x')) + radius * Math.cos(angle)); 
	        let y = Math.round(parseInt($('#'+id).attr('data-y')) + radius * Math.sin(angle)); 

			$(this).attr("data-x",x).attr("data-y",y);		
	        angle += step;
	        distributeLevelnBubbles(n+1);
		});
	 }); 
}

