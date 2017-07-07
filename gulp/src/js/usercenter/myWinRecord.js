 var winRecord = {
        init: function(){
            winRecord.bind();
            winRecord.registerHelper();
            winRecord.getRecord(localStorage.getItem('token'),'1','20');
            winRecord.getTotalNum(localStorage.getItem('token'))
        },
        options: {

        },
        registerHelper: function() {
            Handlebars.registerHelper('status', function (value, options) {
                if (value == 0)
                    return '待发放';
                else if (value == 1)
                    return '已发放';
            });
            Handlebars.registerHelper('time', function (value, options) {
//                new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)}
                return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' ');
            });
        },
        getRecord:function(token,pagenNum,pageSize){
            $.ajax({
                data: {token:token,pageNumber:pagenNum,pageSize:pageSize},
                type : "get",
                url : WX_ROOT + "usercenter/queryUserCjResult",
                beforeSend : function(){

                },
                success : function(json) {
                    if(600==JSON.parse(json).msgCode){
                        console.log(JSON.parse(json))
                        var length=JSON.parse(json).detail.list.length
                        var tabTemplate = Handlebars.compile($('#listDiv').html());
                        $('.allList').html(tabTemplate(JSON.parse(json).detail.list));

                        $('.win').text(JSON.parse(json).detail.total)//中奖人数
                    }else if(610 == JSON.parse(json).msgCode){
                        common.tips({
                            msg: '身份验证过期，请重新登录！',
                            updateText: true,
                            stayTime: 2000,
                            callback: function(){
                                window.location.href= WX_ROOT + 'base/login'
                            }
                        });
                    }else{
                        common.tips({'msg':data.msg});
                    }

                }
            });
        },
     getTotalNum:function(token){
         $.ajax({
             data: {token:token},
             type : "get",
             url : WX_ROOT + "usercenter/queryCjResultCountByUserId",
             beforeSend : function(){
                 common.alert({'stayTime':-1});
             },
             success : function(json) {
                 if (600 == JSON.parse(json).msgCode) {
                     console.log(JSON.parse(json))
                     $('.had').text(JSON.parse(json).detail)
                 } else if (610 == JSON.parse(json).msgCode) {
                     common.tips({
                         msg: '身份验证过期，请重新登录！',
                         updateText: true,
                         stayTime: 2000,
                         callback: function () {
                             window.location.href = WX_ROOT + 'base/login'
                         }
                     });
                 } else {
                     common.tips({'msg': data.msg});
                 }
                 common.alert({show:false});
             }
         });
     },
        bind: function(){
            $('.btnDiv').on('tap',function(){
                window.location.href = WX_ROOT + 'insurance/insureResult'
            })
            $('.lotteryBtn').on('tap',function(){
                luckyLottery.lottery();
            })
            $('.iKnowBtn').on('tap',function(){
                common.close($('.lotteryResultDiv'))
            })
        }
    }
 
$(document).ready(function() { 
	winRecord.init();
});
    