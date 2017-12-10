//计算html标签字体大小
function calcHtmlFontSize() {
    var width = document.body.clientWidth;
    if(width < 320) width = 320;
    else if(width > 750) width = 750;
    document.getElementsByTagName('html')[0].style.fontSize = width*100/375 + 'px';
    window.onresize = function () {
        var width = document.body.clientWidth;
        if(width < 320) width = 320;
        else if(width > 750) width = 750;
        document.getElementsByTagName('html')[0].style.fontSize = width*100/375 + 'px';
    };
}

function initPage() {
    if('hsh' == cms.clientType()){//和生活
        window.dType = 'hsh';
        loginHshFun();
    }  else if('leley' == cms.clientType()){//乐乐医
        window.dType = 'leley';
        if(window.app && app.getSign){
            localStorage.leleyToken = app.getToken();
        }
        init();
    } else{//其他浏览器
        window.dType = 'other';
        init();
    }
};
function loginHshFun() {
    hsh.hshReady(function () {
        hsh.getToken(function (obj) {
            if (obj && obj.HARToken) {
                var url = msiteUrl + '/v1/hbx/login.do';
                $.ajax({
                    url: url,
                    type: 'post',
                    async: false,
                    data: {
                        "token": obj.HARToken,
                        "s": 'mobileactivity'
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    complete: function (res) {
                        if (res && res.responseText !== '000') {
                            layer.msg('和生活登录失败');
                        }else{
							//分享数据后台配置
							cms.registerShare(share.default);
                            init();// 和生活登录成功才能初始化
                        }
                    }
                });
            }
        });
    });
}


$(function () {
    //查看规则
    $("#rules").click(function () {
        $(".rules-box").css("display","block");
        $(".rules-content").css("display","block");
        $("html,body").css("overflow","hidden");
    });
    $(".rules-box").click(function () {
        $(this).css("display","none");
        $(".rules-content").css("display","none");
        $("html,body").css("overflow","visible");
    });
    //中奖查询
    $("#see-prize").click(function () {
        $(".prize-detail").css("display","block");
        $(".prize-detail-content").css("display","block");
        $("html,body").css("overflow","hidden");
    });
    $(".prize-detail").click(function () {
        $(this).css("display","none");
        $("prize-detail").css("display","none");
        $("html,body").css("overflow","visible");
    });
    //咨询跳转

    calcHtmlFontSize();
    // regAppEvent('幸运大转盘，转出花样来！','在线咨询华西名医，玩幸运大转盘得好礼！','http://img.leley.com/html/activity/turntable/share.png');

});
