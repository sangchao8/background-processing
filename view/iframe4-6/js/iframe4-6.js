var nav = function () {
    var into = function () {
        payWayboxmin();
        payPop();
        payWayForm();
        templatePay();
        addBlankPop();
        addCard();
    };
    layui.use('form', function(){
        var form = layui.form;
        //监听提交
        form.on('submit(formDemo)', function(data){
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });
    
    var payWayboxmin = function () {
        $('.js-minck').click(function () {
           $('.js-add-pay-litbox').hide();
           $('.js-add-pay-foot').hide();
           $('.js-add-pay-til').addClass('on');
           $(this).hide();
        });
        $('.js-manck').click(function () {
            $('.js-add-pay-cont').addClass('on');
        });
        $('.js-clck').click(function () {
            $('.js-add-pay-box').addClass('on');
        });
        $('.js-add-pay').click(function () {
            $('.js-add-pay-box').removeClass('on');
        });
    };
    
    /**
     * 添加支付方式弹出框
     */
    var payPop = function () {
        $('.js-add-pay').click(function () {            //添加支付方式弹出窗口
            var payeSel= template('addcarPop',null);
            $('.iframe2-content').append(payeSel);
        });
        $('.iframe2-content').delegate('.js-zf:not(:checked)','click',function () {//勾选支付方式弹出窗口
                $('.js-pay-way-k').empty();
         
        });
        $('.iframe2-content').delegate('.js-zf:checked','click',function () {
            var payeMater= template('PopMaterial',null);
            $('.js-pay-way-k').html(payeMater);
            $(this).parent('.add-pay-img').siblings().children('input').prop("checked",false);
        });
      
        $('.iframe2-content').delegate('.js-clck','click',function () {
            $('.js-add-pay-box').hide();
        });
    };
    
    /**
     * 添加支付方式弹出框
     */
    var addBlankPop = function (){
        $('.iframe2-content').delegate('.js-add-card','click',function () {
            $('.js-add-re').show();
            $('.js-add-pay-box2').show();
            $('.js-add-pay-img>input').attr('checked',false);
        });
        $('.js-clck2').click(function () {
            $('.js-add-pay-box2').hide();
        });
        $('.iframe2-content').delegate('.js-re-card','click',function () {
            $('.js-add-re').hide();
        });
        
         }
    
    /**
     * 提交支付方式的表单
     */
    var payWayForm = function () {
        $('.iframe2-content').delegate('.js-yesPop','click',function () {
          $('#pay-way-k').submit();
        });
      
    };
    
    /**
     * 点击支付方式详情
     */
    var templatePay = function () {
      $('.js-xx').click(function () {
          $.getJSON("json/xx.json",function (data) {
              var templateData= template('Poppay',data);
              $('.iframe2-content').append(templateData);
              $('.js-zffs-box').hide();
              var templateData2= template('blank',null);
              $('.js-Support').html(templateData2);
          });
        });
    };
    
    /**
     * 添加银行及删除银行卡
     */
    var addCard =function () {
        $(".js-yesPop2").click(function () {                //添加新卡到银联中
            $('.js-selBank:checked').parent('.js-add-pay-img').appendTo('.js-card-sel');
            $('.js-selBank:checked').attr('checked',false);
            $('.js-add-pay-box2').hide();
        });
        $(".iframe2-content").delegate(".js-allChecked","click",function (){            //删除卡全选
            $(this).addClass('on');
            $('.js-card-sel input').prop('checked',true);
           
        });
        $(".iframe2-content").delegate(".js-re","click",function (){                    //删除选中卡
            $('.js-card-sel .js-selBank:checked').parent('.js-add-pay-img').appendTo('.add-blank-form');
        });
    }
    
    return{
        into:into
    }
}();