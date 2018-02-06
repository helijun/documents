define([
    'jquery',
    'common', 
    'js/user/add-user',
    'layuiAll',
    'css!css/user/list'
], function(
    $, 
    HSKJ,
    addUser
){
        return function() {
            HSKJ.ready(function () {
                var userList = {
                    init: function () {
                        this.getStatAjax();
                        this.wactch();
                    },

                    data: {

                    },

                    //获取已授权账号表格数据
                    getStatAjax: function(){
                        var self = this;
                        HSKJ.POST({
                            url: 'systemuser/user/queryauthorizes',
                            data: {

                            },
                            0: function(json){
                                self.renderHtml(json.data);
                            }
                        })
                    },

                    renderHtml: function(data) {
                        var self = this;
                        HSKJ.renderTpl('.module-container', 'text!tpl/user/list.tpl', data, function () {
                            self.renderTable();//渲染表格
                        })
                    },
                    renderTable: function(){
                        var self = this;

                        HSKJ.renderTable({
                            url: ENV.API + 'systemuser/user/query',
                            id: 'userListTable',
                            elem: '#tableContent'
                            , cols: [ //标题栏
                                {  title: '序号',  type: 'numbers'}
                                , { field: 'username', title: '授权账号' }
                                , { field: 'principal', title: '申请人 ' }
                                , { field: 'name', title: '授权单位' }
                                , { field: 'createtime', title: '授权日期', templet: '<div><p title="{{ d.createtime}}">{{ d.createtime.substr(0, 10) }}</p></div>' }
                                , { field: 'active', title: '激活/关联设备（台）' ,templet: '<div><p >{{ d.active+"/"+d.connect}}</p></div>' }
                                , { field: 'joinTime', title: '操作',toolbar: '#tableEdit',style: 'color: #3ddfd5;' }
                            ]
                        });
                    },


                    reloadTable: function(date, macOrAdress){
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

                    wactch: function () {
                        var self = this;
                        //监听工具条
                        layui.table.on('tool(userListTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"

                            var data = obj.data; //获得当前行数据
                            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                            var tr = obj.tr; //获得当前行 tr 的DOM对象
                            console.log('点击的当前行的数据', data);
                            if (layEvent === 'edit') {
                                require(['js/user/edit-user'], function (editUser) {
                                    editUser(self, data);
                                })
                            } else if (layEvent === 'del') {
                                layer.open({
                                    title: '提示',
                                    shadeClose: true,
                                    id: 'userDelDialog',
                                    skin: 'skin-flex-center',
                                    area: ['469px'],
                                    btnAlign: 'c', 
                                    content: $('#delDialog').html(),
                                    yes: function () {
                                        self.doUserDel(data.organizationid);
                                    }
                                });
                            }
                        });

                        $(document)
                        .off('click', '#addUser')
                        .on('click', '#addUser', function () {
                             addUser(self);
                         })
                        .off('click', '#addUserDevice')
                        .on('click', '#addUserDevice', function () {
                             addUserDevice();
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





}
)