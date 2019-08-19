import '../../assets/Common';
import './index.scss';
import './index.html';

// 返回顶部按钮
Helper.backTop();

// 监听滚动事件，更改navbar背景色透明度
$(window).scroll(function () {
    let s = $(window).scrollTop();
    $('.navbar-warp').css('background-color', `rgba(255, 255, 255, ${s / 120})`);
});
