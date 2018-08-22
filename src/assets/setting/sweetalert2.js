/**
 * 定义swal默认属性
 */
import './sweetalert2.css';
import swal from 'sweetalert2';

swal.setDefaults({
    allowOutsideClick: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
});

window.swal = function () {
    let result = swal.apply(this, arguments);
    // swal2-height-auto 这个class会影响页面布局，所以通过js删掉
    $('body').removeClass('swal2-height-auto');
    $('html').removeClass('swal2-height-auto');
    return result;
};
