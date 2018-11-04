import '../../assets/Common';
import echarts from '../../assets/libs/echarts/echarts.common.min';
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


let option3 = {
    color: ['#93cddd', '#fac090'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal',
        left: 'right',
        data: ['公务车', '生产车']
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
        name: '公务车',
        type: 'line'
    }, {
        data: [10, 6, 6, 7, 9, 9, 5, 10, 6, 9, 9, 5],
        name: '生产车',
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

let option5 = {
    color: ['#93cddd', '#fac090'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal',
        left: 'right',
        data: ['公务车', '生产车']
    },
    xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 1],
        name: '公务车',
        type: 'line'
    }, {
        data: [3, 4, 3, 5, 3, 3, 5, 3, 4, 3, 4, 3],
        name: '生产车',
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
                { value: 50, name: '已完成' },
                { value: 10, name: '未完成' }
            ]
        }
    ]
};
echarts.init(document.getElementById('chart8')).setOption(option8);

