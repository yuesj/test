var flagArray = [];
function getSelectedOption(v) {
	flagArray = v;
}
/****
 * 多项选择题的增删查该
 * 方法具体功能请参照单项选择题文件addTitle-add2.js
 */
function check_item_dxxzts(value){
	if($("#dxxzts #xx").children().eq(value*3).css("background-image").indexOf("select_nochecked.png") != -1){
		flagArray.push(value);
		$("#dxxzts #xx").children().eq(value*3).css("background","url(../../static/images/examMng/select_checked.png)");
	}else{
		$("#dxxzts #xx").children().eq(value*3).css("background","url(../../static/images/examMng/select_nochecked.png)");
	}
}
function dxxzts_blur(value){
	if($("#dxxzts_xx"+value).val() == "" || $("#dxxzts_xx"+value).val() == null){
		$("#dxxzts #xx").children().eq(value*3+1).children().eq(2).css("display","block");
	}else{
		$("#dxxzts #xx").children().eq(value*3+1).children().eq(2).css("display","none");
	}
}

var initnum = []; 
function dxxzts_del(value){
	var nums_all = [];
	var nums = $("#dxxzts #xx div").length;
	for (var i = 0; i < nums; i++) {
		if(i%3 == 0){
			var temp_html = "<div class=\"input-group input-group-lg testtype\">"
								+"<span class=\"input-group-addon\" id=\"sizing-addon1\">题目选项</span>"
								+"<input id=\"dxxzts_xx"+i/3+"\" type=\"text\" class=\"form-control options\" placeholder=\"请输入题目选项内容\" aria-describedby=\"sizing-addon1\" value=\""+$("#dxxzts_xx"+i/3).val()+"\" onblur=\"dxxzts_blur("+i/3+")\">"
								+"<span class=\"validate_input\">选项内容不能为空</span>"
							+"</div>";
			var tag_array = [];
			
			tag_array.push($("#dxxzts #xx").children().eq(i).prop('outerHTML'));
			tag_array.push(temp_html);
			tag_array.push($("#dxxzts #xx").children().eq(i+2).prop('outerHTML'));
			nums_all.push(tag_array);
		}
	}
	
	nums_all.splice(value,1);
	
	var temp = "";
	var nums = nums_all.length;
	var answer_choose_top = $(".answer_choose").css("top").substring(0,$(".answer_choose").css("top").length-2);
	for (var i = 0; i < nums; i++) {
		for (var j = 0; j < 3; j++) {
			if(i>=value){
				if(j == 0){
					temp += "<div class=\"answer_choose\" style=\"top:"+(parseInt(answer_choose_top)+70*i)+"px\" onclick=\"check_item_dxxzts("+i+")\"><input type=\"radio\" name=\"radio1\" style=\"display: none;\"></div>";
				}else if(j == 2){
					temp += "<div class=\"del\" style=\"top:"+(parseInt(answer_choose_top)+70*i)+"px\" onclick=\"dxxzts_del("+i+")\"><input type=\"radio\" name=\"radio1\" style=\"display: none;\"></div>";
				}else{
					temp += nums_all[i][j].replace("id=\"dxxzts_xx"+(parseInt(i)+1)+"\"", "id=\"dxxzts_xx"+i+"\"").replace("onblur=\"dxxzts_blur("+(parseInt(i)+1)+")\"", "onblur=\"dxxzts_blur("+i+")\"");;
				}
			}else{
				temp += nums_all[i][j];
			}
		}
	}
	
	$("#dxxzts #xx").html(temp);
}
function dxxzts_add(){
	getInitnum_dxxzts();
	var answer_choose_top = $(".answer_choose").css("top").substring(0,$(".answer_choose").css("top").length-2);
	initnum.push("<div class=\"answer_choose\" style=\"top:"+(parseInt(answer_choose_top)+70*initnum.length)+"px\" onclick=\"check_item_dxxzts("+initnum.length+")\"><input type=\"radio\" name=\"radio1\" style=\"display: none;\"></div>"
							+"<div class=\"input-group input-group-lg testtype\">"
								+"<span class=\"input-group-addon\" id=\"sizing-addon1\">题目选项</span>"
								+"<input id=\"dxxzts_xx"+initnum.length+"\" type=\"text\" class=\"form-control options\" placeholder=\"请输入题目选项内容\" aria-describedby=\"sizing-addon1\" value=\"\" onblur=\"dxxzts_blur("+initnum.length+")\">"
								+"<span class=\"validate_input\">选项内容不能为空</span>"
							+"</div>"
							+"<div class=\"del\" style=\"top:"+(parseInt(answer_choose_top)+70*initnum.length)+"px\" onclick=\"dxxzts_del("+initnum.length+")\"><input type=\"radio\" name=\"radio1\" style=\"display: none;\"></div>");
							
	var temp = "";
	for (var i = 0; i < initnum.length; i++) {
		temp += initnum[i];
	}
	$("#dxxzts #xx").html(temp);
}
function getInitnum_dxxzts(){
	initnum.length = 0;
	var nums = $("#dxxzts #xx div").length;
	for (var i = 0; i < nums; i++) {
		if(i%3 == 0){
			var temp_html = "<div class=\"input-group input-group-lg testtype\">"
								+"<span class=\"input-group-addon\" id=\"sizing-addon1\">题目选项</span>"
								+"<input id=\"dxxzts_xx"+i/3+"\" type=\"text\" class=\"form-control options\" placeholder=\"请输入题目选项内容\" aria-describedby=\"sizing-addon1\" value=\""+$("#dxxzts_xx"+i/3).val()+"\" onblur=\"dxxzts_blur("+i/3+")\">"
								+"<span class=\"validate_input\">选项内容不能为空</span>"
							+"</div>";
			initnum.push($("#dxxzts #xx").children().eq(i).prop('outerHTML')+temp_html+$("#dxxzts #xx").children().eq(i+2).prop('outerHTML'));
		}
	}
}