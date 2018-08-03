/**
 * 定义swal默认属性和处理swal ie 兼容性问题
 */

import swal from 'sweetalert2';

swal.setDefaults({
    allowOutsideClick: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
});

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    if ((myNav.indexOf('msie') != -1)) {
        return parseInt(myNav.split('msie')[1]);
    } else {
        return (myNav.indexOf('MSIE')) ? parseInt(myNav.split('MSIE')[1]) : false;
    }
}

window.swal = function () {
    if (isIE() == '7' || isIE() == '8' || isIE() == '9') {
        if (typeof arguments[0]['showCancelButton'] == 'boolean') {
            var result = confirm(arguments[0]['title']);
            if (arguments[arguments.length - 1] != 0 && typeof arguments[arguments.length - 1] == "function") {
                arguments[arguments.length - 1](result);
            } else {
                return result;
            }
        } else {
            alert(arguments[0]);
        }
    } else {
        var result = swal.apply(this, arguments);
        // swal2-height-auto 这个class会影响页面布局，所以通过js删掉
        $('body').removeClass('swal2-height-auto');
        $('html').removeClass('swal2-height-auto');
        return result;
    }
};
