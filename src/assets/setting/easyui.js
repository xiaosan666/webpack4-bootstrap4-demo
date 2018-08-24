import '../libs/jquery-easyui/1.5.5.4/themes/bootstrap/easyui.css';
import '../libs/jquery-easyui/1.5.5.4/themes/icon.css';
import '../libs/jquery-easyui/1.5.5.4/jquery.easyui.min.js';
import '../libs/jquery-easyui/1.5.5.4/extension/datagrid-filter.js';
import '../libs/jquery-easyui/1.5.5.4/extension/jquery.base64.js';
import '../libs/jquery-easyui/1.5.5.4/extension/datagrid-ExportExcel.js';
import '../libs/jquery-easyui/1.5.5.4/locale/easyui-lang-zh_CN.js';
import './easyui.css';

/**
 * 覆盖easyui默认设置
 */
let dateboxButtons = $.extend([], $.fn.datebox.defaults.buttons);
dateboxButtons.splice(1, 0, {
    text: '清空',
    handler: function (target) {
        $(target).datebox('clear').datebox('hidePanel');
    }
});
$.fn.datebox.defaults.buttons = dateboxButtons;


// 设置easyui datebox默认不可编辑
$.fn.datebox.defaults.editable = false;

// 设置easyui combobox默认不可编辑
$.fn.combobox.defaults.editable = false;

// 给easyui combobox添加清空图标
$.fn.combobox.defaults.icons = [{
    iconCls: 'icon-clear',
    handler: function (e) {
        $(e.data.target).combobox('clear');
    }
}];

// easyui datagrid每页默认20条数据
$.fn.datagrid.defaults.pageSize = 20;
$.fn.datagrid.defaults.pageList = [10, 20, 50, 100, 200];

// easyui datagrid loading提示内容，设置为空则不会显示loading
$.fn.datagrid.defaults.loadMsg = '';

// easyui datagrid 日期范围过滤
$.extend($.fn.datagrid.defaults.filters, {
    dateRange: {
        init: function (container, options) {
            let input = $('<input>').appendTo(container);
            input.combo($.extend({
                panelWidth: 330,
                panelHeight: 254,
                editable: false
            }, options, {
                onShowPanel: function () {
                    let dd = input.combo('getText').split(':');
                    let d1 = $.fn.datebox.defaults.parser(dd[0]);
                    let d2 = $.fn.datebox.defaults.parser(dd[1]);
                    let p = input.combo('panel');
                    p.find('.c1').calendar('moveTo', d1);
                    p.find('.c2').calendar('moveTo', d2);
                }
            }));

            let p = input.combo('panel');
            $('<div class="clearfix"><div class="c1" style="width:50%;float:left"></div><div class="c2" style="width:50%;float:right"></div></div>').appendTo(p);
            let c1 = p.find('.c1').calendar();
            let c2 = p.find('.c2').calendar();
            let footer = $('<div></div>').appendTo(p);
            let formatter = function (v) {
                return $.fn.datebox.defaults.formatter(v);
            };
            let setValue = function (v1, v2) {
                let v = v1 + '~' + v2;
                input.combo('setValue', v).combo('setText', v);
                input.combo('hidePanel');
            };

            let thisMonthBtn = $('<button type="button" style="margin: 2px;" class="btn btn-info btn-sm">本月</button>').appendTo(footer);
            thisMonthBtn.bind('click', function () {
                let v1 = formatter(new Date(new Date().setDate(1)));
                let v2 = formatter(new Date());
                setValue(v1, v2);
            });

            let monthBtn = $('<button type="button" style="margin: 2px;" class="btn btn-info btn-sm">过去30天</button>').appendTo(footer);
            monthBtn.bind('click', function () {
                let now = new Date(); let
                    newDate = new Date(now.setDate(now.getDate() - 30));
                let v1 = formatter(newDate);
                let v2 = formatter(new Date());
                setValue(v1, v2);
            });

            let weekBtn = $('<button type="button" style="margin: 2px;" class="btn btn-info btn-sm">过去7天</button>').appendTo(footer);
            weekBtn.bind('click', function () {
                let now = new Date(); let
                    newDate = new Date(now.setDate(now.getDate() - 7));
                let v1 = formatter(newDate);
                let v2 = formatter(new Date());
                setValue(v1, v2);
            });

            let yesterdaybtn = $('<button type="button" style="margin: 2px;" class="btn btn-info btn-sm">昨天</button>').appendTo(footer);
            yesterdaybtn.bind('click', function () {
                let now = new Date(); let
                    yesterday = new Date(now.setDate(now.getDate() - 1));
                let v1 = formatter(yesterday);
                let v2 = formatter(yesterday);
                setValue(v1, v2);
            });

            let todayBtn = $('<button type="button" style="margin: 2px;" class="btn btn-info btn-sm">今天</button>').appendTo(footer);
            todayBtn.bind('click', function () {
                let now = new Date();
                let v1 = formatter(now);
                let v2 = formatter(now);
                setValue(v1, v2);
            });

            let clearBtn = $('<button type="button" style="margin: 2px;" class="btn btn-primary btn-sm">不过滤</button>').appendTo(footer);
            clearBtn.bind('click', function () {
                input.combo('clear').combo('hidePanel');
            });

            let okBtn = $('<button type="button" style="margin: 2px;" class="btn btn-primary btn-sm">确定</button>').appendTo(footer);
            okBtn.bind('click', function () {
                let v1 = formatter(c1.calendar('options').current);
                let v2 = formatter(c2.calendar('options').current);
                setValue(v1, v2);
            });
            return input;
        },
        destroy: function (target) {
            $(target).combo('destroy');
        },
        getValue: function (target) {
            let p = $(target).combo('panel');
            let v1 = $.fn.datebox.defaults.formatter(p.find('.c1').calendar('options').current);
            let v2 = $.fn.datebox.defaults.formatter(p.find('.c2').calendar('options').current);
            return v1 + ':' + v2;
        },
        setValue: function (target, value) {
            let dd = value.split(':');
            let d1 = $.fn.datebox.defaults.parser(dd[0]);
            let d2 = $.fn.datebox.defaults.parser(dd[1]);
            let p = $(target).combo('panel');
            p.find('.c1').calendar('moveTo', d1);
            p.find('.c2').calendar('moveTo', d2);
            $(target).combo('setValue', value).combo('setText', value);
        },
        resize: function (target, width) {
            $(target).combo('resize', width);
        }

    }
});
