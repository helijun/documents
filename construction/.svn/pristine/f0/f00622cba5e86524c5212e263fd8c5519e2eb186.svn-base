/** v1.0 by helijun **/ 
define([
    'jquery',
    'common', 
    'layuiAll',
    'css!css/device/list'
], function(
    $, 
    HSKJ
){
return function() {
    HSKJ.ready(function () {
        var roleid = HSKJ.getUserInfo('roleid');
        
        var deviceList = {
            init: function () {
                this.renderHtml();
                this.wactch();
            },

            data: {
                
            },
            renderHtml: function() {
                var self = this;
                
                HSKJ.renderTpl('.module-container', 'text!tpl/device/list.tpl', { roleid: roleid}, function () {
                    self.renderTable();//渲染表格
                    
                    if (roleid == 1){
                        self.getOrgListAjax()
                    }else{
                        layui.form.render('select');
                    }
                    
                    layui.laydate.render({ //渲染日期
                        elem: '#activationDate'
                        , type: 'date'
                        , range: '~'
                        , format: 'yyyy-MM-dd'
                        , done: function (value, date) {
                            self.reloadTable();
                            
                            
                        }
                    });
                })
            },

            renderTable: function (status){ 
                var self = this;
                HSKJ.loadingShow();

                var cols =  [ //标题栏
                    , { field: 'name', title: '设备名称' }
                    , { field: 'deviceid', title: '编码 ' }
                    , { field: 'modelname', title: '型号 ' }
                    , { field: 'projectname', title: '所属项目 ' }
                    , { title: '出入类型',templet: '<div>{{d.usetype == 2? "出": "入"}}</div>' }
                    , { title: '使用状态', templet: '<div><div class="m-status-txt">{{d.status == 1? "使用中": d.status == 2? "<span>故障</span>" : "闲置"}}</div></div>' } //设备状态(1：使用中，2：故障，0：闲置)
                    , { title: '在线状态', templet: '<div><div class="m-status-txt">{{d.online == 1? "<i>在线</i>": "<em>离线</em>"}}</div></div>' } //设备状态(1：在线，0：离线)
                ];
                if(roleid == 1){
                    cols.splice(4, 0, { field: 'organizationname', title: '所属机构 ' });
                }
                
                HSKJ.renderTable({
                    url: ENV.API + 'system/project/device/query?organizationid=' + HSKJ.getUserInfo('organizationid'),
                    id: 'deviceListTable',
                    elem: '#tableContent'
                    , cols: cols
                    , done: function () {
                    }
                });
            },

            reloadTable: function(){
                var where = { 
                    status: $('select[name=deviceStatus]').val(),
                    name: $("#keyword").val()
                };
                if(roleid == 1){
                    where.organizationid = $('select[name=organizationList]').val()
                }
                
                layui.table.reload('deviceListTable', {
                    where: where
                    , page: {
                        curr: 1
                    }
                });
            },
            
            //获取机构列表
            getOrgListAjax: function () {
                var self = this;
                HSKJ.GET({
                    url: 'system/organization/query',
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            var organizationListHtml = '<option value="">请选择或输入所属机构</option>';
                            $(json.data).each(function (k, v) {
                                organizationListHtml += '<option value="' + v.organizationid + '">' + v.name + '</option>'
                            })
                            void 0
                            $('select[name=organizationList]').html(organizationListHtml);
                            void 0
                            layui.form.render('select');
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //删除设备
            delDeviceAjax: function (id, callback) {
                var self = this;
                HSKJ.POST({
                    url: 'organization/device/delete',
                    data: {
                        deviceids: id
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

                $(document)
                .off('click', '#doSearch')
                .on('click', '#doSearch', function () {
                    self.reloadTable();
                })
            }
        }
        deviceList.init();
    })
}}
)