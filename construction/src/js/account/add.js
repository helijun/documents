define([
    'jquery',
    'common', 
    'text!tpl/account/add.tpl',
    'layuiAll',
    'area',
    'css!css/account/list'
], function(
    $, 
    HSKJ,
    addAccountTpl
){
return function (roleid, parentJs) {
    console.log('parentJs', parentJs)
    HSKJ.ready(function () {
        var accountAdd = {
            init: function () {
                this.openAddAccountDialog();
                this.renderHtml();
                this.wactch();
            },

            data: {
                roleid: roleid
            },

            renderHtml: function() {
                
            },

            openAddAccountDialog: function () {
                var self = this;
                layer.open({
                    type: 1,
                    title: '添加账号',
                    btn: [],
                    content: layui.laytpl(addAccountTpl).render(self.data || {}),
                    area: ['500px'],
                    skin: 'module-account-add-dialog',
                    success: function (layero, index) {
                        //self.loadProvince();
                        //self.getOrgListAjax();
                        self.formVerify();
                    }
                })
            },

            formVerify: function(){
                layui.form.verify({
                    
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
            doAccountAddAjax: function(data){
                console.log('保存的请求', data)
                var json = {
                    
                }
                HSKJ.POST({
                    url: 'system/organization/add',
                    data: Object.assign(data.field, json),
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            layui.layer.msg('添加成功', { icon: 1 }, function () {
                                //parentJs.getStatAjax(1);
                                parentJs.renderTable();
                                //parentJs.reloadTable();
                                layui.layer.closeAll();
                            })
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            wactch: function () {
                var self = this; 

                //添加项目的保存
                layui.form.on('submit(element-submit)', function (data) {
                    self.doAccountAddAjax(data);
                    return false;
                });
            }
        }
        accountAdd.init();
    })
}}
)