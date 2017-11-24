import '../../plugin/layui/css/layui.css'
import '../../sass/common.scss';
import '../../sass/base/header.scss';
import '../../sass/fengkong/index.scss'
import '../../sass/base/footer.scss';

if (ENV == 'dev'){
    require('../../page/fengkong/index.html');
}
MT.selectNav();

