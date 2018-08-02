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

import './css/base.scss';
import {API} from './js/Constants.js';
import Utils from './js/Utils.js';
import Helper from './js/Helper.js';
import Http from './js/Http.js';

export {API, Utils, Helper, Http};
