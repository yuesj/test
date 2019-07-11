	var oldval;  //旧的章节名称
	var newval;		//新的章节名称
	//点击编辑触发
	function bianji(use){
		//增加新的选项
		oldval=$(use).parent().parent().parent().children("a").text();
		$(use).parent().parent().parent().html('<div class="text-form"><form class="z-form" action="#" method="get"><input id="new-input" type="text" value="'+oldval+'"/></form><div onclick="bubaocun(this)" class="z-div2"><i class="glyphicon glyphicon-remove"></i><a id="add">取消</a></div><div onclick="baocun(this)" class="z-div1"><i class="glyphicon glyphicon-ok"></i><a>保存</a></div></div>');

	}
	//点击保存按钮触发
	function baocun(use){
		
		newval=$(use).parents(".message-exam").find("input").val();
		if(newval==""){
			$('#baocun').modal({
			      keyboard: true
			})
		}else{
			$(use).parent().parent().html('<a id="addtxt" href="item-type.htm" class="message-exam-title">'+newval+'</a><p class="message-exam-subject">试题：0</p><div class="message-exam-over-bianji" style="display: none;"><div><i class="glyphicon glyphicon-plus-sign"></i><a href="item-type-add-2.htm">添加试题</a></div><div><i class="glyphicon glyphicon-remove-circle"></i><a href="#close-cn" data-toggle="modal">删除</a></div><div><i class="glyphicon glyphicon-pencil"></i><a id="add" onclick="bianji(this)">编辑</a></div><div><i class="glyphicon glyphicon-upload"></i><a href="#">上移</a></div>')
	 
			}
		}
	//点击不保存按钮触发
	function bubaocun(use){
		$(use).parent().parent().html('<a id="addtxt" href="item-type.htm" class="message-exam-title">'+oldval+'</a><p class="message-exam-subject">试题：0</p><div class="message-exam-over-bianji" style="display: none;"><div><i class="glyphicon glyphicon-plus-sign"></i><a href="item-type-add-2.htm">添加试题</a></div><div><i class="glyphicon glyphicon-remove-circle"></i><a href="#close-cn" data-toggle="modal">删除</a></div><div><i class="glyphicon glyphicon-pencil"></i><a id="add" onclick="bianji(this)">编辑</a></div><div><i class="glyphicon glyphicon-upload"></i><a href="#">上移</a></div>')
	}
	
	
	function breaking(use){
		$(use).parent().remove();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	