import '../../../assets/Common';
let echarts = require('echarts');
import './datagrid';
import './index.scss';
import './index.html';


let option3 = {
    color: ['#93cddd'],
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [5, 10, 6, 6, 7, 9, 12, 5, 10, 6, 9, 12],
        type: 'line'
    }]
};
echarts.init(document.getElementById('chart3')).setOption(option3);


let option4 = {
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
                    value: 20,
                    name: '公务车',
                    color: '#d7e4bd'
                },
                {
                    value: 60,
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
echarts.init(document.getElementById('chart4')).setOption(option4);
