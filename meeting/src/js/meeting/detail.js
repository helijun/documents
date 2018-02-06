//会议详情
define([
    'jquery',
    'common', 
    'layuiAll',
    'css!css/meeting/detail'
], function(
    $, 
    HSKJ
){
return function (meetingid) {
    HSKJ.ready(function () {
        var meetingDetail = {
            init: function () {
                this.getmeetingDetailAjax();
                this.wactch();
            },

            renderHtml: function (data) {
                var self = this;
                var meetingUrl = ENV.H5 + '?meetingid=' + meetingid; 
                data.applyUrl = meetingUrl;
                HSKJ.renderTpl(
                    '.module-container', 
                    'text!tpl/meeting/detail.tpl', 
                    data,
                function () {
                    require(['qrcode'], function () {
                        $('#meetingDetailQr').qrcode({
                            text: meetingUrl,
                            render: "canvas",
                            width: 100,//宽
                            height: 100,//高
                        });
                    })
                })
            },
            
            //获取会议详情
            getmeetingDetailAjax: function () {
                var self = this;
                HSKJ.POST({
                    url: 'sponsor/meeting/meetinginfo',
                    data: {
                        meetingid: meetingid
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
            
            wactch: function () {

                $(document)
                .off('click', '#gobackMeetingList')
                .on('click', '#gobackMeetingList,.element-goback', function () {//返回会议列表
                    require(['js/meeting/list'], function (meetingList) {
                        meetingList();
                    })
                })
            }
        }
        meetingDetail.init();
    })
}}
)