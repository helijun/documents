
require(
[
    'jquery',
    'common',
    'cookie',
    'layuiAll'
],
function (
    $,
    HSKJ
) {
    //roleid角色权限 1禾思管理员，2设备拥有者，3会议举办方
    var roleid = HSKJ.getUserInfo('roleid');
    var defaultRouter = 'device-list';
    if (roleid == 2) {
        defaultRouter = 'device-org-list';
    } else if (roleid == 3) {
        defaultRouter = 'meeting-list';
    }
    //路由信息配置
    router.start({
        view: '.module-container',
        baseUrl: ENV.PAGE,
        router: {
            'device-list': {//禾思端设备列表
                controller: 'js/device/list.js',
                role: 1 //number || array ，页面权限控制
            },
            'device-org-list': {//设备拥有者的设备列表
                controller: 'js/device-org/list.js',
                role: 2
            },
            'user-org-list': {//禾思端用户管理
                controller: 'js/user-org/list',
                role: 2
            },
            'user-list': {//设备拥有者的用户管理
                controller: 'js/user/list',
                role: 1
            },
            'meeting-list': {//会议列表
                controller: 'js/meeting/list.js',
                role: 3
            },
            'meeting-add': {//会议创建
                controller: 'js/meeting/add-meeting.js',
                role: 3
            },
            'meeting-edit': {//会议修改
                controller: 'js/meeting/edit-meeting.js',
                role: 3
            },
            'meeting-detail': {//会议详情
                controller: 'js/meeting/detail.js',
                role: 3
            },
            'meeting-join-list': {//参会人员
                controller: 'js/meeting/join-list.js',
                role: 3
            },
            'meeting-add-vip': {//添加vip嘉宾
                controller: 'js/meeting/add-vip',
                role: 3
            },
            'meeting-add-normal': {//添加普通嘉宾
                controller: 'js/meeting/add-normal',
                role: 3
            },
            'meeting-statistics': {//会议统计
                controller: 'js/meeting/statistics',
                role: 1
            },
            'meeting-statistics-list': {//会议统计列表-设备拥有者
                controller: 'js/meeting/statistics-list',
                role: [1, 2]
            },
            'defaults': defaultRouter //默认路由
        },
        errorTemplateId: '#errorTpl',  //可选的错误模板，用来处理加载html模块异常时展示错误内容
        enterCallback: function (routeObj) {
            //页面权限控制逻辑
            console.log('enterCallback', routeObj)
            if (!routeObj.url) return;
            if (typeof routeObj.role == 'object') {
                var notLook = false;
                for (var i = 0; i < routeObj.role.length; i++) {
                    if (routeObj.role[i] == roleid) {
                        notLook = true;
                        break;
                    }
                }
                if (!notLook) {
                    router.isNotLook = false;
                    alert('无权访问')
                } else {
                    router.isNotLook = true;
                }
            } else {
                if (routeObj.role != roleid) {
                    router.isNotLook = false;
                    alert('无权访问')
                } else {
                    router.isNotLook = true;
                }
            }

        }
    });

    HSKJ.ready(function() {
        var index = {
            init: function(){
                this.renderHtml();
                this.wactch();
            },

            data: {
                list: [//左边菜单权限控制数据集
                    {
                        name: '设备管理',
                        controller: 'device-list',
                        icon: 'sbgl-icon.png',
                        show: roleid == 1
                    },
                    {
                        name: '设备管理',
                        controller: 'device-org-list',
                        icon: 'sbgl-icon.png',
                        show: roleid == 2
                    },
                    {
                        name: '账号管理',
                        controller: 'user-list',
                        icon: 'zhgl-icon.png',
                        show: roleid == 1
                    },
                    {
                        name: '账号管理',
                        controller: 'user-org-list',
                        icon: 'zhgl-icon.png',
                        show: roleid == 2
                    },
                    {
                        name: '会议管理',
                        controller: 'meeting-list',
                        icon: 'hygl-icon.png',
                        show: roleid == 3
                    },
                    {
                        name: '会议统计',
                        controller: 'meeting-statistics',
                        icon: 'hytj-icon.png',
                        show: roleid == 1
                    },
                    {
                        name: '会议统计',
                        controller: 'meeting-statistics-list',
                        icon: 'hytj-icon.png',
                        show: roleid == 2
                    }
                ]
            },

            renderHtml: function(){
                var self = this;
                //左边菜单权限控制数据集模板渲染
                layui.laytpl(navLeftTpl.innerHTML).render({
                    roleid: roleid,
                    list: self.data.list
                }, 
                function (html) {
                    $('.welcome-msg').html('您好！' + HSKJ.getUserInfo('name'));
                    $('.nav-left').html(html);
                    var thisController = location.hash.split('?')[0].replace('#', '');
                    
                    //加载后选中左边菜单
                    if (thisController == 'device-org-list' || thisController == 'device-list' || thisController == 'meeting-list') {
                        $($('.nav-left .nav-list')[0]).addClass('active');
                    }else if (thisController == 'user-org-list' || thisController == 'user-list'){
                        $($('.nav-left .nav-list')[1]).addClass('active');
                    } else if (thisController == 'meeting-statistics-list' || thisController == 'meeting-statistics') {
                        $($('.nav-left .nav-list')[2]).addClass('active');
                    }
                    
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
                    var controller = $(this).attr('data-controller');
                    router.to(controller);
                })      
            }
        }
        index.init();
    })
})