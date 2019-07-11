var tmh = 14; //设定时间小时
var tmm = 27; //设定时间分钟
var tms = 20; //设定时间秒
var hn = new Date();
var h = hn.getHours();
var mn = new Date();
var m = mn.getMinutes();
var sn = new Date();
var s = sn.getSeconds();
var cdh = tmh - h;
var cdm = tmm - m;
var cds = tms - s;
var settimeoutid;

function daojishi() {
	$("p.middle-tishi-p").css("display", "none");
	$("div.enter-box").css("display", "block");
	$("#otime").css("display", "block");
	if(cds < 0) {
		cdm = cdm - 1;
		cds = cds + 60
	}
	if(cdm < 0) {
		cdh = cdh - 1;
		cdm = cdm + 60;
	}
	if(cdh == 0 && cdm == 0 && cds == 0) {
		$("#seconds").html("0");
		$("#minutes").html("0");
		$("#hours").html("0");
		$("#otime").html("考试开始，请点击考试通知右侧的“进入考试”按钮参加考试！")
		$("#otime").css("color", "#008000");
		$("#otime")
		$("div.btn-enter").css("background-image", "none")
		$("div.btn-enter").css("background-color", "#FF8000")
		$("div.btn-enter").css("color", "#FFFFFF");
		$("div.btn-enter").css("cursor", "pointer");
		$("div.btn-enter").attr("id", "entertest");
		$("p.middle-tishi-p").css("display", "none");
		clearTimeout(settimeoutid);
		return
	} else {
		cds--;
		if(10 > cds && cds > -1) {
			$("#seconds").html("0" + cds);
		} else if(cds == -1) {
			cdm--;
			cds = 59;
			$("#seconds").html(cds);
		} else {
			$("#seconds").html(cds);
		}
		if(10 > cdm && cdm > -1) {
			$("#minutes").html("0" + cdm);
		} else if(cdm == -1) {
			cdh--;
			cdm = 59;
			$("#minutes").html(cdm);
		} else {
			$("#minutes").html(cdm);
		}
		if(10 > cdh) {
			$("#hours").html("0" + cdh);

		} else {
			$("#hours").html(cdh);
		}
		settimeoutid = setTimeout("daojishi()", 1000)
	}
}
$(document).ready(
	$("#entertest").click(function() {
		location.href = 'item-knows.htm';
	})
)