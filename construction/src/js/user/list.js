define([
    'jquery',
    'common',
    'layuiAll',
    'css!css/user/list'
], function (
    $,
    HSKJ
) {
    return function () {
        HSKJ.ready(function () {
            var roleid = HSKJ.getUserInfo('roleid');
            var userList = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                data: {

                },

                renderHtml: function (data) {
                    var self = this;
                    HSKJ.renderTpl('.module-container', 'text!tpl/user/list.tpl', {
                        roleid: roleid
                    }, function () {
                        self.renderTable();//渲染表格
                        
                        if (roleid == 1){
                            self.getOrgListAjax()
                        }else{
                            layui.form.render('select');
                        }
                    })
                },

                renderTable: function () {
                    var self = this;

                    //inservicestate：在职状态（1：在职；0：离职）
                    //status：当前工作状态（1：工作中，0：空闲）
                    var url = ENV.API + 'system/project/employee/query';
                    if(roleid != 1) {
                        url += '?organizationid=' + HSKJ.getUserInfo('organizationid');
                    }
                    HSKJ.renderTable({
                        url: url,
                        id: 'userListTable',
                        elem: '#tableContent'
                        , limit: 8
                        , cols: [ //标题栏
                            , { title: '照片', templet: '<div><div class="element-user-face" lay-event="largeImg"><img src="{{d.facepath}}"/></div></div>' }
                            , { title: '姓名', templet: '<div><p class="hs-point hs-color-base" lay-event="detail">{{d.name}}</p></div>' }
                            , { field: 'projectname', title: '所属项目 ' }
                            , { field: 'enterprise', title: '劳务企业 ' }
                            , { field: 'belongclass', title: '工种' }
                            , { title: '已工作时间（h）', templet: '<div>{{d.totalattendancehours || 0}}</div>'}
                            , { title: '在职状态', templet: '<div><div class="m-status-txt">{{ d.inservicestate == 0? "<em>离职</em>":"在职"}}</div></div>' }
                            , { field: 'enterprojecttime', title: '加入项目时间' }
                        ]
                        , done: function(){
                            
                        }
                    });
                },

                reloadTable: function (date, macOrAdress) {
                    var where = { 
                        inservicestate: $('select[name=userStatus]').val(),
                        name: $("#keyword").val()
                    };
                    if(roleid == 1){
                        where.organizationid = $('select[name=organizationList]').val()
                    }
                    layui.table.reload('userListTable', {
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
                                console.log('organizationListHtml', organizationListHtml)
                                $('select[name=organizationList]').html(organizationListHtml);
                                console.log($('select[name=organizationList]').html())
                                layui.form.render('select');
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
                        if(layEvent === 'detail'){
                            data.sex = data.sex == 1? '男': '女';
                            data.status = data.status == 0? "离职":"在职"
                            var dataForChinese = {
                                name: '姓名',
                                sex: '性别',
                                tel: '联系电话',
                                status: '在职状态',
                                enterprise: '劳务企业',
                                employeetypename: '人员类型',
                                worktype: '工种',
                                belongclass: '班组',
                                dormitorynumber: '宿舍编号',
                                bednumber: '床位编号',
                                secureeducationdate: '安全教育日期',
                                urgencyperson: '紧急联系人',
                                urgencytel: '紧急联系电话',
                                totalattendancehours: '已工作时间（h）',
                                enterprojecttime: '加入项目时间'
                            }
                            HSKJ.renderCommonDetail(data, dataForChinese);
                        }else if (layEvent === 'edit') {
                            require(['js/user/edit-user'], function (editUser) {
                                editUser(self, data);
                            })
                        } else if (layEvent === 'largeImg') {
                            layer.photos({
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
                        } else if (layEvent === 'del') {
                            layer.open({
                                title: '提示',
                                shadeClose: true,
                                id: 'userDelDialog',
                                skin: 'skin-flex-center',
                                area: ['469px'],
                                btnAlign: 'c',
                                content: $('#delDialog').html()
                            });
                        }
                    });

                    $(document)
                        .off('click', '#doSearch')
                        .on('click', '#doSearch', function () {
                            self.reloadTable();
                        })
                }
            }
            userList.init();
        })
    }
})