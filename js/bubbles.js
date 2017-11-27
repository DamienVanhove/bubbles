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

	$('.domaine').on("click",function(event) {
		console.log("5");
		$('[level=3]').children('.logoSquare').show('scale',{ percent: 0 },1000);
		$('[level=4]').hide();
		$('[level=5]').hide();
	})

	$('[level=3]').on("click",function(event) {
		console.log("6");
		$(this).show();
		$(this).find('.logoSquare').hide();
		let id = escapeSelector(($(this).attr('id')));
		let parent = ($(this).attr('parent'));
		$('[level=4]'+'[parent='+id+']').show();
		$('#' + escapeSelector(parent)).find('.logoSquare').hide();
	})

	$('a').on("click",function(event) {
		console.log("7");
		
		let id = escapeSelector(($(this).attr('href')));
		let parent = escapeSelector($(id).attr('parent'));
		let hashlessID = escapeHash(id);

		// navFlag = 1;
		$(id).click();
		event.stopPropagation();

/*
		$(id).find('.logoSquare').hide();

		// cacher le logo, mais aussi le badge du coup!
		console.log($(id).find('.logoSquare'));
		console.log('parent:', parent);

		$('#'+parent).find('.logoSquare').hide();

		// cacher le logo du parent



		$('[level=3]'+'[parent='+hashlessID+']').show();

		history.length = cursorPosition +1;
		history.push($(id));
		cursorPosition += 1;
		$('[level=4]').show();
		*/
	})
/*
	$('h2').on("click",function(event) {
		if ( event.ctrlKey ) {
        	$(this).html(prompt("enter new title"));
    	}
	})

	$('.infoColumn span').on("click",function(event){
		if ( event.ctrlKey ) {
			let content = prompt("enter content");
			if (content) {$(this).html(content);}
    	}
	})

	$('.techColumn').on("click",function(event){
		event.stopPropagation();
		if ( event.ctrlKey ) {
			let content = prompt("Name of new link?");
			let link = prompt("Target for link?");
			if (content && link) {
				$('ul', this).append('<li>well that was easy</li>');
			}
    	}
	})
*/
	$(window).on("keyup",function(e) {
		let newWidth;
		let newHeight;
		let newRadius;
		let destination;
		let nBubbles;
		let parent;
		let level = parseInt($('.active').attr('level'));
		
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
            	let upScale = parseInt($('.active').attr('data-scale')) + 1;
            	$('.active').attr('data-scale', upScale);
            	impress().goto($('.active').attr('id'));

            	break;
            case "-":
            	let downScale = parseInt($('.active').attr('data-scale')) - 1;
            	$('.active').attr('data-scale', downScale);
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

            	level != 0? distributeLevelnBubbles(level +1): distributeBubbles(1);

            	console.log('id',$('.active').attr('id'),'level',level);
            	impress().goto($('.active').attr('id'));
            	break;
            
            case "6":
            	newRadius = parseInt($('.active').attr('radius')) - 100;
            	$('.active').attr('radius',newRadius);
				level != 0? distributeLevelnBubbles(level +1): distributeLevelnBubbles(1);
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
	var companyBadges = 700 + 'px';

	$('.backBubble').attr("data-scale",100);
	$('[level=1]').attr("data-scale",40); 
	$('[level=2]').attr("data-scale",11);
	$('[level=3]').attr("data-scale",3);
	$('[level=4]').attr("data-scale",1);

	$('.backBubble').attr("radius",25000);
	$('[level=1]').attr("radius",25000);	
	$('[level=2]').attr("radius",10500);		        
	$('[level=3]').attr("radius",3500);
	$('[level=4]').attr("radius",900);

	// $('[id='+escapeSelector('3.4')+']').attr("radius",3000);
	// $('[id='+escapeSelector('3.4.1')+']').attr("radius",1000);

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

    $('.link').css({
    	"height": companyBadges,
		"width": companyBadges
    })

   	$('[level=3]').hide();
   	$('[level=4]').hide();

	distributeLevelnBubbles(0);
	impress().init();
});


// Functions
function escapeSelector(s){
	return s.replace( /(:|\.|\[|\])/g, "\\$1" );
}	

function escapeHash(s){
    return s.replace(/\#/g,''); 
}

function distributeLevelnBubbles(n) { // 1
	
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
	        let x = Math.round(parseInt($('#'+id).attr('data-x')) + radius * Math.cos(angle)); 
	        let y = Math.round(parseInt($('#'+id).attr('data-y')) + radius * Math.sin(angle)); 
			$(this).attr("data-x",x).attr("data-y",y);
	        angle += step;
		});

	});
	if (n == 5) {return;}
	distributeLevelnBubbles(n+1);
}

