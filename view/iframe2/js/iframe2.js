var nav = function () {
    var into = function () {
        formSubmit();
        initLayui();
        openMenu();
        allChecked();
        productPage();
        infor();
    };
    var formSubmit = function () {
        $('.js-seachInput').click(function () {
           var valInput = $('.js-seach-input[name="pcName"]').val().trim();
           var valInput2 = $('.js-seach-input[name="adTime"]').val().trim();
           if(valInput&&valInput2){
               $('#demandForm').submit();
           }else {
             alert("请正确填写!");
             return false
           }
        });
    };
    var initLayui = function () {
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            //执行一个laydate实例
            laydate.render({
                elem: 'input[name="adTime"]',
                type: 'datetime'
            });
        });
    };
    var openMenu = function () {
        
        $('.js-list-li').click(function () {
            if ($(this).parent("li").hasClass('on')) {
                $(this).parent("li").removeClass('on');
            } else {
                $(this).parent("li").addClass('on');
                $(this).parent("li").siblings().removeClass('on');
            }
            
            /*  $(this).parent("li").siblings().toggleClass('on');*/
        })
    };
    var allChecked = function () {
        $('.js-iframe2-list-r').delegate('.js-allChecked', "click", function () {
            var flag = $(this).prop("checked");
            $('.js-itemChecked').prop("checked", $(this).prop("checked"));
            
        });
        $('.js-iframe2-list-r').delegate('.js-itemChecked', "click", function () {
            var flag = true;
            
            $('.js-itemChecked').each(function (index, item) {
                if (!$(item).prop('checked')) {
                    flag = false;
                    return false;
                }
                ;
            });
            
            $('.js-allChecked').prop('checked', flag);
        });
    };
    var productPage = function () {
        $.getJSON("json/ppag1.json", function (data) {
            var pa = template("produtPage", data);
            $(".js-iframe2-list-r").html(pa);
        });
        $('.js-iframe2-list-r').delegate('.js-next-page', 'click', function () {
            $.getJSON('json/ppag2.json', function (data) {
                var gg = template('produtPage', data);
                $('.js-iframe2-list-r').html(gg);
            });
        });
        $('.js-iframe2-list-r').delegate('.js-pre-page', 'click', function () {
            $.getJSON('json/ppag1.json', function (data) {
                var gg = template('produtPage', data);
                $('.js-iframe2-list-r').html(gg);
            });
        });
        
    };
    var infor = function () {
        $(".js-iframe2-list-r").delegate(".js-set-on", "click", function () {
            if (!$(this).hasClass('on')) {
                $('.js-table-balckFixed').addClass('on');
                $(this).parents('tr').attr('operation', '1');
               
            } else {
                $('.js-table-balckFixed1').addClass('on');
                $(this).parents('tr').attr('operation', '1');
            }
        });
        $('.js-close,.js-no').click(function () {
            $('.js-table-balckFixed1').removeClass('on');
            $('.js-table-balckFixed').removeClass('on');
            $('.js-table-balckFixed6').removeClass('on');
        });
        $('.js-yes').click(function () {
            $('.js-iframe2-table-row[operation]').find('.js-table-on').addClass('on');
            $('.js-iframe2-table-row[operation]').find('.js-set-on').addClass('on');
                $('.js-table-balckFixed2').addClass('on');
                var timer = null;
                timer = setTimeout(function () {
                    $('.js-table-balckFixed2').removeClass('on');
                }, 1000);
                $('.js-table-balckFixed').removeClass('on');
        });
        $('.js-yes2').click(function () {
            $('.js-iframe2-table-row[operation]').find('.js-table-on').removeClass('on');
            $('.js-iframe2-table-row[operation]').find('.js-set-on').removeClass('on');
                $('.js-table-balckFixed3').addClass('on');
                var timer = null;
                timer = setTimeout(function () {
                    $('.js-table-balckFixed3').removeClass('on');
                }, 1000);
                $('.js-table-balckFixed1').removeClass('on');
                
        });
        $(".js-iframe2-list-r").delegate(".js-set-mo", "click", function (){
            $('.js-table-balckFixed6').addClass('on');
        });
        $('.js-yes3').click(function () {
            $('.js-table-balckFixed6').removeClass('on');
            $('.js-table-balckFixed4').addClass('on');
            var timer = null;
            timer = setTimeout(function () {
                $('.js-table-balckFixed4').removeClass('on');
            }, 1000);
            $('.js-iframe2-table-row[operation]').remove();
        });
        $('.js-iframe2-table-row[operation]').removeAttr('operation');
    };
    
    return {
        into: into
    }
}();