var a = [];
var b = [];
var i;
var mm;
var t = 1;
var selname; //变量实现点击勾选checkbox生成对应的条目（当前li下的input的val（））、
var delli;
var policeztree = "（x45646554456654546465456654xx公安局）"
var addnumb = 0; //(通过没次+1 实现add变量的每次不同类名赋值)
var add; //动态添加类名 （a+addnumb++）
var bb;
var dd = 0;
var ff;
var selectval = $("input:checkbox");
var m;
var policename = "";
var textareaval;
var ist = 0;
var ttice = 0;
var value1 = $("#text1").val()
var value2 = $("#text2").val()
var value3 = $("#text3").val()
var value4 = $("#text4").val()
var value5 = $("#text5").val()
var value6 = $("#text6").val()

/***********************************ztree  js代码段开始*****************************/
/***************单位选择项div开始*****************/

var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {};
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
var zNodes = [{
		name: "政治部",
		open: true,
		children: [{
			name: "秘书科"
		}, {
			name: "档案科",
			open: false,
			children: [{
				name: "警员123",
				open:false,
				children:[{
					name:"解决数据库了上大夫第三",
					open:false,
					children:[{
					name:"解决数据库了上大夫第三",
					open:false,
					children:[{
					name:"解决数据库了上大夫第三"
					
				}]
				}]
				}]
			}, {
				name: "警员123"
			}, {
				name: "警员123"
			}, {
				name: "警员123"
			}, {
				name: "警员123"
			}, {
				name: "警员123"
			}, {
				name: "警员123"
			}, {
				name: "警员123"
			}]
		}]
	}, {
		name: "宣传部",
		open: true,
		children: [{
			name: "秘书科"
		}, {
			name: "档案科"
		}]
	}, {
		name: "后勤部",
		open: true,
		children: [{
			name: "秘书科"
		}, {
			name: "档案科"
		}]
	}, {
		name: "财务部",
		open: true,
		children: [{
			name: "秘书科"
		}, {
			name: "档案科"
		}]
	}, {
		name: "test2",
		open: true,
		children: [{
			name: "t秘书科"
		}, {
			name: "档案科"
		}]
	}
];
/******************单位选择项div结束*************************/

/*******************************ztree js代码段结束*********************************/
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
		debugger
 value1 = $("#text1").val();
 value2 = $("#text2").val();
 value3 = $("#text3").val();

 value6 = $("#text6").val();

		if(t==1){
			if(isNaN(value2)||value1==""||value1=="请输入考试名称"||value2==""||value2=="请设置考试时间"||value3==""||value3=="请输入考试地点"||value6==""||value6=="请输入考试的简要介绍"){
		createMessageBox("警告", "您的输入有误，请检查选项", MSG_ID_OK,null);
		return;
			}
			
				$("#stypediv1").addClass("dpynone");
			
			
			}
		var nextstype = ".stype" + t;
		var nextstypep = ".stypep" + t;
		var stype = "#stypediv" + t
		var stype1displaynone = ".stype1displaynone" + t;
		$(stype).addClass("dpynone");
		t++;
		if(t == 5) {
			$("#myModal1234").click();
			setnoticeuu();
			t = t - 1;
		}
		var nextstype = ".stype" + t;
		var nextstypep = ".stypep" + t;
		var stype = "#stypediv" + t
		var stype1displaynone = ".stype1displaynone" + t;
		$(nextstype).addClass("bgrdclr")
		$(nextstypep).css("color", "#4479AE")
		$("#stypeback").parent().removeClass("dpynone");
		
		
		
		$(stype).removeClass("dpynone");
		if(t == 4) {
			$("#validation").text("确认发布");
			$("#validation").addClass("delivery-info")
		}
		
	})
/****************************输入验证******************************/
	$("#text1").blur(function() {
		if($(this).val() == value1 || $(this).val() == "") {
			$(this).css("border-color", "red")
			$(this).parent().append('<span class="jinggao">' + value1 + '</span>')
			$(this).width()
		} else {
			$(this).parent().find("span").remove()
			$(this).css("border-color", "#CCCCCC")
		}
	})
	$("#text1").focus(function() {
		$(this).parent().find("span").remove()
		$(this).css("border-color", "#CCCCCC")
	})

	$("#text2").blur(function() {
		if($(this).val() == value2 || $(this).val() == "") {
			$(this).css("border-color", "red")
			$(this).parent().append('<span class="jinggao text22">' + value2 + '</span>')
			var spanposition = $(this).parent().width() - $(this).parent().find("span").width()-45 + "px"
			$(this).parent().find("span").css("left", spanposition)
		} else {
			$(this).parent().find("span").remove()
			$(this).css("border-color", "#CCCCCC")
		}
	})
	$("#text2").focus(function() {
		$(this).parent().find("span").remove()
		$(this).css("border-color", "#CCCCCC")
	})

	$("#text3").blur(function() {
		if($(this).val() == value3 || $(this).val() == "") {
			$(this).css("border-color", "red")
			$(this).parent().append('<span class="jinggao">' + value3 + '</span>')
			$(this).width()
		} else {
			$(this).parent().find("span").remove()
			$(this).css("border-color", "#CCCCCC")
		}
	})
	$("#text3").focus(function() {
		$(this).parent().find("span").remove()
		$(this).css("border-color", "#CCCCCC")
	})

//	$("#text4").blur(function() {
//		if($(this).val() == value4 || $(this).val() == "") {
//			$(this).css("border-color", "red")
//			$(this).parent().append('<span class="jinggao">' + value4 + '</span>')
//			$(this).width()
//		} else {
//			$(this).parent().find("span").remove()
//			$(this).css("border-color", "#CCCCCC")
//		}
//	})
//	$("#text4").focus(function() {
//		$(this).parent().find("span").remove()
//		$(this).css("border-color", "#CCCCCC")
//	})
//
//	$("#text5").blur(function() {
//		if($(this).val() == value5 || $(this).val() == "") {
//			$(this).css("border-color", "red")
//			$(this).parent().append('<span class="jinggao">' + value5 + '</span>')
//			$(this).width()
//		} else {
//			$(this).parent().find("span").remove()
//			$(this).css("border-color", "#CCCCCC")
//		}
//	})
//	$("#text5").focus(function() {
//		$(this).parent().find("span").remove()
//		$(this).css("border-color", "#CCCCCC")
//	})

	$("#text6").blur(function() {
		if($(this).val() == value6 || $(this).val() == "") {
			$(this).css("border-color", "red")
			$(this).parent().append('<span class="jinggao">' + value6 + '</span>')
		} else {
			$(this).parent().find("span").remove()
			$(this).css("border-color", "#CCCCCC")
		}
	})
	$("#text6").focus(function() {
		$(this).parent().find("span").remove()
		$(this).css("border-color", "#CCCCCC")
	})
		
	/******************************** 第一步结束**************************************************/

	/**********************************第二步内容*************************************************/
	//******************试卷选择  鼠标效果**************************/
	$(".bdr-tab").mouseover(function() {
		$(this).css("border-color", "#67CCFF")
		$(this).css("background-color", "#F4F4F4")
	})
	$(".bdr-tab").mouseleave(function() {
		$(this).css("border-color", "#E7E7E7")
		$(this).css("background-color", "#FFFFFF")
		$(this).children("table").find("td:first").css("background-color", "#F4F4F4")
	})

	$(".bdr-tab").click(function() {
			$(".okcolor").css("color", "#E6E6E6"); //  点击后   全部初始化
			$(this).children("table").find("td:first").children("span").css("color", "#0080FF")
				//当前的   改变样式
			$(".bdr-tab").mouseover();
			$(".bdr-tab").mouseleave();
		})
		//*******************试卷选择鼠标效果结束**********************************/

	/******************************************按钮上一步功能*****************************************/
	$("#stypeback").click(function() {
			var nextstype = ".stype" + t;
			var nextstypep = ".stypep" + t;
			var stype = "#stypediv" + t;
			var stype1displaynone = ".stype1displaynone" + t;
			if(t == 2) {
				$(this).parent().addClass("dpynone");
				$(".newcss").removeClass("col-lg-2 col-md-2");
				$("#validation").parent().addClass("form-submit");
				$("#validation").parent().removeClass("newcss");
			}

			if(t == 4) {
				$("#validation").html('<span class="floatleft">下一步 </span> <span class="glyphicon glyphicon-arrow-right floatrit lineheightx" style="margin-right:0;"></span>');
				$("#validation").removeClass("delivery-info");
			}
			$(nextstype).removeClass("bgrdclr");
			$(nextstypep).css("color", "#CCCCCC");
			$(stype).addClass("dpynone");
			t--;
			stype = "#stypediv" + t;
			$(stype).removeClass("dpynone");
		})
		/**********************************************按钮 上一步功能  结束******************************************/
		/*********单位选择--div初始化（ztree）************/

	zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	/************************************************/

	/*********************tab标签页开始*************************/
	$(".divtopright").click(function() {
		
		$(".divtopleft").removeClass("current"); //删除定位 层级样式
		$(this).addClass("current"); //添加定位  层级样式
		$(".ul-left").addClass("dpynone"); //隐藏民警
		$(".ul-right").removeClass("dpynone"); //显示协警
	})
	$(".divtopleft").click(function() {
		$(".divtopright").removeClass("current");
		$(this).addClass("current");
		$(".ul-right").addClass("dpynone");
		$(".ul-left").removeClass("dpynone");
	})
	$(".ul-left").children("li").click(function() {
		
		selname = $(this).children("input").val();
		addnumb += 1;
		add = "a" + addnumb
		delli = "." + add
		bb = "b" + dd
		dd++;
		if($(this).children("input").prop("checked") == true) {
			$(this).children("input").removeAttr("checked");
			$(this).attr("id", bb)
			addnumb = addnumb - 1;
			add = "a" + addnumb
			delli = "." + add
			ff = $("#add-del").children("li")
			var fd = $(this).attr("delids")
			for(var ds = 0; ds < ff.size(); ds++) {
				if($(ff[ds]).attr("delids") == fd) {
					$(ff[ds]).remove();
				}
			}
			addnumb = addnumb - 1;
			return;
		} else {
			$(this).children("input").prop("checked", "checked");
			$("#add-del").append('<li data-toggle="tooltip" data-placement="bottom" title="'+policeztree+'" delids="' + bb + '" class="li-add-del "><span class="floatleft spfirst">' + selname + policeztree + '</span><span onclick="delpolice(this)"  class="glyphicon glyphicon-minus-sign colordel floatrit"></span></li>')
			$(this).attr("delids", bb);
			$('[data-toggle="tooltip"]').tooltip()
		}
	})

	$(".ul-right").children("li").click(function() {
		
			selname = $(this).children("input").val();
			addnumb += 1;
			add = "a" + addnumb
			delli = "." + add
			bb = "b" + dd
			dd++;
			if($(this).children("input").prop("checked") == true) {
				$(this).children("input").removeAttr("checked");
				$(this).attr("id", bb)
				addnumb = addnumb - 1;
				add = "a" + addnumb
				delli = "." + add
				ff = $("#add-del").children("li")
				var fd = $(this).attr("delids")
				for(var ds = 0; ds < ff.size(); ds++) {
					if($(ff[ds]).attr("delids") == fd) {
						$(ff[ds]).remove();
					}
				}
				addnumb = addnumb - 1;
				return;
			} else {
				$(this).children("input").prop("checked", true);
				$("#add-del").append('<li data-toggle="tooltip" data-placement="bottom" title="'+policeztree+'" delids="' + bb + '" class="li-add-del "><span class="floatleft spfirst">' + selname + policeztree + '</span><span onclick="delpolice(this)"  class="glyphicon glyphicon-minus-sign colordel floatrit"></span></li>')
				$(this).attr("delids", bb);
				$('[data-toggle="tooltip"]').tooltip()
			}
		})
		/********************select效果开始********************/
	$("#allpeople").click(function() {
		$(".primary").removeClass("dpynone"); //显示初级 
		$(".intermediate").removeClass("dpynone"); //显示中级
		$(".senior").removeClass("dpynone"); //显示高级
		selectval = $("input:checkbox");
		
	})
	$("#item-primary").click(function() {
		$(".primary").removeClass("dpynone"); //显示初级 
		$(".intermediate").addClass("dpynone"); //隐藏中级
		$(".senior").addClass("dpynone"); //隐藏高级
		selectval = $(".primary");
		
	})
	$("#item-intermediate").click(function() {
		$(".primary").addClass("dpynone"); //隐藏初级 
		$(".intermediate").removeClass("dpynone"); //显示中级
		$(".senior").addClass("dpynone"); //隐藏高级
		selectval = $(".intermediate");
		
	})
	$("#item-senior").click(function() {
			$(".primary").addClass("dpynone"); //隐藏初级 
			$(".intermediate").addClass("dpynone"); //隐藏中级
			$(".senior").removeClass("dpynone"); //显示高级
			selectval = $(".senior");
			
		})
		/********************select效果结束********************/
	$(".kw-nav-name").find("li").click(function() {
			var leibie = $(this).text();
			var updateleibie = leibie + '<span class="caret"></span>'
			$(".jsoshow").html(updateleibie)
		})
		/************************************tab标签页结束**************************************/
		/************************************动态生成li统计****************************************************/

	$("#allchoose").click(function() {
		if(selectval.length == $("input:checkbox").size()) {
			for(m = 0; m < selectval.length; m++) {
				if($(selectval[m]).prop("checked") == true) {
					$(selectval[m]).removeAttr("checked");
					var bl = $(selectval[m]).parent().attr("delids")
					var cz = $("#add-del").find("li")
					for(i = 0; i < cz.length; i++) {
						if($(cz[i]).attr("delids") == bl) {
							$(cz[i]).remove()
						}
					}
				}
			}
			selectval.prop("checked", "checked");
		} else {
			for(m = 0; m < selectval.length; m++) {
				var xx = $(selectval[0]).children("input").prop("checked")
				if($(selectval[m]).children("input").prop("checked") == true) {
					$(selectval[m]).children("input").removeAttr("checked");
					var bl = $(selectval[m]).attr("delids")
					var cz = $("#add-del").find("li")
					for(i = 0; i < cz.length; i++) {
						if($(cz[i]).attr("delids") == bl) {
							$(cz[i]).remove()
						}
					}
				}
			}
			selectval.children("input").prop("checked", "checked");
		}
		for(m = 0; m < selectval.length; m++) {
			if(selectval.length == $("input:checkbox").size()) {
				policename = $(selectval[m]).val();
			} else {
				policename = $(selectval[m]).children("input").val();
			}
			bb = "b" + dd
			dd++;
			if(selectval.length == $("input:checkbox").size()) {
				$(selectval[m]).parent().attr("delids", bb);
			} else {
				$(selectval[m]).attr("delids", bb);
			}
			$("#add-del").append('<li data-toggle="tooltip" data-placement="bottom" title="'+policeztree+'" delids="' + bb + '" class="li-add-del " ><span class="floatleft spfirst">' + policename + policeztree + '</span><span onclick="delpolice(this)"  class="glyphicon glyphicon-minus-sign colordel floatrit"></span></li>')
			
			$('[data-toggle="tooltip"]').tooltip()
		}
	})
	$("#allchoosedel").click(function() {
		$("input:checkbox").attr("checked", false)
		$("#add-del").children("li").remove();
		
	})

	$("#stypediv3").click(function() {
			var somepeople = $("#add-del").find("li").length;
			$(".colorgreen").text(somepeople)
		})
		//编辑通知内容
	$(".showpointer").click(function() {
		$(this).addClass("dpynone");
		textareaval = $(".newsp").find("span:last").text();
		$("#fortextarea").replaceWith('<textarea id="newspan" class="textarea-box " name="" rows="" cols="">' + textareaval + '</textarea><div class="floatrit"><div id="unsubmit" class="btn btn-info" onclick="unsubmitupdate(this)">取消</div><div id="submit" class="btn btn-info"onclick="submitupdate(this)">保存</div></div>')
		$("#martopche").css("margin-top","30px")
	})
})

/**************************动态生成  的 li（点击添加警员）   点击同步删除效果********************************/
function delpolice(use) {
	var afk = $(use).parent().attr("delids")
	$(use).parent().remove();
	$("#add-del").find(".tooltip").remove()
	var uu = $(".divmiddle").children("ul").children("li");
	for(var f = 0; f < uu.length; f++) {
		if($(uu[f]).attr("delids") == afk) {
			$(uu[f]).children("input").removeAttr("checked", false);
			$(uu[f]).attr("delids", "nonn");
		}
	}
}

/**************************推送通知******************************/

/**************************推送通知结束******************************/
function submitupdate(e) {
	var jjjk = $(".newsp").find("textarea")
	var newnotice = $(".newsp").find("textarea").val();
	$(".newsp").find("textarea").replaceWith('<span id="fortextarea" class="sp-clr-blue">' + newnotice + '</span>')
	$(e).parent().remove()
	$(".showpointer").removeClass("dpynone")
	$("#martopche").css("margin-top","60px")
}

function unsubmitupdate(e) {
	$(".newsp").find("textarea").replaceWith('<span id="fortextarea" class="sp-clr-blue">' + textareaval + '</span>')
	$(e).parent().remove();
	$(".showpointer").removeClass("dpynone");
	$("#martopche").css("margin-top","60px")
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