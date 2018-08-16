var main = function () {
    var init = function () {
        login();
    };
    var login = function () {
        $('.js-loggingOn').click(function () {
            var userinpt = $('.js-logging-input>input[name="userName"]').val().trim();
            var userpinput = $('.js-logging-input>input[name="userPassword"]').val().trim();
            if(userinpt&&userpinput){
                $('#loggingForm').submit();
            }else {
                alert('请输了正确的账号和密码!');
                return false;
            }
        });
    };
    return {
        init:init
    };
}();

