var nav = function () {
    var into = function () {
        showChart();
        using();
        productPage();
        allChecked();
    };
    var openChart = function () {
        var myChart = echarts.init(document.getElementById('monthChart'));
        var option = {
            title : {
                text: "当月销售统计"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#dcdcdc'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:[/*'成交订单','失败订单','成交金额'*/]
            },
            xAxis: [
                {
                    type: 'category',
                    data: [/*1,2,1,2,1,2,1,2,1,2,
                           1,2,1,2,1,2,1,2,1,2,
                           1,2,1,2,1,2,1,2,1,2*/],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '订单',
                    axisLabel: {
                        formatter: '{value} 单'
                    }
                },
                {
                    type: 'value',
                    name: '金额',
                    axisLabel: {
                        formatter: '{value} *10元'
                    }
                }
            ],
            series: [
              /*  {
                    name:/!*'成交订单'*!/,
                    type:/!*'bar'*!/,
                    data:[/!*20, 49, 70, 23, 25, 76, 135, 162, 32, 20, 16, 33, 76, 135,124,12,34,
                        152,74,32,21,13,44,54,123,21,3,12,0,23*!/]
                },*/
            ]
        };
        $.getJSON("json/dyxs.json",function (data) {
            Array.max = function( array ){ return Math.max.apply( Math, array ); }; // 取出数组中最大
            Array.min = function( array ){ return Math.min.apply( Math, array ); };
            var arr = data[0].cjl;
            var arr2 = data[2].cjl;
            var min = Array.min(arr);
            var max = Array.max(arr);
            var min2 = Array.min(arr2);
            var max2 = Array.max(arr2);
           
            option.yAxis[0].min=min;
            option.yAxis[0].max=max;
            option.yAxis[1].min=min2;
            option.yAxis[1].max=max2;
            
            data[0].cjl.forEach(function (value2,index){
                option.xAxis[0].data.push(index+1+"日");
            });
            data.forEach(function (value) {
                var series={
                    name:value.name,
                    type:value.type,
                    data:value.cjl
                };
                option.series.push(series);
                option.legend.data.push(value.name);
            });
            
            myChart.setOption(option);
        });
        
    };
    
    var showChart = function () {
        $('.js-month-echarts').click(function () {
            $('.js-fixed').addClass('on');
            openChart();
        });
        $('.js-fixed').click(function (e) {
            if($(e.target).hasClass('js-fixed')){
                $('.js-fixed').removeClass('on');
            }
        });
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
