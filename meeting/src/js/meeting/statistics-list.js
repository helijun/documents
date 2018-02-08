//会议统计-会议列表
define([
    'jquery',
    'underscore',
    'common',
    'layuiAll',
    'css!css/meeting/statistics-list'
], function (
    $,
    _,
    HSKJ
) {
    return function () {
        var organizationid = router.getParameter('organizationid');
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
                        'text!tpl/meeting/statistics-list.tpl',
                        { organizationid: organizationid},
                        function () {
                            self.renderTable();//渲染表格
                            self.wactch();
                        })
                },
                renderTable: function () {
                    HSKJ.loadingShow();

                    var url = roleid == 1 ? 'organization/meetingquery?organizationid=' + organizationid : 'organization/orgmeetingquery';
                    HSKJ.renderTable({
                        id: 'meetingStatTable'
                        , elem: '#tableContent'
                        , url: ENV.API + url
                        , cols: [{ title: '序号', type: 'numbers', width: 100, align: 'center' }
                            , { field: 'title', title: '会议名称', align: 'center' }
                            , { field: 'sponsorname', title: '会议单位 ', align: 'center' }
                            , { field: 'timeRang', title: '会议时间', templet: '<div><p title="{{ d.holdtimestart.substr(0, 16)}} ~ {{ d.holdtimeend.substr(0, 16)}}">{{ d.holdtimestart.substr(0, 16) }} ~ {{ d.holdtimeend.substr(0, 16) }}</p></div>', align: 'center' }
                            , { field: 'employees', title: '报名人数', align: 'center' }
                            , { field: 'employeerecords', title: '签到人数', align: 'center' }
                            , { field: 'staus', title: '召开状态', templet: '<div>{{ d.staus == 0?"<em>未召开</em>": "已召开" }}</div>', align: 'center' }
                            , { field: 'devices', title: '关联设备（台）', style: 'color: #3ddfd5;', toolbar: '#statDevicesDetailToolbar', align: 'center' }
                            , { field: 'edit', title: '操作', style: 'color: #3ddfd5;', toolbar: '#statCountDelToolbar', align: 'center' }]
                        , done: function (res, curr, count) {
                            $('.element-count-data').html('会议总计：' + (res.sumsize || 0) +' 场');

                            //渲染日期
                            layui.laydate.render({
                                elem: '#meentingDateRange'
                                , type: 'date'
                                , range: '~'
                                , format: 'yyyy-MM-dd'
                            });
                        }
                    });
                },

                reloadTable: function () {
                    layui.table.reload('meetingStatTable', {
                        where: {
                            holdtimestr: $('input[name="holdtimestr"]').val(),
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
                        if (layEvent === 'del') { //删除
                            layer.confirm(
                                '<p class="hs-align-center">确定删除会议？</p>', 
                                function (index) {
                                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                    layer.close(index);
                                    self.delmeetingDetailAjax(data.meetingid)
                                }
                            );
                        } else if (layEvent === 'searchDevices') { //关联设备（台）预览
                            var offset = [$(this).offset().top + 'px', $(this).offset().left - 100 + 'px'];
                            require(['js/meeting/use-device'], function (useDevice) {
                                useDevice('organization/meetingdevicequery?meetingid=' + data.meetingid, offset)
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