import '../../assets/Common';
import './index.scss';
import './index.html';

$('#test').bind('click', () => {
    // 打开loading
    Helper.showLoading();
    Http({
        url: '/v1/demo/map_result_post',
        isShowLoading: false,
        success: function (data) {
            // 延迟1秒
            setTimeout(() => {
                Http({
                    url: '/v1/demo/map_result_post2',
                    isShowLoading: false,
                    success: function (data) {
                        // 在最终的回调函数处关闭loading
                        Helper.hideLoading();
                    },
                    error: function () {
                        // 异常情况关闭loading
                        Helper.hideLoading();
                    }
                }).post();
            }, 1000);
        },
        error: function () {
            // 异常情况关闭loading
            Helper.hideLoading();
        }
    }).post();
});
