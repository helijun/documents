
import '../../sass/common.scss';
import '../../sass/base/header.scss'
import '../../sass/success/case.scss'
import '../../sass/base/footer.scss'

if (ENV == 'dev'){
    require('../../page/success/case.html');
}

layui.use('element', function () {
    var $ = layui.jquery,
        element = layui.element;

    MT.selectNav();
    MT.toggleMobileNav();
    MT.renderOpenBigImg();
})