var head = function () {
    var init = function () {
        // --head开始--
        openbox();
        closeWin();
        nowTim();
        shrinkMenu();
        loadMenu();
        openMenu();
    };
    //--head开始--
    var openbox = function () {
        $('.js-openBox1').click(function () {
            $(this).children(".js-openBox2").toggleClass('on');
        });
    };
    var closeWin=function () {
        $('.js-head-out').click(function (){
            window.location.href="view/login/index.html";
        });
    };
    var nowTim = function() {
        var timerSckill = null;
        timerSckill = setInterval(function () {
            var myDate = new Date();
            var n = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            var y = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
            if(y<10){
                y = "0"+y;
            }
            var r = myDate.getDate();        //获取当前日(1-31)
            if(r<10){
                r = "0"+r;
            }
            var h = myDate.getHours();       //获取当前小时数(0-23)
            if(h<10){
                h = "0"+h;
            }
            var d = myDate.getMinutes();     //获取当前分钟数(0-59)
            if(d<10){
                d = "0"+d;
            }
            var s = myDate.getSeconds();     //获取当前秒数(0-59)
            if(s<10){
                s = "0"+s;
            }
            $('.js-head-time>s').eq(0).html(n);
            $('.js-head-time>s').eq(1).html(y);
            $('.js-head-time>s').eq(2).html(r);
            $('.js-head-time>s').eq(3).html(h);
            $('.js-head-time>s').eq(4).html(d);
            $('.js-head-time>s').eq(5).html(s);
        },1000)
    }
    var shrinkMenu = function () {
        $('.js-shrinkArrow').click(function () {
            $(this).toggleClass('close');
            $('.js-nav').toggleClass('close');
            $('.js-nav-menu-list').toggleClass('close');
            $('.js-nav-top').toggleClass('close');
            $('.js-content').toggleClass('close');
            $('.js-nav-menu-list-box').toggleClass('close');
        });
        
    };
    var loadMenu = function () {
        $.getJSON('json/menu.json',function (data) {
            $('.js-nav-menu-list-box').empty();
            var  leve1Menu = template('levelMenu',data);
            $('.js-nav-menu-list-box').append(leve1Menu);
            $('.js-nav-menu-list>li:first').addClass('on');
        });
      
    };
    var openMenu = function () {
        
        $('.js-nav-menu-list-box').delegate('.js-nav-menu-p','click',function () {
            $(this).toggleClass('on').siblings('ul').toggleClass('on').parent('li').toggleClass('on');
            $(this).parents('li').siblings("li").removeClass('on').children().removeClass('on');
           
        });
        /**
         * 打开菜单对应的窗口
         */
        $('.js-nav-menu-list-box').delegate(".js-nav-menu-p","click",function () {
            var url = $(this).parent("li").attr("dataurl");
            if(url){
                $(".js-content-iframe").attr("src",url);
            };
        })
    };
    
    return{
        init:init
    }
}();

