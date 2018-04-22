/** v1.0 by helijun **/ 
define([
    'jquery',
    'common', 
    'layuiAll',
    'css!css/project/project-device'
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
                
                HSKJ.renderTpl('.module-container', 'text!tpl/project/project-device.tpl', { 
                    roleid: roleid,
                    pname: router.getParameter('pname')
                }, function () {
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

                var cols = [ //标题栏
                    , { field: 'name', title: '设备名称', templet: '<div><p class="hs-point hs-color-base" lay-event="detail">{{ d.name || ""}}</p></div>' }
                    , { field: 'deviceid', title: '编码 ' }
                    , { field: 'modelname', title: '型号' }
                    , { title: '出入状态 ',templet: '<div>{{d.usetype == 2? "出": d.usetype == 3?"出&入":"入"}}</div>' }
                    , { title: '使用状态', templet: '<div>{{d.status == 1? "使用中": d.status == 2? "故障" : "闲置"}}</div>' } //使用状态(1：使用中，2：故障，0：闲置)
                    , { title: '在线状态', templet: '<div><div class="m-status-txt">{{d.online == 1? "<i>在线</i>": "<em>离线</em>"}}</div></div>' } //设备状态(1：在线，0：离线)
                    , { field: 'installaddress', title: '安装位置' }
                ];

                if(roleid != 1){
                    cols.push({ width: 150, title: '操作', templet:'<div><div class="hs-tools"><a class="{{d.online == 1?"hs-none":""}}" lay-event="edit">编辑</a><a lay-event="del">删除</a></div></div>' })
                }
                HSKJ.renderTable({
                    url: ENV.API + 'system/project/device/query',
                    where: {
                        projectid: router.getParameter('pid')
                    },
                    id: 'deviceListTable',
                    elem: '#tableContent'
                    , cols: cols
                });
            },

            reloadTable: function(){
                layui.table.reload('deviceListTable', {
                    where: { 
                        status: $('select[name=deviceStatus]').val(),
                        name: $("#keyword").val()
                    }
                    , page: {
                        curr: 1
                    }
                });
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

            delDeviceAjax: function(id, callback){
                HSKJ.POST({
                    url: 'system/project/device/delete',
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

                layui.table.on('tool(deviceListTable)', function (obj) { 
                    var data = obj.data; 
                    var layEvent = obj.event;
                    void 0;
                    if(layEvent === 'detail'){
                        data.online = data.online == 1? "在线": "离线";
                        data.usetype = data.usetype == 2? "出": "入";
                        data.status = data.status == 1? "使用中": data.status == 2? "故障" : "闲置";
                        var dataForChinese = {
                            name: '名称',
                            deviceid: '编码',
                            modelname: '型号',
                            status: '使用状态',
                            usetype: '出入状态',
                            online: '在线状态',
                            installaddress: '安装位置',
                            opencount: '开门次数',
                            createtime: '使用开始日期',
                            operator: '入库人员',
                            purchase: '采购单位'
                        }
                        HSKJ.renderCommonDetail(data, dataForChinese);
                    } else if(layEvent === 'edit'){
                        require(['js/project/project-device-edit'], function (editDevice) {
                            editDevice(data, self);
                        })
                    } else if(layEvent === 'del'){
                        var content = '<p class="hs-align-center">你确定要删除此设备吗？</p>';
                        layer.confirm(
                            content,
                            function (index) {
                                self.delDeviceAjax(data.datanumber, function () {
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
                .off('click', '#addDevice')
                .on('click', '#addDevice', function () {//添加设备
                    require(['js/project/project-device-add'], function (addDevice) {
                        addDevice(roleid, self);
                    })
                })
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