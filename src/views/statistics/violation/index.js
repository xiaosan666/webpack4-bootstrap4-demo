import '../../../assets/Common';
let echarts = require('echarts');
import './datagrid';
import './index.scss';
import './index.html';


let option5 = {
    tooltip: {
        trigger: 'axis'
    },
    color: ['#dfa7a6'],
    xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [3, 1, 3, 6, 3, 3, 5, 3, 3, 3, 1, 3],
        type: 'line'
    }]
};
echarts.init(document.getElementById('chart5')).setOption(option5);


let option6 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',
        left: 'right',
        data: ['公务车', '生产车']
    },
    color: ['#93cddd', '#fac090'],
    series: [
        {
            name: '故障情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {
                    value: 10,
                    name: '公务车',
                    color: '#d7e4bd'
                },
                {
                    value: 15,
                    name: '生产车',
                    color: '#93cddd'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
echarts.init(document.getElementById('chart6')).setOption(option6);
