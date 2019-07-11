
$(document).ready(function(){
	
	footer_position();
	
	//当浏览器窗口大小改变时，设置显示内容的高度  
	$(window).resize(function(){
		footer_position();
	});
	$(document).bind("keydown", function(e) {
        				e = window.event || e;
            				if (e.keyCode == 13) {
                					
                						
                						return false;
            					
        				}
    			});
});	

/**
   描述：固定底边显示栏
 */
function footer_position(){
	var obj = $(".footer");
	if (obj == null) return;	
	var winHeight = $(window).height();
	var myHeight = winHeight-90-82-20;
	var mainHeight = $(".main-container").height();
	if (mainHeight <= myHeight){
		$(".footer").css("position","fixed");
		$(".footer").css("bottom","0");
		$(".main-container").css("min-height",myHeight+"px");
	}else{
		$(".footer").css("position","initial");
		$(".footer").css("margin-top","15px");
	}
}
/**
  Name       :  nav_bar
  Description:  依据点击的标题栏的名称判断要高亮的内容
 */
function nav_bar(v) {
	//$(".navbar .header .navbar-collapse .navbar-right").children().eq(0).find(".a").css("background-color","#eeeeee");
	//$(".navbar .header .navbar-collapse .navbar-right").children().eq(0).find(".a").css("color","#666");
	//$(".navbar .header .navbar-collapse .navbar-right li").click(function(){

	var nums = $(".nav .nav-pills .nav-main li").length;
	var idx = 0;
	if (v == "题库管理")
		idx = 0;
	else if  (v == "试卷管理")
		idx = 1;
	else if (v == "考试组织")
		idx = 2;
	else if (v == "每日练习")
		idx = 4;	
	var f = $("#lawexam-kw-header-bar").find("li");
		
	f.eq(idx).addClass("active");
}

/**
     描述： 生成统一的标题栏内容（考务）
 */
function add_title_bar(addr, userName){
	var s = "<div class='logo pull-left' href='#'> \
				<img src='" +addr+ "/static/images/logo.png'> \
				<h3 class='pc_title'>考务管理</h3> \
			</div> \
			<div class='collapse navbar-collapse pull-right nav-main-collapse collapse'> \
				<nav class='nav-main'> \
					<ul id='topMain' class='nav nav-pills nav-main'> \
						<li class='dropdown'><a class='dropdown-toggle' href='" +addr+ "/general/itemInfo/list.html' >题库管理</a></li> \
						<li class='dropdown'><a class='dropdown-toggle' href='" +addr+ "/general/paperInfo/list.html'>试卷管理</a></li> \
						<li class='dropdown'><a class='dropdown-toggle' href='" +addr+ "/general/examRecs/list.html'>考试组织</a></li> \
						<li class='dropdown'><a class='dropdown-toggle' href='#'>考试统计</a></li> \
						<li class='dropdown'><a class='dropdown-toggle' href='" +addr+ "/general/itemTask/list.html'>每日练习</a></li> \
						<li class='dropdown'> \
						  <a class='dropdown-toggle' id='dropdownMenu1' href='#' data-toggle='dropdown' aria-haspopup='true' role='menu' aria-expanded='true'> \
						  <i class='glyphicon glyphicon-user'> </i>"+userName+"<span class='caret'></span></a> \
						  <ul class='dropdown-menu kw-nav-name' role='menu'> \
							<li><a href='" +addr+ "/general/exerRecs/user-info.html'>用户信息</a></li> \
							<li><a href='" +addr+ "/background/account/adminUser.html'>管　　理</a></li> \
							<li><a href='" +addr+ "/loginoutkw.html'>安全退出</a></li> \
						  </ul> \
						</li> \
					</ul> \
				</nav> \
			</div>";
	$("#lawexam-kw-header-bar").append(s);
}


