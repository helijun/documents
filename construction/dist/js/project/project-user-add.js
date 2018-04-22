/** v1.0 by helijun **/ 
define([
    'jquery',
    'common',
    'formUtil',
    'layuiAll',
    'area',
    'css!css/project/project-user-add'
], function (
    $,
    HSKJ,
    formUtil
) {     
    var roleid = HSKJ.getUserInfo('roleid');

    return function () {
        HSKJ.ready(function () {
            var userAdd = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                data: {
                    facedata: null,
                    facepath: null,
                    context: null,
                },

                renderHtml: function (data) {
                    var self = this;
                    HSKJ.renderTpl('.module-container', 'text!tpl/project/project-user-add.tpl', {
                        roleid: roleid,
                        pname: router.getParameter('pname'),
                        pid: router.getParameter('pid'),
                    }, function () {
                        self.formVerify();
                        layui.form.render('select');
                        
                        layui.laydate.render({ //渲染安全教育日期
                            elem: '#secureeducationdate'
                            , type: 'date'
                            , format: 'yyyy-MM-dd'
                        });

                        layui.laydate.render({ //渲染加入项目日期
                            elem: '#enterprojecttime'
                            , type: 'date'
                            , format: 'yyyy-MM-dd'
                            , value: new Date()
                        });

                        //获取劳务企业
                        HSKJ.getSystemparameter('enterprise', function(data){
                            void 0
                            var html = '';
                            $(data[0].list).each(function(k, v){
                                void 0
                                html += '<option value="'+ v.value +'">'+ v.title +'</option>'
                            })
                            $('#enterprise').html(html);
                            layui.form.render('select');
                        })

                        //获取工种
                        HSKJ.getSystemparameter('worktype', function(data){
                            void 0
                            var html = '';
                            $(data[0].list).each(function(k, v){
                                html += '<option value="'+ v.value +'">'+ v.title +'</option>'
                            })
                            $('#worktype').html(html);
                            layui.form.render('select');
                        })

                        //获取人员类型
                        HSKJ.getSystemparameter('employeetype', function(data){
                            void 0
                            var html = '';
                            $(data[0].list).each(function(k, v){
                                html += '<option value="'+ v.value +'">'+ v.title +'</option>'
                            })
                            $('#employeetype').html(html);
                            layui.form.render('select');
                        })

                        //获取班组
                        HSKJ.getSystemparameter('belongclass', function(data){
                            void 0
                            var html = '';
                            $(data[0].list).each(function(k, v){
                                html += '<option value="'+ v.value +'">'+ v.title +'</option>'
                            })
                            $('#belongclass').html(html);
                            layui.form.render('select');
                        })

                        //渲染名族
                        var nationData = '{"data":[{"id":"01","name":"汉族"},{"id":"02","name":"蒙古族"},{"id":"03","name":"回族"},{"id":"04","name":"藏族"},{"id":"05","name":"维吾尔族"},{"id":"06","name":"苗族"},{"id":"07","name":"彝族"},{"id":"08","name":"壮族"},{"id":"09","name":"布依族"},{"id":"10","name":"朝鲜族"},{"id":"11","name":"满族"},{"id":"12","name":"侗族"},{"id":"13","name":"瑶族"},{"id":"14","name":"白族"},{"id":"15","name":"土家族"},{"id":"16","name":"哈尼族"},{"id":"17","name":"哈萨克族"},{"id":"18","name":"傣族"},{"id":"19","name":"黎族"},{"id":"20","name":"傈僳族"},{"id":"21","name":"佤族"},{"id":"22","name":"畲族"},{"id":"23","name":"高山族"},{"id":"24","name":"拉祜族"},{"id":"25","name":"水族"},{"id":"26","name":"东乡族"},{"id":"27","name":"纳西族"},{"id":"28","name":"景颇族"},{"id":"29","name":"柯尔克孜族"},{"id":"30","name":"土族"},{"id":"31","name":"达斡尔族"},{"id":"32","name":"仫佬族"},{"id":"33","name":"羌族"},{"id":"34","name":"布朗族"},{"id":"35","name":"撒拉族"},{"id":"36","name":"毛难族"},{"id":"37","name":"仡佬族"},{"id":"38","name":"锡伯族"},{"id":"39","name":"阿昌族"},{"id":"40","name":"普米族"},{"id":"41","name":"塔吉克族"},{"id":"42","name":"怒族"},{"id":"43","name":"乌孜别克族"},{"id":"44","name":"俄罗斯族"},{"id":"45","name":"鄂温克族"},{"id":"46","name":"崩龙族"},{"id":"47","name":"保安族"},{"id":"48","name":"裕固族"},{"id":"49","name":"京族"},{"id":"50","name":"塔塔尔族"},{"id":"51","name":"独龙族"},{"id":"52","name":"鄂伦春族"},{"id":"53","name":"赫哲族"},{"id":"54","name":"门巴族"},{"id":"55","name":"珞巴族"},{"id":"56","name":"基诺族"}]}';
                        var nationHtml = '';
                        $(JSON.parse(nationData).data).each(function(k, v){
                            nationHtml += '<option value="'+ v.name +'">'+ v.name +'</option>'
                        })
                        $('#nation').html(nationHtml);
                        layui.form.render('select');
                        void 0

                        //加载省份
                        self.loadProvince();
                    })
                },

                formVerify: function(){
                    layui.form.verify({
                        idcard: function (value, item) { //value：表单的值、item：表单的DOM对象，macaddress 对应form 里lay-filter
                            if(!formUtil.IdentityCodeValid(value)){
                                return '身份证号码不正确';
                            }
                        }
                    });   
                },

                loadProvince: function () {
                    var self = this;
                    var proHtml = '';
                    for (var i = 0; i < areaData.length; i++) {
                        if (areaData[i].type == 1) {
                            if (areaData[i].code == 440000) {
                                proHtml += '<option value="' + areaData[i].code + '" selected >' + areaData[i].name + '</option>';
                            } else {
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

                loadCity: function (id, flag) {
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
                    if (flag == 1) {
                        void 0
                        if (id == 440000) {
                            self.loadArea(440300);
                        } else {
                            self.loadArea(cityArray[0].code);
                        }
                    }
                    layui.form.on('select(city)', function (data) {
                        $('select[name=area]').html('<option value="">请选择县/区</option>');
                        data.value && self.loadArea(data.value);
                    });
                },

                loadArea: function (id) {
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

                //添加人员接口请求
                doUserAddAjax: function(data){
                    var self = this;
                    void 0
                    var json = {
                        organizationid: HSKJ.getUserInfo('organizationid'),
                        facedata: '['+ self.data.facedata[0].toString() + ']',
                        facepath: self.data.facepath,
                        // enterprojecttime: '2018-02-01',
                        // inservicestate: 1,
                        district: $('select[name=area] option:selected').html(), 
                        city: $('select[name=city] option:selected').html(),
                        province: $('select[name=province] option:selected').html(),
                        currentproject: router.getParameter('pid')
                    }
                    HSKJ.POST({
                        url: 'system/project/employee/add',
                        data: Object.assign(data.field, json),
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                layui.layer.msg('添加成功', { icon: 1 }, function () {
                                    history.back();
                                })
                            } else {
                                layui.layer.msg(json.message)
                            }
                        }
                    })
                },

                //拍照
                takePhoto: function(){
                    var self = this;
                    var html = [
                        '<video id="video" autoplay style="width: 637px;height: 491px"></video>',
                        '<canvas id="canvas" width="637" height="491"></canvas>',
                        '<div class="hs-flex el-photo-bottom">',
                            '<p>提示：请保持正脸获取照片</p>',
                            '<i class="icon-photo" id="capture" title="拍照"></i>',
                        '</div>'
                    ];
                    layer.open({
                        type: 1,
                        title: '拍照',
                        btn: [],
                        shadeClose: true,
                        content: layui.laytpl(html.join('')).render(self.data || {}),
                        area: ['637px', '620px'],
                        skin: 'module-take-photo-dialog',
                        end: function(){//无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。
                            self.data.stream.getTracks()[0].stop(); //关闭摄像头
                        },
                        success: function (layero, index) {
                            var myConstraints = { audio: true, video: true }
                            var video = document.querySelector('#video')
                            var myConstraints = {
                                video: {
                                    facingMode: 'user' // 优先调用前置摄像头
                                }
                            }

                            navigator.mediaDevices.getUserMedia(myConstraints).then((stream) => {
                                self.data.stream = stream;
                                // createObjectURL是个非常有用的API，诸位可以多研究研究
                                video.src = window.URL.createObjectURL(stream)
                                video.play();
                            })
                        }
                    })
                },

                //拍照后执行上传图片接口
                doUploadFileBase64Ajax: function(data){
                    var self = this;
                    HSKJ.POST({
                        //url: 'meeting/fmapi/uploadFileBase64',
                        url: 'api/uploadFileBase64',
                        data: {
                            imagefile: data
                        },
                        beforeSend: function () {
                            HSKJ.loadingShow();
                        },
                        success: function (json) {
                            if (json && json.code == 0) {
                                self.data.stream.getTracks()[0].stop(); //关闭摄像头
                                $('.el-head-img img').attr('src', json.data.headfaceimage);
                                self.data.facedata = json.data.facedata;
                                self.data.facepath = json.data.faceimage;
                                //self.data.facepath = headfaceimage;
                                layui.layer.closeAll();
                                //facedata
                                //faceimage:"http://39.108.233.191:8084/school/api/download?path=/home/facerecognition/upload/face/201804/15154514dexmm0hi.png"
                                //headfaceimage:"http://39.108.233.191:8084/school/api/download?path=/home/facerecognition/upload/face/201804/15154514dexmm0hi_head.png"
                            } else {
                                layui.layer.msg(json.message);
                                self.data.context.clearRect(0,0,637,491);//重置画布
                            }
                        }
                    })
                },

                wactch: function () {
                    var self = this;
                    //添加人员的保存
                    layui.form.on('submit(element-submit)', function (data) {
                        self.doUserAddAjax(data);
                        return false;
                    });

                    $(document)
                    .off('click', '#doSearch')
                    .on('click', '#doSearch', function () {//保存-- 后退并save
                        self.reloadTable();
                    })
                    .off('click', '#capture')
                    .on('click', '#capture', function () {//拍照
                        var video = document.getElementById("video");
                        var canvas = document.getElementById("canvas");
                        var context = canvas.getContext("2d");
                        context.drawImage(video,0,0,637,491);
                        self.data.context = context;
                        var base64 = canvas.toDataURL();
                        self.doUploadFileBase64Ajax(base64);
                    })
                    .off('click', '#takePhoto')
                    .on('click', '#takePhoto', function () {//拍照
                        self.takePhoto();
                    })
                }
            }
            userAdd.init();
        })
    }

})