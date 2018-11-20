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

/* 动态加载首页背景图，让移动端不加载 */
if (window.navigator.userAgent.indexOf('Mobile') === -1) {
    $('#loginImg').html('<img src="' + require('../../assets/img/login.png') + '" alt="">');
}
