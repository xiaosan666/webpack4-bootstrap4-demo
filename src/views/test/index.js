import './index.scss';
import './index.html';

$('#test').bind('click', () => {
    Http.config('111').say()
});
