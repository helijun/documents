define([
    'jquery',
    'common',
    'text!tpl/project/project-device-add.tpl',
    'layuiAll',
    'css!css/project/project-device'
], function (
    $,
    HSKJ,
    deviceAddTpl
) {     
    var roleid = HSKJ.getUserInfo('roleid');

    return function (roleid, parentJs) {
        HSKJ.ready(function () {
            var deviceAdd = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                data: {

                },

                renderHtml: function (data) {
                    var self = this;
                    layer.open({
                        type: 1,
                        title: '添加设备',
                        btn: [],
                        content: layui.laytpl(deviceAddTpl).render(self.data || {}),
                        area: ['535px'],
                        skin: 'module-device-add-dialog',
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

                //添加设备接口请求
                doDeviceAddAjax: function(data){
                    console.log('添加设备接口请求', data)
                    var json = {
                        organizationid: HSKJ.getUserInfo('organizationid'),
                        projectid: router.getParameter('pid')
                    }
                    HSKJ.POST({
                        url: 'system/project/device/add',
                        data: Object.assign(data.field, json),
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.msg('添加成功', { icon: 1 }, function () {
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
                    //添加人员的保存
                    layui.form.on('submit(element-submit)', function (data) {
                        self.doDeviceAddAjax(data);
                        return false;
                    });
                    $(document)
                        .off('click', '#doSearch')
                        .on('click', '#doSearch', function () {//保存-- 后退并save
                            self.reloadTable();
                        })
                }
            }
            deviceAdd.init();
        })
    }

})