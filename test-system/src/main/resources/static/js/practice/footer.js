
$(document).ready(function(){

	footer_position();
	//当浏览器窗口大小改变时，设置显示内容的高度  
	$(window).resize(function(){
		footer_position();
	});
});
function footer_position(){
	var winHeight = $(window).height();
	var myHeight = winHeight-60-82-20;
	//alert(myHeight+"-"+$(".main").height());
	if($(".container").height() <= myHeight){
		$(".footer").css("position","fixed");
		$(".footer").css("bottom","0");
		$(".container").css("min-height",myHeight+"px");
	}else{
		$(".footer").css("position","initial");
	}
}