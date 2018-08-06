/**
 * 定义swal默认属性和处理swal ie 兼容性问题
 */
import './setting.css';
import swal from 'sweetalert2';

swal.setDefaults({
    allowOutsideClick: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
});

window.swal = function () {
    var result = swal.apply(this, arguments);
    // swal2-height-auto 这个class会影响页面布局，所以通过js删掉
    $('body').removeClass('swal2-height-auto');
    $('html').removeClass('swal2-height-auto');
    return result;
};
