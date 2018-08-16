
var head = function () {
    var init = function () {
        loadData();
    };
    var loadData = function () {
        /*  $.getJSON('../../json/menu.json',function (data) {
              var text = "";
              data.forEach(function (value) {
                  var a = '<fa title="" class="iram-data-list '+value.flag?'':''+'">\n' +
                      '                <div class="ifram-data-img-box">\n' +
                      '                    <span class="ifram-data-img "></span>\n' +
                      '                </div>\n' +
                      '                <div class="ifram-data-font">\n' +
                      '                    <span>'+value.num+'</span>\n' +
                      '                    <span>'+value.name+'</span>\n' +
                      '                </div>\n' +
                      '            </a>';
                  text += a;
              });
              $('.js-ifram-content-data').html(text);
             /!* $('.js-scyh-num').text(data.scyh);
              $('.jf-fxjl-num').text(data.scyh);
              $('.js-scyh-num').text(data.scyh);
              $('.js-scyh-num').text(data.scyh);*!/
          });*/
        $.getJSON('json/yyjk.json',function (data) {
            var scData= template('sc-Data',data);
            $(".js-ifram-content-data").html(scData);
        });
        $.getJSON('json/tjxx.json',function (data) {
            var xxData= template('newsTable',data);
            $(".js-ifram-content-news").html(xxData);
        });
            var data = ["后台系统找那个是开通了.","后台系统找那个是开通了.","后台系统找那个是开通了.","后台系统找那个是开通了.",
                        "后台系统找那个是开通了."
                        ];
            var zxData= template('newsTable3',data);
            $(".js-ifram-content-news2").append(zxData);
        
    };
    return{
        init:init
    }
}();
