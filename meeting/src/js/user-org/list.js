define([
    'jquery',
    'common',
    'js/user-org/add-user',
    'js/user-org/add-user-device',
    'layuiAll',
    'css!css/user-org/list'
], function (
    $,
    HSKJ,
    addUser,
    addUserDevice
) {
        return function () {
            HSKJ.ready(function () {
                var userOrgList = {
                    init: function () {
                        this.getStatAjax();
                        this.wactch();
                    },

                    data: {

                    },
                    //获取表格统计数据
                    getStatAjax: function (clickStatus){
                        var self = this;
                        HSKJ.POST({
                            url:  'organization/sponsortotal',
                            // url: 'systemuser/device/infototal',
                            data: {
                            },
                            0: function(json){
                                var d = json.data;
                                d && $('.element-count-data').html('会议账号：' + d.sponsors + '个 使用中：'+ d.lives + '个 已失效：'+(d.sponsors-d.lives) +'个');
                                self.renderHtml()
                            }
                        })
                    },

                    renderHtml: function (data) {
                        var self = this;
                        HSKJ.renderTpl('.module-container', 'text!tpl/user-org/list.tpl', data, function () {
                            self.renderTable();//渲染表格
                        })
                    },
                    renderTable: function () {
                        var self = this;

                        HSKJ.renderTable({
                            url: ENV.API + 'organization/query',
                            id: 'userListTable',
                            elem: '#tableContent'
                            , cols: [ //标题栏
                                { title: '序号', type: 'numbers' }
                                , { field: 'username', title: '会议账号' }
                                , { field: 'name', title: '会议单位 ' }
                                , { field: 'starttime', title: '设备授权期限', templet: '<div><p title="{{ d.starttime}} ~ {{ d.endtime}}">{{ d.starttime.substr(0, 10) }} ~ {{ d.endtime.substr(0, 10) }}</p></div>'  }
                                , { field: 'principal', title: '对接人' }
                                , { field: 'meetingaddress', title: '会议地址' }
                                , { field: 'devices', title: '使用设备（台）' }
                                , { field: 'edit', title: '操作', toolbar: '#tableEdit' }
                            ]
                        });
                    },

                    reloadTable: function (date, macOrAdress) {
                        layui.table.reload('userListTable', {
                            where: { 
                                keyword: $(" #keyword ").val()
                            }
                            , page: {
                                curr: 1 
                            }
                        });
                    },

                    //注销账号
                    doUserOrgDel: function(id){
                        var self = this;
                        HSKJ.POST({
                            url: 'organization/delete',
                            data: {
                                userids: id
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

                    wactch: function () {
                        var self = this;
                        //监听工具条
                        layui.table.on('tool(userListTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"

                            var data = obj.data; //获得当前行数据
                            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                            var tr = obj.tr; //获得当前行 tr 的DOM对象
                            console.log('点击的当前行的数据', data);
                            if (layEvent === 'edit') { //编辑
                                require(['js/user-org/edit-user'], function(editUser){
                                    editUser(self, data);
                                })
                            } else if (layEvent === 'del') { //删除
                                layer.open({
                                    title: '提示',
                                    shadeClose: true,
                                    id: 'userOrgDelDialog',
                                    skin: 'skin-flex-center',
                                    area: ['469px'],
                                    btnAlign: 'c', 
                                    content: $('#delDialog').html(),
                                    yes: function(){
                                        self.doUserOrgDel(data.sponsorid);
                                    }
                                });
                            }
                        });

                        $(document)
                            .off('click', '#doSearch')
                            .on('click', '#doSearch', function () {
                                self.reloadTable();
                            })
                            .off('click', '#addUser')
                            .on('click', '#addUser', function () {
                                addUser(self);
                            })
                            .off('click', '#addUserDevice')
                            .off('focus', '#addUserDevice')
                            .on('click', '#addUserDevice', function () {
                                addUserDevice();
                            })
                            .on('focus', '#addUserDevice', function () {
                                addUserDevice();
                            })
                    }
                }
                userOrgList.init();
            })
        }
    }
)