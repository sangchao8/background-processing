var head = function () {
    var init = function () {
        menuTab();
        formSubmit();
    };
    var menuTab = function () {
        $('.js-changeTab').click(function () {
            $(this).addClass('on').siblings().removeClass('on');
            var index = $(this).index();
            $('.js-ifram-content-box').children().removeClass('on');
            $('.js-ifram-content-box').children().eq(index).addClass('on');
        });
    };
    var formSubmit = function () {
        /*网站名称input*/
        $("input[name='name']").focus(function () {
            $(this).parent('.js-focus').addClass('focus');
        });
        $("input[name='name']").keyup(function () {
            var inpVal = $(this).val().trim();
            var Expression = /^[a-zA-Z\u4E00-\u9FA5]{1,20}$/;
            var objExp = new RegExp(Expression);
            if (objExp.test(inpVal) == false) {
                $(this).parent('.js-focus').removeClass('focus').addClass('focus2');
                alert("请输入汉字和英文字母而且长度在1-20个字符之间！");
                $(this).val('').focus();
                return false;
            } else {
                $(this).parent('.js-focus').removeClass('focus focus2');
            }
        });
        
        /*网站icon图标input*/
        $('input[name="icon"]').change(function () {
            var iconVal = $(this).prop('files');
            if (iconVal.length == 0 ) {
                alert('请选择一张图片！');
                return false;
            } else {
                $('.js-filename').text(iconVal[0].name);
            }
        });
        
        
        /*关键词input*/
        $('.js-input-val[name="key"]').focus(function () {
            $(this).parent('.js-focus').addClass('focus');
        });
        $('input[name="key"]').keyup(function () {
            var inpVal = $(this).val().trim();
            var arr = inpVal.split(',');
            var temp = [];
            arr.forEach(function (value) {
                if(value){
                    temp.push(value);
                }
            });
            var arrLength = temp.length;
            if (0 < arrLength && arrLength <= 5) {
                var newArr = [];
                for (var i = 0; i < temp.length; i++) {
                    var newArr = temp[i];
                    if (newArr.length > 8) {
                        $(this).parent('.js-focus').removeClass('focus').addClass('focus2');
                        alert('请输入5个字左右，8个字以内，用“，”隔开');
                        $(this).val('').focus();
                        return false
                    } else {
                        $(this).parent('.js-focus').removeClass('focus focus2');
                        $(this).submit();
                        return true;
                    }
                }
            } else {
                $(this).parent('.js-focus').removeClass('focus').addClass('focus2');
                alert('请输入5个字左右，8个字以内，用“，”隔开');
                return false;
            }
        });
        /*统计代码input*/
        $(".js-input-val[name='tjdm']").focus(function () {
            $(this).parent('.js-focus').addClass('focus');
        });
        $(".js-input-val[name='tjdm']").keyup(function () {
            var inpVal = $(this).val().trim();
            var valLength = inpVal.replace(/[^\x00-xff]/g, "xx").length;
            $('.js-count').html('共计:'+  Math.ceil(valLength/2)+ '个汉字');
            
        });
        $(".js-input-val[name='tjdm']").change(function () {
            var inpVal = $(this).val().trim();
            var Expression = /^[a-zA-Z\u4E00-\u9FA5]{1,100}$/;
            var objExp = new RegExp(Expression);
            if (objExp.test(inpVal) == false) {
                $(this).parent('.js-focus').removeClass('focus').addClass('focus2');
                alert("请输入汉字和英文字母而且长度不能超过100个字符！");
                $(this).val('').focus();
                return false;
            } else {
                $(this).parent('.js-focus').removeClass('focus focus2');
                $(this).submit();
                return true;
            }
        });
    };
    return {
        init: init
    }
}();
