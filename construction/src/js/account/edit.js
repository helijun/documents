define([
    'jquery',
    'common', 
    'text!tpl/account/edit.tpl',
    'layuiAll',
    'area',
    'css!css/account/list'
], function(
    $, 
    HSKJ,
    editAccountTpl
){
return function (parentData, parentJs) {
    console.log('parentJs', parentJs)
    HSKJ.ready(function () {
        var accountAdd = {
            init: function () {
                this.openAddAccountDialog();
                this.renderHtml();
                this.wactch();
            },

            data: parentData,

            renderHtml: function() {
                
            },

            openAddAccountDialog: function () {
                var self = this;
                layer.open({
                    type: 1,
                    title: '编辑账号',
                    btn: [],
                    content: layui.laytpl(editAccountTpl).render(self.data || {}),
                    area: ['500px'],
                    skin: 'module-account-edit-dialog',
                    success: function (layero, index) {
                        self.formVerify();
                    }
                })
            },

            formVerify: function(){
                layui.form.verify({
                    macaddress: function (value, item) {
                        
                    }
                });   
            },

            //账号更新请求
            doAccountUpdateAjax: function(data){
                console.log('保存的请求', data)
                var json = {
                    organizationid: parentData.organizationid
                }
                HSKJ.POST({
                    url: 'system/organization/update',
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

                layui.form.on('submit(element-submit)', function (data) {
                    self.doAccountUpdateAjax(data);
                    return false;
                });
            }
        }
        accountAdd.init();
    })
}}
)