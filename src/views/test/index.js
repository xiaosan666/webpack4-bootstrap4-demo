import '../../assets/Common'
import './index.scss'
import './index.html'

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
