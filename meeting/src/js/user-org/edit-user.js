define([
    'jquery',
    'common', 
    'text!tpl/user-org/edit-user.tpl',
    'layuiAll',
    'css!css/user-org/edit-user'
], function(
    $, 
    HSKJ,
    editUserTpl
){
return function (parentJs, curData) {
    HSKJ.ready(function () {
        var addUser = {
            init: function () {
                this.renderHtml();
                this.wactch();
            },

            renderHtml: function () {
                var self = this;

                layer.open({
                    type: 1,
                    title: '重置密码',
                    id: 'editUserDialogId',
                    btn: [],
                    btnAlign: 'c',
                    skin: 'module-user-edit-dialog',
                    content: layui.laytpl(editUserTpl).render(curData || {}),
                    area: ['500px']
                });
            },
            
            //重置密码
            editUserAjax: function (data) {
                HSKJ.POST({
                    url: 'organization/update',
                    data: data,
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            layui.layer.msg('重置密码成功', { icon: 1 }, function () {
                                parentJs.getStatAjax();
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

                layui.form.on('submit(element-submit-org)', function (data) {
                    self.editUserAjax(data.field);
                    return false;
                });
                
            }
        }
        addUser.init();
    })
    }
})