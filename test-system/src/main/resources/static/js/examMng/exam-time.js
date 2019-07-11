/*计时器*/
var timeIndex ;
var times;

$(document).ready(function() {
	timeIndex = lastTime;
	setTime();
	times = setInterval(setTime, 1000); // 每隔1秒执行函数
});
function setTime() {
	/*var t = parseInt($.cookie('timeIndex'));
	var tt = $.cookie('timeIndex');
	if (tt != null && tt != "NaN" && t != 0) {
		timeIndex = parseInt($.cookie('timeIndex'));
	}*/

	var hour = parseInt(timeIndex / 3600); // 计算时
	var minutes = parseInt((timeIndex % 3600) / 60); // 计算分
	var seconds = parseInt(timeIndex % 60); // 计算秒
	hour = hour < 10 ? "0" + hour : hour;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	$(".showTime").val(hour + ":" + minutes + ":" + seconds);
	if (0 == hour && minutes == 0 && seconds ==0) {// 考试结束
		clearInterval(times);
		submitExam();
		return;
	}
	timeIndex--;
}
