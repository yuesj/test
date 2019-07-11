/*!
试卷添加编辑相关js
*/
var od ;
var	tid;
var topto;
var localObj = window.location;
var contextPath = localObj.pathname.split("/")[1]; // 项目的相对路径
var itemId;
var paperId = null;
var paperInfo;
var paperTitle;
var paperScore;
var paperNote;
var pointList;
var paperConfList = null;
var r = /^[1-2]?(([0-4]?[0-9])|([5]{1}[0]{1}))$/;

var currTitleNums = 0;
var currScoreVal      = 0;
var choosenums = 0; // 已经使用了多少道题
var choosescore = 0; // 已经使用了多少分
var scrollfor =0;
var pointListInfo ={
	data:[[],[],[]],
	
};
var pointListInfoTmp ={
		data:[[],[],[]],
		
	};

var titleTypeIndex = 0;
var currTitleTypeNum = 0;
var titleTypeArray = [0,0,0];
var titleTypeName = ["判断题","单选题","多选题"];
var titleTypeDivObj = [];

var localPath = "/"+contextPath;

// 打开模态窗口
$('#knows-cn').modal({backdrop: 'static', keyboard: false , show: false});
$('#deploy-cn').modal({backdrop: 'static', keyboard: false , show: false});
// paper-add-deploy.htm添加试题类型按钮

$(document).ready(function() {
	//
	$("#nextBtn").click(function(){
		var scoreto =$("#paperScore").val()
	$("#totalScore").text(scoreto);
	})
	
	
	$(".knowsbody-main").click(function(event){
		
		
		if(event.target.className=="srkbox"){
			$("#tipsxing").text("");
		}
		
	})
	
	// 当点击弹窗确定按钮时，隐藏弹窗并把选择的数据放在知识点input中
	$("#zsd_qd").click(function(){
		var zsd_str = "";
		var i = 0;
		var idx = titleTypeIndex;
		$("#zsd-text-"+idx).empty();	
		
//		pointListInfo = pointListInfoTmp;
		setPointListInfo(pointListInfoTmp, pointListInfo);
		$("input[name='zsd_cb']").each(function(){
			if ($(this).prop("checked") == true){
				var t  = $('#xx-srkbox-'+i).val();
				if (t != 0) {
					var name = $(this).parent().find("span").html();
// var s = '<div class="knows_choose_tit">'+
// '<span class="col-lg-5 col-md-5 text-overflow">'+name+'</span>'+
// '<span class="col-lg-6 col-md-6 knows_choose_line"></span>'+
// '<span class="col-lg-1 col-md-1" id="xx-textarea-'+ idx +"-"+ i +'"
// >'+t+'</span>'+
// '</div>';
					var s = '<div class="xuxian_bg">'+
							'<span class=" pd_title">'+name+'</span>'+
							'<span class="text-color pd_scorll" id="xx-textarea-'+ idx +"-"+ i +'" >'+t+'<span>题</span></span>'+
							'</div>';
					
					$("#zsd-text-"+idx).append(s);							
				}
			}
			i++;
		});
		
		zsd_str = zsd_str.substring(0,zsd_str.length-1);
		// 在知识点列表显示选中的知识点题目信息
		$('#pointTextId'+titleTypeIndex).val(zsd_str);
		$('#knows-cn').modal('hide');
	
		choosenums = 0; // 已经使用了多少道题
		choosescore = 0; // 已经使用了多少分
		
	});
	
//	$("#paperScore").keydown(onlyNumber);
});

 
$("#titleTypeCkId0").bind("click",function(){
	
		if($("#titleTypeDiv0").length>0){
		 scrollfor =$("#titleTypeDiv0").offset().top;
		
		scolldh();
		}
	});
	$("#titleTypeCkId1").bind("click",function(){
		
		if($("#titleTypeDiv1").length>0){
		 scrollfor =$("#titleTypeDiv1").offset().top;
		scolldh();
		}
	});
	$("#titleTypeCkId2").bind("click",function(){
		
		if($("#titleTypeDiv2").length>0){
		 scrollfor =$("#titleTypeDiv2").offset().top;
		scolldh();
		}
	});
/**
 * 更新相关题库，试卷名称
 */
function fillItem(id, name,date) {
	var t = name+ '( '+ date +' )';
	$("#itemTitle").val(t);
	$("#shijuanItem").html(t);// 试卷发布页面的题库显示栏
	itemId = id;
}

/**
 * 删除表单 idx - 试题类型索引
 */ 
function resetTypeIdx(idx) {
	if (titleTypeArray[idx] == 1){
		var btn = $("#titleTypeCkId"+idx);
		btn.prop("checked",false);
		btn.removeClass("btn-checked").addClass("btn-inf");
		btn.eq(0).children(0).css("background-color","#FFFFFF")	
		
		if (titleTypeDivObj[idx] != null) {
			titleTypeDivObj[idx].remove();
		}
		titleTypeArray[idx] = 0;				
	}

}	
$(window).scroll(function(){
	
	if($(window).scrollTop()>=331){
			$(".deploy-top").addClass("posi-fix");
			
			
		}else{
			$(".deploy-top").removeClass("posi-fix");
			$(".deploy-top1").css("display","none")
		}
})
function scolldh(){
		 topto =$(window).scrollTop()
		
		topto+=8;
		if(topto<(scrollfor-331)){

			$(window).scrollTop(topto);
		
		}else{
			
			clearTimeout(tid);
			return;
		}
			tid=setTimeout('scolldh()',13);
	}

function onlyNumber(event){
//	var keyCode = event.keyCode;
//	if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||(event.keyCode==8))||(event.keyCode>=37&&event.keyCode<=46)) {
//		return event.returnValue=false;
//	}	
}				
/**
 * 添加表单 idx - 试题类型索引 arthur Ma (2016-8-3)
 */ 
function titleCheckBox(idx, flag) {
	
	var btn = $("#titleTypeCkId"+idx);
	
	if (typeof(flag) == "undefined"){
		if (btn.prop("checked") == true) {
			resetTypeIdx(idx)
			return;
		}	
	}
	
	btn.prop("checked",true);
	btn.removeClass("btn-inf").addClass("btn-checked");
	btn.eq(0).children(0).css("background-color","#5BC0DE")
	var tipcon =
		$('<div id="titleTypeDiv'+idx+'" class="deploybox row">' +
		'<div class="col-lg-11 col-md-11 line-right">' +
		'<div class="input-group input-group-lg deploytype">' +
		'<span class="input-group-addon border-tmlx">题目类型:    '+titleTypeName[idx]+'</span>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col-lg-6 col-md-6 nopadleft">' +
		'<div class="input-group input-group-lg deploytype ">' +
		'<span class="input-group-addon zjj">数量</span>' +
		'<input type="text" id="titleNumsId-'+idx+'" class="form-control" value="0" maxlength="10" placeholder="请输入所选试题类型总数" ' +
		'onblur="checkScoreRange(this, '+idx+')" onkeyup = "scoresys(this)" style="ime-mode:disabled">' +
		'<div class="input-group-addon">题</div>' +
		'</div>' +
		'</div>' +
		'<div class="col-lg-6 col-md-6 nopadright">' +
		'<div class="input-group input-group-lg deploytype">' +
		'<span class="input-group-addon zjj">分值</span>' +
		'<input type="text" id="titleScoreId-'+idx+'" onkeyup = "scoresys(this)" class="form-control" value="0" maxlength="20" placeholder="请输入该类型试题分值" ' +
		'onblur="checkScoreRange(this, '+idx+')" style="ime-mode:disabled">' +
		'<div class="input-group-addon">分/题</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<div class="input-group input-group-lg deploytype">' +
		'<span class="input-group-addon zsd" >知识点</span>' +
		'<div id="zsd-text-'+ idx +'" class="form-control knows_choose" onclick="showPointListDlg('+idx+');"> ' +

		'</div> '+
		'</div>' +
		'</div>' +
		'<div class="col-lg-1 col-md-1">' +
		'<div class="deletebox">' +
		'<i class="glyphicon glyphicon-trash"></i>' +
		'<a href="javascript:resetTypeIdx('+idx+')">删除</a>' +
		'</div>' +
		'</div>' +
		'</div>');
	$('#deployadd').append(tipcon);			

	$('#titleNumsId-'+idx).keydown(onlyNumber);
	$('#titleScoreId-'+idx).keydown(onlyNumber);
	
	titleTypeDivObj[idx] = tipcon;
	titleTypeArray[idx] = 1;
	
	// 当点击知识点输入框时，需要判断 数量 和 分值 如果为空则提示输入
	/*
	 * $('#knows-cn').on('shown.bs.modal', function() { // 执行一些动作... if
	 * (currScoreVal == 0 || currTitleNums == 0) { } else {
	 * //先检索checkbox所有true，全部改为false $("input[name='zsd_cb']").each(function() {
	 * $(this).prop("checked",false); });
	 *  } });
	 */
	if ($(window).scrollTop()<=0||!$(window).scrollTop()) {
  
   $(".deploy-top").removeClass("posi-fix");
			$(".deploy-top1").css("display","none")
} else {
   
   
}
	
}

function getTotalScore() {
	titleScore = 0;
	if (titleTypeArray[0] == 1){
		var t = $('#titleScoreId-'+ 0).val();// 一道题的分值
		var n = $('#titleNumsId-' + 0).val();// 试题总数量
		titleScore +=  n * t;
	}

	if (titleTypeArray[1] == 1){
		var t = $('#titleScoreId-'+ 1).val();// 一道题的分值
		var n = $('#titleNumsId-' + 1).val();// 试题总数量
		titleScore +=  n * t;				
	}

	if (titleTypeArray[2] == 1){
		var t = $('#titleScoreId-'+ 2).val();// 一道题的分值
		var n = $('#titleNumsId-' + 2).val();// 试题总数量
		titleScore +=  n * t;				
	}
	return titleScore;
}
/**
 * 检查输入的值有无超过试卷总分
 */
function checkScoreRange(obj, idx) {
	var titleNums  = $('#titleNumsId-'+idx).val();// 试题总数量
	var titleScore = $('#titleScoreId-'+idx).val();// 一道题的分值
	var paperScore = $('#paperScore').val();
	
	if($(obj).val() == 0 || $(obj).val() == "") {
		$(obj).css("border-color", "red");
		$(obj).val("0");
		showMsg("试题数量不能为空和0值.");
		return 1;
	} 			
	else if ((titleNums * titleScore) > paperScore){
		$(obj).css("border-color", "red");	
		$(obj).val("0");
		showMsg("试题分值不能超过试卷总分数("+paperScore+")");
		return 1;
	}else {
		titleScore = getTotalScore();
		if (titleScore > paperScore){
			$(obj).css("border-color", "red");	
			$(obj).val("0");
			showMsg("试题分值合计不能超过试卷总分数("+paperScore+")");
		}else{
			$(obj).css("border-color", "#CCCCCC");
		}
	}
	
	return 0;
}

/**
 * 初始化试题分值基本信息，这里要注意全局变量的问题。
 */
function initTitleTypeScore(idx, nums, scores) {
	choosenums = nums;     // 已经使用了多少道题
	choosescore = scores;  // 已经使用了多少分
	// 从对应试题类型配置中获取分值基本配置
	
	currTitleNums = $('#titleNumsId-'+idx).val();// 试题总数量
	currScoreVal = $('#titleScoreId-'+idx).val();// 一道题的分值

	var tt = "总数"+currTitleNums+"道，可用分数"+(currTitleNums*currScoreVal - choosescore)+"分，已选"+choosenums+"题，已用"+choosescore+"分。";
	$(".knowsbody").children().eq(0).find("span").text(tt);	
}
/**
 * 当勾选时 checkbox 时，触发input的write属性。并根据已经有的值更新显示。
 */
function pointCheckOnClick(obj, idx){
	
	var srk = document.getElementById("xx-srkbox-"+idx);
	var chk = document.getElementById("xx-zsd_cb-"+idx);
	// alert(obj.type);
	if (obj.type != "checkbox") {
		if ($(chk).prop("checked") == false){
			$(chk).prop("checked", true);
			$(obj).parents("li").find(":text").addClass("bordernone").focus();
			
			
		}else{
			$(chk).prop("checked", false);
			$(obj).parents("li").find(":text").removeClass("bordernone");
		}				
	}
	
	if($(chk).prop("checked") == true){
		$(srk).removeAttr("readonly");
		$(obj).parents("li").find(":text").addClass("bordernone").focus();
		
		var temp = parseInt($(srk).val());
		choosenums += temp;
		choosescore += temp*currScoreVal;
		pointListInfoTmp.data[titleTypeIndex][idx] = temp;
	// pointListInfo.data[titleTypeIndex][idx] = temp;
	}else{
		$(srk).prop("readonly", true);
		$(obj).parents("li").find(":text").removeClass("bordernone");
		var temp = parseInt($(srk).val());
		choosenums -= temp;
		choosescore -= temp*currScoreVal;				
		// pointListInfo.data[titleTypeIndex][idx] = 0;
		pointListInfoTmp.data[titleTypeIndex][idx] = 0;
	}
	var tt = "总数"+currTitleNums+"道，可用分数"+(currTitleNums*currScoreVal - choosescore)+"分，已选"+choosenums+"题，已用"+choosescore+"分。";
	$(".knowsbody").children().eq(0).find("span").text(tt);

	
}			
/**
 * 当输入分值发生变化后进行计算 要处理已经更新和新更新的逻辑管理。 arthur Ma (2016-8-4)
 */
function pointInputOnBlur(obj, idx, nums){
	// alert($('#xx-score-'+idx).text());
	var oldNum = parseInt($('#xx-score-'+idx).text()) / currScoreVal;
	var temp = parseInt($(obj).val());
	
	if (temp > nums) {
		$(obj).val(oldNum);
		$("#tipsxing").text("您的输入超出了该知识点的题目总数");
		return;
	}
	// 减去旧数据
	choosenums -= oldNum;
	choosescore -= oldNum * currScoreVal;			
	// alert(temp); 更新新的记录
	if (choosenums + temp <= parseInt(currTitleNums)){
		choosenums += temp;
		choosescore += temp*currScoreVal;
	}else{				
		temp = oldNum;
		$(obj).val(temp);
		// 恢复旧数据
		choosenums += oldNum;
		choosescore += oldNum * currScoreVal;					
		return;
	}
	$(obj).val(temp);
	$('#xx-score-'+idx).text(temp*currScoreVal);
	var tt = "总数"+currTitleNums+"道，可用分数"+(currTitleNums*currScoreVal - choosescore)+"分，已选"+choosenums+"题，已用"+choosescore+"分。";
	$(".knowsbody").children().eq(0).find("span").text(tt);	
	pointListInfoTmp.data[titleTypeIndex][idx] = temp;
}

var currPageIdx = 0;
function show_next_content(idx) {
	switch (idx){
	case 0:
		$("#step0div").css("display","block");
		$("#step1div").css("display","none");
		$("#step2div").css("display","none");
		break;
	case 1:
		$("#step0div").css("display","none");
		$("#step1div").css("display","block");
		$("#step2div").css("display","none");				
		break;
	case 2:
		$("#step0div").css("display","none");
		$("#step1div").css("display","none");
		$("#step2div").css("display","block");				
		break;
	}
}
/**
 * 从题库获得对应知识点名称，更新知识点窗口数据 name - 知识点名称 nums - 题目数量 idx - 知识点编号 arthur Ma
 * (2016-8-4)
 */
function addPointListDiv(name, nums, idx, titleNums, val) {
	var temp = $('<li><div class="onebox" style="width:380px;" >' +
			'<input type="checkbox" id="xx-zsd_cb-' + idx + '" onclick="pointCheckOnClick(this,'+idx+');" class="fxkbox" value="0" name="zsd_cb" />' + 
			'<span style="width:340px;" onclick="pointCheckOnClick(this,'+idx+');">' + name + '<b class="">(' + nums + ')</b></span></div>' +
			'<div class="twobox">' + 
			'<input type="text" id="xx-srkbox-' + idx + '"  maxlength="20" class="srkbox" style="ime-mode:disabled" value="'+titleNums+'" ' +
			' onblur="pointInputOnBlur(this,' + idx + ','+nums+')"/>'+
			'<span> 题</span></div>' +
			'<div class="score" ><span id="xx-score-' + idx + '">'+val+'</span>分</div></li>');
	$("#pointListId").append(temp);
	
	if (val != 0) {
		$("#xx-zsd_cb-"+idx).prop("checked", true);
	}else{
		$('#xx-srkbox-'+idx).prop("readonly", true);
	}
	$('#xx-srkbox-' + idx).keydown(onlyNumber);
}

/**
 * 显示知识点列表选择对话框。
 */
function showPointListDlg(idx){
	titleTypeIndex = idx;	// 更新index
	var score = $('#titleScoreId-'+idx).val();// 一道题的分值
	var len = pointList.length;
	var val = 0;
	var totalScore = 0;
	var titleNum   = 0;

	var titleNumsObj  = $('#titleNumsId-'+idx);// 试题总数 量
	var titleScoreObj = $('#titleScoreId-'+idx);// 一道题的分值

	if (titleNumsObj.val() == 0){
		return;
	}
	if (titleScoreObj.val() == 0){
		return;
	}
	
	$("#pointListId").empty();
	setPointListInfo(pointListInfoTmp, pointListInfo);
//	pointListInfoTmp = pointListInfo;
	for (var i = 0; i < len; i ++) {
		var o = document.getElementById("xx-textarea-"+idx+"-"+i);
		val = 0;
		if (o != null) {
			val = parseInt($(o).text());
		}
		var a = 0;
		if (idx == 0) {
			a = pointList[i].panduanNum;
		}else if (idx == 1) {
			a = pointList[i].danxuanNum;
		}else if (idx == 2) {
			a = pointList[i].duoxuanNum;
		}
		addPointListDiv(pointList[i].name, a, i, val, val * score);
		titleNum += val;
		totalScore += val * score;
	}

	initTitleTypeScore(idx, titleNum, totalScore); // 初始化分值
	$("#optionDlgType").html(titleTypeName[idx]);
	$("#knows-cn").modal();
}

/**
 * 更新显示对应题型上的知识点textrea上的数据 arthur Ma (2016-8-5)
 */
function updateTextArea(idx) {
	var str="";
	$("#zsd-text-"+idx).empty();
	
	for (var i = 0; i < pointList.length; i ++) {
		var t = pointListInfo.data[idx][i];
		if (t != 0){
			var num = 0;
			switch (idx) {
				case 0:
				num = pointList[i].panduanNum; break;
				case 1:
				num = pointList[i].danxuanNum; break;
				case 2:
				num = pointList[i].duoxuanNum; break;
				default: break;
			}
			// 更新当前对应题型里的知识点信息
// var s = '<div class="knows_choose_tit">'+
// '<span class="col-lg-5 col-md-5
// text-overflow">'+pointList[i].name+'('+num+')</span>'+
// '<span class="col-lg-6 col-md-6 knows_choose_line"></span>'+
// '<span class="col-lg-1 col-md-1" id="xx-textarea-'+ idx +"-"+ i +'"
// >'+t+'</span>'+
// '</div>';
			var s = '<div class="xuxian_bg">'+
					'<span class=" pd_title">'+pointList[i].name+'('+num+')</span>'+
					'<span class="text-color pd_scorll" id="xx-textarea-'+ idx +"-"+ i +'" >'+t+'<span> 题</span></span>'+
					'</div>';
			
			$("#zsd-text-"+idx).append(s);
			$(".xuxian_bg").css("background-image", localPath+"/static/images/examMng/xx.png");
		}
	}
	// str = str.substring(0,str.length-1);
	$('#pointTextId'+idx).val(str);			
}
/**
 * 依据输入参数显示对应试题类型的div
 */
function showTitleTypeConf(idx, titleNum, titleScore){
	resetTypeIdx(idx);
	titleCheckBox(idx, 1);
	$('#titleNumsId-'+idx).val(titleNum);
	$('#titleScoreId-'+idx).val(titleScore);
	updateTextArea(idx);
}

function updateNavDisplay(idx){
	switch (idx) {
		case 0:
		$("#fuelux-wizard-0").css("display", "block");$("#fuelux-wizard-1").css("display", "none");$("#fuelux-wizard-2").css("display", "none");
		break;
		case 1:
		$("#fuelux-wizard-0").css("display", "none");$("#fuelux-wizard-1").css("display", "block");$("#fuelux-wizard-2").css("display", "none");
		break;
		case 2:
		$("#fuelux-wizard-0").css("display", "none");$("#fuelux-wizard-1").css("display", "none");$("#fuelux-wizard-2").css("display", "block");
		break;
	}
}
/**
 * 获取每个试题类型的数据并保存 idx - 试题类型索引 0-判断 1- 单选 2-多选 arthur Ma (2016-8-5)
 */
function saveTitleConfValue(idx) {
	var a = $('#titleNumsId-'+idx).val();// 试题总数量
	var b = $('#titleScoreId-'+idx).val();// 一道题的分值
	return update_paper_conf(paperId, idx, a, b, pointListInfo.data[idx]);			
}
/**
 * 下一步操作proc - 如果当前是基础信息页面，则保存基础信息 - 如果当前是知识点选择页面，则显示对应知识点，并
 */
function next_step_btn(obj){
	if (currPageIdx == 0) {
		if (1 == update_paper()) {
			return ; // 添加更新试卷基本信息失败
		}
		// 依据已经保存的题目类型，显示选中题目信息。
		if (paperConfList != null && paperConfList.length != 0) {
			var len = paperConfList.length;
			for (var i=0; i<len; i++){
				var idx = parseInt(paperConfList[i].titleType);
				showTitleTypeConf(idx, paperConfList[i].count, paperConfList[i].score);
			}						
		}// else{
		// showTitleTypeConf(0, 10,2);
		// }
		$('#paperScore1').html($('#paperScore').val() + '分');
		$(".deploy-top").removeClass("posi-fix");
			$(".deploy-top1").css("display","none")
	}
	// 如果当前在第二个页面
	if (currPageIdx == 1) { // 点击下一步，更新config
	
		if (1 == calPointListInfo()) {
			return;
		}
		
		if (titleTypeArray[0] == 1) {
			if (1 == saveTitleConfValue(0)) return;
		}
		if (titleTypeArray[1] == 1) {
			if (1 == saveTitleConfValue(1)) return;
		}
		if (titleTypeArray[2] == 1) {
			if (1 == saveTitleConfValue(2)) return;
		}
		showPaperInfo();
	}

	if (currPageIdx < 2) {
		currPageIdx++;
		show_next_content(currPageIdx);
		updateNavDisplay(currPageIdx);
		if (currPageIdx == 2){
			$("#nextBtn").html('发布试卷<i class="glyphicon glyphicon-arrow-right" style="margin-right:0;"></i>');		
		}				
	}else{
		// 发布试卷？？？
		$("#deploy-cn").modal();
	}
}
/**
 * 上一步按钮操作
 */
function prev_step_btn(obj) {
	if (currPageIdx > 0){
		currPageIdx--;
		show_next_content(currPageIdx);
		if (currPageIdx < 2){
			// var obj = document.getElementById("nextBtn");
			$("#nextBtn").html('下一步<i class="glyphicon glyphicon-arrow-right" style="margin-right:0;"></i>');
		}
		updateNavDisplay(currPageIdx);
	} else {
		
	}
	$(".deploy-top").removeClass("posi-fix");
			$(".deploy-top1").css("display","none")
}

/**
 * 显示messagebox对话框
 */
function showMsg(info) {
	createMessageBox("提示", info, MSG_ID_OK, null);
}

/**
 * 更新试卷配置 第一页；
 */
function update_paper() {
	var ret = 1;
	paperTitle = $("#paperTitle").val();
	paperScore = $("#paperScore").val();
	paperNote = $("#note").val();
	if (paperTitle == "") {
		showMsg("请填写试卷名称！");
		return ret;
	}
	if (paperScore == "") {
		showMsg("请填写试卷总分！");
		return ret;
	}
//	if (!r.test(Number(paperScore))) {
//		showMsg("试卷总分请填写1~150整数！");
//		return ret;
//	}
	if (paperNote == "") {
		showMsg("请填写试卷简介！");
		return ret;
	}
	if (itemId == undefined) {
		showMsg("请选择题库！");
		return ret;
	}
	$.ajax({
		url : localPath+"/general/paperInfo/updatePaper.html",
		type : 'post',
		dataType : 'json',
		async : false,
		beforeSend : function(){
			var h = document.body.clientHeight; 
			var s = '<div class="loading_bg"> <img src="'+localPath+'/static/images/loading.gif"> \
					 <p>数据提交中，请稍后...</p></div>';
			$(s).appendTo("body").css({display:"block"});
		},
		complete : function(){
			$('.loading_bg').remove();
		},
		data : {
			paperId : paperId,
			itemId : itemId,
			paperTitle : paperTitle,
			score : paperScore,
			note : paperNote
		},
		
		success : function(data) {
			if (data.pointList.length == 0) {
				showMsg("保存试卷基本信息失败！");
			} else {
				paperInfo = data.paperInfo;
				paperId = data.paperInfo.id;
				pointList = data.pointList;
				paperConfList = data.pcList;
				
				for (var i = 0; i < pointList.length; i ++) {
					pointListInfo.data[0][i] = 0;
					pointListInfo.data[1][i] = 0;
					pointListInfo.data[2][i] = 0;	
				}
				if (paperConfList.length != 0) {
					// 初始化显示
					var len = paperConfList.length;
					for (var i=0; i<len; i++){
						var idx = paperConfList[i].titleType;
						titleTypeArray[idx] = 1;
						pointListInfo.data[idx] = paperConfList[i].pointList.split(",");
					}
					setPointListInfo(pointListInfoTmp, pointListInfo);
//					pointListInfoTmp = pointListInfo;
				}
			}
			ret = 0;
		},
		cache : false,
		timeout : 5000,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			debugger;
			var s = textStatus + " - " + XMLHttpRequest.status + "  状态码： " + XMLHttpRequest.readyState;
			showMsg(s);
		},
	});
	return ret;
}

function setPointListInfo(pointListInfo,pointListInfoTmp){
	for (var i = 0; i < pointListInfo.data.length; i++) {
		for ( var j = 0; j < pointListInfo.data[i].length; j++) {
			if(pointListInfo.data[i][j]==null){
				pointListInfoTmp.data[i][j] = 0;
			}else{
				pointListInfoTmp.data[i][j] = pointListInfo.data[i][j];
			}
			
		}
	}
}

/**
 * 更新知识点配置信息，第二页
 */
function update_paper_conf(paperId, titleType, count, titleScore, pList) {
	$.ajax({
		url : localPath+"/general/paperInfo/updatePaperConf.html",
		type : 'post',
		dataType : 'json',
		async : false,
		beforeSend : function(){
			var s = '<div class="loading_bg"> <img src="'+localPath+'/static/images/loading.gif"> \
					 <p>数据提交中，请稍后...</p></div>';
			$(s).appendTo("body").css({display:"block"});
		},
		complete : function(){
			$('.loading_bg').remove(); 
		},
		data : {
			paperId : paperId,
			titleType : titleType,
			count : count,
			titleScore : titleScore,
			pointList : pList.toString()
		},
		
		success : function(data) {
			return 0;
		},
		cache : false,
		timeout : 5000,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			var s = textStatus + " - " + XMLHttpRequest.status + "  状态码： " + XMLHttpRequest.readyState;
			showMsg(s);
			return 1;
		}
	});
}

/**
 * 显示一共有多少知识点组成的数据分值div name - 知识点名称 num - 知识点题目数量 val - 分值 arthur Ma (2016-8-5)
 */
function addPointGroupInfoDiv(name,num,val){
	var s = '<div>' +
			'	<div class="xuxian_bg">' +
			'		<span class="font-weight pd_title">'+name+'<span class="text-color fontnone">（'+num+'道）</span></span>' +
			'		<span class="text-color pd_scorll">'+val+'分</span>'
			'	</div>' +
			'</div>';
// ' <div class="col-lg-8 col-md-8 padding-0"><div
// class="border-bottom"></div></div>' +
// ' <div class="col-lg-1 col-md-1 padding-0 text-right
// text-color">'+val+'分</div>' +
			
	$('#pointGroupDivId').append(s);
}
/**
 * 依据输入的idx 检查对应类型的题目数量和分值是否准确 idx - 0- 判断 1-单选 2 - 多选
 */
function checkTitlesScores(idx, titles, score) {
	var n = $("#titleNumsId-"+idx).val();
	var s = $("#titleScoreId-"+idx).val();
	
	if (titles != n) {
		showMsg("请检查 ( "+titleTypeName[idx]+" ) 的题目数量。配置："+n+"题，实际："+titles+"题。");
		return 1;
	}
// if (score < s) {
// showMsg("请检查("+titleTypeName[idx]+")的分值。配置："+s+"分，实际："+score+"分。");
// return 1;
// }
	return 0;
}
/**
 * 统计各个知识点的分值组成 arthur Ma (2016-8-5)
 */
function calPointListInfo() {
	var totalNum = [];
	var totalScore = [];
	var len = pointList.length;
	var n,s;
	
	if (len == 0){
		showMsg("知识点的数量为0, 数据存在异常，请检查!");
		return 1;
	}
	// 初始化
	for (var i=0; i<len; i++){
		totalNum[i] = 0;
		totalScore[i] = 0;
	}
	n = 0;
	s = 0;
	// 如果总分与规定的试卷分值不一致，则返回从新操作。
	var titleScore = getTotalScore();
	if (titleScore != paperScore){
		showMsg("试题分值合计与试卷总分数("+paperScore+")不符！");
		return 1;
	}		
	// 统计数据
	if (titleTypeArray[0] == 1) {
		for (var i=0; i<len; i++){
			totalNum[i]   +=  parseInt(pointListInfo.data[0][i]);
			totalScore[i] +=  pointListInfo.data[0][i] * $('#titleScoreId-0').val();
			
			n += parseInt(pointListInfo.data[0][i]);
			s += pointListInfo.data[0][i] * $('#titleScoreId-0').val();
		}
		if (1 == checkTitlesScores(0, n, s)) {// 如果当前分值和题目数量不满足设定条件，返回。
			return 1;
		}
	}
	n = 0;
	s = 0;			
	if (titleTypeArray[1] == 1) {
		for (var i=0; i<len; i++){
			totalNum[i]   +=  parseInt(pointListInfo.data[1][i]);
			totalScore[i] +=  pointListInfo.data[1][i] * $('#titleScoreId-1').val();	
			
			n += parseInt(pointListInfo.data[1][i]);
			s += pointListInfo.data[1][i] * $('#titleScoreId-0').val();
		}
		if (1 == checkTitlesScores(1, n, s)) {
			return 1;
		}
	}
	n = 0;
	s = 0;			
	if (titleTypeArray[2] == 1) {
		for (var i=0; i<len; i++){
			totalNum[i]   +=  parseInt(pointListInfo.data[2][i]);
			totalScore[i] +=  pointListInfo.data[2][i] * $('#titleScoreId-2').val();
			
			n += parseInt(pointListInfo.data[2][i]);
			s += pointListInfo.data[2][i] * $('#titleScoreId-0').val();
		}
		if (1 == checkTitlesScores(2, n, s)) {
			return 1;
		}
	}
	$('#pointGroupDivId').empty();
	for (var i=0; i<len; i++) {
		if (totalNum[i] != 0) {
			addPointGroupInfoDiv(pointList[i].name, totalNum[i], totalScore[i]);
		}
	}
	
	return 0;
}

function showPaperInfo() {
	var panduanNum = $("#titleNumsId-0").val();
	if (panduanNum == undefined) {
		panduanNum = 0;
	}
	var danxuanNum = $("#titleNumsId-1").val();
	if (danxuanNum == undefined) {
		danxuanNum = 0;
	}
	var duoxuanNum = $("#titleNumsId-2").val();
	if (duoxuanNum == undefined) {
		duoxuanNum = 0;
	}
	var panduanScore = $("#titleScoreId-0").val();
	if (panduanScore == undefined) {
		panduanScore = 0;
	}
	var danxuanScore = $("#titleScoreId-1").val();
	if (danxuanScore == undefined) {
		danxuanScore = 0;
	}
	var duoxuanScore= $("#titleScoreId-2").val();
	if (duoxuanScore == undefined) {
		duoxuanScore = 0;
	}
	$("#panduanInfo").html("（" + panduanNum + "道，" + panduanScore + "分/题）");
	$("#panduanTotal").html(panduanNum * panduanScore + "分");
	$("#danxuanInfo").html("（" + danxuanNum + "道，" + danxuanScore + "分/题）");
	$("#danxuanTotal").html(danxuanNum * danxuanScore + "分");
	$("#duoxuanInfo").html("（" + duoxuanNum + "道，" + duoxuanScore + "分/题）");
	$("#duoxuanTotal").html(duoxuanNum * duoxuanScore + "分");
	$("#shijuanName").html(paperInfo.paperTitle);
	$("#shijuanScore").html(paperInfo.score + "分");
	$("#shijuanTime").html((new Date()).pattern("yyyy-MM-dd"));
	$("#shijuanCreator").html(paperInfo.creatorName);
	$("#shijuanIntro").html(paperInfo.note);
}

// Date转String
Date.prototype.pattern = function(fmt) {           
	var o = {           
		"M+" : this.getMonth() + 1,            
		"d+" : this.getDate(),            
	};           
	if (/(y+)/.test(fmt)) {           
		fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
	}           
	for (var k in o) {           
		if (new RegExp("("+ k +")").test(fmt)) {           
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
		}           
	}           
	return fmt; 
}  

  function scoresys(e){
  	var testnumb = 0;//所选题目统计
  	var scoreall = 0;//分数统计
  	var uuuid = $(e).parents(".deploybox");
  	$(e).attr("leftval",$(e).val());
  	var dpbox  = $("#step1div").find(".deploybox ");
  	for (var i =0;i<dpbox.size();i++) {
  		var resultval = dpbox.eq(i).find("input");
  		var leftresu =resultval.eq(0).val();//左边输入框的输入值
  		var rightresu =resultval.eq(1).val();//右边输入框的输入值
  		
  		if(!rightresu){
  			rightresu=0;
  		}
  		
  		if(!leftresu){
  			leftresu=0;
  		}
  		testnumb = testnumb+ parseInt(leftresu) ;
  		scoreall = scoreall +parseInt(leftresu)*parseInt(rightresu);
  	}
  	$("#testNub").text(testnumb);//数据同步  统计所有输入框结果-用去题目数量
  	$("#testScore").text(scoreall);//数据同步  统计所有输入框结果-用去分数
  	var dpboxtestnumb = uuuid.find("input").eq(0).val();
  	var dpboxtscoreall =uuuid.find("input").eq(1).val()*dpboxtestnumb;
  	uuuid.find(".border-tmlx").attr("gets",1)
  	
  	
  	 od = uuuid.find(".border-tmlx").text().slice(0,12);
  	
  	uuuid.find(".border-tmlx").text(od+"(共选择了"+dpboxtestnumb+"题/共用去"+dpboxtscoreall+"分)")
  }

function publishPaper() {
	var paperId = paperInfo.id;
	$.ajax({
		url : localPath+"/general/paperInfo/publishPaper.html?paperId=" + paperId,
		type : 'post',
		dataType : 'json',			
		async : false,
		beforeSend : function(){
			var s = '<div class="loading_bg"> <img src="'+localPath+'/static/images/loading.gif"> \
					 <p>数据提交中，请稍后...</p></div>';
			$(s).appendTo("body").css({display:"block"});
		},
		complete : function(){
			$('.loading_bg').remove(); 
		},		
		success : function(data) {
			if (data.error != "0") {
				showMsg(data.error)
			}else{
				document.location = localPath+"/general/paperInfo/list.html";
			}
			
		},
		cache : false,
		timeout : 5000,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			var s = textStatus + " - " + XMLHttpRequest.status + "  状态码： " + XMLHttpRequest.readyState;
			showMsg(s);
		},	
	});				
} 
function paperPreview() {
	window.open(localPath+"/general/paperInfo/paperPreviewUI.html?id=" + paperInfo.id);
}