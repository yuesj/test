$(document).ready(function(){
	
	footer_position();
	
	//当浏览器窗口大小改变时，设置显示内容的高度  
	$(window).resize(function(){
		footer_position();
	});
});	
function footer_position(){
	var winHeight = $(window).height();
	var myHeight = winHeight-65-62-50;
	var mainHeight = $(".main").height();

	if( mainHeight <= myHeight){
		$(".footer").css("position","fixed");
		$(".footer").css("bottom","0");
		$(".main").css("min-height",myHeight+"px");
	}else{
		$(".footer").css("position","static");
		$(".footer").css("margin-top","20px");
	}
}		



var currArrayNum = 0;
var flagArray    = [];
var disableSelectFlag = 0;
/*
  0 - unchecked
  1 - checked
  2 - error checked.
 */
var pngList=["url(../../static/images/examMng/select_nochecked.png) no-repeat",
             "url(../../static/images/examMng/select_checked.png) no-repeat",
			"url(../../static/images/error.png) no-repeat"];
var alphaArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//var htmArray = [];
/*!
   选项选中或者取消选中
   t  -  试题类型
   idx  - 选项index
 */
function check_item_status(t, idx){
	if (disableSelectFlag) return;
	//alert(v);
	if (t != 2){
		flagArray[idx] = 1;
		$("#check_opt"+idx).css("background", pngList[1]);
		$("#opt_background"+idx).css("background-color","#f9f9f9"); //灰色
		$("#opt_background"+idx).css("border","1px solid #66ccff"); //边框加蓝
		for (var i = 0; i < currArrayNum; i++) {
			//alert(pngList[v]);
			if(i != idx){
				flagArray[i] = 0;
				$("#check_opt"+i).css("background", pngList[0]);
				$("#opt_background"+i).css("background-color","#ffffff");
				$("#opt_background"+i).css("border","1px solid #ccc");
			}
		}		
	}else{
		if(flagArray[idx] == 0){
			flagArray[idx] = 1;
			$("#check_opt"+idx).css("background", pngList[1]);
			$("#opt_background"+idx).css("background-color","#f9f9f9"); //灰色
			$("#opt_background"+idx).css("border","1px solid #66ccff"); //边框加蓝
		}else{
			flagArray[idx] = 0;
			$("#check_opt"+idx).css("background", pngList[0]);
			$("#opt_background"+idx).css("background-color","#ffffff"); //白色
			$("#opt_background"+idx).css("border","1px solid #ccc");
		}	
	}
}
/*!
    显示错误的选项信息。
 */
function show_error_flag(flag, idx){
	if (flag == 0) {
		$("#check_opt"+idx).css("background", pngList[2]);
		//$("#opt_background"+idx).css("background-color","#f9f9f9"); //灰色
	}else{
		$("#check_opt"+idx).css("background", pngList[1]);
		//$("#opt_background"+idx).css("background-color","#f9f9f9"); //灰色
	}
	
}
/*!
 *  显示我的选择是的风格
 *  falg  0  - 默认
          1  - 我的选择
	idx   options编号
 */
function show_my_answ(flag, idx){
	if (flag == 0) {
		$("#check_opt"+idx).css("background", pngList[2]);
	}else{
		$("#check_opt"+idx).css("background", pngList[1]);
	}
	$("#opt_background"+idx).css("background-color","#f9f9f9"); //灰色
	$("#opt_background"+idx).css("border","1px solid #66ccff"); //边框加蓝
}

/*!
 *  function: 自动通过输入参数显示options
 *  参数： t  题目类型
           c  选中标记
		   v  内容
    author： 马国俊 arthur ma fdmakk@qq.com
	date:	2016-6-27
 */
function add_options(t, c, v){
	
	var temp = $("<div class=\"radio\"  onclick=\"check_item_status("+t+","+currArrayNum+")\">"
					+"<div id=\"opt_background" +currArrayNum+ "\" class=\"choose\" >"
					+"<div id=\"check_opt" +currArrayNum+ "\" style=\"float:left; width:25px;height:25px;\"></div>"
					+"<p><span id=\"opt_alpha" + currArrayNum + "\" style=\" margin-right:5px\">A.</span>"
					+"<span id=\"opt_data" + currArrayNum  + "\" style=\"margin-left:5px;\" ></span></p>"
					+"</div></div>");
	flagArray[currArrayNum] = 0;
	$("#select-options").append(temp);
	if (c == 0){
		$("#check_opt"+currArrayNum).css("background", pngList[0]);
		$("#opt_background"+currArrayNum).css("background-color","#ffffff");
	} else if (c == 1){
		$("#check_opt"+currArrayNum).css("background", pngList[1]);
		//$("#opt_background"+currArrayNum).css("background-color","#f9f9f9"); //灰色
		//css("border-color","#0080FF")
		flagArray[currArrayNum] = 1;
	} else {
		$("#check_opt"+currArrayNum).css("background", pngList[2]);
		//$("#opt_background"+currArrayNum).css("background-color","#f9f9f9"); //灰色
		flagArray[currArrayNum] = 1;		
	}
	if (v != null && v != "") {
		$("#opt_alpha"+currArrayNum).text(alphaArray[currArrayNum]);
		$("#opt_data"+currArrayNum).text(v);
	}
	
	disableSelectFlag = 0;
	currArrayNum++;
}
/*!
  显示正确答案
  v -  正确答案内容
  flag - 是否隐藏div [none, block]
  */
function add_right_result(v, flag){
	
	var temp = $("<div class=\"answer-box\" style=\"display:"+flag+";padding:5px 0;\">"
				 +"<span class=\"right-line\"></span>"
				 +"<span>正确答案：<b>"+v+"</b></span>"
				 +"</div>");
	
	$("#select-options").append(temp);
	disableSelectFlag = 1;
}

function clear_options() {
	var i = 0;
	for (i=0; i<currArrayNum; i++){
		flagArray[i] = 0;
	}
	currArrayNum = 0;
	$("#select-options").empty();
}