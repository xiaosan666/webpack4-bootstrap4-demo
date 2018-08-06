import './index.scss';
import './index.html';

$('#test').bind('click', () => {
    // swal('test');
    const arr = [1, 2, 3, 4, 5];
    const newArr = arr.map(i => {
        return i * i;
    });
    console.log(newArr);
});
