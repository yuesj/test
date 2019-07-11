var paddadd=11;
var pad;
var thisobj
var sid
$(document).ready(function(){
	$("#push-task").find(".bdr-tab").mousemove(function(){
		$(this).css("border-color","#66CCFF");
		$(this).css("background-color","#F4F4F4");
	})
	$("#push-task").find(".bdr-tab").mouseleave(function(){
		$(this).css("border-color","#CCCCCC");
		$(this).css("background-color","#FFFFFF");
	})
	//模拟checkbox效果
	$(".freebtn").click(function(){
		clearTimeout(sid);
		thisobj=$(this)
		$(this).parent().find(".bigbox").css("padding","11px")
		paddadd=11.0;
		pad=paddadd+"px";
		dodo();
	})
	$("#edit-task").click(function(){
		$("#push-practice").addClass("dpynone");
		$("#taskmanag").removeClass("dpynone");
		$(this).parent().find("p").removeClass("dpynone");
		$(this).addClass("dpynone");
	})
	$("#edit-task1").click(function(){
		$("#push-practice").removeClass("dpynone");
		$("#taskmanag").addClass("dpynone");
		$(this).addClass("dpynone");
		$("#edit-task").removeClass("dpynone");
	})
	
	$(".hoverin").mouseover(function(){
	$(this).css("color","#999999")
	})
	$(".hoverout").mouseleave(function(){
	$(this).css("color","#ffffff")
	})
	$(".hh").mouseover(function(){
	$(this).css("color","#4479AE")
	$(this).css("background-color","#BBBBBB")
	})
	$(".hh").mouseleave(function(){
	$(this).css("color","#333333")
	$(this).css("background-color","#F4F4F4")
	})

})
//定时器方法  通过减少父元素的padding属性来达到增大 模拟checkbox动画效果
function dodo(){
		paddadd-=0.5;
		pad=paddadd+"px";
		thisobj.find(".bigbox").css("padding",pad);
		sid = setTimeout("dodo()",15)
		if(paddadd==2){
			clearTimeout(sid);
			return
		}
		}

