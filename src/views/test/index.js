import '../../assets/Common';
import '../../assets/Custom';
import './index.scss';
import './index.html';

setTimeout(() => {
    // $('.js-message').animate({right: 0, bottom: 0}, 2000);
    Utils.showToast();
}, 500);
setTimeout(() => {
    $('.js-message').animate({right: '-100%', bottom: '-100%'}, 1500);
}, 4000);
console.log('44');
try {
    if ($('body')) {
        $('body').append('jQuery')
    }
} catch (e) {
    alert('no jQuery');
}


$('#success').bind('click', function () {
    new Http({
        url: '/v1/invoice/view/page',
        isShowLoader: false,
        success: function (data) {
            debugger;
        }
    }).post();
});
