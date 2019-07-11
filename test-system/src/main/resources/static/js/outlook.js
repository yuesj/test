$(function() {
	InitLeftMenu();
	tabClose();
	tabCloseEven();
});
var _menus = null;
// 初始化左侧
function InitLeftMenu() {
	$.post('background/resources/resources.html', null, function(data) {
		if (data.toString().indexOf("alert(") > -1) {
			alert("会话已过期，请重新登陆！");
			window.top.location.href = "index.jsp";
		} else {
			_menus = data;

			$("#nav").accordion({
				animate : true
			});// 为id为nav的div增加手风琴效果，并去除动态滑动效果

			$.each(_menus.menus, function(i, n) {// $.each
				// 遍历_menu中的元素
				var menulist = '';
				menulist += '<ul>';
				$.each(n.menus, function(j, o) {
					menulist += '<li><div><a ref="' + o.menuid
							+ '" href="javascript:void(0)" rel="' + o.url
							+ '" ><span class="icon ' + o.icon
							+ '" >&nbsp;</span><span class="nav">' + o.menuname
							+ '</span></a></div></li> ';
				});
				menulist += '</ul>';

				$('#nav').accordion('add', {
					title : n.menuname,
					content : menulist,
					iconCls : 'icon ' + n.icon
				});

			});

			$('.easyui-accordion li a').click(function() {// 当单击菜单某个选项时，在右边出现对用的内容
				var tabTitle = $(this).children('.nav').text();// 获取超链里span中的内容作为新打开tab的标题

				var url = $(this).attr("rel");
				var menuid = $(this).attr("ref");// 获取超链接属性中ref中的内容
				var icon = getIcon(menuid, icon);
				
				addTab(tabTitle, url, icon);// 增加tab
				
				$('.easyui-accordion li div').removeClass("selected");
				$(this).parent().addClass("selected");
			}).hover(function() {
				$(this).parent().addClass("hover");
			}, function() {
				$(this).parent().removeClass("hover");
			});

			// 选中第一个
			var panels = $('#nav').accordion('panels');
			var t = panels[0].panel('options').title;
			$('#nav').accordion('select', t);
		}
	});

}
// 获取左侧导航的图标
function getIcon(menuid) {
	var icon = 'icon ';
	$.each(_menus.menus, function(i, n) {
		$.each(n.menus, function(j, o) {
			if (o.menuid == menuid) {
				icon += o.icon;
			}
		});
	});

	return icon;
}

function getMenuByTitle(title){
	var menu;
	$.each(_menus.menus, function(i, n) {
		$.each(n.menus, function(j, o) {
			if (o.menuname == title) {
				menu = o;
			}
		});
	});
	return menu;
}

// 直接调用菜单
function openMenu(title, param)
{
	debugger;
	var menu = getMenuByTitle(title);
	if(menu == null)
	{
		return;
	}
	var icon = getIcon(menu.menuid);
	var url = menu.url;
	if(param && param != "")
	{
		if(url.indexOf('?') < 0)
		{
			url = url + "?" + param;
		}
		else
		{
			url = url + "&" + param;
		}
	}
	addTab(menu.menuname, url, icon);// 增加tab
}

function addTab(subtitle, url, icon) {
	if (!$('#tabs').tabs('exists', subtitle)) {

		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(url, 0),
			closable : true,
			icon : icon
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		$('#mm-tabupdate').click();
	}
	tabClose();
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		if (subtitle == '首页') {
			return;
		}
		$('#tabs').tabs('close', subtitle);
	});
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
}
// 绑定右键菜单事件
function tabCloseEven() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#tabs').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url, 1)
			}
		});
	});
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		if (currtab_title == '首页') {
			return;
		}
		$('#tabs').tabs('close', currtab_title);
	});
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if (t != '首页') {
				$('#tabs').tabs('close', t);
			}
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if (t != '首页') {
				$('#tabs').tabs('close', t);
			}
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if (t != '首页') {
				$('#tabs').tabs('close', t);
			}
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	});
}
// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}
