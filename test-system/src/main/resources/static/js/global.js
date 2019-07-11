//文本框默认提示文字
function textFocus(el) {
    if (el.defaultValue == el.value) { el.value = ''; el.style.color = '#333'; }
	var o = $(el).parent().find(".validate_input");
	if (o != null) {
		o.css("display","none");
		$(el).css("border-color", "#CCCCCC")
	}
}
function textBlur(el) {
    if (el.value == '' || el.value == el.defaultValue) { 
		el.value = el.defaultValue; el.style.color = '#999'; 
		var o = $(el).parent().find(".validate_input");
		if (o != null) {
			o.css("display","block");
			$(el).css("border-color", "red")
		}
	}else{
		
	}
}

//公共部分的验证
function showValideInfo(obj){
	//将判断条件改成数据库读取结果比对，如果数据库存在该编号则显示验证不通过提示
	if($(obj).val() == "" || $(obj).val() == null){
		$(obj).parent().find(".validate_input").css("display","block");
	}else{
		$(obj).parent().find(".validate_input").css("display","none");
	}
}

function checkInput(obj) {
	textBlur(obj);
	showValideInfo(obj);
}

var MSG_ID_OK     = 1;
var MSG_ID_CANCEL = 2;
var g_msg_dlghand = null;
//----------------------------------//
/*!
   创建模态对话框
   title - 对话框标题
   msg   - 对话框内容
   flag  - MSG_ID_OK | MSG_ID_CANCEL， 确认显示相关按钮
   call  - 回调函数  如果为空，则不绑定函数
 */
function createMessageBox(title, msg, flag, callback) {
	var func = callback;
	var f0 = "";
	var f1 = "";
	var f2 = "";
	var f3 = "";
	
	var f0 =  "<div id=\"msg-dlg1122334455\" class=\"modal fade\" tabindex=\"-1\">" +
				"<div class=\"modal-dialog\">" +
					"<div class=\"modal-content margin-top-60\">" +
						"<div class=\"modal-header modal-header1\">" +
							"<div class=\"table-header border-top-radius\" >" +
								"<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">" +
									"<span class=\"white\" >&times;</span>" +
								"</button>" + title +
							"</div>" +
						"</div>" +
						"<div class=\"modal-body modal-body1\">" +
							"<div class=\"modal-body-div\">" +
								msg +
							"</div>" +
						"</div>";
	if (flag & MSG_ID_OK) {
		f1 += 		"<div class=\"modal-footer modal-footer1\">";
		if (func != null) {
			f1 +=			"<button class=\"btn btn-sm btn-success\" data-dismiss=\"modal\" id=\"msgdlg-sure-ok\">" +
								"<i class=\"icon-ok\"></i>确 定" +
							"</button>";				
		}else{
			f1 +=			"<button class=\"btn btn-sm btn-success\" data-dismiss=\"modal\" id=\"msgdlg-sure-ok\" aria-hidden=\"true\">" +
								"<i class=\"icon-ok\"></i>确 定" +
							"</button>";		
		}

	}
	if (flag & MSG_ID_CANCEL) {
		f2 +=				"<button class=\"btn btn-sm btn-danger\" data-dismiss=\"modal\" id=\"msgdlg-sure-cancel\" aria-hidden=\"true\">" +
								"<i class=\"icon-remove\"></i>取 消"  +
							"</button>";
	}
	f3 =				"</div>" +
					"</div>" +
				"</div>" +
			"</div>";
			
	var v = $(f0+f1+f2+f3);
	
	removeMessageBox();
	
	v.appendTo("body");
	if (func != null) {
		$('#msgdlg-sure-ok').bind("click", MSG_ID_OK, func);
		
	}	
	g_msg_dlghand = v;
	$('#msg-dlg1122334455').modal({backdrop: 'static', keyboard: false , show: false});
	$("#msg-dlg1122334455").modal();
}

function removeMessageBox() {
	if (g_msg_dlghand != null) {
		g_msg_dlghand.remove();
	}
}

/* 通过输入idname 查找对应div中的img，依据宽度修正高度。 */
function adjustImageHeight(idname){ 
// 修正图高宽 //
	// 得到页面中的对应图像，依据宽度修正图像
	var Imgs = document.getElementById(idname).getElementsByTagName("img");   
	for(i=0; i<Imgs.length; i++) {   
		ImgZoom(Imgs[i]);   
	}   

}

function imgZoom(obj) {
	if (obj != null) {
		var imgwidth = obj.width;
		var imgheight = imgwidth/6*9;
		obj.height = imgheight;
	}
}
//通过输入起始日期获取天数
function getDateDiff(startDate,endDate)  
{  
	if (startDate == null || endDate == null) return 0;
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
    return  dates;    
}

//时间对比函数，如果a>b返回1，如果a<b返回-1，相等返回0   
function compTime(a,b)   
{   
	if (a == null || b == null) return;
	var dateA = new Date("1900/1/1 " + a);   
	var dateB = new Date("1900/1/1 " + b);   
	if(isNaN(dateA) || isNaN(dateB)) return null;   
	if(dateA > dateB) return 1;   
	if(dateA < dateB) return -1;   
	return 0;   
}

//日期对比函数，如果a>b返回1，如果a<b返回-1，相等返回0   
function compDate(a,b)   
{   
	if (a == null || b == null) return;
	var dateA = new Date(a);   
	var dateB = new Date(b);   
	if(isNaN(dateA) || isNaN(dateB)) return null;   
	if(dateA > dateB) return 1;   
	if(dateA < dateB) return -1;   
	return 0;   
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}		
