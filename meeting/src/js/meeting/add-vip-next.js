define([
    'jquery',
    'underscore',
    'common',
    'layuiAll',
    'css!css/meeting/add-vip-next'
], function (
    $,
    _,
    HSKJ
) {
    return function (formData) {
        HSKJ.ready(function () {
            var vipNext = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                renderHtml: function () {
                    var self = this;
                    HSKJ.renderTpl(
                        '.module-container',
                        'text!tpl/meeting/add-vip-next.tpl',
                        {},
                        function () {
                            layui.form.render();
                        })
                },

                //添加vip
                addFaceDataAjax: function (data) {
                    var self = this;
                    HSKJ.POST({
                        url: 'sponsor/employee/addFaceData',
                        data: data,
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.msg('添加VIP成功', { icon: 1 }, function () {
                                    require(['js/meeting/join-list'], function (joinList) {
                                        joinList(formData.meetingid);
                                    })
                                })
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                },

                wactch: function () {
                    var self = this;
                    //保存
                    layui.form.on('submit(element-save)', function (data) {
                        console.log('data.field', data.field)
                        self.addFaceDataAjax(Object.assign(formData, data.field, { isvip: 1}));
                        return false;
                    });

                    $(document)
                        .on('click', '#gobackMeetingList', function () {//返回会议列表
                            //TOOD 是否提示正在编辑，谨慎退出
                            require(['js/meeting/list'], function (meetingList) {
                                meetingList();
                            })
                        })
                        .on('click', '#gobackMeetingJoin', function () {//返回会议名单
                            //TOOD 是否提示正在编辑，谨慎退出
                            require(['js/meeting/join-list'], function (joinList) {
                                joinList(formData.meetingid);
                            })
                        })
                        .on('click', '.tabs-item', function () {//平板、立式机切换
                            $(this).addClass('active').siblings().removeClass('active');
                            $('.' + $(this).attr('data-show')).removeClass('layui-hide').siblings().addClass('layui-hide');
                        })
                }
            }
            vipNext.init();
        })
    }
})