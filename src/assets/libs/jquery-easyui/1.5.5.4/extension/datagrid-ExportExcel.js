/**
 * Created on 2016/9/8.
 */

/**导出Excel
 * def: 配置文件类型、过滤column、文件名    如：{type: 'excel', ignoreField: [], excelName: '值守计划列表'}
 * */
(function ($) {
    $.extend($.fn.datagrid.methods, {
        ExportExcel: function (jq, def) {
            return jq.each(function () {
                var $dg = $(this);
                var defaults = {
                    type: 'excel',
                    ignoreField: [],
                    excelName: '下载'
                };
                $.extend(defaults, def);
                var params = {};
                var opts = $dg.datagrid('options');
                // 默认查询条件
                $.extend(params, opts.queryParams);
                // 范围条件
                params.page = 1;
                params.rows = 66000; //excel的最大限度
                // 排序条件
                if (opts.sortName) {
                    $.extend(params, { sort: opts.sortName, order: opts.sortOrder });
                }
                // 过滤条件
                var rules = opts.filterRules ? opts.filterRules : [];
                for (var i in rules) {
                    var rule = rules[i];
                    params[rule.field] = rule.value;
                }
                var param = opts.onBeforeLoad(params);
                opts.loader(param, function (data) {
                    var rows = data.rows;
                    var columns = opts.columns[0];
                    var ignoreFields = defaults.ignoreField;
                    var cols = [];

                    //过滤column
                    for (var i = 0; i < columns.length; i++) {
                        if (!(columns[i].checkbox || columns[i].hidden)) {
                            var column = columns[i];
                            var j = 0;
                            for (j = 0; j < ignoreFields.length; j++) {
                                var igF = ignoreFields[j];
                                if (column.field == igF) {
                                    break;
                                }
                            }
                            if (j == ignoreFields.length) {
                                cols.push(column);
                            }
                        }
                    }

                    //创建和导出excel
                    if (defaults.type == 'excel') {
                        var excel = '<table>';
                        excel += '<thead>';
                        excel += '<tr>';
                        excel += '<th></th>';
                        for (var i = 0; i < cols.length; i++) {
                            excel += '<th>' + cols[i].title + '</th>';
                        }
                        excel += '</tr>';
                        excel += '<thead>';
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            excel += '<tr>';
                            excel += '<td>' + parseInt(i + 1) + '</td>';
                            for (var j = 0; j < cols.length; j++) {
                                var field = cols[j].field;
                                var value = row[field];
                                if (cols[j].formatter) {
                                    var colFormat = cols[j].formatter(value, row, j);  // formatter API的参数最多3个
                                    if (value != null && value != undefined) {
                                        // 判断是时间格式，就添加一个空白避免excel对时间的格式化
                                        excel += '<td>' + (typeof value == 'number' && String(value).length == 13 ? '　' + colFormat : colFormat);
                                    } else {
                                        excel += '<td></td>';
                                    }
                                } else {
                                    // 如果是长度大于15的数字，防止excel把数字转为科学计数法
                                    if (value && !isNaN(value) && String(value).length > 15) {
                                        excel += '<td>' + ('内容：' + value) + '</td>';
                                    } else {
                                        excel += '<td>' + (value || '') + '</td>';
                                    }
                                }
                            }
                            excel += '</tr>';
                        }
                        excel += '</table>';
                        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
                        excelFile += "<head>";
                        excelFile += "<!--[if gte mso 9]>";
                        excelFile += "<xml>";
                        excelFile += "<x:ExcelWorkbook>";
                        excelFile += "<x:ExcelWorksheets>";
                        excelFile += "<x:ExcelWorksheet>";
                        excelFile += "<x:Name>";
                        excelFile += (defaults.excelName ? defaults.excelName : 'book');
                        excelFile += "</x:Name>";
                        excelFile += "<x:WorksheetOptions>";
                        excelFile += "<x:DisplayGridlines/>";
                        excelFile += "</x:WorksheetOptions>";
                        excelFile += "</x:ExcelWorksheet>";
                        excelFile += "</x:ExcelWorksheets>";
                        excelFile += "</x:ExcelWorkbook>";
                        excelFile += "</xml>";
                        excelFile += "<![endif]-->";
                        excelFile += "</head>";
                        excelFile += "<body>";
                        excelFile += excel;
                        excelFile += "</body>";
                        excelFile += "</html>";
                        var base64data = "base64," + $.base64.encode(excelFile);
                        var link = 'data:application/vnd.ms-excel;filename=exportData.doc;' + base64data;
                        var fileName = (defaults.excelName ? defaults.excelName : '下载') + '.xls';
                        var $a = $('<a></a>');
                        $a.attr({ download: fileName, href: link });
                        $a.appendTo($dg);
                        $a[0].click();
                        $a.remove();
                    }
                });
            });
        }
    })

})(jQuery);
