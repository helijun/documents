/** v1.0 by helijun **/ 
define([
    'jquery',
    'common',
    'text!tpl/project/project-device-edit.tpl',
    'layuiAll',
    'css!css/project/project-device'
], function (
    $,
    HSKJ,
    deviceEditTpl
) {     
    var roleid = HSKJ.getUserInfo('roleid');

    return function (parentData, parentJs) {
        HSKJ.ready(function () {
            var deviceEdit = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                data: parentData,

                renderHtml: function (data) {
                    var self = this;
                    layer.open({
                        type: 1,
                        title: '编辑设备',
                        btn: [],
                        content: layui.laytpl(deviceEditTpl).render(self.data || {}),
                        area: ['535px'],
                        skin: 'module-device-edit-dialog',
                        success: function (layero, index) {
                            layui.form.render('radio');
                            layui.form.render('select');
                            self.formVerify();
                        }
                    })
                },

                formVerify: function(){
                    return; //TODO
                    layui.form.verify({
                        deviceid: function (value, item) { //value：表单的值、item：表单的DOM对象，macaddress 对应form 里lay-filter
                            if (/^[\u4e00-\u9fa5],{0,}$/.test(value)) {
                                return '设备编码不能为中文';
                            }
                            if (!new RegExp("^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$").test(value)) {
                                return '设备编码格式不正确';
                            }
                            
                        }
                    });   
                },

                //编辑设备接口请求
                dodeviceEditAjax: function(data){
                    void 0
                    var json = {
                        datanumber: parentData.datanumber,
                        projectid: router.getParameter('pid')
                    }
                    HSKJ.POST({
                        url: 'system/project/device/update',
                        data: Object.assign(data.field, json),
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.msg('更新成功', { icon: 1 }, function () {
                                    parentJs.renderTable();
                                    layui.layer.closeAll();
                                })
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                },

                wactch: function () {
                    var self = this;
                    //编辑设备的保存
                    layui.form.on('submit(element-submit)', function (data) {
                        self.dodeviceEditAjax(data);
                        return false;
                    });
                    $(document)
                        .off('click', '#doSearch')
                        .on('click', '#doSearch', function () {//保存-- 后退并save
                            self.reloadTable();
                        })
                }
            }
            deviceEdit.init();
        })
    }

})