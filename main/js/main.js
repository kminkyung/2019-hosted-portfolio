// Global
$(document).ready(function(){
	$(".navi").eq(1).css({"top":"-200%"}, 500);
	$(".navi").eq(2).css({"top":"-200%"}, 500);
	textSize();
})

/* NAVIGATION */
// Portfolio
$(".portfolio").off("click").click(function(){
	// var fontSize = $(this).next().css("font-size");
	// console.log(fontSize);
	$(window).scrollTop(0);
	$("body").css({"overflow":"initial"});
	$(".navi").eq(0).stop().animate({"height":"78px"}, 500);
	$(this).stop().animate({"font-size":"2.25vw"}, 500);
	$(".navi").eq(1).stop().animate({"top":"100%"}, 500);
	$(".navi").eq(2).stop().animate({"top":"100%"}, 500);
	$(this).parent().children(".left").animate({"left":0}, 500);
	$(this).parent().children(".right").animate({"right":0}, 500, function(){
		$("nav").css({"height":"78px", "overflow":"hidden"});
		$(window).trigger("resize");
	});
	$(".portfolio-page").css("display","block");
	$(".about-page").css("display","none");
	$(".work-page").css("display","none");
	$("footer").css("display","block");
});
// Portfolio - Menu
$(".navi-pf").children(".right").off("click").click(function(){
	$("body").css({"overflow":"hidden"});
	$("nav").css("height","100%");
	$(".menu-item").stop().animate({"font-size":"17vw"}, 500);
	$(".navi").eq(0).stop().animate({"height":"34%"}, 500);
	$(".navi").eq(1).stop().animate({"top":"-2px"}, 500);
	$(".navi").eq(2).stop().animate({"top":"-4px"}, 500);
	$(this).parent().children(".left").animate({"left":"-100%"}, 500);
	$(this).parent().children(".right").animate({"right":"-100%"}, 500);
});

// About
$(".about").off("click").click(function(){
	$(window).scrollTop(0);
	// var aboutHeight = $(".about").css("height").replace("px", "");
	$("body").css({"overflow":"initial"});
	$(".navi").eq(0).stop().animate({"top":"-300%"}, 500)
	$(".navi").eq(1).stop().animate({"top":"-34%", "height":"78px"}, 500);
	$(".navi").eq(2).stop().animate({"top":"1000px"}, 500);
	$(".about").stop().animate({"font-size":"2.25vw"}, 500);
	$(".about-page").css({"display":"block", "z-index":"999"});
	$(this).parent().children(".left").animate({"left":0}, 500);
	$(this).parent().children(".right").animate({"right":0}, 500, function(){
		$("nav").css({"height":"78px", "overflow":"hidden"});
		$(".about-wrap .about-cont").stop().animate({"opacity":1, "top":0}, 400, function(){
			$(".about-wrap .contact").stop().animate({"opacity":1, "top":0}, 400);
			$(window).trigger("resize");
		});
	});
	$(".portfolio-page").css("display","none");
	$(".work-page").css("display","none");
	$("footer").css("display","none");
});
// About - Menu
$(".navi-ab").children(".right").off("click").click(function(){
	$("body").css({"overflow":"hidden"});
	$("nav").css("height","100%");
	$(".navi").eq(0).stop().animate({"top": 0}, 500);
	$(".navi").eq(1).stop().animate({"top": "-2px", "height":"34%"}, 500);
	$(".navi").eq(2).stop().animate({"top":"-4px"}, 500);
	$(".menu-item").stop().animate({"font-size":"17vw"}, 500);
	$(this).parent().children(".left").animate({"left":"-100%"}, 500);
	$(this).parent().children(".right").animate({"right":"-100%"}, 500);
});

// Work
$(".work").off("click").click(function(){
	$(window).scrollTop(0);
	$("body").css({"overflow":"initial"});
	$(".navi").eq(0).stop().animate({"top":"-300%"}, 500)
	$(".navi").eq(1).stop().animate({"top":"-170%"}, 500);
	$(".navi").eq(2).stop().animate({"top": "-68%", "height":"78px"}, 500);
	$(".work").stop().animate({"font-size":"2.25vw"}, 500);
	$(this).parent().children(".left").animate({"left":0}, 500);
	$(this).parent().children(".right").animate({"right":0}, 500, function(){
		$("nav").css({"height":"78px", "overflow":"hidden"});
		$(window).trigger("resize");
	});
	$(".about-page").css("display","none");
	$(".portfolio-page").css("display","none");
	$(".work-page").css("display","block");
	$("footer").css("display","block");
});
// Work - Menu
$(".navi-wk").children(".right").off("click").click(function(){
	$("body").css({"overflow":"hidden"});
	$("nav").css("height", "100%");
	$(".navi").eq(0).stop().animate({"top": 0}, 500);
	$(".navi").eq(1).stop().animate({"top": "-2px"}, 500);
	$(".navi").eq(2).stop().animate({"top":"-4px", "height":"34%"}, 500);
	$(".menu-item").stop().animate({"font-size":"17vw"}, 500);
	$(this).parent().children(".left").animate({"left":"-100%"}, 500);
	$(this).parent().children(".right").animate({"right":"-100%"}, 500);
});
// Work - hover 
$(".rows").mouseenter(function(){
	$(this).find(".work-desc").css("display","block");
});
$(".rows").mouseleave(function(){
	$(this).find(".work-desc").css("display","none");
});

/* SCROLL EVENT */
$(window).scroll(function(){
	var scTop = $(this).scrollTop();
	var width = $(this).outerWidth();
	if(width > 996) {
		if(scTop < 1000) {
			$(".portfolio-main").css({"background-color":"#ffffff"});
			$(".portfolio-main").eq(1).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);
			$(".portfolio-main").eq(0).find(".caption").stop().animate({"opacity":1, "bottom":"100px"}, 300);
		}
		else if(scTop < 2000) {
			$(".portfolio-main").css({"background-color":"#e0e1e1"});
			$(".portfolio-main").eq(0).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);		
			$(".portfolio-main").eq(2).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);
			$(".portfolio-main").eq(1).find(".caption").stop().animate({"opacity":1, "bottom":"100px"}, 300);
		}
		else if(scTop < 3000) {
			$(".portfolio-main").css({"background-color":"#ffb597"});
			$(".portfolio-main").eq(0).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);		
			$(".portfolio-main").eq(1).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);		
			$(".portfolio-main").eq(3).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);		
			$(".portfolio-main").eq(2).find(".caption").stop().animate({"opacity":1, "bottom":"100px"}, 300);
		}
		else if(scTop < 4000) {
			$(".portfolio-main").css({"background-color":"#cbffcb"});
			$(".portfolio-main").eq(2).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 500);	
			$(".portfolio-main").eq(4).find(".caption").stop().animate({"opacity":0, "bottom":"100px"}, 500);
			$(".portfolio-main").eq(3).find(".caption").stop().animate({"opacity":1, "bottom":"100px"}, 500);
		}
		else if(scTop < 5000) {
			$(".portfolio-main").css({"background-color":"#ffb6c1"});
			$(".portfolio-main").eq(3).find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);	
			$(".portfolio-main").eq(4).find(".caption").stop().animate({"opacity":1, "bottom":"100px"}, 300);
		//  console.log(scTop);
			}
		else if(scTop < 6000) {
			$(".portfolio-main").css({"background-color":"#dbdbf6"});
			$(".portfolio-main").find(".caption").stop().animate({"opacity":0, "bottom":"-100px"}, 300);	
		}
	}
	else {
		$(".caption").css({"opacity": 1});
	}
});

// RESIZE EVENT
$(window).resize(textSize);

function textSize() {
		var navHeight = $("nav").css("height");
		var width = $(this).outerWidth();
		$(".caption").css({"opacity": 0});
		// console.log(navHeight);
		if(navHeight == "78px") {
			if(width >= 997) {
				$(".menu-item").stop().animate({"font-size": "2.25vw"}, 500);
			}
			else if(width <= 996 && width > 768) {
				$(".menu-item").stop().animate({"font-size": "3vw"}, 500);
			}
			else if(width <= 768) {
				$(".menu-item").stop().animate({"font-size": "4vw"}, 500);
			}
		}
		// console.log(width);
};


// 	var width = $(this).outerWidth();
// 	// switch(width) {
// 	// 	case width >= 997 :
// 	// 		$(".portfolio").css({"font-size": "2.25vw"});
// 	// 		break;
// 	// 	case width <= 996 :
// 	// 		$(".portfolio").css({"font-size": "3vw"});
// 	// 		break;
// 	// 	case width <= 768 :
// 	// 		$(".portfolio").css({"font-size": "4vw"});
// 	// 		break;
// 	// }