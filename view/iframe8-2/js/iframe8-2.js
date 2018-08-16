var nav = function () {
    var into = function () {
        productPage();
        allChecked();
        loadUi();
        uiPop();
        amendInput();
        submitData();
    };
    var productPage = function () {
        $.getJSON("json/ppag1.json", function (data) {
            var pa = template("produtPage", data);
            $(".Admin-infor-txb").html(pa);
        });
        $('.Admin-infor-txb').delegate('.js-next-page', 'click', function () {
            $.getJSON('json/ppag2.json', function (data) {
                var gg = template('produtPage', data);
                $('.Admin-infor-txb').html(gg);
            });
        });
        $('.Admin-infor-txb').delegate('.js-pre-page', 'click', function () {
            $.getJSON('json/ppag1.json', function (data) {
                var gg = template('produtPage', data);
                $('.Admin-infor-txb').html(gg);
            });
        });
        
    };
    var allChecked = function () {
        $('.Admin-infor-txb').delegate('.js-allChecked', 'click', function () {
            var flag = $(this).prop("checked");
            $('.js-itemChecked').prop("checked", $(this).prop("checked"));
        });
        $('.Admin-infor-txb').delegate('.js-itemChecked', 'click', function () {
            var flag = true;
            $('.js-itemChecked').each(function (index, item) {
                if (!$(item).prop('checked')) {
                    flag = false;
                    return false;
                }
            });
            
            $('.js-allChecked').prop('checked', flag);
        });
    };
    var loadUi = function () {
        layui.use('form', function () {
            var form = layui.form;
            
            //各种基于事件的操作，下面会有进一步介绍
        });
    };
    /*
    修改密码验证提交
    */
    var uiPop = function () {
        var dialog;
        $('.js-change-pa').click(function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                dialog = layer.open({
                    type: 1,
                    title: '修改密码',
                    content: template("pop", {}),
                    area: ['500px', '300px']
                });
            });
        });
        $('body').delegate('.js-inpmm-yes', 'click', function () {
            var firstPassword = $('#inpmm input[name="ymm"]').val().trim();
            var reg = /^[a-z0-9]{6,16}$/;
            if (!reg.test(firstPassword)) {
                alert('请正确输入原始密码！');
                $('#inpmm input[name="ymm"]').focus();
                return false
            }
            var newPassword = $('#inpmm input[name="xmm"]').val().trim();
            if (!reg.test(newPassword)) {
                alert('请正确输入新密码');
                $('#inpmm input[name="xmm"]').focus();
                return false
            }
            var anginPassword = $('#inpmm input[name="qrmm"]').val().trim();
            if (newPassword === anginPassword) {
                var formData = $('#inpmm').serialize();
                $.ajax({
                    type: 'post',
                    url: 'json/submit-success.txt',
                    data: formData,
                    dataType: 'json',
                    success: function (data) {
                        if ('00' === data.code) {
                            layer.close(dialog);
                            layui.use('layer', function () {
                                var layer = layui.layer;
                                layer.msg("修改成功！");
                            });
                        } else {
                            alert('修改失败！');
                        }
                    }
                });
            } else {
                alert('密码填写有误！');
                return false
            }
            
        });
    };
    
    var amendInput = function () {
        $('.js-change-inf').click(function () {
            $('input[name="sex"]').prop("disabled", false);
            $('.Admin-infor input').prop("disabled", false).addClass('on');
            $('.js-save-inf').addClass('current');
        });
    };
    
    /*
     修改信息的提交
     */
    var submitData = function () {
        $('.js-save-inf').click(function () {
            var formData = $('#iframe8form').serialize();
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg("保存成功！");
            });
            $('input[name="sex"]' + '+' + 'div:not(class[layui-disabled])').prop("disabled", true).removeClass('on');
            $('.Admin-infor input').prop("disabled", true).removeClass('on');
            $('.js-save-inf').removeClass('current');
        });
        
    };
    
    
    return {
        into: into
    }
}();