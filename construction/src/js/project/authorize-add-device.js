define([
    'jquery',
    'underscore',
    'common', 
    'text!tpl/project/authorize-add-device.tpl',
    'layuiAll',
    'css!css/project/authorize-add-device'
], function(
    $, 
    _, 
    HSKJ,
    addAuthorizeDevicTpl
){
return function() {
    HSKJ.ready(function () {
        var addAuthorizeDevic = {
            init: function () {
                this.getDeviceListByOrgId();
            },

            renderHtml: function (data) {
                var self = this;
                var addAuthorizeDeviceOpen =  layer.open({
                    type: 1,
                    title: '添加授权/配置使用设备',
                    id: 'addAuthorizeDeviceDialogId',
                    tipsMore: true,
                    shadeClose: true,
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    content: layui.laytpl(addAuthorizeDevicTpl).render(data || {}),
                    area: ['733px', '480px'],
                    zIndex: layer.zIndex,
                    success: function (layero, index) {
                        layer.setTop(layero);
                        self.wactch();
                    },
                    yes: function(){
                        var deviceid = '';
                        var devicename = '';
                        $('#addAuthorizeDeviceDialogId .module-right-content').find('.element-list').each(function(k, v){
                            deviceid += (!deviceid ? '' : ',') + $(v).attr('data-deviceid');
                            devicename += (!devicename ? '' : ',') + $(v).html();
                        })
                        $('input[name=deviceids]').val(deviceid);
                        $('input[name=deviceidNames]').val(devicename);
                        layui.layer.close(addAuthorizeDeviceOpen)
                    }
                });
            },

            //根据机构id获取设备列表
            getDeviceListByOrgId: function(){
                var self = this;
                HSKJ.POST({
                    url: 'system/author/retrieval',
                    data: {
                        projectid: router.getParameter('pid')
                    },
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            self.renderHtml(json.data);
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            wactch: function () {
                $('#addAuthorizeDeviceDialogId .module-left-content')
                .off('click', '.element-list')
                .on('click', '.element-list', function () {
                    if ($(this).hasClass('active')){
                        $(this).removeClass('active');
                        $('#addAuthorizeDeviceDialogId .module-right-content').append($(this).clone().addClass('select'))
                    }
                })

                $('#addAuthorizeDeviceDialogId .module-right-content')
                .off('click', '.element-list')
                .on('click', '.element-list', function () {
                    $('#addAuthorizeDeviceDialogId .module-left-content').find('span[data-id=' + $(this).attr('data-id')+ ']').addClass('active')
                    $(this).remove();
                })

                $('.element-add')
                .off('click')
                .on('click', function(){
                    $('#addAuthorizeDeviceDialogId .module-right-content').html($('#addAuthorizeDeviceDialogId .module-left-content').find('.element-list').removeClass('active').clone().addClass('select'));
                })

                $('.element-delete')
                .off('click')
                .on('click', function () {
                    $('#addAuthorizeDeviceDialogId .module-left-content').html($('#addAuthorizeDeviceDialogId .module-right-content').find('.element-list').removeClass('select').clone().addClass('active'));
                    $('#addAuthorizeDeviceDialogId .module-right-content').find('.element-list').remove();
                })
            }
        }
        addAuthorizeDevic.init();
    })
    }
})