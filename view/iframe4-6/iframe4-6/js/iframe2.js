var nav = function () {
    var into = function () {
        initLayui();
        openMenu();
        allChecked();
        productPage();
    };
  
    var initLayui = function () {
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            //执行一个laydate实例
            laydate.render({
                elem: 'input[name="adTime"]',
                type:'datetime'
            });
        });
    };
    var openMenu = function () {
       
        $('.js-list-li').click(function () {
            if( $(this).parent("li").hasClass('on')){
                $(this).parent("li").removeClass('on');
            }else {
                $(this).parent("li").addClass('on');
                $(this).parent("li").siblings().removeClass('on');
            }
           
          /*  $(this).parent("li").siblings().toggleClass('on');*/
        })
    };
    var allChecked = function () {
        $('.js-iframe2-list-r').delegate('.js-allChecked',"click",function () {
            var flag = $(this).prop("checked");
            $('.js-itemChecked').prop("checked",$(this).prop("checked"));
    
        });
        $('.js-iframe2-list-r').delegate('.js-itemChecked',"click",function () {
            var flag = true;
        
            $('.js-itemChecked').each(function (index, item) {
                if(!$(item).prop('checked')){
                    flag = false;
                    return false;
                };
            });
        
            $('.js-allChecked').prop('checked',flag);
        });
    };
    var productPage = function () {
        $.getJSON("json/ppag1.json",function (data) {
            var pa = template("produtPage",data);
            $(".js-iframe2-list-r").html(pa);
        });
        $('.js-iframe2-list-r').delegate('.js-next-page','click',function () {
            $.getJSON('json/ppag2.json',function (data) {
                var gg = template('produtPage', data);
                $('.js-iframe2-list-r').html(gg);
            });
        });
        $('.js-iframe2-list-r').delegate('.js-pre-page','click',function () {
            $.getJSON('json/ppag1.json',function (data) {
                var gg = template('produtPage', data);
                $('.js-iframe2-list-r').html(gg);
            });
        });
        
    };
    return{
        into:into
    }
}();