import '../../assets/Common';
import './myjs.min';
import './index.scss';
import './index.html';

$('form').on('submit', function () {
    if (TEST) {
        window.location.href = 'invoice.html';
        return false;
    }
    let data = Utils.formSerialize(this);
    data.password = hex_md5(data.password);
    Http({
        url: '/v1/login',
        data: data,
        success: function (token) {
            window.token = token;
            Utils.setSessionStorage('token', token);
            window.location.href = 'invoice.html';
        }
    }).post();
    return false;
});

// 判断浏览器是否支持webp格式
function isSupportWebp(callback) {
    let img = new Image();

    function getResult(event) {
        // 如果进入加载且图片宽度为1(通过图片宽度值判断图片是否可以显示)
        let isSupportWebp = event && event.type === 'load' ? img.width === 1 : false;
        callback && callback(isSupportWebp);
    }

    img.onerror = getResult;
    img.onload = getResult;
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='; // 一像素图片
}


/* 动态加载首页背景图，让移动端不加载，让chrome加载webp格式 */
const u = window.navigator.userAgent;
const isMobile = u.indexOf('Mobile') !== -1;
if (!isMobile) {
    isSupportWebp(isSupportWebp => {
        let src = require('../../assets/img/login.webp');
        if (!isSupportWebp) {
            src = require('../../assets/img/login.png');
        }
        $('#loginImg').html('<img src="' + src + '" alt="">');
    });
}
