var exchanglist={
    init:function(){
        var self=exchanglist;
        self.bind();
        exchanglist.getList(exchanglist.option.openid)
    },
    option:{
    	nickName:null,
        openid:null,
        fundId:'',
        mobile:''
    },
    getList:function(openid){
        var par = {};
        	par.openid = openid;
        
        common.alert({msg:'加载中..'});
        $.ajax({
            url : WX_CORS,//固定的
            data: {
                url:'rest/weixin/love/gift',//真实的url
                params:JSON.stringify(par)
            },
            type : "GET",
            success: function(json){

                if(json&&json.code!=-1) {

                    if (json.code == 0) {
                        var html = '', total = 0;


                        if (json.data.length > 0) {
                            for (var i = 0; i < json.data.length; i++) {
                                /*total = json.data[i].friendCheck + json.data[i].ownerCheck;*/
                                /*累计打卡<span class="time">' + total + '</span>次（*/
                                html += ' <li class="boxshadow-bottom singleLi" data-id=' + json.data[i].id + '  >';
                                html += '  <div class="topDiv">';
                                html += ' <p class="border-bottom insurenceDesp"><span class="time">'+ json.data[i].date +'</span>，自己打卡<span class="time">' + json.data[i].ownerCheck + '</span>次，好友帮赞<span class="time">' + json.data[i].friendCheck + '</span>次,获得一份<span class="label">“旅游保险”</span></p>';
                                html += '</div> <div class="bottomDiv">';
                                html += '<ul class="ui-row">';
                                html += ' <li class="ui-col ui-col-40">&nbsp;</li>';
                                if (json.data[i].status == 1) {
                                    html += '<li class="ui-col ui-col-28">';
                                    html += '<p class="exchangBtn selfBtn">自己领</p>';
                                    html += '</li>';
                                    html += '<li class="ui-col ui-col-28">';
                                    html += '<p class="exchangBtn otherBtn">送人</p>';
                                    html += '</li>';
                                } else if (json.data[i].status == 2) {
                                    html += '  <li class="ui-col ui-col-28">'
                                    html += '<p class="hadgetbtn">已自领</p>';
                                    html += '</li>';
                                    html += ' <li class="ui-col ui-col-28">';
                                    html += '<p class="seeTicketBtn" data-num=' + json.data[i].userTicket.ticketNumber + ' data-mobile=' + json.data[i].userTicket.mobile + '>查看兑换券</p>';
                                    html += '</li>';
                                } else if (json.data[i].status == 3) {
                                    html += '<li class="ui-col ui-col-60">'
                                    html += '  <p class="hadgetbtn">已送给' + json.data[i].userTicket.mobile + '</p>'
                                    html += '</li>'
                                } else if (json.data[i].status == 4) {
                                    html += '<li class="ui-col ui-col-60">'
                                    html += '  <p class="hadgetbtn">已兑换</p>'
                                    html += '</li>'
                                }
                                html += '</ul></div></li>';
                            }

                        } else {
                            html += '还没有兑换券哦'
                        }
                        $('.mainListDiv').html(html)
                    } else if(json.code == 8010){
                        common.tips({msg:json.msg})
                    }
                } else {
                    common.error();
                }
            },
            timeout:3000,
            complete:function(){
            	common.alert('hide');
            }
        });
    },
    getGift:function(openid,fundId,flag,mobile,_this){
        var par = {};
        par.openid = openid;
        par.fundId = fundId;
        par.flag = flag;
        par.mobile = mobile;
        par.userName = exchanglist.option.nickName;
        $.ajax({
            url : WX_CORS,//固定的
            data: {
                url:'rest/weixin/love/get-gift',//真实的url
                params:JSON.stringify(par)
            },
            type : "POST",
            success: function(json){
                if(json&&json.code!=-1) {
                    if (json.code==0) {
                        var html='';
                        $('.otherGetTicket').addClass('dis_none');
                        if(flag==2){
                            $('.selfBtn').addClass('haveCheck');
                            $('.otherBtn').unbind();
                            //html += '  <li class="ui-col ui-col-28">'
                            //html += '<p class="hadgetbtn">已自领</p>';
                            //html += '</li>';
                            //html += ' <li class="ui-col ui-col-28">';
                            //html += '<p class="seeTicketBtn">查看兑换券</p>';
                            //html += '</li>';
                        }else{
                            $('.selfBtn').addClass('haveCheck')
                            $('.otherBtn').unbind()
                            //html += '<li class="ui-col ui-col-60">'
                            //html += '  <p class="hadgetbtn">已送给' + json.data[i].receiverMobile + '</p>'
                            //html += '</li>'
                        }
                        window.location.href=WX_ROOT+'loveLetter/exchangeList'
                    } else if(json.code == 8010){
                        common.tips({msg:json.msg})
                    }
                    else if(json.code == 8023){
                        common.tips({msg:json.msg})
                    }
                } else {
                    common.error();
                }
            },
            timeout:3000
        });
    },
    bind:function(){
        $('.cancelLookBtn').on('tap',function(){
            $(this).parents('section').addClass('dis_none')
           //common.close( $(this).parents('section'))
        })
        $('.cancleBtn').on('tap',function(){
            //common.close( $(this).parents('section'))
            $(this).parents('section').addClass('dis_none')
        })
        $('.closeBtn').on('tap',function(){
            //common.close( $(this).parents('section'))
            $(this).parents('section').addClass('dis_none')
        })
        $('.mainListDiv').on('tap','.selfBtn',function(){
            //common.showId( $('.selfGetTicket'))
            //$('.selfGetTicket').removeClass('dis_none')
            exchanglist.option.fundId=$(this).parents('.singleLi').attr('data-id');
            exchanglist.option.flag=2
            $('.otherGetTicket').removeClass('dis_none');
            $('.contentP').removeClass('dis_none');
            $('.otherGetTicket .titleP').text('免费领取"阳光保险"')
            $('.otherGetTicket .otherCodeInput').attr('placeholder','输入手机号')
        })
        $('.mainListDiv').on('tap','.otherBtn',function(){
            //$('.selfGetTicket').removeClass('dis_none')
            //common.showId( $('.otherGetTicket'))
            exchanglist.option.flag=3
            exchanglist.option.fundId=$(this).parents('.singleLi').attr('data-id');
            $('.otherGetTicket').removeClass('dis_none')
            $('.contentP').addClass('dis_none');
            $('.otherGetTicket .titleP').text('赠送"阳光保险"')
            $('.otherGetTicket .otherCodeInput').attr('placeholder','输入您想赠送的亲友手机号码')
        })
        $('.mainListDiv').on('tap','.seeTicketBtn',function(){
            //common.showId( $('.lookTicketNum'))
            $('.lookTicketNum').removeClass('dis_none')
            $('.ticktNum').text($(this).attr('data-num'))
            $('.phoneNum').text($(this).attr('data-mobile'))
        })
        $('.getTicketBtn').on('tap',function(){
            var mobile =$('.otherCodeInput').val().trim();
            var phone= /^1\d{10}$/;
            if(mobile&&phone.test(mobile)){
                exchanglist.getGift(exchanglist.option.openid,exchanglist.option.fundId,exchanglist.option.flag,mobile,$(this))
            }else{
                common.tips({msg:'请输入正确手机号'})
            }

        })
    }
}
$(document).ready(function() {
	var data = JSON.parse(localStorage.getItem('wxUserInfo'));
	
	exchanglist.option.openid = data.openid;
	exchanglist.option.nickName = data.nickname;
	
    exchanglist.init();
})