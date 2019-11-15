//삼항연산자
//조건?참일때:거짓일때
//3>5?"참":"거짓";


// 전역변수 선언
var html = '';

var scoreURL = {
	site: "php",
	cURL: "/score_in.php",
	rURL: "/score_li.php",
	uURL: "/score_up.php",
	dURL: "/score_del.php",
	getURL: function(url) { //{객체} 안에 들어가있는 함수는 method.
		if(url == "C") return this.site + this.cURL;
		else if(url == "R") return this.site + this.rURL;
		else if(url == "U") return this.site + this.uURL;
		else if(url == "D") return this.site + this.dURL;
	}
}
var nowPage = 1;



getData(nowPage);
// 리스트 가져오기 
//get / https://webmir.co.kr/score/score_li.php / page
function getData(page) {
	nowPage = page; //지역변수 page의 값을 전역변수 nowPage에 넣어준다. 우리가 pager를 누르는 순간 page를 다 바꿔주어야하기 때문에.
	$.ajax({ //$<jQuery 객체라는 뜻($=jQuery). ajax는 jQuery 안에 있는 method 
		type: "get",
		url: scoreURL.getURL('R'),
		data: {
			page: page // 위에서 전달받은 page를 보냄
		},
		dataType: "json",
		beforeSend: function() {
			//로딩바를 보여주는 기능. 아래(success)에서 성공했을 경우 로딩바를 없애게 함
		},
		success: function (res) { //total, stnname 값을 res로 받는다.
			console.log(res);
			$(".score-tb").find("tbody").empty(); //tbody를 비우고 시작한다.
			for (var i in res.student) {
				html = '<tr>';
				html += '<td>' + res.student[i].stdname + '</td>'; //html = html+(내용)
				html += '<td>' + res.student[i].kor + '점</td>';
				html += '<td>' + res.student[i].eng + '점</td>';
				html += '<td>' + res.student[i].math + '점</td>';
				html += '<td class="text-center">';
				html += '<button class="btn btn-success mr-2" onclick="upData(this, ' + res.student[i].id + ');">수정</button>';
				html += '<button class="btn btn-danger" onclick="delData(this, ' + res.student[i].id + ');">삭제</button>';
				html += '<button class="btn btn-primary d-none mr-2" onclick="saveData(this, ' + res.student[i].id + ');">저장</button>';
				html += '<button class="btn btn-info d-none" onclick="upCancel(this, ' + res.student[i].id + ');">취소</button>';
				html += '</td>';
				html += '</tr>';
				$(".score-tb").find("tbody").append(html);
			}
			pagerMaker(res.total, page);
		},
		error: function (xhr) {
			alert("통신에 실패했습니다. 관리자에게 문의하세요.");
			// console.log(xhr);
		}
	});
}


// 리스트 수정하기
function upData(bt, id) {
	//여기서 변수 bt는 button tag에 넣은 onclick 에서 delData(this)를 받는다.
	// console.log(bt, $(bt), id);
	var $bt = $(bt);
	var $td = $bt.parent();
	var $tr = $td.parent();
	for (var i = 0, txt = '', type='text'; i < 4; i++) {
		txt = $tr.children("td").eq(i).text();
		if (i > 0) {
			txt = txt.replace("점", ""); //replace: 교체 문자열처리 JS Method
			type = "number";
		}
		html = '<input type="' + type + '" class="form-control" value="' + txt + '">';
		$tr.children("td").eq(i).html(html);
	}
	$td.children(".btn").toggleClass("d-none");
	//toggleClass: class가 있으면 지워주고 없으면 넣어줌
}


// 취소버튼
function upCancel(bt, id) {
	getData(nowPage);
	/*
	아래 코드는 취소를 누르면 수정내용이 일시적으로 반영(저장되지는 않지만)
	그래서 새롭게 page를 불러오는 것으로 변경.
	var $bt = $(bt);
	var $td = $bt.parent();
	var $tr = $td.parent();
	for (var i = 0, txt = ''; i < 4; i++) {
		txt = $tr.find("td").eq(i).find("input").val();
		if (i > 0) txt += "점";
		$tr.children("td").eq(i).html(txt);
	}
	$td.children(".btn").toggleClass("d-none");
	//toggleClass: class가 있으면 지워주고 없으면 넣어줌
	*/
}

//저장하면 id = 0, 수정하면 id = (실제id) 를 보낸다.
// 리스트 저장하기
function saveData(bt, id) {
	var url = scoreURL.getURL('C'); //초기값은 score_in.php 로 설정
	var option = {}; // $.ajax의 data 값을 저장할 객체변수
	var $tr = $(bt).parent().parent();
	var $input = $tr.find("input"); //stdname|kor|eng|math

	var comment = [];
	comment[0] = "학생이름을";
	comment[1] = "올바른 국어 점수를";
	comment[2] = "올바른 영어 점수를";
	comment[3] = "올바른 수학 점수를";

	for (var i = 0; i < $input.length; i++) { //each는 callback 함수이므로 each가 끝나기 전에 ajax가 실행되므로 for문으로 바꿔주었다.
		if(i == 0) { //stdname 인 경우
			if ($input.eq(i).val() == "") {
				alert(comment[i] + "입력해주세요.");
				$input.eq(i).focus();
				return false;
			}
		}
		else { //stdname 이 아닌 경우
			if ($.trim($input.eq(i).val()) == "" || Number($input.eq(i).val()) < 0 || Number($input.eq(i).val()) > 100) {
				alert(comment[i] + "입력하세요.");
				$input.eq(i).focus();
				return false;
			}
		}
	}
	
	option = {
		stdname: $.trim($input.eq(0).val()),
		kor: $input.eq(1).val(),
		eng: $input.eq(2).val(),
		math: $input.eq(3).val()
	};
	//id가 0이면 그냥 초기설정score_li.php 에 보내고(새로저장), 아니면 id값을 넣어서 보낸다.(수정)
	if(id > 0) {
		url = scoreURL.getURL('U'); //score_li.php에서 score_up.php 로 교체
		option.id = id; //id 값을 받아서 option의 id값을 넣어줌.
	}

	$.ajax({
		type: "post",
		url: url,
		data: option,
		dataType: "json",
		success: function (res) {
			if (res.code == 200) {
				$input.val('');
				getData(nowPage);
			}
			else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
		}
	});
}

/*
	var stdname = $.trim($("#stdname").val());
	var kor = Number($("#kor").val());
	var eng = Number($("#eng").val());
	var math = Number($("#math").val());
	if (kor == 0) kor = "0";
	if (eng == 0) eng = "0";
	if (math == 0) math = "0";
	console.log(kor);
	if (stdname == "") {
		alert("학생 이름을 입력해주세요.");
		$("#stdname").focus(); //커서 깜빡깜빡
		return;
	}
	if (kor == "" || kor < 0 || kor > 100) {
		alert("올바른 국어점수를 입력하세요.");
		$("#kor").focus();
		return;
	}
	if (eng == "" || eng < 0 || eng > 100) {
		alert("올바른 영어점수를 입력하세요.");
		$("#eng").focus();
		return;
	}
	if (math == "" || math < 0 || math > 100) {
		alert("올바른 수학점수를 입력하세요.");
		$("#math").focus();
		return;
	}
	$.ajax({
		type: "post",
		url: scoreURL.cURL,
		data: {
			stdname: stdname,
			kor: kor,
			eng: eng,
			math: math
		},
		dataType: "json",
		success: function (res) {
			if (res.code == 200) {
				getData(nowPage);
				$("input").val("");
			} else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
		}
	});
}
*/


// 리스트 삭제하기
function delData(bt, id) {
	if (confirm("정말로 삭제하시겠습니까?")) {
		$.ajax({
			type: "post",
			url: scoreURL.getURL('D'),
			data: {
				id: id
			},
			dataType: "json",
			success: function (res) {
				if (res.code == 200) getData(nowPage);
				else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
			}
		});
	}
}



// 페이저 생성
function pagerMaker(total, page) {
	var div = 5; //세트 당 나올 페이지 수 
	var cnt = Math.ceil(total / div); //전체 페이지 개수
	var stn = 0; //세트 중 시작 페이지
	var edn = 0; //세트 중 마지막 페이지
	var prev = 0; // < 를 클릭시 나타날 페이지
	var next = 0; // > 를 클릭시 나타날 페이지
	var prevShow = false; // true 면 << 활성화 false 면 비활성화 
	var lastShow = false; // true 면 >> 활성화 false 면 비활성화
	var first = 1; // << 첫번째 페이지
	var last = cnt; // >> 마지막 페이지
	var lastIndex = (Math.ceil(cnt / div) - 1); // 마지막 페이지 세트의 index
	var nowIndex = (Math.ceil(page / div) - 1); //현재 페이지 세트 index : 0, 1, 2.. (div가 3일 경우)

	stn = nowIndex * div + 1; // 세트 시작페이지 값 1, 4, 7, 10...(div가 3일 경우)
	if (cnt < stn + div - 1) edn = cnt; // 마지막 세트의 마지막 페이지 값. 
	else edn = stn + div - 1; // 세트의 끝페이지 값 

	//화살표 
	if (nowIndex > 0) {
		prevShow = true;
		prev = stn - 1;
	}
	if (lastIndex > nowIndex) {
		lastShow = true;
		next = edn + 1;
	}

/* 	console.log("stn:" + stn);
	console.log("edn:" + edn);
	console.log("lastIndex:" + lastIndex);
	console.log("nowIndex:" + nowIndex);
	console.log("next:" + next);
 */
	html = '<li class="page-item page-first ' + (prevShow ? "" : "disabled") + '" data-page="' + first + '">';
	html += '<span class="page-link">';
	html += '<i class="fas fa-angle-double-left"></i>';
	html += '</span>';
	html += '</li>';
	html += '<li class="page-item page-prev ' + (prevShow ? "" : "disabled") + '" data-page="' + prev + '">';

	html += '<span class="page-link">';
	html += '<i class="fas fa-angle-left"></i>';
	html += '</span>';
	html += '</li>';
	for (var i = stn; i <= edn; i++) {
		html += '<li class="page-item page-ct ' + (page == i ? "active" : "") + '" data-page="' + i + '">';
		html += '<span class="page-link">' + i + '</span>';
		html += '</li>';
	}
	html += '<li class="page-item page-next ' + (lastShow ? "" : "disabled") + '" data-page="' + next + '">';
	html += '<span class="page-link">';
	html += '<i class="fas fa-angle-right"></i>';
	html += '</span>';
	html += '</li>';
	html += '<li class="page-item page-last ' + (lastShow ? "" : "disabled") + '" data-page="' + last + '">';
	html += '<span class="page-link">';
	html += '<i class="fas fa-angle-double-right"></i>';
	html += '</span>';
	html += '</li>';
	$(".pager").html(html);
	$(".page-item").click(function () {
		if (!$(this).hasClass("disabled")) getData($(this).data("page"));
	});
}

/* 
// 리스트 삭제하기
function deleteMaker() {
	// post / https://webmir.co.kr/score/score_del.php / page
	$(".bt-del").click(function () {
		if(confirm("정말로 삭제하시겠습니까?")) {
			$.ajax({
				type: "post",
				url: scoreURL.dURL,
				data: {
					id: $(this).data("id")
				},
				dataType: "json",
				success: function (res) {
					if (res.code == 200) getData(nowPage);
					else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
				}
			});
		}
	});
}
*/
