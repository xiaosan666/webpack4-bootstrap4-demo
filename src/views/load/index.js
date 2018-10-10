import '../../assets/Common';
import './index.scss';
import './index.html';

/* https://yanxiaojun617.com/fileService/file/vehicle/cost_bind_oil_ard.png */
let link = 'https://yanxiaojun617.com/fileService/file/vehicle/' + sessionStorage.getItem('menu_link');
document.getElementById('content').innerHTML = '<img src="' + link + '" alt="">';
