var head = function () {
    var init = function () {
        loadData();
    };
    var loadData = function () {
        
        var myChart = echarts.init(document.getElementById('iframe4-content-earch'));
        option = {
            color: ['#2EC7C9', '#B6A2DE', '#FFB980'],
            title: {
                text: '月购买订单成交记录',
                subtext: '实时获取用户订单成交记录',
                textStyle: {color: "#49abdb"},
                subtextStyle: {color: "#dddddd"}
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [/*'所有订单','待付款','已付款'*/]
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: []
                }],
            yAxis: [
                {
                    type: 'value'
                }],
            series: []
        };
        $.getJSON('json/ddqk.json', function (data) {
           
            data[0].qs.forEach(function (value2,index) {
                option.xAxis[0].data.push(index+1+'月');
            });
            
            data.forEach(function (value,index) {
                var dd = {
                    itemStyle: {barBorderRadius: 8},
                    barWidth: 20,
                    label: {distance: 500},
                    legendHoverLink: true,
                    name: value.name,
                    type: 'bar',
                    data: value.qs,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}]
                    }
                };
                
                option.series.push(dd);
                
                option.legend.data.push(value.name);
            });
            
            myChart.setOption(option);
        });
        
    };
    return {
        init: init
    }
}();
