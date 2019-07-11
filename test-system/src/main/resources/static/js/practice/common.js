//文本框默认提示文字
function textFocus(el) {
    if (el.defaultValue == el.value) { el.value = ''; el.style.color = '#333'; }
}
function textBlur(el) {
    if (el.value == '') { el.value = el.defaultValue; el.style.color = '#999'; }
}

	
$(document).ready(function(){

	footer_position();
	
	//当浏览器窗口大小改变时，设置显示内容的高度  
	$(window).resize(function(){
		footer_position();
	});
});	
function footer_position(){
	var winHeight = $(window).height();
	var myHeight = winHeight-60-82-30;
	var mainHeight = $(".main").height();
	//alert(myHeight+"-"+$(".main").height());
	if( mainHeight <= myHeight){
		$(".footer").css("position","fixed");
		$(".footer").css("bottom","0");
		$(".main").css("min-height",myHeight+"px");
	}else{
		$(".footer").css("position","initial");
		$(".footer").css("margin-top","15px");
	}
}