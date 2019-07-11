    var localObj = window.location;
    var contextPath = localObj.pathname.split("/")[1]; //项目的相对路径
    ////当前用户的部门ID   curUserDeptId:在jsp页面上定义的变量
    // var currentUserDeptId=curUserDeptId; 
    var zTree1;
	var setting;
	var rootId = null;//最根节点的子节点的Id 
	
	//通过人员联系等级，确定span的class属性和名称。0-初级，1-中级，2-高级
	var pracLevel=["colorgray","初级", "intermediate1","中级", "senior1","高级"];
	var selectVal;
	var currCheckListCount = 0;
	var currSelectedCount = 0;
	var totalSelectCount = 0;
	var localPath = "/"+contextPath+"/general";
	var accountIds = "";
	var parent;
	var obj;
	var ckobj;
	var cuntuser=0;
	setting = {
/*		check:{
			enable: true,  //是否用可checkbox
			chkboxType:{ "Y" : "ps", "N" : "ps" },
			chkStyle :"checkbox",
		},	*/	
		showLine: true,
		data: {
				simpleData: {
					enable: true
				}
		},
/*		async:{
			enable:true,
			url:getAsyncUrl,
			autoParam:["id", "name=n", "level=lv"],
			otherParam:{"chk":"chk"},
		}, */
		callback:{
			beforeAsync: zTreeBeforeAsync,
			asyncSuccess: zTreeOnAsyncSuccess,
			asyncError: zTreeOnAsyncError,
			onClick: zTreeOnClick,	
			onCheck: zTreeOnCheck,
			beforeExpand: zTreeBeforeExpand,
			onExpand: zTreeOnExpand
		}
	};
	
	/* 创建节点
       nodes   - 节点对象
	   data    - 数据来源
	   idx     - 数据索引
	   len     - 数据长度
	*/
	function createNodes(nodes, data, idx, len){
		var zNodes   = []; 
		var i = idx;
		for(; i<len; i++){ //获得最根节点的所有节点,即这棵树只展示一级节点和二级节点，往下的节点需要异步请求来获取
			if (data[i].leaf > 0){
				parent = true;
			}else{
				parent = false;
			} 
			var v = {id:data[i].id,name:data[i].name, pId:data[i].parentId,isParent:parent,open:false}; //nocheck:!parent
			zNodes.push(v);
		}

		zTree1.addNodes(nodes, zNodes, true);		
	}
    /**
	    依据给定的node节点，查找出该节点1,2级的所有子目录。
	*/
	function buildTree(nodes, data) {
		//最根节点
		 parent;

		if (data[0].leaf > 0){
			parent = true;
		}else{
			parent = false;
		}
		
		var rootNode;

		//初始化树
		if (nodes == null) {
			rootId = data[0].id;
			var node = {id:data[0].id,name:data[0].name, pId:"-1",isParent:parent, open:false};
			zTree1 = $.fn.zTree.init($("#tree2"), setting, node);
		}
		rootNode = zTree1.getNodeByParam("id", rootId); 
		createNodes(rootNode, data, 1, data[0].leaf);
		//zTree1 = $("#tree2").zTree(setting, zNodes);
		//展开根节点
		//var rootNode=zTree1.getNodeByParam("id",rootNode.id); 
		zTree1.expandNode(rootNode,true,false);	
	}
	
	$(document).ready(function(){
		
    //获得组织机构树的请求
		$.ajax({
			type : "post", //使用get方法访问后台
			dataType : "json", //json格式的数据
			async : true, //同步   不写的情况下 默认为true
			url : localPath+"/itemTask/getOrgTree.html", //要访问的后台地址
			success : function(data) {
				//最根节点
				 buildTree(null, data);
			    
			}
		});
		// 初始化操作函数
		initHtmlEl(this);
		$("#unitUserQ").click(function() {
			accountIds = "";
			var userNames="";
			var options =$("#selectList").find("li"); 
			var len = options.length;
			
			$('#ui_totalPersons').html(len);
			
			for ( var i = 0; i < len; i++) {
				accountIds += options[i].id+";";
				
				var tempUserNames=options.eq(i).find("span").eq(0).text();
				
//				userNames+=tempUserNames.substring(0,tempUserNames.indexOf('&'))+";"
				userNames+=tempUserNames+";"
			}
			$("#ui_personList").html(userNames);
		});	
	});
	//
	$("#selectList").click(function(event){
		var objm = $(event.target).parents("li");
		var i=0;
		if($(event.target).hasClass("glyphicon-remove")){
			
		if(!!objm){
			
			var mName = $(objm).find("span").eq(0).text();
			var sta = $("#middleulli").find("li");
			
			for ( i= 0; i<sta.length;i++) {
				if(mName==sta.eq(i).find("div").attr("value")){
					sta.eq(i).find("div").find("span").toggleClass("bgccbox");
					sta.eq(i).find("div").attr("checkedos","0")//更改状态参数
					cuntuser--;//选中人员计数
					$("#choosepeople").text(cuntuser);//实时更新选中人员 
				}
				
			}
			if(!!sta){
//				cuntuser--;//选中人员计数
				$("#choosepeople").text(cuntuser);
			}
			$(objm).remove();
		}
		}
	})
	 //获得当前人员所在部门的所有人员做组织机构的默认展示======start======	
	//curUserDeptId:在jsp页面定义的变量

	$(".divmiddle").click(function(event){
		 obj = event.target;//获取被点击的元素
		 ckobj=$(obj).parents("li");//找到被点击元素所属的  li标签
		if(obj!=this){ //判断点击的是不是  父标签
			if(!!ckobj){
				if($(ckobj).find("div").attr("checkedos")==0){
					$(ckobj).find("div").find("span").toggleClass("bgccbox ");//模拟checkbox打钩
					$(ckobj).find("div").attr("checkedos","1");//更改打钩状态
					var pName = $(ckobj).find("div").attr("value");
					var idin = ckobj.find("div").attr("id");
					$("#selectList").append("<li id='"+idin+"' searchid ='"+idin+"' class='newli'><span class='pname floatleft'>"+pName+"</span><span></span><span class='glyphicon glyphicon-remove colorred floatrit'></span></li>");
					cuntuser++;
					$("#choosepeople").text(cuntuser);
				}else{
					$(ckobj).find("div").find("span").toggleClass("bgccbox");
					$(ckobj).find("div").attr("checkedos","0");
					
					var del_u =$("#selectList").find("li");
					for (i=0;i<del_u.length;i++) {
					var  condition=del_u.eq(i).find("span").eq(0).text();
					if(condition==ckobj.find("div").attr("value")){
						del_u.eq(i).remove();
						cuntuser--;
						$("#choosepeople").text(cuntuser);
					}
					}
				}
			}
		}
	})
	
	function selectPerson(obj) {
		   //获取所用的li标签
		   var options =  $("#selectList").find("li");

		  
		   //在check去掉勾选的情况下,
		   if ($(obj).find("div").attr("checkedos") == undefined || $(obj).find("div").attr("checkedos") == 0){
			   if (options.length != 0){
					for(var i=0; i<options.length; i++){
						//var s=this.id;
						 if(obj.id == options[i].id){
							//获得父li标签的父节点节点ul标签
							var t = document.getElementById('selectList');
							//去掉勾选时，删除选中的li标签
							t.removeChild(options[i]);
							break;
						}
					}
				 }
				currSelectedCount--;
				totalSelectCount--;
		   }else{
				addSelectList(obj);
		   }
		   
		   if (currSelectedCount == 0){
				document.getElementById('allchoose').innerHTML = '全选';
			}
		
			if (currSelectedCount == currCheckListCount){
				document.getElementById('allchoose').innerHTML = '反选';
			}
			$("#choosepeople").text(totalSelectCount);		
	}
	/**!
	    更新选中列表的内容。
		obj - 选中对象
	*/
	function addSelectList(obj){
		
	   var defaultSrc="/"+contextPath+"/static/images/examMng/xx_2.png";//默认图片
	   var changeSRC="/"+contextPath+"/static/images/examMng/xx_1.png";//切换图片
	   var s =  "<li id='"+obj.id+"'>"+obj.value+"&nbsp;  \
				  <span id='del-"+obj.id+"' class='glyphicon glyphicon-minus-sign colordel floatrit' title='删除' \
				    onclick='delSelectUser(this)'> </span></li>";  
	 //  var s =  "<li id='"+obj.id+"'>"+obj.value+"&nbsp; \
	//			<img class='delUnitTreeUserImg glyphicon glyphicon-minus-sign colordel floatrit', src='"+defaultSrc+"' title='删除'></li>";
   
	   $("#selectList").append(s);//用于回显用户
/*		   
		//激活删除事件
		$(".delUnitTreeUserImg").on("click", function(){       
		   delSelectUser(this);
		});			   
	   //激活切换红色图片
		 $(".delUnitTreeUserImg").on("mouseover",function(){
		       $(this).attr("src", changeSRC); 
		 });
		 
		 //激活切换红色图片
		 
		 $(".delUnitTreeUserImg").on("mouseout",function(){
		       $(this).attr("src", defaultSrc);
		 });
*/		
		currSelectedCount++;
		totalSelectCount++;
		//更新人数显示
		$("#choosepeople").html(totalSelectCount);
	}
 
	function initSelectList(accountList) {
		var tmp="";
		accountIds = "";
		var defaultSrc ="/"+contextPath+"/static/images/examMng/xx_2.png";//默认图片
		var changeSrc  ="/"+contextPath+"/static/images/examMng/xx_1.png";//切换图片
		
		for (var i = 0; i < accountList.length; i ++) {
			var s = '<li id="'+accountList[i].id+'"> ' + accountList[i].name+ '&nbsp; \
					<span id="del-'+accountList[i].id+'"  \
					  class="glyphicon glyphicon-minus-sign colordel floatrit" title="删除" \
					  onclick="delSelectUser(this)"> </span></li>';  
		   $("#selectList").append(s);
		   tmp += accountList[i].name + "; "
		   accountIds += accountList[i].id +";";
		}
		totalSelectCount = accountList.length;
		$("#choosepeople").html(totalSelectCount);
		$("#ui_totalPersons").html(totalSelectCount);
		$("#ui_personList").html(tmp);		
	}
	
	function getAsyncUrl(treeNode) {  
		var obj = $('#'+treeNode);
		
		if (obj.id==rootId){//如果是根节点，不需要异步请求，因为根节点为默认展开节点
			return;
		}else{
			var url = localPath+"/itemTask/getOrgTree.html?id="+treeNode.id;	    
			return url;
		}
	};	
	
	function getTime() {
		var now= new Date();
		var hour=now.getHours();
		var minute=now.getMinutes();
		var second=now.getSeconds();
		return (hour+":"+minute+":"+second);	
	}
	
	function zTreeBeforeAsync(treeId, treeNode) {
		return true;
	}
	// 
	function zTreeOnAsyncSuccess(event, treeId, treeNode, msg){
		var rootNode = zTree1.getNodeByParam("id", fid);//上一级节点对象 
		var benNode  = zTree1.getNodeByParam("id", currentDept); //本单位节点对象 
		
		zTree1.expandNode(rootNode,true,false);
		zTree1.selectNode(benNode);
		 //alert("zTreeOnAsyncSuccess");
	}
	function zTreeOnAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
		alert("zTreeOnAsyncError");
	}
	function reloadAsync() {
		var treeNode = zTree1.getSelectedNode();
		if (!treeNode) {
			alert("reloadAsync");
			return;
		}
		zTree1.reAsyncChildNodes(treeNode, $("#refreshType").attr("checked") ? "refresh" : "add");
	}
	/* ztree 点击触发事件*/
	function zTreeOnClick(event, treeId, treeNode) {
		var nodeid = treeNode.id;
		//alert(nodeid);
		var nodename = treeNode.name;
		var parentid = treeNode.parentId;
		//currCheckListCount = 0;
		//currSelectedCount = 0;
		document.getElementById('allchoose').innerHTML = '全选';
		//点击树的节点获取当前节点的人员
		$.ajax({
			type : "post", //使用get方法访问后台
			dataType : "json", //json格式的数据
			async : true, //同步   不写的情况下 默认为true
			url : localPath+'/itemTask/getOrgMembers.html?orgId='+nodeid, //要访问的后台地址
			success : function(data) {
				$("#users").empty();
				var ch="";
				var cz = $("#selectList").find("li");
				var hasSelectedFlag = false;
				//获取单位名称
				
				currCheckListCount = data.length;
				
				if( data.length<=0){
					
				}
				//alert(currCheckListCount);
				
				for(var i=0; i<currCheckListCount; i++){
					var s = "<li delids='nonn' class='primary'> \
								<div class='checkboxclick' id='" +data[i].id+ "' value='"+data[i].name+ "'checkedos='0'><span class='borders'></span> </div>\
								<span class='sp-algn-left'>" +data[i].name+ "</span> \
								<span class='sp-algn'>·················</span> \
								<span class='colorgray'>初级</span> \
							</li>";	
					//将checkbox放到人员列表<div class='wh20'></div> 
					
					
					$("#users").append(s);
					tmpId = data[i].id;
					var ss = document.getElementById('del-' + tmpId);
					if (ss){
						document.getElementById(tmpId).checked = true;
					}
					//ch += "<input type='checkbox' id='"+data[i].id+"' class='primary'  value='"+data[i].name+"'/>"+data[i].name+"<br/>";
				}
				console.log(data[0]);
			}
		});		
	}
	
	function zTreeOnCheck(event, treeId, treeNode) {
		zTreeOnClick(event, treeId, treeNode);
		selectAllProc();
	}
	
	function zTreeBeforeExpand(treeId, treeNode) {
		if (treeNode.id == rootId){
			return;
		}

		zTree1.removeChildNodes(treeNode);
		treeNode.isParent = true;
	}
	
	function zTreeOnExpand(event, treeId, treeNode) {
		if (treeNode.id == rootId){
			return;
		}
		$.ajax({
			type : "post", //使用get方法访问后台
			dataType : "json", //json格式的数据
			async : true, //同步   不写的情况下 默认为true
			url : localPath+"/itemTask/getOrgTree.html?pId="+treeNode.id, //要访问的后台地址
			success : function(data) {
				//最根节点
				 createNodes(treeNode, data, 0, data.length);
			}
		});
	}
	
	//删除某一个选中人员
    function delSelectUser(thisObj){
		var cz = $("#selectList").find("li")
		//获得当前节点的父节点
		var parent = thisObj.parentNode;
		//获得父节点的父节点
		var gradParent = parent.parentNode;
		//删除父节点
		gradParent.removeChild(parent); 
		
		//获得与之对应的checkbok
		// var checkboxId=parent.id;
		var t = document.getElementById(parent.id);
		if (t != null){
			t.checked = false;
		}
		
		currSelectedCount--;
		if (currSelectedCount == 0){
			document.getElementById('allchoose').innerHTML = '全选';
		}
		
		totalSelectCount--;
		$("#choosepeople").text(totalSelectCount);
    }
	
	//选择全部或者取消全部人员选择。
	function selectAllProc() {
		var m = 0;
		
		if (currCheckListCount == 0) return;
		
		selectVal = $("input:checkbox");
		var selectLen = selectVal.length;
		var cz = $("#selectList").find("li")
		var czLen = cz.length;			
		
		if (currSelectedCount == currCheckListCount) { //移除
			for(m = 0; m < selectLen; m++){
				if ($(selectVal[m]).prop("checked") == true) {
					
					for(i = 0; i < czLen; i++) {
						if(selectVal[m].id == cz[i].id) {
							$(cz[i]).remove();	
							totalSelectCount--;								
							break;
						}
					}
					$(selectVal[m]).removeAttr("checked");						
				}
			}
			this.innerHTML = '全选';
			currSelectedCount = 0;
			$(".colorgreen").text(totalSelectCount);
		}else{
			for(m = 0; m < selectLen; m++){ //增加
				if ($(selectVal[m]).prop("checked") == false) {
					addSelectList(selectVal[m]);
					$(selectVal[m]).prop("checked", "checked");
					//currSelectedCount++;
				}
			}
			this.innerHTML = '清除';
			currSelectedCount = currCheckListCount;				
		}		
	}
	function initHtmlEl(obj) {
	
	
		$(".divtopright").click(function() {
			
			$(".divtopleft").removeClass("current"); //删除定位 层级样式
			$(this).addClass("current"); //添加定位  层级样式
			$(".ul-left").addClass("dpynone"); //隐藏民警
			$(".ul-right").removeClass("dpynone"); //显示协警
		});
		
		$(".divtopleft").click(function() {
			$(".divtopright").removeClass("current");
			$(this).addClass("current");
			$(".ul-right").addClass("dpynone");
			$(".ul-left").removeClass("dpynone");
		});
		
		
	}
	$("#allchoose").click(function() {
			var u_msg = $("#middleulli").find("li");
			for (i=0;i<u_msg.length;i++) {
				var verify = u_msg.eq(i).find("div");
				if(verify.attr("checkedos")==0){
					verify.attr("checkedos","1");
					verify.find("span").toggleClass("bgccbox ");
					var pn = verify.attr("value");

					var idin = verify.attr("id");
					$("#selectList").append("<li id ='"+idin+"' searchid ='"+idin +"' class='newli'><span class='pname floatleft'>"+pn+"</span><span></span><span class='glyphicon glyphicon-remove colorred floatrit'></span></li>");



					cuntuser++;
					$("#choosepeople").text(cuntuser);
				}else{
					
				}
				accountIds+=verify.attr("id")+";";
			}
		});
		$("#allchoosedel").click(function(){
			var del_user = $("#selectList").find("li");
			var u_msg = $("#middleulli").find("li");
			for (i=0;i<u_msg.length;i++) {
				if(u_msg.eq(i).find("div").attr("checkedos")==1){
					u_msg.eq(i).find("div").attr("checkedos","0");
					u_msg.eq(i).find("div").find("span").toggleClass("bgccbox");
				}
			}
			$("#selectList").empty();
			cuntuser=0;
			$("#choosepeople").text("0");
		})
		//人员检索
		$(".msgresult").click(function(event){
			var addu;//服务器返回的用户名
			var convr =$("#selectList").find("li");//已添加的参加考试用户列表
			var nf=true;//用作判断用户是否已经被添加 默认没有添加过
			var idin ;//用户索引id (唯一)
			if(event.target!=this){
				if($(event.target).hasClass("searli")){
					idin = event.target.children[0].id
					addu = $(event.target).find("span").eq(0).text();
				}else{
					idin = event.target.children[0].id
				 	addu = $(event.target).parents("li").find("span").eq(0).text();
				}
			for (i=0;i<convr.length;i++) {
				if(convr.eq(i).find("span").eq(0).text()==addu){
				
					nf=false;
				}else{
					
				}
			}
			//如果nf = true 添加该用户参加考试
			if(nf){
				$("#selectList").append("<li id='"+idin+"' searchid='"+idin+"' class=\'newli\'><span class=\'pname floatleft\'>"+addu+"</span><span></span><span class=\'glyphicon glyphicon-remove colorred floatrit\'></span></li>");
					cuntuser++;
					$("#choosepeople").text(cuntuser);
				}
			}
		})
		//初始化选中人员树   统计 被选人员个数
$(".peoplechoose").click(function(){
	 var cuntuster =   $("#selectList").find("li").length;
	 $("#choosepeople").text(cuntuster);
})