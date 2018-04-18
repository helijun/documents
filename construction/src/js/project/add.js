define([
    'jquery',
    'common', 
    'text!tpl/project/add.tpl',
    'layuiAll',
    'area',
    'css!css/project/list'
], function(
    $, 
    HSKJ,
    addProjectTpl
){
return function (roleid, parentJs) {
    console.log('parentJs', parentJs)
    HSKJ.ready(function () {
        var projectAdd = {
            init: function () {
                this.openAddProjectDialog();
                this.renderHtml();
                this.wactch();
            },

            data: {
                roleid: roleid
            },

            renderHtml: function() {
                
            },

            openAddProjectDialog: function () {
                var self = this;
                layer.open({
                    type: 1,
                    title: '添加项目',
                    btn: [],
                    content: layui.laytpl(addProjectTpl).render(self.data || {}),
                    area: ['735px'],
                    skin: 'module-project-add-dialog',
                    success: function (layero, index) {
                        layui.laydate.render({ //渲染日期
                            elem: '#projectDate'
                            , type: 'date'
                            , range: '~'
                            , format: 'yyyy-MM-dd'
                            , done: function (value, date) {
                                
                            }
                        });
                        self.loadProvince();
                        //self.getOrgListAjax();
                        self.formVerify();
                    }
                })
            },

            formVerify: function(){
                layui.form.verify({
                    macaddress: function (value, item) { //value：表单的值、item：表单的DOM对象，macaddress 对应form 里lay-filter
                        //if (/^\d+\d+\d$/.test(value)) {
                        //    return 'Mac地址不能全为数字';
                        //}
                        if (/^[\u4e00-\u9fa5],{0,}$/.test(value)) {
                            return 'Mac地址不能为中文';
                        }
                        //if (/^[^%&',;=?$\x22]+/.test(value)) {
                        //    return 'Mac地址不能有特殊字符';
                        //}

                        //([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}
                        // /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/
                        if (!new RegExp("^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$").test(value)) {
                            return 'Mac地址格式不正确';
                        }
                        
                    }
                });   
            },

            //获取机构列表
            getOrgListAjax: function () {
                var self = this;
                HSKJ.POST({
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
                            console.log('addProOrganizationList', organizationListHtml)
                            $('select[name=addProOrganizationList]').html(organizationListHtml);
                            console.log($('select[name=addProOrganizationList]').html())
                            layui.form.render('select');
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            loadProvince: function() {
                var self = this;
                var proHtml = '';
                for (var i = 0; i < areaData.length; i++) {
                    if (areaData[i].type == 1){
                        if (areaData[i].code == 440000){
                            proHtml += '<option value="' + areaData[i].code + '" selected >' + areaData[i].name + '</option>';
                        }else{
                            proHtml += '<option value="' + areaData[i].code + '" >' + areaData[i].name + '</option>';
                        }
                        
                    }
                }
                //初始化省数据
                $('select[name=province]').html(proHtml);
                layui.form.render('select', 'provinceFilter');
                self.loadCity(440000);
                self.loadArea(440300);
                
                layui.form.on('select(province)', function (data) {
                    $('select[name=city]').html('<option value="">请选择市</option>');
                    $('select[name=area]').html('<option value="">请选择县/区</option>');
                    data.value && self.loadCity(data.value, 1);
                });
            },

            loadCity: function(id, flag) {
                var self = this;
                var cityHtml = '';
                var cityArray = [];
                for (var i = 0; i < areaData.length; i++) {
                    if (areaData[i].type == 2 && areaData[i].parentCode == id) {
                        cityArray.push(areaData[i]);
                        if (areaData[i].code == 440300) {
                            cityHtml += '<option value="' + areaData[i].code + '" selected >' + areaData[i].name + '</option>';
                        } else {
                            cityHtml += '<option value="' + areaData[i].code + '" >' + areaData[i].name + '</option>';
                        }
                    }
                }
                $('select[name=city]').html(cityHtml);
                layui.form.render('select', 'cityFilter');
                if (flag == 1){
                    console.log('cityArray', cityArray)
                    if (id == 440000){
                        self.loadArea(440300);
                    }else{
                        self.loadArea(cityArray[0].code);
                    }
                }
                layui.form.on('select(city)', function (data) {
                    $('select[name=area]').html('<option value="">请选择县/区</option>');
                    data.value && self.loadArea(data.value);
                });
            },
            
            loadArea: function(id){
                var areaHtml = '';
                for (var i = 0; i < areaData.length; i++) {
                    if (areaData[i].type == 3 && areaData[i].parentCode == id) {
                        areaHtml += '<option value="' + areaData[i].code + '">' + areaData[i].name + '</option>';
                    }
                }
                $('select[name=area]').html(areaHtml);
                layui.form.render('select', 'areaFilter');
                layui.form.on('select(area)', function (data) {
                    
                });
            },

            //项目保存请求
            doProjectAddAjax: function(data){
                console.log('保存的请求', data)
                
                var address = $('select[name=province] option:selected').html() + $('select[name=city] option:selected').html() + $('select[name=area] option:selected').html() + data.field.projectAdress;
                HSKJ.getAddress(address, function(addressData){
                    console.log('获取地址data', data)
                    
                    var json = {
                        organizationid: HSKJ.getUserInfo('organizationid'),//data.field.addProOrganizationList || 
                        address: address,
                        shortaddress: data.field.projectAdress,
                        district: $('select[name=area] option:selected').html(), 
                        city: $('select[name=city] option:selected').html(),
                        province: $('select[name=province] option:selected').html(),
                        startdate: data.field.projectDate.split('~')[0],
                        enddate: data.field.projectDate.split('~')[1],
                        latitude: addressData.result.location.lat,
                        longitude: addressData.result.location.lng
                    }
                    HSKJ.POST({
                        url: 'system/project/add',
                        data: Object.assign(data.field, json),
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.msg('添加成功', { icon: 1 }, function () {
                                    parentJs.getStatAjax();
                                    parentJs.renderTable();
                                    //parentJs.reloadTable();
                                    layui.layer.closeAll();
                                })
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                })
            },

            wactch: function () {
                var self = this; 

                //添加项目的保存
                layui.form.on('submit(element-submit)', function (data) {
                    self.doProjectAddAjax(data);
                    return false;
                });
            }
        }
        projectAdd.init();
    })
}}
)