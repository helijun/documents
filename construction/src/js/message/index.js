define([
    'jquery',
    'common', 
    'dateFormat',
    'layuiAll',
    'css!css/message/index'
], function(
    $, 
    HSKJ,
    dateFormat
){
return function() {
    window.dateFormat = dateFormat;
    HSKJ.ready(function () {
        var messageManage = {
            init: function () {
                this.getBaseinfoAjax();
                this.wactch();
            },

            renderHtml: function (data) {
                data.account = HSKJ.getUserInfo('username');
                var self = this;
                HSKJ.renderTpl(
                    '.module-container', 
                    'text!tpl/message/index.tpl', 
                    data, 
                function () {
                    
                })
            },

            //查询总部信息
            getBaseinfoAjax: function () {
                var self = this;
                HSKJ.GET({
                    url: 'system/admin/baseinfo',
                    data: {
                        username: ''
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

            //重置密码
            doPwdUpdateAjax(data) {
                console.log('data', data)
                HSKJ.POST({
                    url: 'system/user/editpwd',
                    data: data,
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            layui.layer.msg('密码重置成功', { icon: 1 }, function () {
                                layui.layer.closeAll();
                                HSKJ.toLoginPage()
                            }) 
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            wactch: function () {
                var self = this;

                //重置密码的保存
                layui.form.on('submit(element-submit)', function (data) {
                    self.doPwdUpdateAjax(data.field);
                    return false;
                });

                $(document)
                .on('click', '.tabs-item', function () { //企业信息、修改密码切换
                    var $moduleContentQiye = $('.content-qiye');
                    var $moduleContentPwd = $('.content-pwd');

                    if ($(this).attr('data-status') == 1) {
                        $moduleContentPwd.addClass('layui-hide');
                        $moduleContentQiye.removeClass('layui-hide');
                    } else {
                        $moduleContentPwd.removeClass('layui-hide');
                        $moduleContentQiye.addClass('layui-hide');
                    }
                })
            }
        }
        messageManage.init();
    })
}}
)