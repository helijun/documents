
require(
[
    'jquery',
    'common',
    'layuiAll',
    'cookie'
],
function (
    $, 
    HSKJ
) {
    HSKJ.ready(function() {
        var roleid = HSKJ.getUserInfo('roleid');
        var index = {
            init: function(){
                if (roleid == 3){
                    require(['js/meeting/list'], function (meetingList){
                        meetingList();
                    })
                } else if (roleid == 2){
                    require(['js/device-org/list'], function (deviceOrgList) {
                        deviceOrgList();
                    })
                }else{
                    require(['js/device/list'], function (deviceList) {
                        deviceList();
                    })
                }
                this.renderHtml();
                this.wactch();
            },

            data: {
                list: [//左边菜单权限控制数据集
                    {
                        name: '设备管理',
                        dataUrl: 'js/device/list',
                        dataLoad: 'deviceList',
                        icon: 'sbgl-icon.png',
                        show: roleid == 1
                    },
                    {
                        name: '设备管理',
                        dataUrl: 'js/device-org/list',
                        dataLoad: 'deviceOrgList',
                        icon: 'sbgl-icon.png',
                        show: roleid == 2
                    },
                    {
                        name: '账号管理',
                        dataUrl: 'js/user/list',
                        dataLoad: 'userList',
                        icon: 'zhgl-icon.png',
                        show: roleid == 1
                    },
                    {
                        name: '账号管理',
                        dataUrl: 'js/user-org/list',
                        dataLoad: 'userOrgList',
                        icon: 'zhgl-icon.png',
                        show: roleid == 2
                    },
                    {
                        name: '会议管理',
                        dataUrl: 'js/meeting/list',
                        dataLoad: 'meetingList',
                        icon: 'hygl-icon.png',
                        show: roleid == 3
                    },
                    {
                        name: '会议统计',
                        dataUrl: 'js/meeting/statistics',
                        dataLoad: 'meetingStatistics',
                        icon: 'hytj-icon.png',
                        show: roleid == 1
                    },
                    {
                        name: '会议统计',
                        dataUrl: 'js/meeting/statistics-list',
                        dataLoad: 'meetingStatisticsList',
                        icon: 'hytj-icon.png',
                        show: roleid == 2
                    }
                ]
            },

            renderHtml: function(){
                var self = this;
                //左边菜单权限控制数据集
                layui.laytpl(navLeftTpl.innerHTML).render({
                    roleid: roleid,
                    list: self.data.list
                }, 
                function (html) {
                    $('.welcome-msg').html('您好！' + HSKJ.getUserInfo('name'));
                    $('.nav-left').html(html);
                    $($('.nav-left .nav-list')[0]).addClass('active');
                    /*$('.module-container').css({
                        height: window.innerHeight - 60 + 'px'
                    })*/
                });
            },

            wactch: function() {
                $(document)
                .off('click', '.nav-list')
                .on('click', '.nav-list', function(){//左边三个菜单点击
                    $(this).addClass('active').siblings().removeClass('active');
                    var loadUrl = $(this).attr('data-url');
                    var loadFun = $(this).attr('data-load');
                    require([loadUrl], function (loadFun){
                        loadFun();
                    })
                })      
            }
        }
        index.init();
    })
})