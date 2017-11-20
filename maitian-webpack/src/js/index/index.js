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
import '../../sass/common.scss';
import '../../sass/base/header.scss';
import '../../sass/index/index.scss';
import '../../sass/base/footer.scss';

if (ENV == 'dev') {
    require('../../../index.html');
}