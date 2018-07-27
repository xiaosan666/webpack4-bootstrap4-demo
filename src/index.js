import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css'
import './index.html'

console.log('333');
try {
    if ($('body')) {
        $('body').append('jQuery')
    }
} catch (e) {
    alert('no jQuery');
}
