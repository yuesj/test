
var ff = {};
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
$(document).ready(function() {
    if(browser.versions.trident) {
        ff.scollheiht = $(window).height();
    } else if(browser.versions.gecko) {
        ff.scollheiht = document.body.clientHeight;
    } else {
        ff.scollheiht = $(window).height();
    }

    if(browser.versions.trident){
        ff.scollwidthh=$(window).width()
    }else if(browser.versions.gecko) {
        ff.scollwidthh = document.body.clientWidth;
    } else {
        ff.scollwidthh = $(window).width();
    }
    $(".huadd").css("left",ff.scollwidthh/2-25+"px")
    if(ff.scollwidthh<768){
        binking();
        $(window).scroll(function(event){
            clearTimeout(ff.bink)
            $(".KaoshiXinXi-box").css("padding","0px!important")
                .css("width","80%")
                .css("margin-left","10% !important")

        });


    }

    $(".KaoshiXinXi-box").find(".btn-default").mousedown(function() {
        $(this).css("background-color", "#eeFAFF");
    })
    $(".KaoshiXinXi-box").find(".btn-default").mouseup(function() {
        $(this).css("background-color", "#FFFFFF");
    })
    $(".KaoshiXinXi-box").find(".btn-default").mousemove(function() {

        ff.trbl = this.getBoundingClientRect().bottom;
        ff.e = $(".middlebox")
        ff.lleft = ff.e[0].getBoundingClientRect().left;
        ff.widdth = ff.e.width();
        ff.tipsj = $(".tipss")
        ff.tipsleftdu45 = (this.getBoundingClientRect().left + this.getBoundingClientRect().right - 55) / 2
        ff.tipsj.css("top", ff.trbl)
            .css("left", ff.lleft + 45 + "px")
            .css("width", ff.widdth - 90 + "px");
        $(".du45").css("top", ff.trbl)
            .css("left", ff.tipsleftdu45 + "px")
        if(browser.versions.trident) {
//          $(".du45").css("margin-top", "10px")
        }
        ff.tipsj.removeClass("displaynone");
        $(".du45").removeClass("displaynone");
    })
    $(".KaoshiXinXi-box").find(".btn-default").mouseleave(function() {

        ff.tipsj = $(".tipss")
        ff.tipsj.addClass("displaynone")
        $(".du45").addClass("displaynone");
    })
});
function binking(){
    $(".huadd").fadeIn(1300).fadeOut(800);
    ff.bink=setTimeout("binking()",2500)
}

