//参会人员详情
define([
    'jquery',
    'common',
    'text!tpl/meeting/join-detail.tpl',
    'layuiAll',
    'css!css/meeting/join-detail'
], function (
    $,
    HSKJ,
    joinDetailTpl
) {
return function (detailData) {
    HSKJ.ready(function () {
        var joinDetail = {
            init: function () {
                this.openDetailDialog();
                this.wactch();
            },

            openDetailDialog: function () {
                var self = this;
                layer.open({
                    type: 1,
                    title: '嘉宾' + detailData.name +'的信息',
                    btn: ['关闭'],
                    content: layui.laytpl(joinDetailTpl).render(detailData || {}),
                    area: ['549px', '420px'],
                    btnAlign: 'c',
                    skin: 'module-join-detail-dialog',
                    success: function (layero, index) {
                        self.openFaceDetail();
                    }
                })
            },

            openFaceDetail: function(){
                $('.elment-faceimguri').off().on('click', function () {
                    layui.layer.photos({
                        photos: {
                            "title": "嘉宾" + detailData.name + "的人脸信息",
                            "id": 1,
                            "data": [
                                {
                                    "alt": "嘉宾" + detailData.name + "的人脸信息",
                                    "src": $(this).attr('src'),
                                }
                            ]
                        }
                        , anim: 5
                    });
                })
            },

            wactch: function () {
                var self = this;
                
                $(document)
                .off('click', '.element-close')
                .on('click', '.element-close', function () {//关闭
                    $('.module-container-fix').css({
                        'margin-top': '100%'
                    })
                })
                
            }
        }
        joinDetail.init();
    })
}
})