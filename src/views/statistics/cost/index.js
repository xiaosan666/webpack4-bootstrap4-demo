import '../../../assets/Common';
let echarts = require('echarts');
import './datagrid';
import './index.scss';
import './index.html';


let option1 = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal',
        left: 'right',
        data: ['维修费', '油费', '路桥费']
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type: 'line',
            name: '维修费',
            color: '#d7e4bd',
            data: [2010, 2320, 2010, 1540, 2010, 2010, 3100, 2010, 1540, 1900, 3030, 2410]
        },
        {
            type: 'line',
            name: '油费',
            color: '#93cddd',
            data: [220, 500, 191, 234, 290, 500, 310, 200, 500, 290, 500, 500]
        },
        {
            type: 'line',
            name: '路桥费',
            color: '#fac090',
            data: [120, 100, 50, 29, 90, 111, 50, 101, 90, 90, 20, 70]
        }
    ]
};
echarts.init(document.getElementById('chart1')).setOption(option1);

let option2 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',
        left: 'right',
        data: ['维修费', '油费', '路桥费']
    },
    color: ['#d7e4bd', '#93cddd', '#fac090'],
    series: [
        {
            name: '用车费',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {
                    value: 6548,
                    name: '维修费'
                },
                {
                    value: 2000,
                    name: '油费'
                },
                {
                    value: 1000,
                    name: '路桥费'
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
echarts.init(document.getElementById('chart2')).setOption(option2);
