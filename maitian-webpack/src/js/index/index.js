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

let ajaxHost = '';
if (ENV == 'dev') {
    ajaxHost = '//192.168.1.188:8081';
    require('../../../index.html');
}

layui.use('form', function () {
    var form = layui.form,
        layer = layui.layer;

    let maitianIndex = {
        init: function() {
            this.formValidate();
            this.rendCommonVoid();
            this.watch();
        },

        rendCommonVoid: () => {
            MT.isIe(layer);
            MT.selectNav();
            MT.toggleMobileNav();
        },

        //验证表单
        formValidate: function () {
            form.verify({
            })
        },

        save: () => {
            $.ajax({
                url: ajaxHost + "/userWonder/addInfo.do",
                data: $('#callmeForm').serialize(),
                type: 'post',
                beforeSend: () => {
                    layer.msg('请稍后..');
                },
                success: (json) => {
                    if (0 == json) {
                        layer.msg('感谢您的反馈，我们会尽快联系您！', {
                            icon: 1,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, function () {
                            window.location.reload();
                        });
                    } else {
                        layer.msg('异常，请稍后重试！');
                    }
                }
            });  
        },
        
        watch: () => {

            form.on('submit(formCallme)', function (data) {
                maitianIndex.save();
                return false;
            });
        }
    }

    maitianIndex.init();

    window.maitianIndex = maitianIndex;
})

MT.renderAnimate('.mt-body-index');
$(document).on('mousewheel', () => {
    MT.renderAnimate('.mt-body-index', 'srcoll');
})