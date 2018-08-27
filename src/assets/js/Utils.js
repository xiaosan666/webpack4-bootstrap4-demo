/**
 * Utils类存放和业务无关的公共方法；Helper类存放和业务有关的公共方法；
 */

window.Utils = {
    /**
     * 格式化日期（月和星期）
     * @param date：日期参数，默认为new Date()，可以是任何类日期格式，如1533779172927 '1533779172927' '2018-08-09'
     * @param sFormat：日期的格式,默认为 yyyy-MM-dd
     * @param sLanguage：默认为中文。当为'en'的时候是英文
     *
     * @example  Utils.dateFormat()                                      "2018-08-09"
     * @example  Utils.dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')      "2018-08-09 09:06:06"
     * @example  Utils.dateFormat(new Date(),'yy-M-d H:m:s')             "18-8-9 9:6:6"
     * @example  Utils.dateFormat(new Date(),'yyyy年MM月dd日 HH:mm:ss')  "2018年08月09日 09:06:06"
     * @example  Utils.dateFormat(new Date(),'MM月dd日 EEE')             "08月09日 星期四"
     * @example  Utils.dateFormat(new Date(),'MMM')                      "八月"
     * @example  Utils.dateFormat(new Date(),'MMM','en')                 "Aug"
     *
     */
    dateFormat: function (obj = new Date(), sFormat = 'yyyy-MM-dd', sLanguage) {
        let date = Utils.toDate(obj);
        let time = {};
        time.Year = date.getFullYear();
        time.TYear = (String(time.Year)).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : time.Month;
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : time.Day;
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : time.Hour;
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : time.hour;
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : time.Minute;
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : time.Second;
        time.Millisecond = date.getMilliseconds();
        time.Week = date.getDay();
        let MMMArrEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let MMMArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        let WeekArrEn = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'];
        let WeekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let oNumber = time.Millisecond / 1000;
        if (sLanguage === 'en') {
            MMMArr = MMMArrEn.slice(0);
            WeekArr = WeekArrEn.slice(0);
        }
        return sFormat.replace(/yyyy/ig, time.Year)
            .replace(/yy/ig, time.TYear)
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
    },
    /**
     * 将类日期参数转为Date类型
     * @param obj 日期参数
     * @example  Utils.toDate(1533779172927)
     * @example  Utils.toDate('1533779172927')
     * @example  Utils.toDate('2018-08-09')
     */
    toDate: function (obj) {
        /* eslint-disable no-param-reassign */
        if (!obj) {
            throw new Error('obj参数不允许为空');
        }
        // 将时间毫秒数string类型转为number类型
        !isNaN(obj) && (obj = Number(obj));
        // 兼容Safari和ie8处理，详情：https://www.jianshu.com/p/dc83b45a9480
        typeof obj === 'string' && obj.indexOf('-') && (obj = obj.replace(/-/g, '\/'));
        try {
            obj = new Date(obj);
            // 判断obj是否为Invalid Date
            if (obj instanceof Date && isNaN(obj.getTime())) {
                throw new Error();
            }
            return new Date(obj);
        } catch (e) {
            throw new Error('obj参数格式不正确');
        }
        /* eslint-enable */
    },
    /**
     * 表单数据序列化，返回数据对象
     * @param obj：字符串格式表示表单id，否则表示表单对象
     */
    formSerialize: function (obj) {
        let form = obj;
        if (typeof obj === 'string') {
            form = document.getElementById(obj);
        }
        if (obj instanceof $) {
            form = form[0];
        }
        let arr = {};
        for (let i = 0; i < form.elements.length; i++) {
            let feled = form.elements[i];
            switch (feled.type) {
                /* eslint-disable-next-line  no-undefined */
                case undefined:
                case 'button':
                case 'file':
                case 'reset':
                case 'submit':
                    break;
                case 'checkbox':
                case 'radio':
                    if (!feled.checked) {
                        break;
                    }
                /* eslint-disable-next-line  no-fallthrough */
                default:
                    if (arr[feled.name]) {
                        arr[feled.name] = arr[feled.name] + ',' + feled.value;
                    } else {
                        arr[feled.name] = feled.value;
                    }
            }
        }
        return arr;
    },
    /**
     * 获得字符串的长度，中文字符默认按2个长度
     * @param str 字符串参数
     * @example  Utils.getLength('你好ab')        6
     * @example  Utils.getLength('你好ab',false)  4
     */
    getLength: function (str, chineseDouble) {
        if (chineseDouble === false) {
            return str.length;
        } else {
            let chineseRegex = /[\u4E00-\u9FA5\uf900-\ufa2d]/g;
            if (chineseRegex.test(str)) {
                return str.replace(chineseRegex, 'zz').length;
            }
            return str.length;
        }
    },
    /**
     * 去除字符串两边空格
     */
    trim: function (str) {
        return Utils.rTrim(Utils.lTrim(str));
    },
    /**
     * 去除字符串左边空格
     */
    lTrim: function (str) {
        if (!str) return '';
        return str.replace(/^\s*/ig, '');
    },
    /**
     * 去除字符串右边空格
     */
    rTrim: function (str) {
        if (!str) return '';
        return str.replace(/\s*$/ig, '');
    },
    /**
     * 将html代码的html修饰去除。
     */
    htmlDecode: function (html) {
        let div = this.document.createElement('div');
        div.innerHTML = html;
        return div.innerText || div.textContent;
    },
    /**
     * 创建UUID
     * @returns {String}
     */
    createUuid: function () {
        let s = [];
        let hexDigits = '0123456789abcdef';
        for (let i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        // s[8] = s[13] = s[18] = s[23] = "-";
        return s.join('');
    },
    /**
     * 保存数据到Cookie中
     *  expireSeconds 过期时间秒数，默认30天
     */
    setCookie: function (key, value, expireSeconds) {
        if (key && value) {
            let expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (expireSeconds || 60 * 60 * 24 * 30) * 1000);
            this.document.cookie = key + '=' + JSON.stringify(value) + ';expires=' + expireDate.toGMTString() + ';';
        }
    },
    /**
     * 通过key从Cookie中获取内容
     */
    getCookie: function (key) {
        if (key) {
            let cookie = document.cookie;
            if (cookie.length > 0) {
                let startIndex = cookie.indexOf(key + '=');
                if (startIndex !== -1) {
                    startIndex = startIndex + key.length + 1;
                    let endIndex = cookie.indexOf(';', startIndex);
                    if (endIndex === -1) {
                        endIndex = cookie.length;
                    }
                    let result = cookie.substring(startIndex, endIndex);
                    return result ? JSON.parse(result) : null;
                }
            }
            return null;
        }
    },
    /**
     * 根据key删除Cookie保存的内容
     */
    deleteCookie: function (key) {
        key && (this.document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;');
    },
    /**
     * 保存数据到Storage中，浏览器不支持Storage则存在Cookie中
     */
    setStorage: function (key, value, expireSeconds) {
        if (key && value) {
            if (window.localStorage) {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                this.setCookie(key, value, expireSeconds);
            }
        }
    },
    /**
     * 从Storage获取缓存的内容
     */
    getStorage: function (key) {
        if (key) {
            let result = '';
            if (window.localStorage) {
                result = localStorage.getItem(key);
            }
            return result ? JSON.parse(result) : this.getCookie(key);
        }
    },
    /**
     * 根据key从Storage删除缓存内容
     */
    deleteStorage: function (key) {
        key && (window.localStorage ? localStorage.removeItem(key) : this.deleteCookie(key));
    },
    /**
     * 保存数据到SessionStorage中
     */
    setSessionStorage: function (key, value) {
        if (key && value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    },
    /**
     * 从SessionStorage获取缓存的内容
     */
    getSessionStorage: function (key) {
        if (key) {
            let jsonString = sessionStorage.getItem(key);
            return jsonString ? JSON.parse(jsonString) : null;
        }
    },
    /**
     * 根据key从SessionStorage删除缓存内容
     */
    deleteSessionStorage: function (key) {
        key && sessionStorage.removeItem(key);
    },
    /**
     * 每次调用递增
     * Utils.getSequence()//10001
     * Utils.getSequence()//10002
     * Utils.getSequence()//10003
     */
    getSequence: (function () {
        let sequence = 10000;
        return function () {
            return ++sequence;
        };
    })(),
    /**
     * 把url中的双斜杠替换为单斜杠
     * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
     * @param url
     * @returns {string}
     */
    formatUrl: function (url) {
        let index = 0;
        if (url.indexOf('http') !== -1) {
            index = 7;
        }
        return url.substring(0, index) + url.substring(index).replace(/\/\/*/g, '/');
    },
    isIE: function () {
        return !!window.ActiveXObject || 'ActiveXObject' in window;
    }

};

