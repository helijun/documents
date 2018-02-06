define([
    'jquery',
    'underscore',
    'common', 
    'text!tpl/meeting/qr-print.tpl',
    'jqprint',
    'css!css/meeting/qr-print'
], function(
    $, 
    _, 
    HSKJ,
    qrTpl
){
return function(curData) {
    HSKJ.ready(function () {
        var qrPrint = {
            init: function () {
                this.renderHtml();
                this.setHeaderFooter();
            },

            renderHtml: function () {
                var self = this;
                
                curData.holdtimestart = HSKJ.cutDatetimeyyyyAndss(curData.holdtimestart);
                curData.holdtimeend = HSKJ.cutDatetimeyyyyAndss(curData.holdtimeend);
                layer.open({
                    type: 1,
                    title: '打印预览',
                    area: ['549px','660px'],
                    shadeClose: true,
                    id: 'meetingQrDialog',
                    content: layui.laytpl(qrTpl).render(curData || {}),
                    btn: [],
                    success: function () {
                        HSKJ.loadingHide();
                        self.renderQr();
                        self.wactch();
                    }
                });
            },

            //渲染二维码
            renderQr: function(){
                var meetingUrl = ENV.H5 + '?meetingid=' + curData.meetingid;
                require(['qrcode'], function () {
                    $('.element-qr').qrcode({
                        text: meetingUrl,
                        render: "canvas",
                        width: 200,
                        height: 200,
                    });
                    $('.element-qr').html('<img src=' + $("canvas")[0].toDataURL() + '>');//将二维码转换为图片，不然打印不会显示
                })
            },

            setHeaderFooter: function(){
                try {
                    var Wsh = new ActiveXObject("WScript.Shell");
                    HKEY_Key = "header";
                    Wsh.RegWrite(HKEY_Key, "");
                }
                catch (e) { }

                try {
                    var Wsh = new ActiveXObject("WScript.Shell");
                    HKEY_Key = "footer";
                    Wsh.RegWrite(HKEY_Key, "&w&b页码,&p/&P");
                }
                catch (e) { }

            },

            wactch: function () {
                var self = this;
                $('#doPrint').off().on('click', function(){
                    $('#doPrintDiv').hide();
                    $('#meetingQrDialog')
                    .css({
                        'margin-top': '100px'
                    })
                    .print({})
                    .css({
                        'margin-top': '0px'
                    });
                    $('#doPrintDiv').show();
                })
            }
        }
        qrPrint.init();
    })
}}
)