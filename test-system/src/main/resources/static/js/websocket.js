var ws;

//========使用说明==========
//1. 此文件是通过纯浏览器js文件改造而成，里面有些对json的处理接口需要根据平台进行调整，给websocket发的消息都是json字符串
//    所以用到了JSON.stringify(obj)，将对象转json字符串，这个在react应该没有，请找相应的替换函数，websocket接收的数据也是json
//    字符串,用到了JSON.parse(e.data)，请找相应的替换函数
//2. onopen为websocket建立连接的回调函数，如果连接建立了需要进行登录操作发送1000协议，userId和actId需要替换为真实的ID
//3. sendMsg向服务器发送消息的接口，可以在输入完文字点击发送按钮时调用
//4. processMsg为系统推送消息，自己或别人发送成功后广播给大家的消息，需要在这里实现消息的显示，比如绘制在消息面板里

function openSocket("ws://120.132.84.63/Snappu/websocket/chat")
{
	ws = new WebSocket();
	
	ws.onopen = () => {
		  // 建立连接
		  // 登录聊天室
		websocket.send(JSON.stringify({
			op : 1000,
			userId : xxx, // 用户ID 需替换
			actId: xxx // 活动ID 需替换
		}));
	};

	ws.onmessage = (e) => {
	  // 收到了消息
	  console.log("receive data " + e.data);
	  // 解析成json对象
	  var obj = JSON.parse(e.data);
		switch (obj.op) {
		case 1000:
			// 登录返回 GET
			processLoader(obj);
			break;
		case 1003:
			// 消息提交返回 GET
            processMsg(obj);
			break;
		case 1006:
			// 消息下发 PUSH
			processReceiveMsg(obj);
			break;
		case 1007:
			// 历史消息返回
			processHistory(obj);
			break;
		}
	};

	ws.onerror = (e) => {
	  // 有错误发生
	  console.log(e.message);
	};

	ws.onclose = (e) => {
	  // 连接关闭
	  console.log(e.code, e.reason);
	};
}

/*******************************************************************************
 * 发送消息接口
 */
function sendMsg(var msg)
{
	var obj = {
		op : 1003,
		type : 0,// 文字
		msg : content
	};
	websocket.send(JSON.stringify(obj));
}


	
/*******************************************************************************
 * 获取历史消息处理
 * 
 * @param obj
 */
function processHistory(obj)
{
	if(obj.ret == 0)
	{
	     alert("获取失败: " + obj.msg);
	     return;
	}
	if(obj.list.length == 0)
	{
		$.messager.show({content:"无更多数据", time:2000});
	    return;	
	}
    // obj.list为消息数组
}
	
	
/*******************************************************************************
 * 提交消息返回处理
 * 
 * @param obj
 */
function processMsg(obj)
{
	var ret = obj.ret;
	if(ret != 1)
	{
	      alert("发送失败: " + obj.msg);	
	}
}


	

/*******************************************************************************
 * 处理登录
 ******************************************************************************/
function processLoader(obj)
{
	var ret = obj.ret;
	if (ret == 1) {
		console.log("登录成功");
	}else
	{
		console.log("登录失败");
	}
}

/*******************************************************************************
 * 接收聊天消息
 ******************************************************************************/
function processReceiveMsg(obj)
{
	var fromId = obj.from;// 发送人ID
	var nickname = obj.fromNickname;// 发送人昵称
	var icon = obj.fromIcon;// 发送人头像连接
	var time = obj.timestamp;// 发送时间戳
	var actId = obj.to;// 活动ID
	var idx = obj.idx;// 消息序列
	var type = obj.type;// 消息类型【0文字 1图片 2视频】
	var msg = obj.msg;// 消息内容
	
	// ===绘制到消息面板====
	// 需要自行完成
    //
	// =================
	
	// 通知服务器消息已接收
	websocket.send(JSON.stringify({
		op : 1006,
		ret : 1
	}));
}





