var bdr_tab_click = false; //判断是否选择试卷
var t = 1; //考试添加的步骤数
var selname; //变量实现点击勾选checkbox生成对应的条目（当前li下的input的val（））、

var policeztree = "（x45646554456654546465456654xx公安局）"
var addnumb = 0; //(通过没次+1 实现add变量的每次不同类名赋值)
var add; //动态添加类名 （a+addnumb++）

var selectval = $("input:checkbox");

var policename = "";
var textareaval; //变量  用来保存考试通知内容
var ist = 0; //循环变量 遍历选中考生

var examName = $("#examName").val() //考试名称
var examTime = $("#ui_examTime").val() //开考时间
var examAddr = $("#examAddr").val() //考试地点
var examHander = $("#examHander").val() //考试组织
var examOrg = $("#examOrg").val() //所在单位
var examNote = $("#examNote").val() //考试简介
var examDuration = $("#examDuration").val(); //考试时长
var paperId  ="";
var uncoiFlag = 0;
var useCamera = 0;

$(document).ready(function() {
	$("#stypediv3").click(function() {
			var yd = $(".ul-left").find("li:first").width();
			var ponleft = -(yd - 40) + "px";
			if(yd == 0) {
				yd = $(".ul-right").find("li:first").width();
			}
			ponleft = -(yd - 40) + "px";
			$(".wh20").css("left", ponleft)
		})
		/************tooltip 初始化语句******************/
	$('[data-toggle="tooltip"]').tooltip()
		/*****************************/
	$("#stypediv1 input").click(function() {
		$(this).parent().removeClass("boxshadow");
	})
	$("input:checkbox").attr("disabled", "disabled");
	$("input:checkbox").click(function() {
			$(".ul-left").children("li").click();
		})
		/**********************考试时间插件初始化*******************************************/
	$("#ui_timepicker").datetimepicker({
			//showOn: "button",
			buttonImage: "../../images/examMng/icon_calendar.gif",
			//buttonImageOnly: false,
			showSecond: false,
			timeFormat: 'hh:mm:ss',
			stepHour: 1,
			stepMinute: 1,
			stepSecond: 1
		})
		/****************************************************************************/

	/*************************按钮下一步功能以及  第一步   输入验证****************************************/
	$("#validation").click(function() {
		examName = $("#examName").val(); //考试名称
		examTime = $("#ui_examTime").val(); //开考时间
		examAddr = $("#examAddr").val(); //考试地点
		examHander = $("#examHander").val(); //考试组织
		examOrg = $("#examOrg").val(); //所在单位
		examNote = $("#examNote").val(); //考试简介
		examDuration = $("#examDuration").val(); //考试时长

		uncoiFlag = document.getElementById("uncoiFlag").firstChild.defaultValue;//$("#uncoiFlag").val();
		useCamera = document.getElementById("useCamera").firstChild.defaultValue;//$("#useCamera").val();
		
		if(t==2){
			if(bdr_tab_click){
				//选择了试卷所做的操作
				var ret = saveExamInfo();
				if (ret == 1) {
					return ;
				}
			}else{
				//没有选择试卷做的操作
				createMessageBox("警告", "请选择一份试卷", MSG_ID_OK);
				return;
			}
		}
		if(t==1){
			
			var timenow= new Date();
			var timeofset = new Date(examTime.replace(/-/g,"/"));//将设置的时间转换为date类型
			var hnow = timenow.getHours();//获取当前系统时间的小时
//			timenow.setHours(hnow+8);//当前时间做判断前 增加8个小时
			var resultt = compDate(timeofset,timenow);//判断compDate（a，b）当a>b时  返回1
			if(resultt!=1){
				createMessageBox("警告", "您的选择有误，开考时间不能是过去时间", MSG_ID_OK, null);
				return;
			}
		}
		if(t == 1) {
			if(examName == "" || examName == "请输入考试名称") {
				$("#examName").css("border-color", "red")
			}
			if(examDuration == "" || examDuration == "请设置考试时长") {
				$("#examDuration").css("border-color", "red")
			}
			if(examAddr == "" || examAddr == "请输入考试地点") {
				$("#examAddr").css("border-color", "red")
			}
//			if(examNote == "" || examNote == "请输入考试的简要介绍") {
//				$("#examNote").css("border-color", "red")
//			}
			if(examDuration == "" || examDuration == "请设置考试时长"||
				examName == "" || examName == "请输入考试名称" ||
				examTime == "" || examTime == "请设置考试时间" ||
				examAddr == "" || examAddr == "请输入考试地点" ) {
				createMessageBox("警告", "您的输入有误，请检查边框变红的内容选项", MSG_ID_OK, null);
				return;
			}
			
		
			$("#stypediv1").addClass("dpynone");
		}
		if (2 == t) {
			var peoplenum = $("#ui_totalPersons").text();
			if (peoplenum == 0) {
				getExamPerson();
			}
			
		}
		//第三步 选择参考人员验证
		if(t == 3) {
			//参加考试人数
			var peoplenum = $("#ui_totalPersons").text();
			 if(peoplenum == 0){
				createMessageBox("警告", "请选择参加考试的人员", MSG_ID_OK)
				return
			 }
		}
		if (t == 4) {
			//$("#myModal1234").click();
			//setnoticeuu();
			publishExam();
			return;
		}
		var nextstype = ".stype" + t;
		var nextstypep = ".stypep" + t;
		var stype = "#stypediv" + t;
		var stype1displaynone = ".stype1displaynone" + t;
		$(stype).addClass("dpynone");
		
		t++;
		var nextstype = ".line-blue" + t;
		var nextstyped = ".stype" + t;
		var nextstypep = ".stypep" + t;
		var stype = "#stypediv" + t;
		var stb = ".stypebox" + (t - 1)
		var stype1displaynone = ".stype1displaynone" + t;
		$(nextstype).addClass("bgrdclr");
		$(stb).html("<span class='glyphicon glyphicon-ok'></span>").css("color", "#87BA21").addClass("mouseovercss");
		$(nextstyped).css("border-color", "#4479AE").css("color", "#4479AE");
		$(nextstypep).css("color", "#4479AE");
		$("#stypeback").removeClass("btn-default");
		$("#stypeback").addClass("btn-success");
		$(stype).removeClass("dpynone");
		
		if(t == 4) {
			//参加考试人数
			var peoplenum = $("#ui_totalPersons").text();
			if(peoplenum==0){
				createMessageBox("警告", "请选择参加考试的人员", MSG_ID_OK);
				return
			}
			$("#validation").text("确认发布");
			$(".ui_totalPersons").text("应到" + peoplenum+"人");
			$("#validation").addClass("delivery-info");
		}
		if(t == 2) {
			
			$("#stypeback").removeAttr("disabled");
			getexaminfo();
			
		}
		
	})

	/****************************输入验证******************************/

	/*************************考试时长验证*********************************/
	$("#examDuration").bind('keypress', function(event) {
			var upd4 = this.id; //   获取当前元素的id
			var thisval = $(this).val(); //获取当前元素的value
			$("." + upd4).html(thisval + "分钟");
			var k = event.which;
			if(k >= 48 && k <= 57) {
//				if($("#examDuration").val() > 201) {
//					$("#examDuration").val(200);
//				}
				return true;
			}
			if(k == 8) {
				return true
			}
			var upd4 = this.id //   获取当前元素的id
			var thisval = $(this).val() //获取当前元素的value
			$("." + upd4).html(thisval + "分钟")
			return false;

		})
		/**********************时间插件中禁止输入***********************/
	$("#ui_examTime").bind('keypress', function(event) {
		return false;
	})


		
	$("#selectUseCamera").bind("click", function(event) {
			
			var upd4 = event.target.value; //   获取当前元素的id
			var thisval = $(event).val();//获取当前元素的value
			$("." + upd4).html(thisval);
		})
		/*******************所有input：text输入框change时间 改变字体颜色****************************/
	$("input：text").change(function() {
		$(this).css("color", "#333");
	})
	$("#ui_examTime").click(function() {
		$(this).css("color", "#333");
	})

	$("#cuntverify").bind('change', function(event) {
			if($("#cuntverify").val() > 201) {
				$("#cuntverify").val(200);
			}

		})
		/*********************************************************************/

	$(".bdr-tab").click(function() {
	
		//点击后选择试卷为真
		bdr_tab_click = true;
		var itemName = $(this).attr("itemName");//对应题库
		var paperName = $(this).find("td").eq(1).text();//试卷名称
		var topicQuantity =$(this).find("td").eq(2).text();//题目数量
		var fraction=$(this).find("td").eq(3).text();//总分数
		$(".paperName").text(paperName);
		$(".topicQuantity").text(topicQuantity);
		$(".fraction").text(fraction);
		$(".itemName").text(itemName);
		
		paperId = this.id;
	})

	/******************************** 第一步结束**************************************************/

	/**********************************第二步内容*************************************************/
	//******************试卷选择  鼠标效果**************************/
	$(".bdr-tab").mouseover(function() {
		$(this).css("border-color", "#67CCFF");
		$(this).css("background-color", "#F4F4F4");
		$(this).find(".mouseol").css("background-color", "#F4F4F4");
	})
	$(".bdr-tab").mouseout(function() {
		$(this).css("border-color", "#E7E7E7");
		$(this).css("background-color", "#FFFFFF");
		$(this).find(".mouseol").css("background-color", "#ffffff");
		$(this).children("table").find("td:first").css("background-color", "#F4F4F4");
	})

	$(".bdr-tab").click(function() {
			$(".okcolor").css("color", "#E6E6E6"); //  点击后   全部初始化
			$(this).children("table").find("td:first").children("span").css("color", "#0080FF");
				//当前的   改变样式
			$(".bdr-tab").mouseover();
			$(".bdr-tab").mouseout();
		})
		//*******************试卷选择鼠标效果结束**********************************/

	/******************************************按钮上一步功能*****************************************/
	$("#stypeback").click(function() {
			if(t == 1) {
				$(this).removeClass("btn-success");
				$(this).addClass("btn-default");

				return;
			}
			var nextstypep = ".stypep" + t;
			var stype = "#stypediv" + t;
			var nextstype = ".line-blue" + t;
			var nextstyped = ".stype" + t;

			var stb = ".stypebox" + (t - 1);
			var stype1displaynone = ".stype1displaynone" + t;
			if(t == 2) {
				$(this).removeClass("btn-success");
				$(this).addClass("btn-default");
				$(this).attr("disabled", "disabled");
				$(".newcss").removeClass("col-lg-2 col-md-2");
				$("#validation").parent().addClass("form-submit");
				$("#validation").parent().removeClass("newcss");
			}

			if(t == 4) {
				$("#validation").html('<span class="">下一步 </span> <span class="glyphicon glyphicon-arrow-right  lineheightx" style="margin-right:0;"></span>');
				$("#validation").removeClass("delivery-info");
			}
			$(nextstype).removeClass("bgrdclr");
			$(nextstypep).css("color", "#CCCCCC");
			$(stb).html(t - 1).css("color", "#4479AE").removeClass("mouseovercss" + t);
			$(nextstyped).css("border-color", "#CCCCCC").css("color", "#CCCCCC");
			$(stype).addClass("dpynone");
			t--;
			stype = "#stypediv" + t;

			$(stype).removeClass("dpynone");
		})
		/**********************************************按钮 上一步功能  结束******************************************/

		/********************select效果结束********************/
	$(".kw-nav-name").find("li").click(function() {
		var leibie = $(this).text();
		var updateleibie = leibie + '<span class="caret"></span>'
		$(".jsoshow").html(updateleibie)
	})

	/************************************tab标签页结束**************************************/

	/***********************************************************************/
	$(".mouseol").mouseover(function() {
		$(this).css("background-color", "#FdFdFd");
		$(this).css("color", "#5BC0DE");
		return false
	})
	$(".mouseol").mouseout(function() {
		$(this).css("background-color", "#ffffff");
		$(this).css("color", "#004080");
		return false
	})
	$(".mouseol").click(function() {
		window.open("paper-see.htm");
		return false
	})

	$("#stypediv3").click(function() {
			var somepeople = $("#add-del").find("li").length;
			$(".colorgreen").text(somepeople);
		})
		//编辑通知内容
	$(".showpointer").click(function() {
		$(this).addClass("dpynone");
		textareaval = $(".newsp").find("span:last").text();
		$("#fortextarea").replaceWith('<textarea id="newspan" class="textarea-box " name="" rows="" cols="">' + textareaval + '</textarea><div class="floatrit"><div id="unsubmit" class="btn btn-info" onclick="unsubmitupdate(this)">取消</div><div id="submit" class="btn btn-info"onclick="submitupdate(this)">保存</div></div>')
		$("#martopche").css("margin-top", "30px");
	})
})

/**************************推送通知******************************/

/**************************推送通知结束******************************/
function submitupdate(e) {
	var jjjk = $(".newsp").find("textarea");
	var newnotice = $(".newsp").find("textarea").val();
	$(".newsp").find("textarea").replaceWith('<span id="fortextarea" class="sp-clr-blue">' + newnotice + '</span>')
	$(e).parent().remove();
	$(".showpointer").removeClass("dpynone");
	$("#martopche").css("margin-top", "60px");
}

function unsubmitupdate(e) {
	$(".newsp").find("textarea").replaceWith('<span id="fortextarea" class="sp-clr-blue">' + textareaval + '</span>')
	$(e).parent().remove();
	$(".showpointer").removeClass("dpynone");
	$("#martopche").css("margin-top", "60px");
}

function setnoticeuu() {
	var pfe = $("#add-del").find("li");
	if(ist == pfe.length) {
		clearTimeout(setid);
		location.reload();
		$("input:checkbox").removeAttr("checked");
		return
	}

	var peo = "正在为" + $(pfe[ist]).text() + "发送通知......" + "<img class='col-lg-12 col-md-12 waitgif' src='../../images/examMng/wait.gif' />";
	$("#setnotice").html(peo)
	ist++;
	var setid = setTimeout(function() {
		setnoticeuu();
	}, 1500)

}
function getexaminfo(){
	//考试时长
	var getexamDuration = $("#examDuration").val();
	$(".examDuration").text(getexamDuration);
	//考试时间
	var geteui_examTime = $("#ui_examTime").val();
	$(".ui_examTime").text(geteui_examTime);
	//考试地点
	var getexamAddr = $("#examAddr").val();
	$(".examAddr").text(getexamAddr);
	//考试名称
	var getexamName = $("#examName").val();
	$(".examName").text(getexamName);
	//考试介绍
	var getexamNote = $("#examNote").val();
	$(".examNote").text(getexamNote);
}

