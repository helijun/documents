var insureDetail = {
    init: function(oid){
        insureDetail.bind(oid);
        insureDetail.registerHelper();
        insureDetail.getInfo(oid)
    },
    options: {

    },
    registerHelper: function() {
        Handlebars.registerHelper('status', function (value, options) {
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
        Handlebars.registerHelper('isTransfer', function (value, options) {
            if (value == 1)
                return '是';
            else if (value == 0)
                return '否';
        });
        Handlebars.registerHelper('class', function (value, options) {
            if (!value || 'null'==value)
                return 'dis_none';
            else
                return '';
        });
        Handlebars.registerHelper('telclass', function (value, options) {
            if (value == 1)
                return '';
            else if (value == 0)
                return 'dis_none';
            else if (value == -1)
                return 'dis_none';
        });
        Handlebars.registerHelper('money', function (value, options) {
            if (value > 0)
                return '';
            else
                return 'dis_none';
        });
        Handlebars.registerHelper('payEndTime', function (value, options) {
            if (value == 0)
                return '';
            else
                return 'dis_none';
        });
        Handlebars.registerHelper('causeP', function (value, options) {
            if (value == 5)
                return '';
            else
                return 'dis_none';
        });
        Handlebars.registerHelper('endTime', function (value, options) {

            var day=Math.floor((value-new Date())/1000/60/60/24);
            var hour=Math.floor((value-new Date())/1000/60/60%24);
            if(day<=0){
                return hour+'小时';
            }else{
                return day+'天'+hour+'小时';
            }
        });
        Handlebars.registerHelper('teltoCallclass', function (value, options) {
            if (value== 0)
                return '';
            else
                return 'dis_none';
        });
        Handlebars.registerHelper('isUsedCoupon', function (value, options) {
            if (value== 1)
                return '';
            else
                return 'dis_none';
        });
        Handlebars.registerHelper('deleteclass', function (value, options) {
            if (value== 4 || value== 5 ||value== 6 )
                return '';
            else
                return 'dis_none';
        });
    },
    getInfo:function(oid){
        var jsonList={"jqInsurance":"交强险","travelTax":"车船税","clssInsurance":"车辆损失险","dszzrInsurance":"第三者责任险","qcdqInsurance":"全车盗抢险",
            "blddpsInsurance":"玻璃单独破碎险","zrssInsurance":"自燃损失险","ryzrSjInsurance":"车上人员责任险-司机",
            "ryzrCkInsurance":"车上人员责任险-乘客", "csghInsurance":"车身划痕险","ssssInsurance":"涉水损失险","cstyInsurance":"车损无法找到第三方特约险"
        };

        var mpjson={
            "mptySzInsurance":"三责","mptyCsInsurance":"车损",
            "mptySjInsurance":"司机","mptyZrInsurance":"自燃","mptyHhInsurance":"划痕",
            "mptyCkInsurance":"乘客","mptyDqInsurance":"盗抢"
        }

        $.ajax({
            data: {oid:oid},
            type : "GET",
            url : WX_ROOT + "insurance/getOrderInfo",
            beforeSend : function(){
                common.alert({'stayTime':-1});
            },
            success : function(json) {

                var data = JSON.parse(json);
                console.log(data)
                if(data.msgCode==600){
                    var templateData = [],mpHtml = '';
                    for(var i in data.detail.consultPrice){
                        if ('-1' != data.detail.consultPrice[i] && jsonList[i]) {
                            var indexData = {};
                            indexData.name=jsonList[i];
                            indexData.money=data.detail.consultPrice[i + "Money"];
                            if('0' !=data.detail.consultPrice[i + "Money"]){
                                templateData.push(indexData);
                            }
                        }

                        if ('0' != data.detail.consultPrice[i] && '-1' != data.detail.consultPrice[i] && mpjson[i]) {
                            mpHtml += mpjson[i] + '、';
                        }
                    }
                    console.log(templateData);
                    var jqxHtml = '',syHtml='';
                    $(templateData).each(function(k,v){
                        if('交强险'== v.name || '车船税' == v.name){
                            jqxHtml += '<p>-'+v.name + v.money+'元</p>'
                        }else{
                            syHtml+='<p>-'+v.name + v.money+'元</p>'
                        }
                    })

                    var tabTemplate = Handlebars.compile($('#infoDiv').html());
                    $('.bigContentDiv').html(tabTemplate(data.detail));

                    $('.jqFromPaul').html('交强险保障期间：'+ data.detail.consultPrice.jqFromPaul +' 至 '+ data.detail.consultPrice.endJqFromPaul);
                    $('.syFromPaul').html('商业险保障期间：'+ data.detail.consultPrice.syFromPaul +' 至 '+ data.detail.consultPrice.endSyFromPaul);

                    $('.jqxInsuranceP').html(jqxHtml);
                    $('.syInsuranceP').html(syHtml);
                    if(0!=data.detail.consultPrice.deductibleMoney){
                        $('.syInsuranceP').append('-不计免赔(' + mpHtml.substr(0,mpHtml.length - 1) + ')' + data.detail.consultPrice.deductibleMoney + '元')

                    }
                }
                common.alert({show:false});
            }
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
                    //window.location.href=window.location.href
                } else {
                    common.error();
                }
            },
            timeout:3000
        });
    },
    bind: function(oid){
        $('body').on('tap','.ideleteBtn',function(){
            $('.bgDiv p.titleP').text('确定删除此订单吗');
            $('.delBtnDiv p:nth-of-type(2)').addClass('ensureDelBtn').removeClass('ensureCancelBtn')
            common.showId($('.delSection'))

            $('.cancelDelBtn').on('tap',function(){
                common.close($('.delSection'))
            })
            $('.ensureDelBtn').on('tap',function(){
                var id=oid;
                insureDetail.delPolicy(id,localStorage.getItem('token'))
            })
        })
    }
}

$(document).ready(function() {
    var oid ='';
    if(common.getUrlParameter('myInsurancePolicy_id')){
        oid= common.getUrlParameter('myInsurancePolicy_id')
    }else {
        oid= sessionStorage.getItem('myInsurancePolicy_id');
    }
    if (oid)
        insureDetail.init(oid);
    else{
        common.tips({msg:'哎哟，出异常了！'})
    }

});