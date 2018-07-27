/**
 * Created by yanxiaojun on 2016/4/12.
 */
/**
 * 工具js文件。
 * 公用的可复用的方法放在这里。
 * 大致分为4部分
 * 1。字符串
 * 2。数组
 * 3。Cookie/Storage
 * 4。日期
 */
(function () {

    /**
     * @constructor
     */
    function Utils() {
    }

    Utils.prototype = {
        document: window.document,
        /**
         * 判断字符是否null，undefined和空字符串
         */
        isEmpty: function (str) {
            return (typeof(str) == "undefined" || str == null || str == "") ? true : false;
        },
        /**
         * 格式“是”or“否”
         */
        formatYesOrNo: function (value) {
            return value == 1 ? '是' : (value == '0' ? '否' : null);
        },
        /**
         * 获得中文字符串的长度。
         *   Utils.getLength('你好ab')
         *   return 6；
         */
        getLength: function (str, chineseDouble) {
            // var chineseRegex = /[\u4e00-\u9fa5]/g;
            var chineseRegex = /[\u4E00-\u9FA5\uf900-\ufa2d]/g;
            if (chineseDouble != undefined && chineseDouble === false) {
                return str.length;
            }
            else {
                if (chineseRegex.test(str)) {
                    return str.replace(chineseRegex, "zz").length;
                }
                return str.length;
            }
        },
        trim: function (str) {
            str = Utils.lTrim(str);
            str = Utils.rTrim(str);
            return str;
        },
        lTrim: function (str) {
            if (Utils.isEmpty(str)) return "";
            str = str.toString(10);
            str = str.replace(/^\s*/ig, "");
            return str;
        },
        rTrim: function (str) {
            if (Utils.isEmpty(str)) return "";
            str = str.toString(10);
            str = str.replace(/\s*$/ig, "");
            return str;
        },
        /**
         * 将html代码的html修饰去除。
         */
        htmlDecode: function (html) {
            var div = this.document.createElement("div");
            div.innerHTML = html;
            return div.innerText || div.textContent;
        },
        resource_serialize: function (form) {
            var o = {};
            $.each(form.serializeArray(), function (index) {
                if (o[this['name']]) {
                    o[this['name']] = o[this['name']] + "," + $.trim(this['value']);
                } else {
                    o[this['name']] = $.trim(this['value']);
                }
            });
            return o;
        },
        /**
         * 创建UUID
         * @returns {String}
         */
        createUuid: function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 32; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            //s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },
        /**
         * 阿拉伯数字转中文数字
         * @returns {String}
         */
        chinsesNumFormat: function (value) {
            var numberMap = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            if (value <= 10) {
                return numberMap[value];
            } else {
                return value;
            }
        },
        /**
         * 删除数组重复的数据
         */
        arrayDistinct: function (arr) {
            var tempArr = {};
            for (var i = 0; i < arr.length; i++) {
                if (tempArr[arr[i] + 1]) {
                    arr.splice(i, 1);
                    i--;
                    continue;
                }
                tempArr[arr[i] + 1] = true;
            }
            tempArr = null;
            return arr;
        },
        /**
         * 通过cookie的名字获得其内容
         */
        getCookie: function (sKey) {
            if (!sKey) {
                return "";
            }
            var cookie = document.cookie;
            if (cookie.length > 0) {
                var startIndex = cookie.indexOf(sKey + "=");
                if (startIndex != -1) {
                    startIndex = startIndex + sKey.length + 1;
                    var endIndex = cookie.indexOf(";", startIndex);
                    if (endIndex == -1) {
                        endIndex = cookie.length;
                    }
                    return decodeURIComponent(cookie.substring(startIndex, endIndex));
                }
            }
            return "";
        },
        /**
         *  sKey
         *  sValue
         *  iExpireSeconds 过期时间秒数，默认30天
         */
        setCookie: function (sKey, sValue, iExpireSeconds) {
            if (!sKey) {
                return;
            }
            iExpireSeconds = iExpireSeconds ? iExpireSeconds : 60 * 60 * 24 * 30;
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + iExpireSeconds * 1000);
            this.document.cookie = sKey + "=" + encodeURIComponent(sValue) + ";expires=" + expireDate.toGMTString() + ";";
        },
        deleteCookie: function (sKey) {
            if (!sKey)
                return;
            this.document.cookie = sKey + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        /**
         * 查询浏览器存储信息
         * @param sKey
         * @returns {string}
         */
        getStorage: function (sKey) {
            if (!sKey) {
                return;
            }
            var result = '';
            if (window.localStorage) {
                result = decodeURIComponent(localStorage.getItem(sKey) || '');
            }
            return result ? result : this.getCookie(sKey);
        },
        /**
         * 浏览器不支持Storage存在Cookie中
         * @param sKey
         * @param sValue
         * @param iExpireSeconds  过期时间秒数，默认30天
         */
        setStorage: function (sKey, sValue, iExpireSeconds) {
            if (!sKey)
                return;
            if (window.localStorage) {
                localStorage.setItem(sKey, encodeURIComponent(sValue));
            }
            else {
                this.setCookie(sKey, sValue, iExpireSeconds);
            }
        },
        deleteStorage: function (sKey) {
            if (!sKey)
                return;
            if (window.localStorage) {
                localStorage.removeItem(sKey);
            }
            else {
                this.deleteCookie(sKey);
            }
        },
        getSessionStorageItem: function (key) {
            var jsonString = sessionStorage.getItem(key);
            if (jsonString) {
                return JSON.parse(jsonString);
            }
            return null;
        },
        setSessionStorageItem: function (key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeSessionStorageItem: function (key) {
            sessionStorage.removeItem(key);
        },
        /**.replace(/-/g, "\/")
         * 格式化日期 2014-09-09
         */
        formatDate: function (day) {
            if (!day) return null;
            if (typeof day == 'string' && day.indexOf('-')) {
                day = Date.parse(day.replace(/-/g, "\/"));
            }
            var date = new Date(day), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            return [year, month, day].join('-');
        },
        /**
         * 格式化时间 09:09
         */
        formatTime: function (day) {
            if (!day) return null;
            if (typeof day == 'string' && day.indexOf('-')) {
                day = Date.parse(day.replace(/-/g, "\/"));
            }
            var date = new Date(day), hours = date.getHours(), minutes = date.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return [hours, minutes].join(':');
        },

        /**
         * 格式化日期时间 2014-09-09 09:09:09
         */
        formatDateTime: function (day) {
            if (!day) return null;
            if (typeof day == 'string' && day.indexOf('-')) {
                day = Date.parse(day.replace(/-/g, "\/"));
            }
            var date = new Date(day), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(),
                hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
        },
        /**
         * 获得某年2月的天数
         * obj:数字(如2012)或时间(如new Date())
         */
        daysInFebruary: function (obj) {
            var year = 0;
            if (obj instanceof Date) {
                year = obj.getFullYear();
            }
            else if (typeof obj === "number") {
                year = obj;
            }
            else {
                return 0;
            }
            if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                return 29;
            }
            return 28;
        },
        /**
         * 获得某个年份的天数
         * obj:数字(如2012)或时间(如new Date())
         */
        daysInYear: function (obj) {
            var year = 0;
            if (obj instanceof Date) {
                year = obj.getFullYear();
            }
            else if (typeof obj === "number") {
                year = obj;
            }
            else {
                return 0;
            }
            if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                return 366;
            }
            return 365;
        },
        /**
         * 格式化日期（月和星期）
         * sFormat：日期的格式(如yy-MM-dd)。年：y，月：M，日：d，时：h，分：m，秒：s
         * sLanguage: 默认为中文。当为'en'的时候是英文。
         */
        dateFormat: function (date, sFormat, sLanguage) {
            var time = {};
            time.Year = date.getFullYear();
            time.TYear = ("" + time.Year).substr(2);
            time.Month = date.getMonth() + 1;
            time.TMonth = time.Month < 10 ? "0" + time.Month : time.Month;
            time.Day = date.getDate();
            time.TDay = time.Day < 10 ? "0" + time.Day : time.Day;
            time.Hour = date.getHours();
            time.THour = time.Hour < 10 ? "0" + time.Hour : time.Hour;
            time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
            time.Thour = time.hour < 10 ? "0" + time.hour : time.hour;
            time.Minute = date.getMinutes();
            time.TMinute = time.Minute < 10 ? "0" + time.Minute : time.Minute;
            time.Second = date.getSeconds();
            time.TSecond = time.Second < 10 ? "0" + time.Second : time.Second;
            time.Millisecond = date.getMilliseconds();
            time.Week = date.getDay();

            var MMMArrEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                MMMArr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                WeekArrEn = ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"],
                WeekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                oNumber = time.Millisecond / 1000;

            if (sFormat != undefined && sFormat.replace(/\s/g, "").length > 0) {
                if (sLanguage != undefined && sLanguage === "en") {
                    MMMArr = MMMArrEn.slice(0);
                    WeekArr = WeekArrEn.slice(0);
                }
                sFormat = sFormat.replace(/yyyy/ig, time.Year)
                    .replace(/yyy/ig, time.Year)
                    .replace(/yy/ig, time.TYear)
                    .replace(/y/ig, time.TYear)
                    .replace(/MMM/g, MMMArr[time.Month - 1])
                    .replace(/MM/g, time.TMonth)
                    .replace(/M/g, time.Month)
                    .replace(/dd/ig, time.TDay)
                    .replace(/d/ig, time.Day)
                    .replace(/HH/g, time.THour)
                    .replace(/H/g, time.Hour)
                    .replace(/hh/g, time.Thour)
                    .replace(/h/g, time.hour)
                    .replace(/mm/g, time.TMinute)
                    .replace(/m/g, time.Minute)
                    .replace(/ss/ig, time.TSecond)
                    .replace(/s/ig, time.Second)
                    .replace(/fff/ig, time.Millisecond)
                    .replace(/ff/ig, oNumber.toFixed(2) * 100)
                    .replace(/f/ig, oNumber.toFixed(1) * 10)
                    .replace(/EEE/g, WeekArr[time.Week]);
            } else {
                sFormat = time.Year + "-" + time.Month + "-" + time.Day + " " + time.Thour + ":" + time.TMinute + ":" + time.TSecond;
            }
            return sFormat;
        },
        /**
         * 计算两个日期之间的间隔。
         * 如果相差1分钟内，返回'x秒'；
         * 如果相差1分钟到60分组，返回'x分钟'；
         * 如果相差1小时到24小时，返回'x小时';
         * 如果相差1天到7天，返回'x天';
         * 如果相差7天到31天，返回'x周'；
         * 如果相差31天到365天，返回'x月'；
         * 相差1年或以上，返回'x年';
         */
        dateDiff: function (biggerDate, smallerDate) {
            var intervalSeconds = parseInt((biggerDate - smallerDate) / 1000);
            if (intervalSeconds < 60) {
                return intervalSeconds + "秒";
            }
            else if (intervalSeconds < 60 * 60) {
                return Math.floor(intervalSeconds / 60) + "分钟";
            }
            else if (intervalSeconds < 60 * 60 * 24) {
                return Math.floor(intervalSeconds / (60 * 60)) + "小时";
            }
            else if (intervalSeconds < 60 * 60 * 24 * 7) {
                return Math.floor(intervalSeconds / (60 * 60 * 24)) + "天";
            }
            else if (intervalSeconds < 60 * 60 * 24 * 31) {
                return Math.floor(intervalSeconds / (60 * 60 * 24 * 7)) + "周";
            }
            else if (intervalSeconds < 60 * 60 * 24 * 365) {
                return Math.floor(intervalSeconds / (60 * 60 * 24 * 30)) + "月";
            }
            else if (intervalSeconds < 60 * 60 * 24 * 365 * 1000) {
                return Math.floor(intervalSeconds / (60 * 60 * 24 * 365)) + "年";
            }
            else {
                return Math.floor(intervalSeconds / (60 * 60 * 24)) + "天";
            }
        },
        /**
         * 时间差，返回 0天:0小时:0分钟:0秒"
         * */
        dateInterval: function (biggerDate, smallerDate) {
            var intervalSeconds = parseInt((biggerDate - smallerDate) / 1000),
                day = Math.floor(intervalSeconds / (60 * 60 * 24)),
                hour = Math.floor((intervalSeconds - day * 24 * 60 * 60) / 3600),
                minute = Math.floor((intervalSeconds - day * 24 * 60 * 60 - hour * 3600) / 60),
                second = Math.floor(intervalSeconds - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
            return day + "天:" + hour + "小时:" + minute + "分钟:" + second + "秒";
        },
        /**
         * 自定义表单验证显示错误信息位置
         * @param msg
         * @param o
         * @param cssctl
         */
        tiptype: function (msg, o, cssctl) {
            var $p = o.obj.parent(),
                $span = $p.find('.Validform_checktip').length == 1 ? $p.find('.Validform_checktip') : $p.parent().find('.Validform_checktip');
            if (o.type != 2) {//2：通过验证；不显示‘通过信息验证！’
                $span.text(msg)
                cssctl($span, o.type);
            } else {
                $span.text('');
                $span.removeClass('Validform_wrong');
            }
        },
        /**
         * 每次调用递增
         * Utils.getSequence()//10001
         * Utils.getSequence()//10002
         * Utils.getSequence()//10003
         */
        getSequence: (function () {
            var sequence = 10000;
            return function () {
                return ++sequence;
            };
        })(),
        /**
         * 打开loading模态窗口
         * */
        showLoading: function () {
            if (window.LoadingIsShow) {
                return;
            }
            window.LoadingIsShow = true;
            var $body = $('body').height() === 0 ? $(document) : $('body'),
                to = (($body.scrollTop() + $body.height()) >> 1) - 50, lef = ($body.scrollLeft() + $body.width()) >> 1;
            var html = ['<div class="datagrid-mask js-model" style="position:absolute;display:block;z-index:' + this.getSequence() + ';width:100%;height: 100%;background: #ccc;opacity: 0.3;"></div>'];
            html.push('<div class="js-model" style="position:absolute;display:block;z-index: ' + this.getSequence() + ';top: ' + to + 'px;left: ' + lef + 'px;"><i class="fa fa-spinner fa-pulse fa-lg"></i></div>');
            $body.append(html.join(''));
        },
        /**
         * 关闭loading模态窗口
         * */
        hideLoading: function () {
            if (!window.LoadingIsShow) {
                return;
            }
            setTimeout(function () {
                window.LoadingIsShow = false;
                $('.js-model').remove();
            }, 0)
        },
        /**
         * datagrid 执行查询过滤公共函数
         * @param $dg
         * @param field
         * @param value
         * @param op
         */
        doFilter: function ($dg, field, value, op) {
            if (!value) {
                $dg.datagrid('removeFilterRule', field);
            } else {
                $dg.datagrid('addFilterRule', {
                    field: field,
                    op: op || 'equal',
                    value: value
                });
            }
            $dg.datagrid('unselectAll').datagrid('doFilter');
        },
        showToast: function (message) {
            $.messager.show({msg: message || '操作成功', showType: 'show', timeout: 2000});
        },
        /**
         * 把url中的双斜杠替换为单斜杠
         * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
         * @param url
         * @returns {string}
         */
        formatUrl: function (url) {
            var index = 0;
            if (url.startsWith('http')) {
                index = 7;
            }
            return url.substring(0, index) + url.substring(index).replace(/\/\/*/g, '/');
        }
    };

    window.Utils = new Utils();

})();

