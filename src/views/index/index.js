import '../../assets/Common';
import '../../assets/Custom';
import '../../assets/libs/myjs.min';
import './index.scss';
import './index.html';

window.login = login;

function login(username, password) {
    new Http({
        url: '/v1/login',
        data: {
            username: username,
            password: hex_md5(password),
            client_id: 'web'
        },
        success: function (token) {
            debugger;
            window.token = token;
            Utils.setSessionStorageItem('token', token);
            window.location.href = 'invoice.html';
            /*new Http({
                url: '/v1/public/user/self',
                success: function (user) {
                    debugger;
                }
            }).get();*/
        }
    }).post();
    return false;
}
