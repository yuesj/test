//登录框-民警登录和协警登录的选项卡
function init_loginWin(){
	
	//默认第一项的样式
	$(".login-nav").children().eq(0).find("a").css("color","#2cbaf6");
	$(".login-nav").children().eq(0).find("a").css("font-weight","600");
	$(".login-nav").children().eq(0).find("a").css("border-bottom","2px solid #2cbaf6");
	//点击改变样式
	$(".login-nav li").click(function(){		
		var num = $(this).index();
		var nums = $(".login-nav li").length;
		for(var i = 0;i < nums;i++){
			if(i == num){
				$(".login-nav").children().eq(num).find("a").css("color","#2cbaf6");
				$(".login-nav").children().eq(num).find("a").css("font-weight","600");
				$(".login-nav").children().eq(num).find("a").css("border-bottom","2px solid #2cbaf6");
				//$("#login-content"+(num+1)).css("display","block");
			}else{
				$(".login-nav").children().eq(i).find("a").css("color","#666");
				$(".login-nav").children().eq(i).find("a").css("font-weight","normal");
				$(".login-nav").children().eq(i).find("a").css("border-bottom","2px solid #ccc");
				//$("#login-content"+(i+1)).css("display","none");
			}
		}
	})
}

$(document).ready(function(){
	init_loginWin();
	footer_position();
	//当浏览器窗口大小改变时，设置显示内容的高度  
	$(window).resize(function(){
		footer_position();
	});
});	