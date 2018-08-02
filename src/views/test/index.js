import '../../assets/Common';
import './index.scss';
import './index.html';

$('#test').bind('click', () => {
    swal({
        title: '确定删除吗？',
        text: '删除后不可恢复',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55'
    }).then(function (result) {
        if (result.value) {
        }
    });
});
