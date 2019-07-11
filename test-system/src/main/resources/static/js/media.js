var flash_pic = "static/flash/picTest.swf?version=1.5";

/**浏览图片**/
function showImage(key) {
	if (key == "") {
		$.messager.alert('错误', '文件key不存在！', 'error');
		return;
	}
	var cmp = "image-" + key.substring(0, key.indexOf("."));
	$("body").append("<div id='" + cmp + "'></div>");
	var url = "common/getImage.html?file=" + key
	var win = $('#' + cmp).window({
		width : 500,
		height : 500,
		modal : false,
		minimizable : false,
		maximizable : false,
		resizable : false,
		title : "图片展示",
		onOpen : function() {
			createFlash("ImageShow", flash_pic, cmp, "100%", 500, {
				picUrl : url
			});
		},
		onClose : function() {
			win.remove();
		}
	});
}

/**

// 播放视频
function playMovie(key) {
	if (key == "") {
		$.messager.alert('错误', '文件key不存在！', 'error');
		return;
	}
	var cmp = "movie-" + key.substring(0, key.indexOf("."));
	$("body").append("<div id='" + cmp + "'></div>");
	var win = $('#' + cmp).window({
		width : 772,
		height : 600,
		modal : false,
		minimizable : false,
		maximizable : false,
		resizable : false,
		title : "视频播放",
		onOpen : function() {
			createFlash("MovieMedia", flash_movie, cmp, 772, 600, {
				type : 0,
				key : key
			});
		},
		onClose : function() {
			var swf = thisMovie("MovieMedia");
			if (swf.closePlay) {
				swf.closePlay();
			}
			win.remove();
		}
	});
}

// 播放实时视频
function playRealMovie(key) {
	if (key == "") {
		$.messager.alert('错误', '文件key不存在！', 'error');
		return;
	}

	var cmp = "movie-" + key.substring(0, key.indexOf("."));
	$("body").append("<div id='" + cmp + "'></div>");
	var win = $('#' + cmp).window({
		width : 772,
		height : 600,
		modal : false,
		minimizable : false,
		maximizable : false,
		resizable : false,
		title : "视频播放",
		onOpen : function() {
			createFlash("MovieMedia", flash_movie, cmp, 772, 600, {
				type : 1,
				key : key
			});
		},
		onClose : function() {
			var swf = thisMovie("MovieMedia");
			if (swf.closePlay) {
				swf.closePlay();
			}
			win.remove();
		}
	});
}

function loadMovieSwfOver(type, key) {
	var swf = thisMovie("MovieMedia");
	if (swf.playMovie) {
		if (type == 0) {
			swf.playMovie("mobile/dispatch/getContent.html", key);
		} else {
			swf.playRealMovie(red5ip, key);
		}
	}
}

**/


//坐标展示
function mapShowLoc(location) {
	var dialog = sy
			.modalDialog({
				title : '坐标展示',
				iconCls : 'icon-save',
				width : 450,
				height : 450,
				resizable : true,
				url : 'common/toBaiduMap.html?location='
						+ location,
				buttons : [ {
					iconCls : 'icon-no',
					text : '关闭',
					handler : function() {
						dialog.dialog('destroy');
					}
				} ]
			});
}

/**创建声音播放组件**/
function createSound() {
	var flashvars = {
		mp3 : "player/AlarmSound.mp3",
		javascript : "on"
	};
	var params = {
		wmode : "transparent"
	};
	var attributes = {
		id : "dewplayer"
	};
	swfobject.embedSWF("player/dewplayer.swf", "dewplayer_content", "200",
			"20", "9.0.0", false, flashvars, params, attributes);
}

function dp_play() {
	var dewp = document.getElementById("dewplayer");
	if (dewp != null)
		dewp.dewplay();
}

function dp_stop() {
	var dewp = document.getElementById("dewplayer");
	if (dewp != null)
		dewp.dewstop();
}

function dp_pause() {
	var dewp = document.getElementById("dewplayer");
	if (dewp != null)
		dewp.dewpause();
}

function dp_set(file) {
	var dewp = document.getElementById("dewplayer");
	if (dewp != null) {
		dewp.dewset(file);
	}
}

/**播放报警**/
function playAlarm() {
	dp_set('static/sound/AlarmSound.mp3');
}

/**播放上线**/
function playOnline() {
	dp_set('static/sound/system.mp3');
}

/**播放消息**/
function playMsg() {
	dp_set('static/sound/msg.mp3');
}

/**播放声音**/
function playSound(key, dir) {
	debugger;
	if (dir == null || dir.length == 0) {
		dir = "sound";
	}
	var url = "mobile/infoback/getSound.html?file="
			+ key + "&dir=" + dir;
	dp_set(url);
}

/**播放视频**/
function playMovie(key) {
	debugger;
	if (key == "") {
		$.messager.alert('错误', '文件key不存在！', 'error');
		return;
	}
	var dialog = sy
			.modalDialog({
				title : '视频播放',
				iconCls : 'icon-large-picture',
				width : 800,
				height : 600,
				resizable : true,
				url : 'mobile/infoback/vedioUI.html?key='
						+ key,
			});
}