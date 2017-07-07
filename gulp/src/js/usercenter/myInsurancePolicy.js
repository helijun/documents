var center = {
    init: function(){
        center.tab();
        center.initData();
        center.registerHelper();
        center.bind();
    },
    options: {
        token:localStorage.getItem('token'),
        userId:null,
        height:window.innerHeight-458,
        status:localStorage.getItem('policyStatus')

    },
    tab:function(){
        var tab = new fz.Scroll('.ui-tab', {
            role: 'tab',
            autoplay: false,
            interval: 3000
        });

        tab.on('beforeScrollStart', function(from, to) {
//                console.log(from, to);
        });

        tab.on('scrollEnd', function(curPage) {
            var type=0;
            if(curPage==0){
                type=''
                localStorage.setItem('policyStatus','all');
            }else if(curPage==1){
                type=0
                localStorage.setItem('policyStatus',0);
            }else if(curPage==2){
                type=3
                localStorage.setItem('policyStatus',3);
            }
            else if(curPage==3){
                type=4
                localStorage.setItem('policyStatus',4);
            }
            center.getList(type,1000);
        });
    },
    registerHelper: function() {
        Handlebars.registerHelper('status', function (value, options) {
            value=JSON.parse(value)
            if (value == 0)
                return '待支付';
            else if (value == 1)
                return '已支付';
            else if (value == 2){
                return '已出单';
            }
            else if (value == 3){
                return '已生效';
            }
            else if (value == 4){
                return '已终止';
            }
            else if (value == 5){
                return '已拒保';
            }
            else if (value == 6){
                return '已取消';
            }
        });

        Handlebars.registerHelper('pic', function (value, options) {
            return PIC_PATH + value;
        });
        Handlebars.registerHelper('payClass', function (value, options) {
            if('0'==value||'3'==value || '4'==value || '5'==value || '6'==value){
                return '';
            }else{
                return 'dis_none';
            }
        });
        Handlebars.registerHelper('tellClass', function (value, options) {
            if('3'==value ){
                return '';
            }else{
                return 'dis_none';
            }
        });
        Handlebars.registerHelper('notTellClass', function (value, options) {
            if('0'==value){
                return '';
            }else{
                return 'dis_none';
            }
        });
        Handlebars.registerHelper('delClass', function (value, options) {
            if('4'== value || '5'== value || '6'== value){
                return '';
            }else{
                return 'dis_none';
            }
        });
        Handlebars.registerHelper('jq', function (value, options) {
            if (''==value||null==value)
                return 'dis_none';
            else
                return '';
        });
        Handlebars.registerHelper('sy', function (value, options) {
            if (''==value||null==value)
                return 'dis_none';
            else
                return '';
        });
    },
    initData: function(){
        var policyStatus = localStorage.getItem('policyStatus');

        if(policyStatus == 3){
            localStorage.setItem('policyStatus',3);
            $('.ui-tab-nav li:nth-of-type(3)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content li:nth-of-type(3)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content').css({"transform": "translate(-1280px, 0px)","-webkit-transform": "translate(-1280px, 0px)"} )
            center.getList(policyStatus,1000);
        }else if(policyStatus == 4){
            localStorage.setItem('policyStatus',4);
            $('.ui-tab-nav li:nth-of-type(4)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content li:nth-of-type(4)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content').css({"transform": "translate(-1920px, 0px)","-webkit-transform": "translate(-1920px, 0px)"} )
            center.getList(policyStatus,1000);
        }else if(policyStatus ==0){
            localStorage.setItem('policyStatus',0);
            $('.ui-tab-nav li:nth-of-type(2)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content li:nth-of-type(2)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content').css({"transform": "translate(-640px, 0px)","-webkit-transform": "translate(-640px, 0px)"} )
            center.getList(policyStatus,1000);
        }else {
            localStorage.setItem('policyStatus','all');
            $('.ui-tab-nav li:nth-of-type(1)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content li:nth-of-type(1)').addClass('current').siblings().removeClass('current')
            $('.ui-tab-content').css({"transform": "translate(0px, 0px)","-webkit-transform": "translate(0px, 0px)"} )
            center.getList('',1000);
        }
    },
    getList:function(type,pageNumber){
        var pn = pageNumber || 1, ps = 10;
        $.ajax({
            data: {token:center.options.token,userId:center.options.userId,type:type,pageNumber:pn,pageSize:ps},
            type : "get",
            url : WX_ROOT + "insurance/getOrderList",
            beforeSend : function(){
                common.alert({'stayTime':-1});
            },
            success : function(json) {
                if (json) {
                    try {
                        var data = JSON.parse(json);
                        var templateData = [],nowdate= 0,carLen=0;
                        if (data && data.code == 600) {
                            if (data.data.list.length > 0) {
                                var tabTemplate = Handlebars.compile($('#listDiv2').html());
                                for(var i=0;i<data.data.list.length;i++){
                                    var status={},statusArry=[];
                                    //if(data.data.list[i].orderType==1){
                                        status.id=data.data.list[i].id
                                        status.paulId=data.data.list[i].paulId
                                        status.pid=data.data.list[i].pid
                                        status.pname=data.data.list[i].pname
                                        status.STATUS=data.data.list[i].STATUS
                                        status.type=data.data.list[i].type
                                        status.imageUrl=data.data.list[i].imageUrl
                                        status.created=data.data.list[i].created
                                        status.feeTotal = data.data.list[i].feeTotal
                                        status.ordersId=data.data.list[i].ordersId
                                        status.orderType=data.data.list[i].orderType
                                        status.telephone=data.data.list[i].telephone
                                        status.flag = JSON.stringify(statusArry);

                                        status.productCount=data.data.list[i].pcount
                                        status.productPrice=data.data.list[i].pprice
                                        templateData.push(status)
                                        carLen++
                                    //}
                                }
                                if(carLen==0){
                                    common.tips({'msg':'没有您的车险订单'});
                                }
                                if( localStorage.getItem('policyStatus')==3){
                                    $('.workDiv').html(tabTemplate(templateData));
                                }else if( localStorage.getItem('policyStatus')==4){
                                    $('.finishDiv').html(tabTemplate(templateData));
                                }else if( localStorage.getItem('policyStatus')==0){
                                    $('.waitDiv').html(tabTemplate(templateData));
                                }else {
                                    $('.allDiv').html(tabTemplate(templateData));
                                }
                            }else{
                                common.tips({'msg':'没有数据'});
                            }
                        }else{
                            common.tips({'msg':data.msg})
                        }
                    } catch (e) {
                        //window.location.href= WX_ROOT + 'info/500'
                    }
                }else{
                    /*window.location.href= WX_ROOT + 'info/500'*/
                }
                common.alert({show:false});
            }
        });
    },
    delOrder:function(ordersid,token){
        var par={};
        par.oid=ordersid;
        par.token=token
        $.ajax({
            url : WX_CORS,//固定的
            data: {
                url:'rest/app/order/cancel',//真实的url
                params:JSON.stringify(par)
            },
            type : "POST",
            success: function(json){
                if(json.code==600) {
                    common.close($('.delSection'));
                    window.location.href=window.location.href
                } else {
                    common.error();
                }
            },
            timeout:3000
        });
    },
    delPolicy:function(id,token){
        var par={};
        par.oid=id;
        par.token=token
        $.ajax({
            url : WX_CORS,//固定的
            data: {
                url:'rest/app/order/delete',//真实的url
                params:JSON.stringify(par)
            },
            type : "POST",
            success: function(json){
                if(json.code==600) {
                    common.close($('.delSection'));
                    window.location.href=window.location.href
                } else {
                    common.error();
                }
            },
            timeout:3000
        });
    },
    bind: function(){
        //$('#tab1 .ui-tab-nav li').on('tap',function(){
        //    var index=$(this).index();
        //    console.log(index)
        //    var type=0;
        //    if(index==0){
        //        type=''
        //        localStorage.setItem('policyStatus','all');
        //    }else if(index==1){
        //        type=2
        //        localStorage.setItem('policyStatus',0);
        //    }else if(index==2){
        //        type=3
        //        localStorage.setItem('policyStatus',3);
        //    }
        //    else if(index==3){
        //        type=4
        //        localStorage.setItem('policyStatus',4);
        //    }
        //    center.getList(type,1000);
        //})

        $('.insuranceDiv').css('height',center.options.height);
        $('.workDiv ').off().on('tap','.orderInfoDiv',function(){
            localStorage.setItem('policyStatus','all');
            var id=$(this).parents('li').attr('data-id');
            var ordertype=$(this).parents('li').attr('data-ordertype');
            var phone=$(this).parents('li').attr('data-phone');
            sessionStorage.setItem('myInsurancePolicy_id', id);
            if(1==ordertype){
                window.location.href=WX_ROOT + "usercenter/insureDetail";
            }else{
                window.location.href=WX_ROOT + "usercenter/notCarInsureDetail?myInsurancePolicy_id="+id+'&phone='+phone;
            }
        })
        $('.finishDiv ').off().on('tap','.orderInfoDiv',function(){
            localStorage.setItem('policyStatus','all');
            var id=$(this).parents('li').attr('data-id');
            var ordertype=$(this).parents('li').attr('data-ordertype');
            var phone=$(this).parents('li').attr('data-phone');
            sessionStorage.setItem('myInsurancePolicy_id', id);
            if(1==ordertype){
                window.location.href=WX_ROOT + "usercenter/insureDetail";
            }else{
                window.location.href=WX_ROOT + "usercenter/notCarInsureDetail?myInsurancePolicy_id="+id+'&phone='+phone;
            }
        })
        $('.waitDiv ').off().on('tap','.orderInfoDiv',function(){
            localStorage.setItem('policyStatus','all');
            var id=$(this).parents('li').attr('data-id');
            var ordertype=$(this).parents('li').attr('data-ordertype');
            var phone=$(this).parents('li').attr('data-phone');
            sessionStorage.setItem('myInsurancePolicy_id', id);
            if(1==ordertype){
                window.location.href=WX_ROOT + "usercenter/insureDetail";
            }else{
                window.location.href=WX_ROOT + "usercenter/notCarInsureDetail?myInsurancePolicy_id="+id+'&phone='+phone;
            }
        })
        $('.allDiv ').off().on('tap','.orderInfoDiv',function(){
            localStorage.setItem('policyStatus','all');
            var id=$(this).parents('li').attr('data-id');
            var ordertype=$(this).parents('li').attr('data-ordertype');
            var phone=$(this).parents('li').attr('data-phone');
            sessionStorage.setItem('myInsurancePolicy_id', id);
            if(1==ordertype){
                window.location.href=WX_ROOT + "usercenter/insureDetail";
            }else{
                window.location.href=WX_ROOT + "usercenter/notCarInsureDetail?myInsurancePolicy_id="+id+'&phone='+phone;
            }
        })
        $('body').on('tap','.rightBtn',function(){
            var ordersid=$(this).parents('li').attr('data-ordersid');
            var proId=$(this).parents('li').attr('data-proid');
            var productPrice=$(this).parents('li').attr('data-productPrice');
            var productCount=$(this).parents('li').attr('data-productCount');
            var productName=$(this).parents('li').attr('data-productName');
            if(proId==4||proId==5||proId==6){
                //alert(WX_ROOT + 'pay/tBbPay?ordersId='+ordersid+'&payType='+6)
                window.location.href=WX_ROOT + 'pay/tBbpayInfo?productPrice='+ productPrice +'&productCount='+ productCount +'&productId='+ ordersid +'&productName='+productName+'&createPay='+0;
            }else{
                window.location.href=APP_ROOT + 'pay/kqPay?ordersId='+ordersid;
            }
        })
        $('body').on('tap','.cancelPayBtn',function(){
            common.showId($('.delSection'))
            $('.delBtnDiv p:nth-of-type(2)').addClass('ensureCancelBtn').removeClass('ensureDelBtn')
            $('.delSection').attr('data-id',$(this).parents('li').attr('data-id'));

            $('.cancelDelBtn').on('tap',function(){
                common.close($('.delSection'))
            })
            $('.ensureCancelBtn').on('tap',function(){
                var ordersid=$(this).parents('.delSection').attr('data-id');
                center.delOrder(ordersid,center.options.token)
            })
        })
        $('body').on('tap','.deletePolicyBtn',function(){
            $('.bgDiv p.titleP').text('确定删除此订单吗');
            $('.delBtnDiv p:nth-of-type(2)').addClass('ensureDelBtn').removeClass('ensureCancelBtn')
            common.showId($('.delSection'))
            $('.delSection').attr('data-id',$(this).parents('li').attr('data-id'));

            $('.cancelDelBtn').on('tap',function(){
                common.close($('.delSection'))
            })
            $('.ensureDelBtn').on('tap',function(){
                var id=$(this).parents('.delSection').attr('data-id');
                center.delPolicy(id,center.options.token)
            })
        })
    }
}

/** 需要用userId的页面必须这样处理 **/
$(document).ready(function() {
    var userInfo = localStorage.getItem('userInfo'),userId;
    if (userInfo) {
        try {
            var userInfoJson = JSON.parse(userInfo);
            if (userInfoJson && userInfoJson.id){
                center.options.userId = userInfoJson.id;
                center.init();//初始化页面
            }else{
                window.location.href= WX_ROOT + 'info/500'
            }
        } catch (e) {
            window.location.href= WX_ROOT + 'info/500'
        }
    }else{
        window.location.href= WX_ROOT + 'base/login'
    }
});
