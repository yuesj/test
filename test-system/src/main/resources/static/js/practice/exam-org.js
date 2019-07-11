$(document).ready(function() {
	$(".fanye").children("a").css("color", "none!important");
	$("#btn-group-a1").css("color", "#3D3D3D"); //默认翻页按钮组数字1为被选中颜色
	$(".btn-group-a2st").css("display", "none"); //隐藏第二组按钮
	$(".btn-group-a3st").css("display", "none"); //隐藏第3组按钮
	$(".tr-hover").mouseover(function() {
		$(this).children("td").css("border-color", "#0080FF") //鼠标指上后改变边框颜色
		$(this).children(".txtleft").css("color", "#4C4C4C!important")
	});
	$(".tr-hover").mouseleave(function() {
		$(this).children("td").css("border-color", "#CCCCCC") //鼠标离开后重置为初始样式
		$(this).children(".txtleft").css("color", "#777777!important")
	});
	//翻页按钮组点击效果
	$(".aclick").click(function() {
		$(".aclick").css("color", "#337AB7"); // 点击后重置所有样式为初始样式
		$(".aclick").css("font-weight", "400"); // 点击后重置所有样式为初始样式
		$(".aclick").css("background-color", "#ffffff");
		$(this).css("background-color", "#cccccc")
		$(this).css("color", "#3D3D3D") //  被点击的元素改变字体颜色
		$(this).css("font-weight", "600") //被点击的元素改变字体粗细
	})
})