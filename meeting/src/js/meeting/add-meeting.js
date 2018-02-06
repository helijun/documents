define([
    'jquery',
    'common',
    'dateFormat',
    'layuiAll',
    'css!css/meeting/add-meeting'
], function (
    $,
    HSKJ,
    dateFormat
) {
return function () {
    HSKJ.ready(function () {
        var addMeeting = {
            init: function () {
                this.getAddable();
                this.wactch();
            },

            data: {
                hasMachineType: 0, //0都没有， 1平板，2立式机，3都有
                meetingdatetime: null,//会议举办时间范围
                meetingApplyTime: null,//报名有效期时间范围
                backgroundimage: '',//默认表头TODO
            },

            renderHtml: function () {
                var self = this;
                HSKJ.renderTpl(
                    '.module-container',
                    'text!tpl/meeting/add-meeting.tpl',
                    self.data,
                function () {
                    layui.form.render();//渲染表单元素
                    self.renderImgUpload();
                    self.formVerify();   
                    self.withChange();
                    self.renderMeetingdatetime();
                })
            },

            //举办时间
            renderMeetingdatetime: function(){
                var self = this;

                layui.laydate.render({ //渲染日期
                    elem: '#meetingdatetime'
                    , type: 'datetime'
                    , range: '~'
                    , min: 'new Date()'
                    //, min: dateFormat.utils.modified(new Date(), 1, '+', 'dateTime')
                    , format: 'yyyy-MM-dd HH:mm'
                    , done: function (value, date) {
                        console.log('date', date)
                        if (new Date().getFullYear() == date.year &&
                            new Date().getDate() == date.date &&
                            new Date().getMonth() + 1 == date.month
                        ){
                            layui.layer.msg('举办日期不能选今天！', function(){
                                $('#meetingdatetime').val('')
                            })
                            return;
                        }

                        self.data.meetingdatetime = value;
                        self.renderMeetingApplyTime();
                        $('.change-meeting-info-datetime').children('span').html(value)
                    }
                });
            },

            //报名有效期
            renderMeetingApplyTime: function (max) {
                var self = this;
                /**曲线救国，先删除input，再添加 ------------layui日期选择二次渲染bug */
                var $current = $('#meetingApplyTime');
                var $currentParent = $current.parent();
                $current.remove();
                $currentParent.html('<input type="text" name="meetingapplytime" id="meetingApplyTime" lay-verify="required|meetingApplyTime" autocomplete="off" placeholder="请选择报名有效期" class="layui-input" readonly="">')

                layui.laydate.render({
                    elem: '#meetingApplyTime'
                    , type: 'datetime'
                    , range: '~'
                    , format: 'yyyy-MM-dd HH:mm'
                    , min: 'new Date()'
                    , max: self.data.meetingdatetime.split('~')[0]  //小于 会议举办开始时间
                    , done: function (value, date) {
                        self.data.meetingApplyTime = value;
                        self.renderMeetingsigntime();
                        $('.change-meeting-info-datetime').children('span').html(value)
                    }
                });
            },

            //签到有效期
            renderMeetingsigntime: function () {
                var self = this;
                var $current = $('#meetingsigntime');
                var $currentParent = $current.parent();
                $current.remove();
                $currentParent.html('<input type="text" name="meetingsigntime" id="meetingsigntime" lay-verify="required|meetingsigntime" autocomplete="off" placeholder="请选择签到有效期" class="layui-input" readonly="">')
                
                layui.laydate.render({
                    elem: '#meetingsigntime'
                    , type: 'datetime'
                    , range: '~'
                    , max: self.data.meetingdatetime.split('~')[0]  //小于 会议举办开始时间
                    , min: self.data.meetingApplyTime.split('~')[1]  //大于 会议报名结束时间
                    , format: 'yyyy-MM-dd HH:mm'
                    , done: function (value, date) {
                        $('.change-meeting-info-datetime').children('span').html(value)
                    }
                });
            },

            //联动
            withChange: function(){
                var self = this;
                //会议标题
                $('#meetingTitle').on('keyup', function(){
                    $('.change-meeting-info-title').html($(this).val())
                })

                //会议内容
                $('#meetingContent').on('keyup', function () {
                    $('.change-meeting-info-content').html($(this).val())
                })

                //举办地点
                $('#meetingLocation').on('keyup', function () {
                    $('.change-meeting-info-location').children('span').html($(this).val())
                })
                
                //第一步的保存
                layui.form.on('submit(element-save)', function (data) {
                    $('li[data-content="apply-form"]').addClass('element-can-click active');
                    $('.apply-form').removeClass('layui-hide').siblings().addClass('layui-hide')

                    var holdtime = {
                        holdtimestart: data.field.meetingdatetime.split('~')[0].trim()+":00",
                        holdtimeend: data.field.meetingdatetime.split('~')[1]+":00"
                    };
                    self.data = Object.assign(self.data, data.field, holdtime);
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });

                //诚邀您
                $('#recommend').on('keyup', function () {
                    $('.change-meeting-form-recommend').html($(this).val())
                })

                //第二步的保存
                layui.form.on('submit(element-save2)', function (data) {
                    $('li[data-content="enter-info"]').addClass('element-can-click active');

                    $('.enter-info').removeClass('layui-hide').siblings().addClass('layui-hide')

                    var applyTime = {
                        applystarttime: data.field.meetingapplytime.split('~')[0].trim()+":00",
                        applyendtime: data.field.meetingapplytime.split('~')[1]+":00",
                    };
                    self.data = Object.assign(self.data, data.field, applyTime);
                    return false;
                });

                //监听单选按钮
                $('.hs-checkbox').on('click', function(){
                    if ($(this).children('i').attr('class') == 'icon-checkbox-select'){
                        $(this).children('i').attr('class','icon-checkbox-selected');
                        $(this).siblings().children('i').attr('class', 'icon-checkbox-select');

                        if (
                            $(this).attr('name') == 'machine-screen-diy' ||
                            $(this).attr('name') == 'machine-recognize-diy' ||
                            $(this).attr('name') == 'pad-screen-diy'
                        ){
                            $('div[data-area="' + $(this).attr('data-show') +'"]').removeClass('layui-hide')
                        }else{
                            $('div[data-area="' + $(this).attr('data-show') + '"]').addClass('layui-hide')
                        }
                    }else{
                        $(this).children('i').attr('class', 'icon-checkbox-select');
                        $(this).siblings().children('i').attr('class', 'icon-checkbox-selected');

                        if (
                            $(this).attr('name') == 'machine-screen-default' ||
                            $(this).attr('name') == 'machine-recognize-default' ||
                            $(this).attr('name') == 'pad-screen-default'
                        ) {
                            $('div[data-area="' + $(this).attr('data-show') + '"]').removeClass('layui-hide')
                        } else {
                            $('div[data-area="' + $(this).attr('data-show') + '"]').addClass('layui-hide')
                        }
                    }
                })

                //立式机选择自定义屏保
                layui.form.on('checkbox(machineDiyScreen)', function (data) {
                    if (data.elem.checked){
                        $('#machineScreenArea').removeClass('layui-hide');
                        $('input[lay-filter=machineDefaultScreen]').removeAttr('checked');
                        layui.form.render('checkbox', 'enter-info-form')
                    }else{
                        $('#machineScreenArea').addClass('layui-hide');
                        $('input[lay-filter=machineDefaultScreen]').attr('checked');
                        layui.form.render('checkbox', 'enter-info-form')
                    }
                });     
                
                //立式机选择默认
                layui.form.on('checkbox(machineDefaultScreen)', function (data) {
                    if (data.elem.checked) {
                        $('#machineScreenArea').addClass('layui-hide');
                        $('input[lay-filter=machineDiyScreen]').removeAttr('checked');
                        layui.form.render('checkbox')
                    } else {
                        $('#machineScreenArea').removeClass('layui-hide');
                        $('input[lay-filter=machineDiyScreen]').attr('checked');
                        layui.form.render('checkbox')
                    }
                });  

                //诚邀您
                $('#meetingSignWelcome').on('keyup', function () {
                    $('.change-meeting-info-welcome').html($(this).val())
                })
                
                //第三步的完成，真正发送ajax
                layui.form.on('submit(element-complete)', function (data) {
                    /* $('li[data-content="enter-info"]').addClass('active');
                    $('.enter-info').removeClass('layui-hide').siblings().addClass('layui-hide') */

                    var signintime = {
                        signinstarttime: data.field.meetingsigntime.split('~')[0].trim()+":00",
                        signinendtime: data.field.meetingsigntime.split('~')[1]+":00",
                    };
                    self.data = Object.assign(self.data, data.field, signintime);
                    self.addAjax();
                    return false;
                });
            },

            //表单验证
            formVerify: function(){
                layui.form.verify({
                    meetingTitle: function (value, item) { //value：表单的值、item：表单的DOM对象
                        /* if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                            return '用户名不能有特殊字符';
                        }
                        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                            return '用户名首尾不能出现下划线\'_\'';
                        }
                        if (/^\d+\d+\d$/.test(value)) {
                            return '用户名不能全为数字';
                        } */
                    }
                });    
            },
            
            //判断是否超过设备授权期限
            getAddable: function () {
                var self = this;
                HSKJ.POST({
                    url: 'sponsor/meeting/addable',
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            if(json.data == 1){
                                layui.layer.msg('设备授权期限已过，无法再创建会议！')
                            }else{
                                self.getMachineAjax();
                            }
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //获取拥有的设备类型
            getMachineAjax: function(){
                var self = this;
                HSKJ.POST({
                    url: 'organization/sponsordevices',
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            //type 1平板  2立式机
                            var machineType = [];
                            var hasMachineType = 0;
                            json.data.forEach(function(v){
                                machineType.push(v.type);
                            })
                            if ($.inArray(1, machineType) > -1){
                                hasMachineType = 1;
                            } 
                            if ($.inArray(2, machineType) > -1) {
                                hasMachineType = 2;
                            }
                            if ($.inArray(2, machineType) > -1 && $.inArray(1, machineType) > -1){
                                hasMachineType = 3;
                            }
                            self.data.hasMachineType = hasMachineType;
                            console.log('hasMachineType，0都没有， 1平板，2立式机，3都有', hasMachineType);
                            HSKJ.loadingHide();
                            self.renderHtml();
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },
            //添加请求
            addAjax: function(){
                HSKJ.POST({
                    url: 'sponsor/meeting/add',
                    data: this.data,
                    beforeSend: function(){
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if(json && json.code == 0){
                            $('.element-step-list').removeClass('element-can-click');
                            $(document).off('click', '.element-step-list');//注销步骤条点击时间监听

                            $('.success-meeting-name').children('span').html(json.data.title);
                            $('.success-meeting-datetime').children('span').html(json.data.applystarttime.substr(0,16) + ' 至 ' + json.data.applyendtime.substr(0,16));
                            var meetingUrl = ENV.H5 + '?meetingid=' + json.data.meetingid;
                            $('.success-meeting-laction').children('span').html('<a target="_blank" href="' + meetingUrl + '">' + meetingUrl +'</a>');
                            $('.element-detail').attr('data-meetingid', json.data.meetingid);
                            require(['qrcode'], function () {
                                $('.success-meeting-qr').qrcode({
                                    text: meetingUrl,
                                    render: "canvas", //table方式 ，render方式不支持IE8
                                    width: 100,//宽
                                    height: 100,//高
                                });
                            })

                            $('li[data-content="meeting-success"]').addClass('active');
                            $('.meeting-success').removeClass('layui-hide').siblings().addClass('layui-hide')
                        }else{
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //渲染图片上传
            renderImgUpload: function () {
                var self = this;
                //表单头部
                HSKJ.uploadFile({
                    elem: '#uploadHeaderImg',
                    url: 'fmapi/uploadmeetFile',
                    field: 'imagefile',
                    preview: function (index, file, result) {
                        $('#uploadHeaderImg').html('<img class="hs-all-img" src="' + result + '" />')
                        $('.change-apply-form-headimg').css({
                            'background': 'url(' + result + ')',
                            'background-size': 'cover'
                        })
                    },
                    size: 1024*10,
                    done: function (res) {
                        self.data.backgroundimage = res.data.fileturl;
                    }
                })

                //立式机屏保设置
                HSKJ.uploadFile({
                    elem: '#uploadMachineScreenImg',
                    url: 'fmapi/uploadmeetFile',
                    field: 'imagefile',
                    preview: function (index, file, result) {
                        $('#uploadMachineScreenImg').html('<img class="hs-all-img" src="' + result + '" />')
                        $('.change-machine-screen').css({
                            'background': 'url(' + result + ')',
                            'background-size': 'cover'
                        })
                    },
                    size: 1024 * 10,
                    done: function (res) {
                        self.data.uprighscreensaver = res.data.fileturl;
                    }
                })

                //立式机识别界面信息设置
                HSKJ.uploadFile({
                    elem: '#uploadMachineRecognizeImg',
                    url: 'fmapi/uploadmeetFile',
                    field: 'imagefile',
                    preview: function (index, file, result) {
                        $('#uploadMachineRecognizeImg').html('<img class="hs-all-img" src="' + result + '" />')
                        $('.change-machine-recognize').css({
                            'background': 'url(' + result + ')',
                            'background-size': 'cover'
                        })
                    },
                    size: 1024 * 10,
                    done: function (res) {
                        self.data.uprightui = res.data.fileturl;
                    }
                })

                //平板签到屏保设置
                HSKJ.uploadFile({
                    elem: '#uploadPadScreenImg',
                    url: 'fmapi/uploadmeetFile',
                    field: 'imagefile',
                    preview: function (index, file, result) {
                        $('#uploadPadScreenImg').html('<img class="hs-all-img" src="' + result + '" />')
                        $('.change-pad-screen').css({
                            'background': 'url(' + result + ')',
                            'background-size': 'cover'
                        })
                    },
                    size: 1024 * 10,
                    done: function (res) {
                        self.data.panelscreensaver = res.data.fileturl;
                    }
                })
            },

            wactch: function () {
                $(document)
                    .off('click', '#gobackMeetingList')
                    .on('click', '#gobackMeetingList', function () {//返回会议列表
                        //提示正在编辑，谨慎退出
                        if (!$('.element-step-four').hasClass('active')) { //判断是否在成功的步骤
                            layer.confirm(
                                '<p class="hs-align-center">尚未保存，确定返回吗？</p>',
                                function (index) {
                                    layui.layer.close(index);
                                    require(['js/meeting/list'], function (meetingList) {
                                        meetingList();
                                    })
                                }
                            );
                        } else {
                            require(['js/meeting/list'], function (meetingList) {
                                meetingList();
                            })
                        }
                    })
                    .off('click', '.element-goback')
                    .on('click', '.element-goback', function () {//返回会议列表
                        require(['js/meeting/list'], function (meetingList) {
                            meetingList();
                        })
                    })
                    .off('click', '.element-detail')
                    .on('click', '.element-detail', function () {//查看会议详情
                        var meetingid = $(this).attr('data-meetingid');
                        require(['js/meeting/detail'], function (detail) {
                            detail(meetingid);
                        })
                    })
                    .on('click', '.element-step-list', function () {//步骤条点击
                        //步骤顺序控制，当前步骤保存时会添加class element-can-click，所以需要判断是否有这个样式才能上一步点击
                        var $selfContent = $('.' + $(this).attr('data-content'));
                        if ($(this).hasClass('element-can-click')){
                            //$(this).addClass('active').siblings().removeClass('active');
                            $selfContent.removeClass('layui-hide').siblings().addClass('layui-hide');
                        }
                    })
                    .on('click', '.tabs-item', function () {//平板、立式机切换
                        $(this).addClass('active').siblings().removeClass('active');
                        $('.' + $(this).attr('data-show')).removeClass('layui-hide').siblings().addClass('layui-hide');
                    })
                    .on('click', '.sub-tabs-item', function () {//屏保、识别界面切换
                        $(this).addClass('active').siblings().removeClass('active');
                        $('.' + $(this).attr('data-show')).removeClass('layui-hide').siblings().addClass('layui-hide');
                    })
                    .on('click', '.form-header-example', function () {//表头设置示例
                        layer.photos({
                            photos: {
                                "title": "表头设置示例",
                                "id": 1,
                                "data": [
                                    {
                                        "alt": "表头设置示例",
                                        "src": ENV.PAGE + "img/meeting/form-header-example.png",
                                    }
                                ]
                            }
                            , anim: 5
                        });
                    })
                    .on('click', '.machine-screen-example', function () {//立式机签到屏保示例
                        layer.photos({
                            photos: {
                                "title": "立式机签到屏保示例", //相册标题
                                "id": 1, //相册id
                                "data": [   //相册包含的图片，数组格式
                                    {
                                        "alt": "立式机签到屏保示例",
                                        "src": ENV.PAGE + "img/meeting/machine-default.png", //原图地址
                                    }
                                ]
                            }
                            , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                        });
                        //layer.tips('<img class="hs-full-img" src="../../img/meeting/machine-default.png"/>', this); //在元素的事件回调体中，follow直接赋予this即可
                    })
                    .on('click', '.machine-recognize-example', function () {//立式机识别界面信息展示示例
                        layer.photos({
                            photos: {
                                "title": "立式机自定义海报示例",
                                "id": 1,
                                "data": [ 
                                    {
                                        "alt": "立式机自定义海报示例",
                                        "src": ENV.PAGE + "img/meeting/machine-diy.png",
                                    }
                                ]
                            }
                            , anim: 5
                        });
                    })
                    .on('click', '.pad-screen-example', function () {//平板签到屏保示例
                        layer.photos({
                            photos: {
                                "title": "平板签到屏保示例",
                                "id": 1,
                                "data": [
                                    {
                                        "alt": "平板签到屏保示例",
                                        "src": ENV.PAGE + "img/meeting/pad-default.png",
                                    }
                                ]
                            }
                            , anim: 5
                        });
                    })

                    
            }
        }
        addMeeting.init();
    })
}
})