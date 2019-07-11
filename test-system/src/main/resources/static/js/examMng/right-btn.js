$(document).ready(function(){
	$(document).click(function(){
		var nums = $(".view-content .view-box").length;
		for (var i = 0; i < nums; i++) {
			$(".view-content").children().eq(i).find(".bjbtn").css("display","none");
		}
    });
	$(".view-content .view-box .view-title .rtitle .ico-btn").click(function(event){
		event.stopPropagation();
		var num = $(this).parent().parent().parent().index();
		var nums = $(".view-content .view-box").length;
		
		for (var i = 0; i < nums; i++) {
			if(i == num){
				if($(".view-content").children().eq(num).find(".bjbtn").css("display") == "none"){
					$(".view-content").children().eq(num).find(".bjbtn").css("display","block");
				}else{
					$(".view-content").children().eq(num).find(".bjbtn").css("display","none");
				}
			}else{
				$(".view-content").children().eq(i).find(".bjbtn").css("display","none");
			}
		}
	});
});
