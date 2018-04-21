define([
    'jquery',
    'common', 
    'layuiAll',
    'css!css/project/discern-record'
], function(
    $, 
    HSKJ
){
return function() {
    HSKJ.ready(function () {
        var roleid = HSKJ.getUserInfo('roleid');
        window.roleid = roleid;
        console.log('roleid', roleid);
        var deviceList = {
            init: function () {
                this.renderHtml();
                this.wactch();
            },

            data: {
                
            },

            renderHtml: function() {
                var self = this;
                console.log('pname', router.getParameter('pname'))
                HSKJ.renderTpl('.module-container', 'text!tpl/project/discern-record.tpl', 
                    { 
                        roleid: roleid,
                        pname: router.getParameter('pname')
                    },
                    function () {
                    self.renderTable();//渲染表格
                    layui.form.render('select');
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

                var cols = [
                    { title: '识别照片', templet: '<div><img class="hs-point" lay-event="largeImg" src="{{d.facepath}}"></div>'}
                    , { field: 'name', title: '姓名'}
                    , { field: 'usertypename', title: '出入类型'}
                    , { field: 'enterprise', title: '劳务企业' }
                    , { field: 'belongclass', title: '班组', sort: true  }
                    , { field: 'worktype', title: '工种', sort: true  }
                    , { title: '识别方式', templet: '<div>{{d.identificationtype == 1? "人脸识别":"身份证识别"}}</div>' }
                    , { field: 'identificationtime', title: '识别时间', sort: true  }
                ];

                HSKJ.renderTable({
                    url: ENV.API + 'system/record/query?projectid=' + router.getParameter('pid'),
                    id: 'discernRecordTable',
                    elem: '#tableContent'
                    , cols: cols
                    , done: function (res, curr, count) {
                        
                    }
                })
            },

            reloadTable: function (status){
                layui.table.reload('discernRecordTable', {
                    where: { 
                        identificationtype: status || $('select[name=shibie-type]').val(),
                        name: $("#keyword ").val()
                    }
                    , page: {
                        curr: 1
                    }
                });
            },

            wactch: function () {
                var self = this; 

                layui.table.on('tool(discernRecordTable)', function (obj) { 
                    var data = obj.data; 
                    var layEvent = obj.event;
                    console.log('点击的当前行的数据', data);
                    if (layEvent === 'largeImg') {
                        layui.layer.photos({
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
                    }
                })
                layui.form.on('select(shibieType)', function (data) {
                    data.value && self.reloadTable(data.value);
                });

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