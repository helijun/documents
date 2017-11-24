import '../../plugin/layui/css/layui.css'
import '../../plugin/layui/css/modules/layer/default/layer.css';
import '../../plugin/animate/animate.css';
import '../../sass/common.scss';
import '../../sass/base/header.scss';
import '../../sass/base/aboutUs.scss';
import '../../sass/base/footer.scss';

if (ENV == 'dev'){
    require('../../page/base/aboutUs.html');
}

MT.selectNav();