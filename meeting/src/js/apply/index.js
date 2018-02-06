
require(
[
    'jquery',
    'underscore',
    'common',
    'lrz',
    'dateFormat',
    'jqweui',
    'cookie'
],
function ($, _, HSKJ, lrz, dateFormat) {
    window.dateFormat = dateFormat;
    var index = {
        init: function () {
            this.meetingDetailAjax();
            this.wactch();
        },

        data: {
            meetingid: null,
            faceimage: null,
        },

        //获取会议详情
        meetingDetailAjax: function () {
            var self = this;

            var meetingid = HSKJ.getUrlParameter('meetingid');
            if (!meetingid) {
                $.toast("页面地址有误", "cancel");
                return;
            }

            HSKJ.POST({
                url: 'fmapi/queryById',
                data: {
                    meetingid: meetingid
                },
                beforeSend: function () {
                    $.showLoading("正在加载...");
                },
                success: function (json) {
                    $.hideLoading();
                    if (json.code == 0) {
                        self.data = Object.assign(self.data, json.data);
                        self.renderMeetingInfo(self.data);
                        console.log('self.data', self.data)
                        //self.renderSuccess(self.data);
                    } else {
                        $.toast(json.message, "cancel");
                    }
                },
                error: function () {
                    $.toast("加载失败", "cancel");
                }
            })

        },

        //获取验证码
        getCodeAjax: function(callback){
            var username = $('input[name=username]').val();
            var phonenumber = $('input[name=mobile]').val();
            if (!username) {
                $.toast("请先填写您的真实姓名", "cancel");
                return;
            }
            if (!phonenumber) {
                $.toast("请先输入您常用手机号", "cancel");
                return;
            }
            //校验手机号正确性
            HSKJ.POST({
                url: 'fmapi/verifcode/get',
                data: {
                    phonenumber: phonenumber
                },
                success: function (json) {
                    if (json.code == 0) {
                        callback && callback();
                        $('input[name=verifcode]').focus();
                        $.toast("获取验证码成功", "text");
                    } else {
                        $.toast(json.message, "cancel");
                    }
                },
                error: function () {
                    $.toast("获取验证码失败", "cancel");
                }
            })
        },

        //上传照片
        uploadFaceAjax: function (data) {
            var self = this;
            HSKJ.POST({
                url: 'fmapi/uploadFileBase64',
                data: { imagefile: data },
                beforeSend: function () {
                    $.showLoading("正在识别...");
                },
                success: function (json) {
                    $.hideLoading();
                    if (json.code == 0) {
                        self.data.faceimage = json.data.faceimage;
                        /* $('.element-upload-face').append('<img src="' + json.data.faceimage + '"/>') */

                        $('.element-upload-face').css({
                            'background': 'url(' + json.data.faceimage + ') no-repeat',
                            'background-size': '100% 100%'
                        })
                    } else {
                        $.toast(json.message, "cancel");
                    }
                },
                error: function () {
                    $.toast("上传失败", "cancel");
                }
            })
        },

        //渲染首页-- 会议信息
        renderMeetingInfo: function (data) {
            var self = this;
            require(['text!tpl/apply/index.tpl'], function (html) {
                $('body').html(_.template(html)(data || {}));

                $('#enterApply').off().on('click', function () {//马上报名
                    self.renderMeetingForm(data);
                })
            })
        },

        //渲染填写表单页面
        renderMeetingForm: function (data) {
            var self = this;
            require(['text!tpl/apply/form.tpl', 'css!css/apply/form'], function (html) {
                $('body').html(_.template(html)(data || {}));

                $('.element-sex-icon').on('click', function () {
                    if ($(this).children('i').hasClass('weui-icon-circle')) {
                        $(this).children('i').prop('class', 'weui-icon-success');
                        $(this).parent(".element-sex").siblings().find('.weui-icon-success').prop('class', 'weui-icon-circle');
                    }
                })
                
                // 防止出现图片
                $('#file').off().on('change', function () {
                    lrz(this.files[0], {
                        width: 640
                    })
                    .then(function (rst) {
                        var output = rst.base64; //获取base64位图片信息      
                        var base64Data = output.substr(22);// 数据流前22位是图片格式信息，不属于图片，需切除
                        self.uploadFaceAjax(base64Data)
                    })
                    .catch(function (err) {
                        // 处理失败会执行
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });
                })
            })
        },

        //渲染成功页面
        renderSuccess: function (data) {
            require(['text!tpl/apply/success.tpl', 'css!css/apply/success'], function (html) {
                $('body').html(_.template(html)(data || {}));
            })
        },

        //提交表单
        submitForm: function () {
            var self = this;
            var username = $('input[name=username]').val();
            var phonenumber = $('input[name=mobile]').val();
            var verifcode = $('input[name=verifcode]').val();

            if (!username) {
                $.toast("请填写您的真实姓名", "cancel");
                return;
            }
            if (!phonenumber) {
                $.toast("请输入您常用手机号", "cancel");
                return;
            }
            if (!verifcode) {
                $.toast("请填写手机短信验证码", "cancel");
                return;
            }
            if (!self.data.faceimage) {
                $.toast("请上传人脸照片", "cancel");
                return;
            }

            HSKJ.POST({
                url: 'fmapi/addemployee',
                data: {
                    name: username,
                    phonenumber: phonenumber,
                    verifcode: verifcode,
                    faceimage: self.data.faceimage,
                    sex: $('.element-sex-1').children('.weui-icon-success').length > 0 ? 1 : 0,
                    meetingid: self.data.meetingid
                },
                beforeSend: function () {
                    $.showLoading("正在提交...");
                },
                success: function (json) {
                    $.hideLoading();
                    if (json.code == 0) {
                        self.renderSuccess(self.data);
                    } else {
                        $.toast(json.message, "cancel");
                    }
                },
                error: function () {
                    $.hideLoading();
                    $.toast("提交失败", "cancel");
                }
            })
        },

        wactch: function () {
            var self = this;
            $(document)
                .on('click', '#submit', function () {//提交表单
                    self.submitForm();
                })
                .on('click', '.weui-vcode-btn', function () {//获取验证码
                    var _self = $(this);
                    if (!_self.hasClass('disable')){
                        self.getCodeAjax(function(){
                            HSKJ.getCode(_self);
                        });
                    }
                })
        }
    }
    index.init();
})