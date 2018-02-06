define([
    'jquery',
    'common', 
    'text!tpl/user-org/add-user.tpl',
    'layuiAll',
    'css!css/user-org/add-user'
], function(
    $, 
    HSKJ,
    addUserTpl
){
return function (parentJs) {
    HSKJ.ready(function () {
        var addUser = {
            init: function () {
                this.getGenerate();
            },

            getGenerate: function(){
                var self = this;
                HSKJ.POST({
                    url: 'organization/generate',
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

            renderHtml: function (data) {
                var self = this;

                layer.open({
                    type: 1,
                    title: '创建会议账号',
                    id: 'addUserDialogId',
                    btn: [],
                    btnAlign: 'c',
                    skin: 'module-user-add-dialog',
                    content: layui.laytpl(addUserTpl).render(data || {}),
                    area: ['600px'],
                    success: function (layero, index) {
                        layui.laydate.render({
                            elem: '#timeRange'
                            , type: 'date'
                            , range: '~'
                            , min: 'new Date()'
                            , format: 'yyyy-MM-dd'
                            , done: function (value, date) {
                                
                            }
                        });
                        self.wactch();
                    }
                });
            },
            
            //创建账号
            addUserAjax: function (data) {
                HSKJ.POST({
                    url: 'organization/add',
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

                //添加机构账户的保存
                layui.form.on('submit(element-submit)', function (data) {
                    var holdtime = {
                        starttime: data.field.time.split('~')[0],
                        endtime: data.field.time.split('~')[1]
                    };
                    self.addUserAjax(Object.assign(data.field, holdtime));
                    return false;
                });
            }
        }
        addUser.init();
    })
    }
})