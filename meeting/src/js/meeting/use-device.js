//统计使用、关联设备
define([
    'jquery',
    'underscore',
    'common', 
    'layuiAll',
    'css!css/meeting/list'
], function(
    $, 
    _, 
    HSKJ
){
return function (searchUrl, offset) {
        console.log('searchUrl', searchUrl)
    console.log('offset', offset)
    var roleid = HSKJ.getUserInfo('roleid');
    HSKJ.ready(function () {
        var useDevice = {
            init: function () {
                this.renderHtml();
                this.wactch();
            },

            renderHtml: function () {
                var self = this;

                HSKJ.renderTpl(
                    '#useDeviceDiv', 
                    'text!tpl/meeting/use-device.tpl', 
                    {}, 
                function () {
                    self.renderTable();//渲染表格
                })
            },
            renderTable: function(){
                var self = this;
                HSKJ.loadingShow();
                layui.table.render({
                    elem: '#tableUseDeviceContent'
                    , url: ENV.API + searchUrl
                    , cols: [[ //标题栏
                        { title: '序号', type: 'numbers', width: 50 },
                        { title: '设备名称', field: 'name', width: 150 },
                        { title: '设备型号', field: 'type', width: 100, templet: '<div>{{ d.type == 2?"立式机": "平板" }}</div>'}
                    ]]
                    , skin: 'line'
                    , page: false
                    , limit: 10000 //每页默认显示的数量
                    , done: function (res, curr, count){
                        HSKJ.loadingHide();
                        HSKJ.checkAjaxCodeIsLogin(res.code);
                        self.openTable();
                    }
                });
            },

            //打开数据表弹框
            openTable: function(){
                layer.open({
                    title: ''
                    , offset: offset
                    , shadeClose: true
                    , closeBtn: 0
                    , btn: []
                    , move: true
                    , content: $('.module-meeting-use-device').html()
                })
            },
            wactch: function () {
                
            }
        }
        useDevice.init();
    })
}}
)