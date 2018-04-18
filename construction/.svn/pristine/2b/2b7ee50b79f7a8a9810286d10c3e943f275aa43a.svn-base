define([
    'jquery',
    'common', 
    'text!tpl/user/add-user.tpl',
    'layuiAll',
    'css!css/user/add-user'
], function(
    $, 
    HSKJ,
    addUserTpl
){
return function(parentJs) {
    console.log('parentJs', parentJs)
    HSKJ.ready(function () {
        var addUser = {
            init: function () {
                this.renderHtml();
            },

            renderHtml: function (data) {
                var self = this;

                layer.open({
                    type: 1,
                    title: '创建账号',
                    id: 'addUserDialogId',
                    btn: [],
                    btnAlign: 'c',
                    skin: 'module-user-add-dialog',
                    content: layui.laytpl(addUserTpl).render(data || {}),
                    area: ['600px', '370px'],
                    success: function (layero, index) {
                        self.wactch();
                    }
                });
            },
            
            //创建账号
            addUserAjax: function(data){
                HSKJ.POST({
                    url: 'systemuser/user/add',
                    data: data,
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            parentJs.getStatAjax();
                            layui.layer.closeAll();
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            wactch: function () {
                var self = this;

                //创建账号的保存
                layui.form.on('submit(element-submit)', function (data) {
                    self.addUserAjax(data.field)
                    return false; 
                });
            }
        }
        addUser.init();
    })
    }
})