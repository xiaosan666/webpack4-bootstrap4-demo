import '../../assets/Common';
import '../../assets/libs/myjs.min';
import './index.scss';
import './index.html';

// 因为要触发html5的表单验证，此事件在form的onsubmit方法下调用，所以这个方法返回必须是“return false”,而不是“return”
window.Login = function (username, password) {
    if (TEST) {
        window.location.href = 'invoice.html';
        return false;
    }
    Http.config({
        url: '/v1/login',
        data: {
            username: username,
            password: hex_md5(password),
            client_id: 'web'
        },
        success: function (token) {
            window.token = token;
            Utils.setSessionStorageItem('token', token);
            window.location.href = 'invoice.html';
            /*Http.config({
                url: '/v1/public/user/self',
                success: function (user) {
                    debugger;
                }
            }).get();*/
        }
    }).post();
    return false;
};

