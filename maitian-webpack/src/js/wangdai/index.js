import '../../plugin/layui/css/layui.css'
import '../../sass/common.scss';
import '../../sass/base/header.scss'
import '../../sass/wangdai/index.scss'
import '../../sass/base/footer.scss'

if (ENV == 'dev'){
    require('../../page/wangdai/index.html');
}
MT.selectNav();

