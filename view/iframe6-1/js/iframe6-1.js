var nav = function () {
    var into = function () {
        openMenu();
        productPage();
        barechatr();
        allChecked();
        using();
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
        $('.js-iframe2-list-r1').delegate('.js-allChecked','click',function () {
            var flag = $(this).prop("checked");
            $('.js-itemChecked').prop("checked",$(this).prop("checked"));
        });
        $('.js-iframe2-list-r1').delegate('.js-itemChecked','click',function () {
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
    var barechatr = function () {
        var myChart = echarts.init(document.getElementById('main'));
      
        var option = {
            color: ['#FFD97F','#82FF8A','#6BFFF8','#8EA7FF','#E081FF','#ffae9f','#ffc2b6','#87cefa','#baffb3'],
            title : {
               /* text: '用户等级统计',
                subtext: '实时更新最新等级情况',*/
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                top:40,
                left:20,
                orient: 'vertical',
                data: [/*'普通会员','铁牌会员',' 铜牌会员',' 银牌会员','金牌会员',
                    '钻石会员','红钻会员',
                    '蓝钻会员','黑钻'*/]
            },
            series : [
               /* {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                    
                        {value:335, name:'直接访问'},
                        {value:335, name:'直接访问'},
                        {value:335, name:'直接访问'},
                        {value:335, name:'直接访问'},
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }*/
            ]
        };
        $.getJSON("json/djtj.json",function (data){
            option.title.text=data.barname;
            option.title.subtext=data.subtext;
            var serie={
                name: data.barname,
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    /*{value:335, name:'直接访问'},
                    {value:335, name:'直接访问'},
                    {value:335, name:'直接访问'},
                    {value:335, name:'直接访问'},
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}*/
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
            data.hy.forEach(function (value) {
                serie.data.push({value:value.val, name:value.name});
                option.legend.data.push(value.name);
            });
            option.series.push(serie);
            myChart.setOption(option);
        });
    };
    var productPage = function () {
        $.getJSON("json/ppag1.json",function (data) {
            var pa = template("produtPage",data);
            $(".js-iframe2-list-r1").html(pa);
        });
        $('.js-iframe2-list-r1').delegate('.js-next-page','click',function () {
            $.getJSON('json/ppag2.json',function (data) {
                var gg = template('produtPage', data);
                $('.js-iframe2-list-r1').html(gg);
            });
        });
        $('.js-iframe2-list-r1').delegate('.js-pre-page','click',function () {
            $.getJSON('json/ppag1.json',function (data) {
                var gg = template('produtPage', data);
                $('.js-iframe2-list-r1').html(gg);
            });
        });
    };
    var using = function () {
        $('.js-iframe2-list-r1').delegate('.js-set-on:not(.on)','click',function () {
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
        $('.js-iframe2-list-r1').delegate('.js-set-on.on','click',function () {
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
        $('.js-iframe2-list-r1').delegate('.js-set-mo','click',function () {
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

var arr = [{name:'xxx',sex:'男'},{name:'yyy',sex:'男'},{name:'zzz',sex:'男'},{name:'aaa',sex:'男'}];
arr[3].name = 'bbb';