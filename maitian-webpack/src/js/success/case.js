import '../../plugin/layui/css/layui.css'
import '../../sass/common.scss';
import '../../sass/base/header.scss'
import '../../sass/success/case.scss'
import '../../sass/base/footer.scss'

if (ENV == 'dev'){
    require('../../page/success/case.html');
}
MT.selectNav();
MT.toggleMobileNav();
