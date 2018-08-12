import '../../assets/Common';
import '../../assets/libs/myjs.min';
import './index.scss';
import './index.html';

Helper.backTop();

let $productId = $('#productId');
let $container = $('.container');
let $menu = $('[aria-labelledby="productId"]');
$productId.hover(function () {
    $menu.addClass('show');
});
$container.hover(function () {
    $menu.removeClass('show');
});
