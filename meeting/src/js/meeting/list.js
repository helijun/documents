define([
    'jquery',
    'common', 
    'js/meeting/add-meeting',
    'js/meeting/detail',
    'dateFormat',
    'layuiAll',
    'css!css/meeting/list'
], function(
    $, 
    HSKJ,
    addMeeting,
    meetingDetail,
    dateFormat
){
return function() {
    window.dateFormat = dateFormat;
    HSKJ.ready(function () {
        var meetingList = {
            init: function () {
                this.renderHtml();
                this.wactch();
            },

            renderHtml: function () {
                var self = this;
                HSKJ.renderTpl(
                    '.module-container', 
                    'text!tpl/meeting/list.tpl', 
                    {}, 
                function () {
                    self.renderTable();//渲染表格
                })
            },
            renderTable: function(){
                HSKJ.renderTable({
                    elem: '#tableContent'
                    , url: ENV.API + 'sponsor/meeting/query'
                    , cols: [ //标题栏
                        { title: '序号', type: 'numbers' }
                        , { field: 'title', title: '会议名称' }
                        , { field: 'employees', title: '参会人数（人） ' }
                        , { field: 'createtime', title: '创建时间', templet: '<div><p title={{d.createtime}}>{{ d.createtime.substr(0, 10)}}</p><div>' }
                        , { field: 'signinstarttime', title: '签到有效期', templet: '<div><p title="{{d.signinstarttime}} ~ {{d.signinendtime}}">{{d.signinstarttime.substr(0, 16)}} ~ {{d.signinendtime.substr(0, 16)}}</p><div>' }
                        , { field: '', title: '会议登录码', toolbar: '#meetingQrToolbar' }
                        , { field: '', title: '操作', width: 320, toolbar: '#meetingTableToolbar' }
                    ]
                });
            },

            //删除会议
            delmeetingDetailAjax: function (meetingid, callback) {
                HSKJ.POST({
                    url: 'sponsor/meeting/delete',
                    data: {
                        meetingids: meetingid
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

            //推送会议
            meetingPushAllSysnAjax: function (meetingid, callback) {
                HSKJ.POST({
                    url: 'sponsor/meeting/pushAllSysn',
                    data: {
                        meetingid: meetingid
                    },
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                    	if (json && json.code == 0) {
                            layui.layer.msg('推送成功', { icon: 1 })
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            wactch: function () {
                var self = this;
                //监听工具条
                layui.table.on('tool(meetingListTable)', function (obj) {
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    console.log('点击的当前行的数据', data);
                    if (layEvent === 'push') { //推送
                        self.meetingPushAllSysnAjax(data.meetingid);
                    } else if (layEvent === 'detail') { //会议详情
                        meetingDetail(data.meetingid);
                    } else if (layEvent === 'list') { //参会名单
                        require(['js/meeting/join-list'], function (joinList){
                            joinList(data.meetingid, data.holdtimestart);
                        })
                    } else if (layEvent === 'edit') { //编辑
                        if (data.employees > 0){
                            layui.layer.msg('已有人报名会议，无法编辑')
                            return;
                        }
                        require(['js/meeting/edit-meeting'], function (editMeeting) {
                            editMeeting(data);
                        })
                    } else if (layEvent === 'qr') { //二维码点击
                        HSKJ.loadingShow();
                        
                        require(['js/meeting/qr-print'], function (qrPrint) {
                            qrPrint(data);
                            HSKJ.loadingHide();
                        })
                    } else if (layEvent === 'del') { //删除
                        var delIndex = layer.open({
                            title: '提示',
                            shadeClose: true,
                            id: 'meetingDelDialog',
                            skin: 'skin-flex-center',
                            area: ['569px', '222px'],
                            btn: ['确定', '取消'],
                            btnAlign: 'c'
                            , content: $('#delDialog').html(),
                            yes: function(){
                                layui.layer.close(delIndex);
                                self.delmeetingDetailAjax(data.meetingid, function(){
                                    //self.renderTable();//刷新表格
                                    obj.del();//移除表格行，无需刷新
                                });
                            }
                        });
                    }
                });

                $(document).on('click', '#addMeeting', function () {
                    addMeeting()
                })
            }
        }
        meetingList.init();
    })
}}
)