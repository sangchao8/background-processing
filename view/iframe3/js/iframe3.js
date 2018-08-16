var nav;
nav = function () {
    var into = function () {
        formSubmit();
        allChecked();
        renderPie();
        initLayui();
        productPage();
        using();
    };
    var formSubmit = function () {
        $('.js-seachInput').click(function () {
            var valInput = $('.js-seach-input[name="pcName"]').val().trim();
            var valInput2 = $('.js-seach-input[name="adTime"]').val().trim();
            var valInput3 = $('.js-seach-input[name="PlatformBackground"]').val().trim();
            if (valInput && valInput2) {
                $('#iframe2demandForm').submit();
            } else {
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
    
    var renderPie = function () {
        var myChart = echarts.init(document.getElementById('iframe2-list-l'));
        
        // 指定图表的配置项和数据
        var option = {
            color: ['#87cefa', '#ff7f50', '#ffb752'],
            title: {
                text: "平台类型比例",
                color: " #333333",
                show: true,
                left: 'center',
                top: '0'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [{
                name: "类型",
                type: "pie",
                radius: '50%',
                center: ['50%', '55%'],
                data: [],
                labelLine: {
                    length: 35,
                    length2: 15
                }
            }]
        };
        
        $.getJSON('json/moldjson.json', function (data) {
            data.forEach(function (value) {
                var legend = {
                    name: value.name,
                    textStyle: {
                        fontSize: 12,
                        color: '#333333'
                    },
                    icon: 'roundRect'
                };
                option.legend.data.push(legend);
                option.series[0].data.push({name: value.name, value: value.value});
            });
            
            myChart.setOption(option);
        });
        
        
    }
    
    var allChecked = function () {
      
        $('.js-iframe2-content').delegate('.js-allChecked','click',function () {
            var flag = $(this).prop("checked");
            $('.js-itemChecked').prop("checked", $(this).prop("checked"));
        });
    
        $('.js-iframe2-content').delegate('.js-allChecked','click',function (){
            var flag = true;
            $('.js-itemChecked').each(function (index, item) {
                if (!$(item).prop('checked')) {
                    flag = false;
                    return false;
                };
            });
            $('.js-allChecked').prop('checked', flag);
        });
    };
    
    var productPage = function () {
        $.getJSON("json/ppag1.json", function (data) {
            var pa = template("produtPage", data);
            $(".iframe2-list-r").html(pa);
        });
        $('.iframe2-list-r').delegate('.js-next-page', 'click', function () {
            $.getJSON('json/ppag2.json', function (data) {
                var gg = template('produtPage', data);
                $('.iframe2-list-r').html(gg);
            });
        });
        $('.iframe2-list-r').delegate('.js-pre-page', 'click', function () {
            $.getJSON('json/ppag1.json', function (data) {
                var gg = template('produtPage', data);
                $('.iframe2-list-r').html(gg);
            });
        });
        
    };
    
    var using = function () {
        $('.js-result-table').delegate('.js-set-on:not(.on)', 'click', function () {
            $(this).parents('tr').attr('operation', 1);
            var confirmData = {
                text: '确定停用吗？'
            }
            var confirmBox = template('confirmBox', confirmData);
            $('.js-iframe2-content').append(confirmBox);
            $('.js-yes').click(function () {
                $('.js-iframe2-table-row[operation]').find('.js-table-on,.js-set-on').addClass('on');
                $('.js-table-balckFixed').remove();
                var tipData = {
                    url: 'image/5k.png',
                    text: '停用成功！'
                }
                var tipBox = template('tipBox', tipData);
                $('.js-iframe2-content').append(tipBox);
                setTimeout(function () {
                    $('.js-table-balckFixed').remove();
                }, 1000)
            });
            $('.js-no').click(function () {
                $('.js-table-balckFixed').remove();
            });
        });
        $('.js-result-table').delegate('.js-set-on.on', 'click', function () {
            var confirmData = {
                text: '确定要启用吗？'
            }
            var confirmBox = template('confirmBox', confirmData);
            $('.js-iframe2-content').append(confirmBox);
            $('.js-yes').click(function () {
                $('.js-infro-box').hide();
                $('.js-iframe2-table-row[operation]').find('.js-table-on,.js-set-on').removeClass('on');
                var tipData = {
                    url: 'image/6siml.png',
                    text: '启用成功！'
                }
                var tipBox = template('tipBox', tipData);
                $('.js-iframe2-content').append(tipBox);
                setTimeout(function () {
                    $('.js-table-balckFixed').remove();
                }, 1000)
            });
            $('.js-no').click(function () {
                $('.js-table-balckFixed').remove();
            });
        });
        $('.js-result-table').delegate('.js-set-mo', 'click', function () {
            $(this).parents('tr').attr('operation', 1);
            var confirmData = {
                text: '确定删除吗？'
            }
            var confirmBox = template('confirmBox', confirmData);
            $('.js-iframe2-content').append(confirmBox);
            $('.js-yes').click(function () {
                $('.js-table-balckFixed').remove();
                var tipData = {
                    url: 'image/5k.png',
                    text: '删除成功！'
                }
                var tipBox = template('tipBox', tipData);
                $('.js-iframe2-content').append(tipBox);
                setTimeout(function () {
                    $('.js-table-balckFixed').remove();
                }, 1000);
                $('.js-iframe2-table-row[operation]').remove();
            });
        });
    };
    
    return {
        into: into
    }
}();