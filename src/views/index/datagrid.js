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
        // {field: 'ck', checkbox: true},
        { field: 'id', hidden: true },
        // {field:'invoiceTypeCode',title:'发票类型',width:100},
        { field: 'invoiceTypeName', title: '发票名称', width: 100 },
        { field: 'invoiceCode', title: '发票代码', width: 100 },
        { field: 'invoiceNumber', title: '发票号码', width: 100 },
        {
            field: 'billTime', title: '开票时间', width: 100, sortable: true, formatter: function (value) {
                return value ? Utils.dateFormat(new Date(value), 'yyyy年MM月dd日') : null;
            }
        },
        { field: 'checkCode', title: '校验码', width: 150 },
        { field: 'invoiceAmount', title: '开具金额(元)', width: 100, sortable: true },
        { field: 'totalTaxNum', title: '税额(元)', width: 100, sortable: true },
        { field: 'totalTaxSum', title: '价税合计(元)', width: 100, sortable: true },
        {
            field: 'voidMark', title: '状态(正常/作废)', width: 100, formatter: function (value) {
                return value ? (value === '1' ? '作废' : '正常') : null;
            }
        },
        { field: 'purchaserName', title: '购买方', width: 140 },
        { field: 'taxpayerNumber', title: '购买方税号', width: 140 },
        // {field:'taxpayerAddressOrId',title:'购买方地址',width:160},
        // {field:'taxpayerBankAccount',title:'购买方银行信息',width:160},
        { field: 'salesName', title: '销售方名称', width: 140 },
        { field: 'salesTaxpayerNum', title: '销售方税号', width: 140 },
        { field: 'salesTaxpayerAddress', title: '销售方地址', width: 190 },
        { field: 'salesTaxpayerBankAccount', title: '销售方银行信息', width: 190 },
        { field: 'invoiceRemarks', title: '备注', width: 190 },
        // {field: 'taxDiskCode', title: '机器编号', width: 160},
        // {field:'isBillMark',title:'是否为清单票  Y：是，N：否可以根据该字段展示清单票和正常票',width:160},
        // {field:'tollSign',title:'收费标志字段（06：可抵扣通行费 07：不可抵扣通行费，08：成品油）',width:160},
        // {field:'tollSignName',title:'收费标志名称',width:160}，
        { field: 'createTime', title: '记录创建时间', width: 140, sortable: true }
    ]]
});
