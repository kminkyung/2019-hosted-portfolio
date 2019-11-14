var adsNow = 0; //전역변수. 나올 아이의 index값을 넣어두는 역할

$(".pager span").click(function(){
	adsNow = $(this).index(); //this는 click 당한 span
	adsAni(); // adsAni 실행
});
$(".pager span").eq(0).trigger("click");

function adsAni(){
	$(".pager span").addClass("text-secondary");
	$(".pager span").eq(adsNow).removeClass("text-secondary");

	$(".ads-img").stop().animate({"opacity":0}, 1000);
	$(".ads-img").eq(adsNow).stop().animate({"opacity":1}, 1000);

	var dir = $(".ads-slogan").eq(adsNow).data("dir");
	$(".ads-slogan").stop().animate({"top":"80%", "opacity":0}, 1000);
	$(".ads-slogan").eq(adsNow).css({"top":"40%"});
	
	if(dir == "left") {
		$(".ads-slogan").eq(adsNow).css({"left":"-20%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"left":0, "opacity":1}, 1000);
	}
	else if(dir == "right") {
		$(".ads-slogan").eq(adsNow).css({"right":"-20%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"right":0, "opacity":1}, 1000);
	}
	else {
		$(".ads-slogan").eq(adsNow).css({"top":"-20%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"top":0, "opacity":1}, 1000);
	}

};


 /* 
 변수 adsNow 는 0이다;
.pager>span을 클릭하면 다음 function을 작동시킨다.
	adsNow 는 이것(클릭한 span)의 index를 return한다.
	adsAni를 실행시킨다. 
	
adsAni는 다음과 같다.
	.ads-img에게 투명도가 2초 안에 0이 되는 animate를 준다. (하지만)
	.ads-img의 eq(adsNow 클릭한 span)에게 2초 안에 투명도가 1이 되는 animate를 준다. 
 */


