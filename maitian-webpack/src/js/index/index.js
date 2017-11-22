/*import '../../sass/common.scss'
import '../../sass/base/index.scss'

if (ENV == 'dev'){
    require('../../../index.html');
}

const imgURl = require('../../img/run/sex.png');
const iconImgURl = require('../../img/product/apple.png');

$('article')
.append('<img src=' + iconImgURl + '/>')

$('body')
.append('<img src=' + imgURl +'/>')
.css('color', '#3f3f3f')
*/


import '../../plugin/layui/css/layui.css'
import '../../plugin/layui/css/modules/layer/default/layer.css';
import '../../plugin/animate/animate.css';
import '../../sass/common.scss';
import '../../sass/base/header.scss';
import '../../sass/index/index.scss';
import '../../sass/base/footer.scss';

import MT from "mt-common";

if (ENV == 'dev') {
    require('../../../index.html');
}
MT.selectNav();

console.log('layui', layui)
layui.use('form', function () {
    var form = layui.form,
        layer = layui.layer;

    //监听提交
    form.on('submit(callmeForm)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});

MT.renderAnimate('.mt-body-index');
$(document).on('mousewheel', () => {
    MT.renderAnimate('.mt-body-index', 'srcoll');
})