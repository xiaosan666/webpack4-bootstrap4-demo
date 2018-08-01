import 'jquery';
import 'bootstrap';
import './css/app.scss';
import swalProxy from 'sweetalert2';
swalProxy.setDefaults({
    allowOutsideClick: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
});
window.swalProxy = swalProxy;
import './libs/sweetalert2/setting.css';
import './libs/sweetalert2/setting.js';

