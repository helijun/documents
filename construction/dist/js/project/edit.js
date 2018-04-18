/** v1.0 by helijun **/ 
define([
    'jquery',
    'common', 
    'text!tpl/project/edit.tpl',
    'layuiAll',
    'area',
    'css!css/project/list'
], function(
    $, 
    HSKJ,
    editProjectTpl
){
return function (parentData, parentJs) {
    void 0
    HSKJ.ready(function () {
        var projectEdit = {
            init: function () {
                this.openAddProjectDialog();
                this.renderHtml();
                this.wactch();
            },

            data: parentData,

            renderHtml: function() {
                
            },

            openAddProjectDialog: function () {
                var self = this;
                layer.open({
                    type: 1,
                    title: '编辑项目',
                    btn: [],
                    content: layui.laytpl(editProjectTpl).render(self.data || {}),
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

            loadProvince: function() {
                var self = this;
                var proHtml = '';
                var currentCityCode = 440000;
                var currentAreaCode = 440300;
                for (var i = 0; i < areaData.length; i++) {
                    if (areaData[i].type == 1){
                        if (areaData[i].name == parentData.province){
                            currentCityCode = areaData[i].code;
                            proHtml += '<option value="' + areaData[i].code + '" selected >' + areaData[i].name + '</option>';
                        }else{
                            proHtml += '<option value="' + areaData[i].code + '" >' + areaData[i].name + '</option>';
                        }
                        if(areaData[i].parentCode = currentCityCode){
                            currentAreaCode = areaData[i].code;
                        }
                        
                    }
                }
                //初始化省数据
                $('select[name=province]').html(proHtml);
                layui.form.render('select', 'provinceFilter');
                self.loadCity(currentCityCode);
                
                layui.form.on('select(province)', function (data) {
                    $('select[name=city]').html('<option value="">请选择市</option>');
                    $('select[name=area]').html('<option value="">请选择县/区</option>');
                    data.value && self.loadCity(data.value, 1);
                });
            },

            loadCity: function(id, flag) {
                var self = this;
                var cityHtml = '';
                var currentCityCode = 440300;
                var cityArray = [];
                for (var i = 0; i < areaData.length; i++) {
                    if (areaData[i].type == 2 && areaData[i].parentCode == id) {
                        cityArray.push(areaData[i]);
                        if (areaData[i].name == parentData.city) {
                            currentCityCode = areaData[i].code;
                            cityHtml += '<option value="' + areaData[i].code + '" selected >' + areaData[i].name + '</option>';
                        } else {
                            cityHtml += '<option value="' + areaData[i].code + '" >' + areaData[i].name + '</option>';
                        }
                    }
                }
                if(flag == 1){
                    currentCityCode = cityArray[0].code;
                }
                $('select[name=city]').html(cityHtml);
                layui.form.render('select', 'cityFilter');
                self.loadArea(currentCityCode);
                layui.form.on('select(city)', function (data) {
                    $('select[name=area]').html('<option value="">请选择县/区</option>');
                    data.value && self.loadArea(data.value);
                });
            },
            
            loadArea: function(id){
                var areaHtml = '';
                for (var i = 0; i < areaData.length; i++) {
                    if (areaData[i].type == 3 && areaData[i].parentCode == id) {
                        if (areaData[i].name == parentData.district) {
                            areaHtml += '<option value="' + areaData[i].code + '" selected>' + areaData[i].name + '</option>';
                        } else {
                            areaHtml += '<option value="' + areaData[i].code + '">' + areaData[i].name + '</option>';
                        }
                        
                    }
                }
                $('select[name=area]').html(areaHtml);
                layui.form.render('select', 'areaFilter');
                layui.form.on('select(area)', function (data) {
                    
                });
            },

            //项目保存请求
            doprojectEditAjax: function(data){
                void 0
                
                var address = $('select[name=province] option:selected').html() + $('select[name=city] option:selected').html() + $('select[name=area] option:selected').html() + data.field.projectAdress;
                HSKJ.getAddress(address, function(addressData){
                    void 0
                    
                    var json = {
                        projectid: parentData.projectid,
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
                        url: 'system/project/update',
                        data: Object.assign(data.field, json),
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.msg('更新成功', { icon: 1 }, function () {
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

                //编辑项目的保存
                layui.form.on('submit(element-submit)', function (data) {
                    self.doprojectEditAjax(data);
                    return false;
                });
            }
        }
        projectEdit.init();
    })
}}
)