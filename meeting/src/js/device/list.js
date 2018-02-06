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
        window.roleid = roleid;
        console.log('roleid', roleid);
        var deviceList = {
            init: function () {
                this.renderHtml();
                this.getStatAjax(4);
                this.wactch();
            },

            data: {
                
            },

            //获取表格统计数据
            getStatAjax: function (status){
                var self = this;
                HSKJ.POST({
                    url: roleid == 1 ? 'systemuser/device/infototal' : 'organization/device/lineinfo',
                    // url: 'systemuser/device/infototal',
                    data: {
                        status: status
                    },
                    0: function(json){
                        var d = json.data;
                        //已激活设备：{{d.plan+d.up}}台 立式机：{{d.up}}台 平板：{{d.plan}}台
                        var $elementCountData = $('.element-count-data');
                        if(!d) {
                            $elementCountData.html('');
                        }
                        if(roleid == 1){
                            d && $elementCountData.html((status && status == 4 ? '已' : '未') + '激活设备：' + (d.plan + d.up) + '台 立式机：'+ d.up + '台 平板：'+ d.plan +'台');
                        }else{
                            d && $elementCountData.html('在线设备：' + (d.onlines || 0) + '台 离线设备：' + (d.outlines || 0) + '台');
                        }
                    }
                })
            },

            renderHtml: function() {
                var self = this;
                
                HSKJ.renderTpl('.module-container', 'text!tpl/device/list.tpl', { roleid: roleid}, function () {
                    self.renderTable();//渲染表格

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
                    { title: '序号', type: 'numbers' }
                    , { field: 'macaddress', title: 'Mac地址' }
                    , { field: 'softversion', title: '软件版本', sort: true }
                ];

                if ($('.tabs-item.active').attr('data-status') != 1){
                    cols.splice(3, 0, { field: 'organizationname', title: '授权单位' });
                    cols.splice(1, 0, { field: 'name', title: '设备名称' });
                    if(roleid == 1){
                        cols.splice(4, 0, { field: 'activationdate', title: '激活日期', templet: '<div><p title={{d.activationdate}}>{{ d.activationdate.substr(0, 10)}}</p><div>' });
                    }
                    if(roleid == 2){
                        cols.splice(4, 0, { field: 'bindingdate', title: '绑定日期', templet: '<div><p title={{d.bindingdate}}>{{ d.bindingdate.substr(0, 10)}}</p><div>' });
                    }
                    cols.splice(6, 0, { field: 'status', title: '在线状态', sort: true, templet: '#deviceTableStatusTpl' });
                    //templet: '<div><p title={{d.activationdate}}>{{ d.activationdate}}</p><div>' 为了鼠标放到日期上面能够显示

                    if(roleid != 1) {
                        cols.splice(7, 0, { field: 'edit', title: '操作', toolbar: roleid == 1 ? '#deviceTableToolbar' : '#deviceOrgTableToolbar' })
                    }
                }else{
                    cols.splice(1, 0, { field: 'type', title: '设备型号',templet: '<div>{{ d.type == 1?"<em>平板</em>": "立式机" }}</div>' });
                    cols.splice(5, 0, { field: 'edit', title: '操作', toolbar: roleid == 1 ? '#deviceTableToolbar' : '#deviceOrgTableToolbar' })
                }

                var url = roleid == 1 ? ENV.API + 'systemuser/device/query' : ENV.API + 'organization/device/query';


                HSKJ.renderTable({
                    url: url + '?status=' + (status || 4), //4 激活 1 未激活
                    id: 'deviceListTable',
                    elem: '#tableContent'
                    , cols: cols
                    , done: function (res, curr, count) {
                        if (roleid != 1) {
                            //如果是设备拥有者，默认出现绑定设备
                            $('#addDeviceDiv').removeClass('layui-hide');
                        }
                    }
                })
            },

            reloadTable: function(){
                layui.table.reload('deviceListTable', {
                    where: { 
                        status: $('.tabs-item.active').attr('data-status'),
                        keyword: $(" #keyword ").val(),
                        activedatestr: $(" #activationDate ").val()

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

            wactch: function () {
                var self = this; 

                //status 1 是未激活 4 是激活 3 就是删除 这个是设备状态
                // 在线离线 是online 0是离线 1 是在线

                //监听工具条
                layui.table.on('tool(deviceListTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    console.log('点击的当前行的数据', data);
                    if (layEvent === 'edit') { //编辑
                        require(['js/device/edit-device'], function (editDevice) {
                            editDevice(data, self);
                        })
                    } else if (layEvent === 'del') { //删除、解绑
                        var text = roleid == 1 ?'删除': '解绑';
                        if (data.online == 1) {
                            layer.open({
                                title: '提示'
                                , content: '<p class="hs-align-center">设备目前处于在线状态，无法' + text +'该设备。</p>'
                            }); 
                        }else{
                            var content = '<p class="hs-align-center">你确定要' + text +'此设备吗？</p>';
                            if (data.status == 4){
                                content = '<p class="hs-align-center">设备已激活，你确定要' + text +'此设备吗？</p>';
                            }
                            layer.confirm(
                                content,
                                function (index) {
                                    self.delDeviceAjax(data.deviceid, function(){
                                        layui.layer.msg(text +'成功', { icon: 1 }, function () {
                                            layui.layer.closeAll()
                                            obj.del();
                                        })
                                    })
                                }
                            );
                        }
                    }
                });

                $(document)
                .on('click', '.tabs-item', function () { //激活未激活切换
                    self.getStatAjax($(this).attr('data-status'));
                    self.renderTable($(this).attr('data-status'));

                    var $addDeviceDiv = $('#addDeviceDiv');
                    var $searchDeviceDiv = $('#searchDeviceDiv');
                    var $keyword = $('#keyword');

                    if ($(this).attr('data-status') == 4) {
                        $addDeviceDiv.addClass('layui-hide');
                        $searchDeviceDiv.removeClass('layui-hide');
                        $keyword.attr('placeholder', '请输入设备mac地址或授权单位');

                    } else {
                        $addDeviceDiv.removeClass('layui-hide');
                        $searchDeviceDiv.addClass('layui-hide');
                        $keyword.attr('placeholder','请输入设备mac地址');
                    }
                    $keyword.val('');//清空搜索框
                })
                .off('click', '#addDevice')
                .on('click', '#addDevice', function () {//添加设备
                    require(['js/device/add-device'], function (addDevice) {
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