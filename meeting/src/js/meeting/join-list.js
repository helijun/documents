define([
    'jquery',
    'common',
    'dateFormat',
    'layuiAll',
    'css!css/meeting/join-list'
], function (
    $,
    HSKJ,
    dateFormat
) {
return function () {
    window.dateFormat = dateFormat;
    var meetingid = router.getParameter('meetingid');
    var holdtimestart = router.getParameter('holdtimestart');
    HSKJ.ready(function () {
        var joinList = {
            init: function () {
                this.renderHtml();
                this.wactch();
            },
            data: {
                checkExport: function(){}
            },
            renderHtml: function () {
                var self = this;

                HSKJ.renderTpl(
                    '.module-container',
                    'text!tpl/meeting/join-list.tpl',
                    { holdtimestart: holdtimestart },
                    self.renderTable
                )
            },
            renderTable: function(){
                HSKJ.loadingShow();
                var vipIcon = '';
                
                HSKJ.renderTable({
                    where: { 
                        meetingid: meetingid    
                    }
                    , elem: '#tableContent'
                    , id: 'joinListTable'
                    , url: ENV.API + 'sponsor/employee/query'
                    , limit: 8
                    , cols: [
                        {  title: '序号',  type: 'numbers'}
                        , { field: 'faceimage', width: 95 , title: '人脸信息', templet: '<div><img class="hs-all-img element-join-face" src="{{ d.faceimage }}" /> </div>'}
                        , { field: 'name', title: '姓名', templet: '#joinListTableIsVip' }
                        , { field: 'phonenumber', title: '手机号' }
                        , { field: 'createtime', title: '报名时间', templet: '<div><p title={{d.createtime}}>{{ d.createtime.substr(0, 16)}}</p><div>' }
                        , { field: 'city', title: '签到状态', templet: '<div>{{ d.issign == 0?"未签到": "已签到" }}</div>' }
                        , { field: 'edit', title: '操作', width: 180, toolbar: '#joinListTableToolbar' }
                    ]
                    , done: function (res, curr, count) {
                        $('.element-count-data').html('参会人员： ' + (res.sumsize || 0) + ' 人 &nbsp;&nbsp; <i class="layui-icon" title="刷新参会人员列表" id="refresh">&#x1002;<i>');
                    }
                });
            },

            reloadTable: function(){
                layui.table.reload('joinListTable', {
                    where: {
                        keyword: $(" #keyword ").val()
                    }
                    , page: {
                        curr: 1
                    }
                });
            },

            //补签
            doMakeUp: function(data){
                var self = this;
                HSKJ.POST({
                    url: 'sponsor/employee/commitsign',
                    data: data,
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            layui.layer.msg('补签成功', { icon: 1 }, function () {
                                self.renderTable();
                                layui.layer.closeAll();
                            })
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //删除人员
            doEmployeedelete: function(opts, callback){
                HSKJ.POST({
                    url: 'sponsor/employee/delete',
                    data: {
                        meetingid: opts.meetingid,
                        employeeids: opts.employeeids
                    },
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            layui.layer.msg('删除成功', { icon: 1 }, function(){
                                callback && callback();
                            })
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //导出数据
            exportDataAjax: function(){
                var self = this;
                HSKJ.POST({
                    url: 'sponsor/employee/export',
                    data: {
                        meetingid: meetingid
                    },
                    beforeSend: function () {
                        layer.msg('正在生成数据...', { time: 20000});
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            // self.exportcheckAjax(json.data);
                            self.data.checkExport = setInterval(function(){
                                self.exportcheckAjax(json.data);
                            },5000)
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //轮训生成表格
            exportcheckAjax: function(uid,flag){
                var self = this;
                HSKJ.POST({
                    url: 'sponsor/employee/exportcheck',
                    data: {
                        uid: uid
                    },

                    success: function (json) {
                        if (json && json.code == 0) {
                            //状态 1：初始  2：进行中 3：异常  4：成功 5：无数据
                            if(json.data.status==4){
                                clearInterval(self.data.checkExport);
                                layer.msg('正在下载表格...', { time: 2000 })
                                self.downExcelAjax(json.data.filepath);
                            }
                            if(json.data.status==3){
                                clearInterval(self.data.checkExport);
                                layer.msg('数据异常,请稍后再试');
                            }
                            if(json.data.status==2){
                                layer.msg('正在生成数据...');
                            }
                            if(json.data.status==5){
                                clearInterval(self.data.checkExport);
                                layer.msg('暂无数据');
                            }
                        } else {
                            clearInterval(self.data.checkExport);
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },
            
            //下载表格
            downExcelAjax: function(url){
                window.location.href=url;
            },

            wactch: function () {
                var self = this;
                //监听工具条
                layui.table.on('tool(joinListTable)', function (obj) {
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    console.log('点击的当前行的数据', data);
                    if (layEvent === 'makeUp') { //补签
                        layer.open({
                            content: '<p class="hs-align-center">确定人员到达且需要补签？</p>',
                            area: ['400px'],
                            btn: ['确定'],
                            btnAlign: 'c',
                            yes: function () {
                                self.doMakeUp({
                                    meetingid: data.meetingid,
                                    employeeid: data.employeeid,
                                    name: data.name
                                });
                            }
                        });
                    } else if (layEvent === 'detail') {
                        require(['js/meeting/join-detail'], function (joinDetail) {
                            joinDetail(data);
                        })
                    } else if (layEvent === 'del') {
                        layer.open({
                            content: '<p class="hs-align-center">确定要删除此人信息？</p>',
                            area: ['400px'],
                            btn: ['确定'],
                            btnAlign: 'c',
                            yes: function () {
                                self.doEmployeedelete({
                                    meetingid: data.meetingid,
                                    employeeids: data.employeeid
                                }, function(){
                                    obj.del();
                                });
                            }
                        });
                    }
                });

                $(document)
                .off('click', '#refresh')
                .on('click', '#refresh', function(){
                    self.renderTable();
                })
                .off('click', '#doSearch')
                .on('click', '#doSearch', function () {
                    self.reloadTable();
                })
                .off('click', '#gobackMeetingList')
                .on('click', '#gobackMeetingList', function () {//返回会议列表
                    //TOOD 是否提示正在编辑，谨慎退出
                    router.to('meeting-list')
                })
                .off('click', '#addGuest')
                .on('click', '#addGuest', function () {
                    layer.open({
                        title: '添加嘉宾',
                        btn: [],
                        content: $('#addGuestDialog').html(),
                        area: ['400px', '222px'],
                        skin: 'module-device-add-dialog'
                    })
                })
                .off('click', '#exportData')
                .on('click', '#exportData', function () {
                    self.exportDataAjax();
                })
                .off('click', '#addVip')
                .on('click', '#addVip', function () {
                    layui.layer.closeAll();//关闭全部弹框
                    router.to('meeting-add-vip', {
                        meetingid: meetingid,
                        holdtimestart: holdtimestart
                    });
                })
                .off('click', '#addNormal')
                .on('click', '#addNormal', function () {
                    layui.layer.closeAll();
                    router.to('meeting-add-normal',{
                        meetingid: meetingid,
                        holdtimestart: holdtimestart
                    });
                })
            }
        }
        joinList.init();
    })
}
})