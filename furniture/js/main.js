
// navigation

$(".navi").mouseenter(function(){
	$(this).children(".navi-sub").css("visibility", "visible").stop().animate({"opacity":0.8}, 500);

});

$(".navi").mouseleave(function(){
	$(this).children(".navi-sub").css({"visibility":"hidden", "opacity":0});
});

$(".navi-icon").mouseenter(function(){
	$(this).find(".navi-tip").css({"opacity":1, "transform":"translateY(0)", "visibility": "visible"});
});

$(".navi-icon").mouseleave(function(){
	$(this).find(".navi-tip").css({"opacity":0, "transform":"translateY(30px)", "visibility": "hidden"});
});

$(".navis").find(".navi-bar").click(function(){
	$(".side-menu").css({"transform":"translateX(0)"});
});
$(".side-menu").find(".menu-exit").click(function(){
	$(".side-menu").css({"transform":"translateX(-100%)"});
});


// scroll event
$(window).scroll(function(){
	var scrl = $(this).scrollTop();
	if(scrl > 300) {$("nav").addClass("navi-scr").removeClass("navis")}	
	else $("nav").removeClass("navi-scr").addClass("navis");
});





//  banner

var banners = [{
	"src" : "../img/cereal/AUGUST-landscape-8-1250x833.jpg"
}, {
	"src" : "../img/cereal/AUGUST-landscape-9-1250x833.jpg"
}, {
	"src" : "../img/cereal/Gabriel-Tan-landscape-2-1250x833.jpg"
}, {
	"src" : "../img/cereal/Matt-and-Faye-landscape-1-1250x833.jpg"
}, {
	"src" : "../img/cereal/Modern-Archive-landscape-2-1250x833.jpg"
}, {
	"src" : "../img/cereal/University-Arms-landscape-13-1455x970.jpg"
}];


var banNow = 0;
var interval;

init();
function init() {
	var html = '';
	for(var i in banners) {
		html = '<li class="ban-img"><img src="'+banners[i].src+'" alt="main image"></li>';
		$(".ban").append(html);
		pager = '';
		if (i == 0) $(".ban-pager").append('<div class="pager-sel mr-2"></div>');
		else $(".ban-pager").append('<div class="pager mr-2"></div>');
	}
}
$(".ban").append($(".ban-img").eq(0).clone());

$(window).resize(function(){
	$(".ban").outerHeight($(".ban-img img").eq(0).outerHeight());
});

$(".bans").imagesLoaded(function(){
	$(window).trigger("resize");
});

$(".ban .ban-img").each(function(i){
	$(this).css({"left": (i*100)+"%"});
})

//banner animation

function banAni() {
	$(".ban-pager > div").addClass("pager").removeClass("pager-sel");
	$(".ban-pager > div").eq(banNow).addClass("pager-sel").removeClass("pager");
	$(".ban").stop().animate({"left": -(banNow*100)+"%"}, 500,
	function(){
		if(banNow == banners.length) {
			$(".ban-pager > div").eq(0).addClass("pager-sel").removeClass("pager");
			$(this).css({"left": 0});
			banNow = 1;
		}
		else banNow++; 
	});
}

interval = setInterval(banAni, 3000);

// event
// $(".bans, .ban, .ban-pager").hover(function(){
// 	clearInterval(interval);}, function(){
// 		clearInterval(interval);
// 		interval = setInterval(banAni, 3000);
// 	});

$(".ban-pager > div").click(function(){
	banNow = $(this).index();
	clearInterval(banAni);
	banAni();
});



// products
var products = [{
	src: "../img/Contour_Chair_d3d1e5a5-1339-4ef9-b3cb-b2424af046ae_600x.png", 
	name: "Contour Chair 1",
	price: "$440.00",
	colors: [
		{color:"grey"},
		{color:"lightblue"}
	]
}, {
	src: "../img/Nuvola_Rossa_Bookshelf_7cb5b419-e80c-4034-aa09-60bb061ca06a_600x.png",
	name: "Nuvola Rossa Bookshelf 2",
	price: "$440.00", 
	colors: [
		{color:"brown"}
	]
}, {
	src: "../img/Orient_Pendant_Light_323f9fab-d952-4caf-b413-2d77e22bede4_600x.png",
	name: "Orient Pendant Light 3",
	price: "$460.00", 
	colors: [
		{color:"brown"}
	]
}, {
	src: "../img/Series_7_Chair_9e1b98b1-54ca-4992-a04b-7e7626c8ed53_600x.png", 
	name: "Series 7 Chair 4",
	price: "$500.00", 
	colors: [
		{color:"brown"},
		{color:"orange"},
		{color:"grey"}
	]
}, {
	src: "../img/Shell_Chair_CH07_8ae0cffc-8a9e-45bd-a8e4-c7d8f63ff9ad_600x.png", 
	name: "Shell Chair 5",
	price: "$480.00", 
	colors: [
		{color:"black"},
		{color:"grey"}
	]
}, {
	src: "../img/The_Chair_aebd6248-413a-4674-ba37-ae9da4a2de22_600x.png", 
	name: "The Chair 6",
	price: "$460.00", 
	colors: [
		{color:"black"}
	]
}, {
	src: "../img/The_Egg_Chair_b691eb11-6dd4-404e-b2d8-c4197acd9591_600x.png", 
	name: "The Egg Chair 7",
	price: "$500.00", 
	colors: [
		{color:"black"},
		{color:"grey"}
	]
}, {
	src: "../img/Tolix_Side_Table_26e3a806-948e-46db-92e6-95b7736d8996_600x.png", 
	name: "Tolix Side Table 8",
	price: "$480.00", 
	colors: [
		{color:"black"}
	]
}];



var now = 0;
var end = products.length -1;
var dir = "L";
var tar;
var cnt;
var slideCnt;
var slideWid;
var arr = [];
var prdItv;

$(window).resize(function(){
	var wid = $(this).width();
	if(wid < 576) cnt = 1;
	else if(wid < 768) cnt = 2;
	else if(wid < 992) cnt = 3;
	else cnt = 4;
	slideCnt = cnt + 2;
	slideWid = (100/cnt).toFixed(4);
	console.log(cnt);
	prdInit();
}).trigger("resize");

function prdInit() {
	$(".product").css({"left": -slideWid+"%"});
	for(var i=0, html=''; i<slideCnt; i++) {
		html += '<ul class="prd" style="flex: ' + slideWid + '% 0 0;">';
		html += '<li class="prd-img">';
		html += '	<img src="" class="w-100">';
		html += '</li>';
		html += '<li class="prd-info">';
		html += '<ul>';
		html += '	<li class="prd-name f-0875">Contour Chair</li>';
		html += '	<li class="prd-price font-weight-bold f-0875">$440.00</li>';
		html += '<li class="prd-color">';
		html += '<div class="color-box my-1">';
		html += '</div>';
		html += '</li>';
		html += '<li class="prd-bt"><button type="button" class="prd-btn btn"><i class="fas fa-shopping-bag mr-3"></i>ADD TO CART</button></li>';
		html += '</ul>';
		html += '</li>';
		html += '<li class="tip-eye tooltip-bt" data-toggle="tooltip" data-placement="left" title="Quick View"><i class="fas fa-eye"></i></li>';
		html += '<li class="tip-heart tooltip-bt" data-toggle="tooltip" data-placement="left" title="You need to login"><i class="far fa-heart"></i></li>';
		html += '<li class="tip-balance tooltip-bt" data-toggle="tooltip" data-placement="left" title="Add to Compare"><i class="fas fa-balance-scale"></i></li>';
		html += '</ul>';
	}
	//console.log(html);
	$(".product").html(html);

	//prd hover event
	$(".prd").mouseenter(function(){
		$(this).find(".prd-info").css({"transform": "translateY(-60%)"});
		$(this).find(".tooltip-bt").css({"visibility": "visible","opacity": 0.8});
	});
	$(".prd").mouseleave(function(){
		$(this).find(".prd-info").css({"transform": "translateY(0%)"});
		$(this).find(".tooltip-bt").css({"visibility": "hidden", "opacity": 0});
	});
	slideInit();
}

function slideInit() {
	if(now == 0) arr[0] = end;
	else arr[0] = now - 1;
	
	for(var i=0; i<=cnt; i++) {
		if(i + now > end) arr[(i+1)] = i + now - end - 1;
		else arr[(i+1)] = now + i;
	}
	console.log(arr);

	for(var i=0; i<slideCnt; i++) {
		$(".prd").eq(i).find("img").attr("src", products[arr[i]].src);
		$(".prd").eq(i).find(".prd-name").html(products[arr[i]].name);
		$(".prd").eq(i).find(".prd-price").html(products[arr[i]].price);
		html = '';
		for(var j in products[arr[i]].colors) {
			html += '<div class="'+products[arr[i]].colors[j].color+'"></div>';
		}
		$(".prd").eq(i).find(".color-box").html(html);
	}

	$(".product").css({"left": -slideWid+"%"});
}

function slideAni() {
	if(dir == "L") tar = -2*slideWid+"%";
	else tar = 0;
	$(".product").stop().animate({"left": tar}, 500, slideInit);
}

//product-pager event
$(".pager-lt").click(function(){
	dir = "L";
	if(now == end) now = 0;
	else now++;
	slideAni();
});
$(".pager-rt").click(function(){
	dir = "R";
	if(now == 0) now = end;
	else now--;
	slideAni();
});


//most-view

for(var i in products) {
html = '<ul class="prd-most my-4">';
html += '<li class="prd-img">';
html += '<img src="'+products[i].src+'" class="w-100">';
html += '</li>';
html += '<li class="prd-info p-3">';
html += '<ul>';
html += '<li class="prd-name f-0875">'+products[i].name+'</li>';
html += '<li class="prd-price font-weight-bold f-0875">'+products[i].price+'</li>';
html += '<li class="prd-color">';
html += '<div class="color-box">';
	for(var j in products[i].colors) {
		html += '<div class="'+products[i].colors[j].color+'"></div>';
	}
html += '</div>';
html += '</li>';
html += '<li class="most-btn"><button type="button" class="most-bt btn"><i class="fas fa-shopping-bag mr-3"></i>ADD TO CART</button></li>';
html += '</ul>';
html += '</li>';
html += '<li class="tip-eye tooltip-bt" data-toggle="tooltip" data-placement="left" title="Quick View"><i class="fas fa-eye"></i></li>';
html += '<li class="tip-heart tooltip-bt" data-toggle="tooltip" data-placement="left" title="You need to login"><i class="far fa-heart"></i></li>';
html += '<li class="tip-balance tooltip-bt" data-toggle="tooltip" data-placement="left" title="Add to Compare"><i class="fas fa-balance-scale"></i></li>';
html += '</ul>';
$(".most-view").append(html);
}

// most-view event 
$(".prd-most").mouseenter(function(){
	$(this).find(".most-bt").css({"opacity": 1});
	$(this).find(".prd-info").css({"transform": "translateY(-80%)"});
	$(this).find(".tooltip-bt").css({"visibility": "visible","opacity": 0.8});
});
$(".prd-most").mouseleave(function(){
	$(this).find(".prd-info").css({"transform": "translateY(0%)"});
	$(this).find(".most-bt").css({"opacity": 0});
	$(this).find(".tooltip-bt").css({"visibility": "hidden", "opacity": 0});
});

//product click event
$(".new").click(function(){
	$(".product").css("display","flex");
	$(".most-view").css("display","none");
	$(".prd-pager").css("display","flex");
	$(".prd-cate").children("li").removeClass("text-body");
	$(".new").addClass("text-body");
});
$(".special").click(function(){
	$(".prd-cate").children("li").removeClass("text-body");
	$(".special").addClass("text-body");
	$(".product").css("display","flex");
	$(".most-view").css("display","none");
	slideInit();
});
$(".best").click(function(){
	$(".prd-cate").children("li").removeClass("text-body");
	$(".best").addClass("text-body");
	$(".product").css("display","flex");
	$(".most-view").css("display","none");
	slideInit();
});
$(".most").click(function(){
	$(".most-view").css("display","flex");
	$(".product").css("display","none");
	$(".prd-pager").css("display","none");
	$(".prd-cate").children("li").removeClass("text-body");
	$(".most").addClass("text-body");
});
$(".featured").click(function(){
	$(".most-view").css("display","flex");
	$(".product").css("display","none");
	$(".prd-cate").children("li").removeClass("text-body");
	$(".featured").addClass("text-body");
});


//WOW 시동
new WOW().init();

//tooltip 시동
$(".tooltip-bt").tooltip();

