import myData from './data.json';

let $dg1 = $('#dg1');

$dg1.datagrid({
    title: '成本明细',
    striped: true,
    singleSelect: true,
    nowrap: false,
    pageSize: 10,
    pagination: true,
    rownumbers: true,
    idField: 'id',
    filterDelay: 600,
    onBeforeLoad: function (param) {

    },
    onLoadSuccess: function (data) {
    },
    loader: function (param, success) {
        success(myData);
    },
    columns: [[
        {field: 'id', hidden: true},
        {field: 'field1', title: '车牌号码', width: 100, align: 'center'},
        {field: 'field2', title: '品牌类型', width: 100, align: 'center'},
        {field: 'field3', title: '上期公里数', width: 100, align: 'center'},
        {field: 'field4', title: '本期公里数', width: 100, align: 'center'},
        {field: 'field5', title: '用油量（升）', width: 100, align: 'center'},
        {field: 'field6', title: '加油费', width: 100, align: 'center'},
        {field: 'field7', title: '路桥费', width: 100, align: 'center'},
        {field: 'field8', title: '维修费', width: 100, align: 'center'},
        {field: 'field9', title: '总费用', width: 100, align: 'center'},
        {field: 'field10', title: '每公里成本', width: 100, align: 'center'},
        {field: 'field11', title: '百公里油耗', width: 100, align: 'center'},
        {
            field: 'field12', title: '操作', width: 100, align: 'center', formatter: function (value) {
                return '<a href="javascript:;">明细</a>'
            }
        },
    ]]
});
