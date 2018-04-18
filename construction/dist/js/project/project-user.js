/** v1.0 by helijun **/ 
define([
    'jquery',
    'common',
    'layuiAll',
    'css!css/project/project-user'
], function (
    $,
    HSKJ
) {     
    var roleid = HSKJ.getUserInfo('roleid');
    return function () {
        HSKJ.ready(function () {
            var userList = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                data: {

                },

                renderHtml: function (data) {
                    var self = this;
                    HSKJ.renderTpl('.module-container', 'text!tpl/project/project-user.tpl', {
                        roleid: roleid,
                        pname: router.getParameter('pname')
                    }, function () {
                        self.renderTable();//渲染表格
                    })
                },
                renderTable: function () {
                    var self = this;

                    HSKJ.renderTable({
                        url: ENV.API + 'system/project/employee/query?currentproject=' + router.getParameter('pid'),
                        id: 'userListTable',
                        elem: '#tableContent',
                        align: 'left'
                        , cols: [ //标题栏
                            , { title: '照片', templet: '<div><div class="element-user-face" lay-event="largeImg"><img src="{{d.facepath}}"/></div></div>' }
                            , { title: '姓名', templet: '<div><p class="hs-point hs-color-base" lay-event="detail">{{ d.name || ""}}</p></div>' }
                            , { field: 'enterprise', title: '劳务企业 ' }
                            , { field: 'worktype', title: '工种' }
                            , { field: 'belongclass', title: '班组' }
                            , { field: 'active', title: '在职状态', templet: '<div><p >{{ d.status == 0? "离职":"在职"}}</p></div>' }
                            , { title: '已工作时间（h）', templet: '<div>{{d.totalattendancehours || 0}}</div>'}
                            , { field: 'enterprojecttime', title: '加入项目时间' }
                            , { width: 150, title: '操作', templet:'<div><div class="hs-tools"><a lay-event="edit">编辑</a><a lay-event="del">删除</a></div></div>' }
                        ]
                        , done: function () {
                            $('.element-user-list').hover(function () {
                                $(this).find('a').removeClass('hs-none')
                            }, function () {
                                $(this).find('a').addClass('hs-none')
                            })
                        }
                    });
                },

                reloadTable: function (date, macOrAdress) {
                    layui.table.reload('userListTable', {
                        where: { //设定异步数据接口的额外参数，重载数据
                            keyword: $(" #keyword ").val()
                        }
                        , page: {
                            curr: 1 //重新从第 1 页开始
                        }
                    });
                },

                //注销账号
                doUserDel: function (id) {
                    var self = this;
                    HSKJ.POST({
                        url: 'systemuser/user/delete',
                        data: {
                            organizationids: id
                        },
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.closeAll();
                                self.getStatAjax();
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                },

                delUserAjax: function(id, callback){
                    HSKJ.POST({
                        url: 'system/project/employee/delete',
                        data: {
                            datanumber: id
                        },
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                callback && callback();
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                },

                wactch: function () {
                    var self = this;

                    layui.table.on('tool(userListTable)', function (obj) { 
                        var data = obj.data; 
                        var layEvent = obj.event;
                        void 0;
                        if(layEvent === 'detail'){
                            data.sex = data.sex == 1? '男': '女';
                            data.status = data.status == 0? "离职":"在职"
                            var dataForChinese = {
                                name: '姓名',
                                sex: '性别',
                                tel: '联系电话',
                                status: '在职状态',
                                enterprise: '劳务企业',
                                employeetypename: '人员类型',
                                worktype: '工种',
                                belongclass: '班组',
                                dormitorynumber: '宿舍编号',
                                bednumber: '床位编号',
                                secureeducationdate: '安全教育日期',
                                urgencyperson: '紧急联系人',
                                urgencytel: '紧急联系电话',
                                totalattendancehours: '已工作时间（h）',
                                enterprojecttime: '加入项目时间'
                            }
                            HSKJ.renderCommonDetail(data, dataForChinese);
                        }else if (layEvent === 'largeImg') {
                            layer.photos({
                                photos: {
                                    "title": "人脸照片",
                                    "id": new Date().getTime(),
                                    "data": [ 
                                        {
                                            "alt": "人脸照片",
                                            "src": data.facepath,
                                        }
                                    ]
                                }
                                , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                            });
                        }else if(layEvent === 'edit'){
                            //这里数据量太大，使用隐式传参，不支持单独刷新页面
                            router.setMessage(obj.data);
                            router.to('project-user-edit', {
                                pname: router.getParameter('pname'),
                                pid: router.getParameter('pid'),
                            });
                        } else if(layEvent === 'del'){
                            var content = '<p class="hs-align-center">你确定要删除此人吗？</p>';
                            layer.confirm(
                                content,
                                function (index) {
                                    self.delUserAjax(data.datanumber, function () {
                                        layui.layer.msg('删除成功', { icon: 1 }, function () {
                                            layui.layer.closeAll()
                                            obj.del();
                                        })
                                    })
                                }
                            );
                        }
                    })

                    $(document)
                        .off('click', '#addProjectUser')
                        .on('click', '#addProjectUser', function () {//添加人员跳转
                            router.to('project-user-add', {
                                pname: router.getParameter('pname'),
                                pid: router.getParameter('pid'),
                            });
                        })
                        .off('click', '#doSearch')
                        .on('click', '#doSearch', function () {
                            self.reloadTable();
                        })
                }
            }
            userList.init();
        })
    }

})