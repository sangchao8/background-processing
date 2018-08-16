var nav = function () {
    var into = function () {
        initLayui();
        openMenu();
        allChecked();
        productPage();
        using();
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
        $('.js-iframe2-list-r').delegate('.js-allChecked','click',function () {
            var flag = $(this).prop("checked");
            $('.js-itemChecked').prop("checked",$(this).prop("checked"));
        });
        $('.js-iframe2-list-r').delegate('.js-itemChecked','click',function () {
            var flag = true;
            $('.js-itemChecked').each(function (index, item) {
                if(!$(item).prop('checked')){
                    flag = false;
                    return false;
                }
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
    var using = function () {
        $('.js-iframe2-list-r').delegate('.js-set-on:not(.on)','click',function () {
            $(this).parents('tr').attr('operation',1);
            var confirmData = {
                text:'确定停用吗？'
            }
            var confirmBox = template('confirmBox',confirmData);
            $('.js-iframe2-content').append(confirmBox);
            $('.js-yes').click(function () {
                $('.js-iframe2-table-row[operation]').find('.js-table-on,.js-set-on').addClass('on');
                $('.js-table-balckFixed').remove();
                $('.js-iframe2-table-row[operation]').removeAttr('operation');
                var tipData = {
                    url:'image/5k.png',
                    text:'停用成功！'
                }
                var tipBox = template('tipBox',tipData);
                $('.js-iframe2-content').append(tipBox);
                setTimeout(function () {
                    $('.js-table-balckFixed').remove();
                },1000)
            });
            $('.js-no,.js-close').click(function () {
                $('.js-table-balckFixed').remove();
            });
        });
        $('.js-iframe2-list-r').delegate('.js-set-on.on','click',function () {
            $(this).parents('tr').attr('operation',1);
            var confirmData = {
                text:'确定要启用吗？'
            }
            var confirmBox = template('confirmBox',confirmData);
            $('.js-iframe2-content').append(confirmBox);
            $('.js-yes').click(function () {
                $('.js-infro-box').hide();
                $('.js-iframe2-table-row[operation]').find('.js-table-on,.js-set-on').removeClass('on');
                $('.js-iframe2-table-row[operation]').removeAttr('operation');
                var tipData = {
                    url:'image/6siml.png',
                    text:'启用成功！'
                }
                var tipBox = template('tipBox',tipData);
                $('.js-iframe2-content').append(tipBox);
                setTimeout(function () {
                    $('.js-table-balckFixed').remove();
                },1000)
            });
            $('.js-no,.js-close').click(function () {
                $('.js-table-balckFixed').remove();
            });
        });
        $('.js-iframe2-list-r').delegate('.js-set-mo','click',function () {
            $(this).parents('tr').attr('operation',1);
            var confirmData = {
                text:'确定删除吗？'
            }
            var confirmBox = template('confirmBox',confirmData);
            $('.js-iframe2-content').append(confirmBox);
            $('.js-yes').click(function (){
                $('.js-table-balckFixed').remove();
                var tipData = {
                    url:'image/5k.png',
                    text:'删除成功！'
                }
                var tipBox = template('tipBox',tipData);
                $('.js-iframe2-content').append(tipBox);
                setTimeout(function () {
                    $('.js-table-balckFixed').remove();
                },1000);
                $('.js-iframe2-table-row[operation]').remove();
            });
        });
    };
    return{
        into:into
    }
}();