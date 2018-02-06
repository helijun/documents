define([
    'jquery',
    'underscore',
    'common', 
    'text!tpl/user-org/add-user-device.tpl',
    'layuiAll',
    'css!css/user-org/add-user-device'
], function(
    $, 
    _, 
    HSKJ,
    addUserDeviceTpl
){
return function() {
    var $timeRange = $('#timeRange');
    if (!$timeRange.val()){
        layui.layer.msg('请先选择授权期限');
        return;
    }
    
    HSKJ.ready(function () {
        var addUserDevice = {
            init: function () {
                this.getDeviceListByOrgId();
            },

            renderHtml: function (data) {
                var self = this;
                var addUserDeviceOpen =  layer.open({
                    type: 1,
                    title: '创建账号/配置使用设备',
                    id: 'addUserDeviceDialogId',
                    tipsMore: true,
                    shadeClose: true,
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    content: layui.laytpl(addUserDeviceTpl).render(data || {}),
                    area: ['733px', '480px'],
                    zIndex: layer.zIndex,
                    success: function (layero, index) {
                        layer.setTop(layero);
                        self.wactch();
                    },
                    yes: function(){
                        var deviceid = '';
                        $('#addUserDeviceDialogId .module-right-content').find('.element-list').each(function(k, v){
                            deviceid += (!deviceid ? '' : ',') + $(v).attr('data-deviceid');
                        })
                        $('input[name=deviceids]').val(deviceid);
                        layui.layer.close(addUserDeviceOpen)
                    }
                });
            },

            //根据机构id获取设备列表
            getDeviceListByOrgId: function(){
                var self = this;
                HSKJ.POST({
                    url: 'organization/device/usequery',
                    data: {
                        page: 1,
                        limit: 99999,
                        // status: 4, //激活
                        usetime:$(" #timeRange ").val()
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
                $('#addUserDeviceDialogId .module-left-content')
                .off('click', '.element-list')
                .on('click', '.element-list', function () {
                    if ($(this).hasClass('active')){
                        $(this).removeClass('active');
                        $('#addUserDeviceDialogId .module-right-content').append($(this).clone().addClass('select'))
                    }
                })

                $('#addUserDeviceDialogId .module-right-content')
                .off('click', '.element-list')
                .on('click', '.element-list', function () {
                    $('#addUserDeviceDialogId .module-left-content').find('span[data-id=' + $(this).attr('data-id')+ ']').addClass('active')
                    $(this).remove();
                })

                $('.element-add')
                .off('click')
                .on('click', function(){
                    $('#addUserDeviceDialogId .module-right-content').html($('#addUserDeviceDialogId .module-left-content').find('.element-list').removeClass('active').clone().addClass('select'));
                })

                $('.element-delete')
                .off('click')
                .on('click', function () {
                    $('#addUserDeviceDialogId .module-left-content').html($('#addUserDeviceDialogId .module-right-content').find('.element-list').removeClass('select').clone().addClass('active'));
                    $('#addUserDeviceDialogId .module-right-content').find('.element-list').remove();
                })
            }
        }
        addUserDevice.init();
    })
    }
})