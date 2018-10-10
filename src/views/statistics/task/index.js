import '../../../assets/Common';
let echarts = require('echarts');
import './datagrid';
import './index.scss';
import './index.html';


let option7 = {
    color: ['#fac090'],
    xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
};
echarts.init(document.getElementById('chart7')).setOption(option7);


let option8 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',
        left: 'right',
    },
    color: ['#8eb4e3', '#fac090'],
    series: [
        {
            name: '任务情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 50, name: '已完成'},
                {value: 10, name: '未完成'}
            ]
        }
    ]
};
echarts.init(document.getElementById('chart8')).setOption(option8);


