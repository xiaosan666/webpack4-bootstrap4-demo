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
        {field: 'field1', title: '任务名称', width: 100, align: 'center'},
        {field: 'field2', title: '发布时间', width: 100, align: 'center'},
        {field: 'field3', title: '发布人', width: 100, align: 'center'},
        {field: 'field4', title: '计划完成时间', width: 100, align: 'center'},
        {field: 'field5', title: '处理人', width: 100, align: 'center'},
        {field: 'field6', title: '任务内容', width: 100, align: 'center'},
        {field: 'field7', title: '完成反馈', width: 100, align: 'center'},
        {field: 'field8', title: '完成时间', width: 100, align: 'center'},
        {field: 'field9', title: '状态', width: 100, align: 'center'},
        {
            field: 'field', title: '操作', width: 100, align: 'center', formatter: function (value) {
                return '<a href="javascript:;">明细</a>'
            }
        },
    ]]
});
