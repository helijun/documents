/** v1.0 by helijun **/ 
define([
    'jquery',
    'common', 
    'layuiAll',
    'css!css/account/list'
], function(
    $, 
    HSKJ
){
return function() {
    HSKJ.ready(function () {
        var roleid = HSKJ.getUserInfo('roleid');
        var accountList = {
            init: function () {
                this.renderHtml({});
                this.wactch();
            },

            data: {
                
            },

            renderHtml: function(data) {
                var self = this;
                data.roleid = roleid;
                HSKJ.renderTpl('.module-container', 'text!tpl/account/list.tpl', data, function () {
                    self.renderTable();//渲染表格
                    layui.form.render('select'); //刷新select选择框渲染
                })
            },

            renderTable: function (status){ 
                var self = this;
                HSKJ.loadingShow();

                var tableToolbarHtml = [
                    '<a lay-event="del">注销</a>',
                    '<a lay-event="edit">编辑</a>'
                ];

                var cols = [
                    , { field: 'username', title: '账号' }
                    , { field: 'name', title: '名称', templet: '<div><p>{{d.name}}</p></div>' }
                    , { title: '负责人/联系方式', templet: '<div><p>{{d.principal}}/{{d.tel}}</p></div>' }
                    , { title: '状态', templet: '<div><p class="m-status-txt">{{ d.status == 1? "正常" : "<em>注销</em>"}}</p></div>' } //状态(1:正常,2:注销)
                    , { field: 'createtime', title: '创建时间' }
                    , { title: '操作', templet: '<div><div class="table-toolbar" data-id="{{d.projectid}}">' + tableToolbarHtml.join('') +'</div></div>' }
                ];

                HSKJ.renderTable({
                    url: ENV.API + 'system/organization/query'
                    , id: 'accountListTable'
                    , elem: '#tableContent'
                    , cols: cols
                    , done: function(){
                        $('.element-project-list').hover(function () {
                            $(this).find('a').removeClass('hs-none')
                        }, function () {
                            $(this).find('a').addClass('hs-none')
                        })
                    }
                })
            },

            reloadTable: function (organizationid){
                layui.table.reload('accountListTable', {
                    where: { 
                        username: $('input[name=keyword]').val(),
                        status: $('select[name=organizationStatus]').val()
                    }
                    , page: {
                        curr: 1
                    }
                });
            },

            //注销账号
            delAccountAjax: function(id, callback){
                HSKJ.POST({
                    url: 'system/organization/disable',
                    data: {
                        organizationid: id
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

                layui.form.on('select(organizationList)', function (data) {
                    data.value && self.reloadTable(data.value);
                });

                //监听工具条
                layui.table.on('tool(accountListTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    void 0;
                    if (layEvent === 'edit') { //编辑
                        require(['js/account/edit'], function (editAccount) {
                            editAccount(data, self);
                        })
                    } else if (layEvent === 'del') { //注销
                        var content = '<p class="hs-align-center">你确定要注销此账号吗？</p>';
                        layer.confirm(
                            content,
                            function (index) {
                                self.delAccountAjax(data.organizationid, function () {
                                    layui.layer.msg('注销成功', { icon: 1 }, function () {
                                        layui.layer.closeAll()
                                        self.renderTable();
                                    })
                                })
                            }
                        );
                    }
                });

                $(document)
                .off('click', '#addAccount')
                .on('click', '#addAccount', function () {//添加机构
                    require(['js/account/add'], function (addAccount) {
                        addAccount(roleid, self);
                    })
                })
                .off('click', '#doSearch')
                .on('click', '#doSearch', function () {
                    self.reloadTable();
                })
            }
        }
        accountList.init();
    })
}}
)