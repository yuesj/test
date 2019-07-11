
$(document).ready(function(){
	$(".right-message div").mouseover(function(){
		var num = $(this).index();
		var nums = $(".right-message div").length;
		for (var i = 0; i < nums; i++) {
			if(i > 1){
				if(i == num){
					$(".right-message").children().eq(num).css("border","1px solid #66ccff");
					$(".right-message").children().eq(num).css("background-color","#f5f5f5");
					$(".right-message").children().eq(num).find(".message-exam-over-bianji").css("display","block");
					$(".right-message").children().eq(num).children().eq(1).css("display","none");
				}else{
					$(".right-message").children().eq(i).css("border","1px solid #ccc");
					$(".right-message").children().eq(i).css("background-color","#fff");
					$(".right-message").children().eq(i).find(".message-exam-over-bianji").css("display","none");
					$(".right-message").children().eq(i).children().eq(1).css("display","block");
				}
			}
		}
	});
	$(".right-message div").mouseout(function(){
		var nums = $(".right-message div").length;
		for (var i = 0; i < nums; i++) {
			if(i > 1){
				$(".right-message").children().eq(i).css("border","1px solid #ccc");
				$(".right-message").children().eq(i).css("background-color","#fff");
				$(".right-message").children().eq(i).find(".message-exam-over-bianji").css("display","none");
				$(".right-message").children().eq(i).children().eq(1).css("display","block");
			}
		}
	});
});