//添加普通嘉宾
define([
    'jquery',
    'underscore',
    'common',
    'layuiAll',
    'css!css/meeting/add-vip'
], function (
    $,
    _,
    HSKJ
) {
    return function (meetingid, holdtimestart) {
        HSKJ.ready(function () {
            var addVip = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                renderHtml: function () {
                    var self = this;
                    HSKJ.renderTpl(
                        '.module-container',
                        'text!tpl/meeting/add-normal.tpl',
                        {},
                        function () {
                            layui.form.render();
                            self.renderImgUpload();
                        })
                },

                //渲染图片上传
                renderImgUpload: function () {
                    layui.upload.render({
                        elem: '#faceImg'
                        , url: ENV.FILE_URL + 'fmapi/uploadFile'
                        , field: 'imagefile'
                        , before: function (obj) {
                            layui.layer.msg('上传中，请稍后...');
                            obj.preview(function (index, file, result) {
                                $('#faceImg').html('<img class="hs-all-img" src="' + result + '" />')
                            });
                        }
                        , accept: 'images'
                        , size: 2048
                        , done: function (res) {
                            if (res.code > 0) {
                                return layui.layer.msg(res.message);
                            } else if (res.code == 0) {
                                $('input[name=faceimage]').val(res.data.faceimage);
                                return layui.layer.msg('上传成功');
                            }
                        }
                        , error: function () {
                            layui.layer.msg('上传失败，请重试！')
                        }
                    });
                },

                //添加普通人员
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
                                layui.layer.msg('添加嘉宾成功', { icon: 1 }, function () {
                                    require(['js/meeting/join-list'], function (joinList) {
                                        joinList(meetingid, holdtimestart);
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
                        self.addFaceDataAjax(Object.assign(data.field, { 
                            isvip: 0,
                            meetingid: meetingid
                        }));
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
                                joinList(meetingid, holdtimestart);
                            })
                        })
                }
            }
            addVip.init();
        })
    }
})