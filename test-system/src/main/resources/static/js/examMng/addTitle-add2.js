$(document).ready(function(){
	//判断当前题目类型
	$(".titletype-jt").click(function(){
		if($("#titletype").css("display") == "none"){
			$(".titletype-jt").css("border","1px solid #66afe9");
			$("#titletype").css("display","block");
		}else{
			$(".titletype-jt").css("border","1px solid #ccc");
			$("#titletype").css("display","none");
			if($(".titletype-jt").text() != "判断题" && $(".titletype-jt").text() != "单项选择题" && $(".titletype-jt").text() != "多项选择题"){
				$(".titletype-jt .validate").css("display","block");
			}else{
				$(".titletype-jt .validate").css("display","none");
			}
		}
	});
	//如果鼠标移出题目类型，则把边框改成默认的灰色
	$(".titletype-jt").mouseout(function(){
		$(".titletype-jt").css("border","1px solid #ccc");
	});
	//点击题目类型，切换对应的试题模版
/*
	//题目类型、题目编号、提干
	$("#tmxh").blur(function(){
		showValideInfo(this);
	});
	$("#tg").blur(function(){
		showValideInfo(this);
	});
	//判断题光标移出验证
	$("#pdt_xx1").blur(function(){
		showValideInfo(this);
	});
	$("#pdt_xx2").blur(function(){
		showValideInfo(this);
	});*/
});
var titleType = 0;
var flagArray = [];
var htmArray = []; 
var currArrayNum = 0;
var pngList=["url(../../static/images/examMng/select_checked.png)",
			"url(../../static/images/examMng/select_nochecked.png)"];
//var pngList=["url(../../images/examMng/select_checked.png)",
//		"url(../../images/examMng/select_nochecked.png)"];	
/****
 * 选择题的增删查该
 */
//填写正确答案，答案只能有一项
//此处，开发过程需要判断并赋值type=“radio”，以此提交表单时，数据库可以保存相应的值

/*

//文本框默认提示文字
function dxTextFocus(v) {
	var obj = document.getElementById("dxxzt_xx"+v);
    textFocus(obj);
	showValideInfo(obj);
}
function dxTextBlur(v) {
	var obj = document.getElementById("dxxzt_xx"+v);
    checkInput(obj);
}
*/
//选项选中或者取消选中
function check_item_status(v){
	//alert(v);
	if (titleType != 2){
		flagArray[v] = 1;
		$("#check_opt"+v).css("background", pngList[0]);
		for (var i = 0; i < currArrayNum; i++) {
			//alert(pngList[v]);
			if(i != v){
				flagArray[i] = 0;
				$("#check_opt"+i).css("background", pngList[1]);
			}
		}		
	}else{
		if(flagArray[v] == 0){
			flagArray[v] = 1;
			$("#check_opt"+v).css("background", pngList[0]);
		}else{
			flagArray[v] = 0;
			$("#check_opt"+v).css("background", pngList[1]);
		}	
	}

}

//选题删除方法
function remove_options(idx){
	htmArray[idx].remove();
	flagArray[idx] = 0;
	currArrayNum--;
	if (idx > 4) {
		var t = idx - 1;
		$("#delBtn"+t).css("display", "block");
	}
}

function remove_addition(){
	//alert(currArrayNum);
	while(currArrayNum > 2){		
		remove_options(currArrayNum-1);
	}
	$("#check_opt"+0).css("background", pngList[1]);flagArray[0] = 0;
	$("#check_opt"+1).css("background", pngList[1]);flagArray[1] = 0;

	var ss = document.getElementById("dxxzt_xx0"); ss.value="正确";
	ss = document.getElementById("dxxzt_xx1"); ss.value = "错误";	
}

function adjust_options_status(t) {
	if (t != 0) { //非判断题处理
		var i =0;
		for (i=0; i < currArrayNum; i++){
			flagArray[i] = 0;
			$("#check_opt"+i).css("background", pngList[1]);
		}
		while (currArrayNum < 4){
			add_options(t,0, "")
		}
	}else{//判断题处理
		remove_addition();
	}
}
function check_select_status(t){
	var i =0;
	var n =0;
	for (i=0; i < currArrayNum; i++){
		if (flagArray[i] == 1) n++;
	}
	if (n == 0) return 1;
	if (t == 2 && n < 2) return 1;
	
	return 0;
}
/*
	func : add_options
	新增试题新增方法。
	author: arthur ma  依据张于瑶已经给出的模型做调整，这样的目的是为了更好的编辑试题
	date  : 2016-6-21
	参数说明： t  -  输入选项类型  0- 判断， 1-单选 2-多选
			   c  -  输入选项是否被checked 0-unchecked 1-checked
			   v  -  输入选项数据  
*/
function add_options(t, c, v){

	var answer_choose_top = $(".answer_choose").css("top").substring(0,$(".answer_choose").css("top").length-2);
	var top_pos = parseInt(answer_choose_top) + 1*currArrayNum + 8;
	
	//answer_choose_top -=70*2; 
	
//	var temp = $("<div id=\"check_opt" +currArrayNum+ "\" class=\"answer_choose\" style=\"top:"+(top_pos)+"px\" onclick=\"check_item_status("+currArrayNum+")\"><input type=\"radio\" name=\"radio1\" style=\"display: none;\"></div>"
//							+"<div class=\"input-group input-group-lg testtype\"><span class=\"input-group-addon\" >题目选项</span>"
//								+"<input id=\"dxxzt_xx" + currArrayNum + "\" type=\"text\" class=\"form-control options\" placeholder=\"请输入题目选项内容\" aria-describedby=\"sizing-addon1\" value=\"\" onblur=\"checkInput(this)\" onFocus=\"textFocus(this)\">"
//								+"<span class=\"validate_input\">选择内容不能为空</span>"
//							+"</div>"
//							+"<div id=\"delBtn"+ currArrayNum +"\" class=\"del\" style=\"top:"+(top_pos)+"px\" onclick=\"remove_options("+currArrayNum+")\"></div>");

//题目选项：8.16 让前面的选中按钮根据根据题目选项变换
							var temp = $(
							"<div class=\"input-group input-group-lg testtype\">"+
								"<div id=\"check_opt" +currArrayNum+ "\" class=\"answer_choose\" style=\"top:"+(top_pos)+"px\" onclick=\"check_item_status("+currArrayNum+")\"><input type=\"radio\" name=\"radio1\" style=\"display: none;\"></div>"
								+"<span class=\"input-group-addon\" >题目选项</span>"
								+"<input id=\"dxxzt_xx" + currArrayNum + "\" type=\"text\" class=\"form-control options\" placeholder=\"请输入题目选项内容\" aria-describedby=\"sizing-addon1\" value=\"\" onblur=\"checkInput(this)\" onFocus=\"textFocus(this)\">"
								+"<span class=\"validate_input\">选择内容不能为空</span>"
								+"<div id=\"delBtn"+ currArrayNum +"\" class=\"del\" style=\"top:"+(top_pos)+"px\" onclick=\"remove_options("+currArrayNum+")\"></div>"
							+"</div>");
//							"<div id=\"delBtn"+ currArrayNum +"\" class=\"del\" style=\"top:"+(top_pos)+"px\" onclick=\"remove_options("+currArrayNum+")\"></div>");
	htmArray[currArrayNum]	 = 	temp;	
	
	flagArray[currArrayNum] = 0;
	
	$("#select-options").append(temp);

	if (t == 0 || currArrayNum <= 3) {
		$("#delBtn"+currArrayNum).css("display", "none");
	}
	else {
		if (currArrayNum > 3) {
			var t = currArrayNum - 1;
			$("#delBtn"+t).css("display", "none");
		}
	}
	if (c == 1){
		$("#check_opt"+currArrayNum).css("background", pngList[0]);
		flagArray[currArrayNum] = 1;
	}
	else {
		$("#check_opt"+currArrayNum).css("background", pngList[1]);
	}

	if (v != null && v != "") {
		var in_text = document.getElementById("dxxzt_xx"+currArrayNum);
		in_text.value = v;
	}
	currArrayNum++;
	//alert(currArrayNum);

}
