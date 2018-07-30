import 'jquery'
import './test.html'

console.log('333');
try {
    if ($('body')) {
        $('body').append('jQuery')
    }
} catch (e) {
    alert('no jQuery');
}


$('#success').bind('click', function () {
    debugger;
    console.log('click button');
});
