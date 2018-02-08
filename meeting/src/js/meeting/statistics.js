define([
    'jquery',
    'underscore',
    'common',
    'layuiAll',
    'css!css/meeting/statistics'
], function (
    $,
    _,
    HSKJ
) {
    return function () {
        HSKJ.ready(function () {
            var roleid = HSKJ.getUserInfo('roleid');
            var meetingStat = {
                init: function () {
                    this.renderHtml();
                },

                renderHtml: function () {
                    var self = this;
                    HSKJ.renderTpl(
                        '.module-container',
                        'text!tpl/meeting/statistics.tpl',
                        {},
                        function () {
                            self.renderTable();//渲染表格
                            self.wactch();
                        })
                },
                renderTable: function () {
                    HSKJ.loadingShow();

                    HSKJ.renderTable({
                        id: 'meetingStatTable'
                        , elem: '#tableContent'
                        , url: ENV.API + 'systemuser/user/meetingquery'
                        , cols: [{ title: '序号', type: 'numbers' }
                            , { field: 'username', title: '授权账号', align: 'center' }
                            , { field: 'principal', title: '申请人 ', align: 'center' }
                            , { field: 'name', title: '授权单位', align: 'center' }
                            , { field: 'employees', title: '参与人数', align: 'center' }
                            , { field: 'meetings', title: '会议场次', templet: '<div><p title="查看详情">{{d.meetings}}</p></div>', event: 'goMeetingDetail', align: 'center' }
                            , { field: 'connect', title: '使用设备（台）', style: 'color: #3ddfd5;', toolbar: '#statConnectDetailToolbar', align: 'center' }]
                        , done: function (res, curr, count) {
                            $('.element-count-data').html('会议总计：' + (res.sumsize || 0) +' 场')
                        }
                    });
                },

                reloadTable: function () {
                    layui.table.reload('meetingStatTable', {
                        where: {
                            keyword: $('input[name="keywords"]').val()
                        }
                        , page: {
                            curr: 1
                        }
                    });
                },

                //删除会议
                delmeetingDetailAjax: function (meetingid) {
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
                                layui.layer.msg('删除成功', { icon: 1 })
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                },

                wactch: function () {
                    var self = this;

                    layui.table.on('tool(meetingStatTable)', function (obj) {
                        var data = obj.data; //获得当前行数据
                        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                        var tr = obj.tr; //获得当前行 tr 的DOM对象

                        console.log('当前行数据', data)
                        if (layEvent === 'goMeetingDetail') { //查看详情
                            router.to('meeting-statistics-list', {
                                organizationid: data.organizationid
                            })
                        } else if (layEvent === 'del') { //删除
                            layer.confirm(
                                '<p class="hs-align-center">确定删除会议？</p>', 
                                function (index) {
                                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                    layer.close(index);
                                    self.delmeetingDetailAjax(data.meetingid)
                                }
                            );
                        } else if (layEvent === 'searchConnect') { //使用设备（台）预览
                            var offset = [$(this).offset().top + 'px', $(this).offset().left - 200 + 'px'];
                            require(['js/meeting/use-device'], function (useDevice) {
                                useDevice('systemuser/user/querydevice?organizationid=' + data.organizationid, offset)
                            })
                        } 
                    });

                    $(document)
                    .on('click', '#doSearch', function () {
                        self.reloadTable();
                    })
                }
            }
            meetingStat.init();
        })
    }
})