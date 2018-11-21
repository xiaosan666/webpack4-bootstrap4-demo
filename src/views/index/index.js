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

/* 动态加载首页背景图，让移动端不加载，让chrome加载webp格式 */
const u = window.navigator.userAgent;
const isMobile = u.indexOf('Mobile') !== -1;
const isChrome = u.indexOf('Chrome') !== -1;
if (!isMobile) {
    let src = require('../../assets/img/login.webp');
    if (!isChrome) {
        src = require('../../assets/img/login.png');
    }
    $('#loginImg').html('<img src="' + src + '" alt="">');
}
