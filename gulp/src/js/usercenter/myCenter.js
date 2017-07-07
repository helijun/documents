var center = {
        init: function(){
        	center.bind();
        	/*center.queryIsWeixinAuthorize();*/
        	/*common.saveWeixinInfoToUser(window.location.href);*/
        },
        options: {
            height:window.innerHeight-458
        },
        enterWxAuthor: function(){
    		var wxUserInfo = localStorage.getItem("wxUserInfo");
    		if (!wxUserInfo) {
    			var code = common.getUrlParameter('code');
    			if (code) {
    				common.getWxUserInfo();
    				center.init();
    			}else{
    				//没有微信用户信息，没有授权-->> 需要授权，跳转授权页面
    				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
    			}
    		}else{
    			center.init();
    		}
    	},
        //获取剩余次抽奖次数
        getMyLotteryCount:function(token){
        	$.ajax({
    			data: {token:token},
    			type : "POST",
    			url : WX_ROOT + "usercenter/queryUserLeftLotteryCount",
    			success : function(json) {
    				try {
    					var data = JSON.parse(json);
    					if (data.msgCode == 600) {
							if(0==data.detail){
								$('#lastCountSpan').html('您的抽奖机会已用完');
							}else{
								$('#lastCountSpan').html('剩余<span class="lastCount">'+data.detail+'</span>次抽奖');
							}
							$('#lastCountSpan').addClass('lastCountSpan');
							

						}else if(data.msgCode == 610){
							common.tips({
								msg: '身份验证过期，请重新登录！',
								updateText: true,
								stayTime: 2000,
								callback: function(){
									window.location.href= WX_ROOT + 'base/login'
								}
							});
						}else{
							/*common.tips({'msg':'系统繁忙'});*/
						}
					} catch (e) {
						/*common.tips({'msg':'系统繁忙'});*/
					}
    			}
    		});
        },
        /* loginOrRegist:function(){
        	//判断是否注册  0，没有注册也没有登录，1已注册，2没有注册
        	var falg = 0;
        	
        	if (localStorage.getItem("registFalg") == 1) {
				falg = 1;//已注册
			}else{
				$.ajax({
	        		async: false,
	    			data: {openid:localStorage.getItem("openid")},
	     			type : "GET",
	    			url : WX_ROOT + "queryIsUserWeixinRegister",
	    			success : function(json) {
	    				var data = JSON.parse(json);
    					if (data.msgCode == 600) {
    						if (data.detail || data.detail == 'true') {
    							localStorage.setItem("registFalg",1);
    							falg = 1;
							}else{
								falg = 2;
							}
						}
	    			}
	    		});
			}
        	
        	return falg;
            //判断是否登录
        }, */
        
        /**
         * 判断是否在系统保存了授权后微信的信息
         */
        queryIsWeixinAuthorize:function(par){

        	var wxUserInfo = localStorage.getItem('wxUserInfo'),
        		isWeixinAuthorize = false;
        	
        	if (!wxUserInfo) return;
        	
        	var wxData = JSON.parse(wxUserInfo);
        	try {
            	$.ajax({
        			async: false,
        			data: {openid:wxData.openid},
        			type : "GET",
        			url : WX_ROOT + "wechat/queryIsWeixinAuthorize",
        			success : function(json) {
        				if (json){
        					var jsonData = JSON.parse(json);
        					if ('true' == jsonData.detail || true == jsonData.detail) {
        						isWeixinAuthorize = true;
    						}
        				}else{
        					/*window.location.href= WX_ROOT + 'info/500'*/
        				}
        			}
        		});
    		} catch (e) {
    			/*window.location.href= WX_ROOT + 'info/500'*/
    		}
        	
    		if (!isWeixinAuthorize) {
    			var userInfo = localStorage.getItem('userInfo'),
    				par = {};
    			
    			if (userInfo) {
    				var userData = JSON.parse(userInfo);
    				
    				par.mobile = userData.mobile;
    				par.openid = wxData.openid;
    				par.sex = wxData.sex;
    				par.city = wxData.city;
    				par.country = wxData.country;
    				par.headimgurl = wxData.headimgurl;
    				par.nickname = wxData.nickname;
    				par.province = wxData.province;
    				par.language = wxData.language;
    				par.privilege = wxData.privilege;
    				
    				$.ajax({
    	    			data: {jsonData:JSON.stringify(par)},
    	    			type : "POST",
    	    			url : WX_ROOT + "wechat/saveUserWeixin",
    	    			success : function(json) {
    	    				if (json){
    	    					var jsonData = JSON.parse(json.data);
    	    					//成功
    	    					if (600 == jsonData.msgCode) {
    	    						common.tips({
    	    							msg:'刷新微信授权信息成功'/*,
    	    		                    callback:function(){
    	    		                        window.location.href= WX_ROOT + 'login'
    	    		                    }*/
    	    		                })
    							}
    	    				}
    	    			}
    	    		});
    			}/*else{
    				common.tips({
                        msg:'身份验证过期',
                        callback:function(){
                            window.location.href= WX_ROOT + 'login'
                        }
                    })
    			}*/
    			
    		}
    		
        },
        bind: function(){
        	
        	$('.insuranceDiv').css('height',center.options.height);
            
        	var token = localStorage.getItem('token');
        	if (token) center.getMyLotteryCount(token);//登录后获取剩余抽奖次数
        	
        	$('.editBtnDiv,.headerImgDiv>img').on('tap',function(e){
                if (token){
                	window.location.href = WX_ROOT + 'usercenter/centerInfo';
                }else{
                	common.tips({
                		msg:'请先登录哦！',
                		callback:function(){
                			window.location.href = WX_ROOT + 'base/login';
                		}
                	});
                }
        	});
        	
            $('.perfectData').on('tap',function(){
                    window.location.href = WX_ROOT + 'usercenter/perfectPersonalData';
            });

			$('.mySocreDiv').on('tap',function(e){
				var token = localStorage.getItem('token');
				if (token){
					if(data.detail != 0)
						window.location.href = WX_ROOT + 'usercenter/luckyLottery';
					else
						common.tips({'msg':'您的抽奖次数已用完！'});
				}
				else{
					common.tips({
                		msg:'请先登录哦！',
                		callback:function(){
                			window.location.href = WX_ROOT + 'base/login';
                		}
                	});
				}
			});
            $('.titleDiv').on('tap',function(e){
				localStorage.setItem('policyStatus','all')
                if (token){
                	window.location.href = WX_ROOT + 'usercenter/myInsurancePolicy'
                }else{
                	common.tips({
                		msg:'请先登录哦！',
                		callback:function(){
                			window.location.href = WX_ROOT + 'base/login';
                		}
                	});
                }
            });
            $('.waitDiv').on('tap',function(){
				localStorage.setItem('policyStatus',0)
				if (token){
                	window.location.href = WX_ROOT + 'usercenter/myInsurancePolicy'
                }else{
                	common.tips({
                		msg:'请先登录哦！',
                		callback:function(){
                			window.location.href = WX_ROOT + 'base/login';
                		}
                	});
                }
            })
            $('.workDiv').on('tap',function(){
				localStorage.setItem('policyStatus',3)
				if (token){
                	window.location.href = WX_ROOT + 'usercenter/myInsurancePolicy'
                }else{
                	common.tips({
                		msg:'请先登录哦！',
                		callback:function(){
                			window.location.href = WX_ROOT + 'base/login';
                		}
                	});
                }
                
            })
            $('.finishDiv').on('tap',function(){
				localStorage.setItem('policyStatus',4)
				if (token){
                	window.location.href = WX_ROOT + 'usercenter/myInsurancePolicy'
                }else{
                	common.tips({
                		msg:'请先登录哦！',
                		callback:function(){
                			window.location.href = WX_ROOT + 'base/login';
                		}
                	});
                }
            })
        	
            //头像，取微信头像
        	/*try {*/
				var data = JSON.parse(localStorage.getItem('wxUserInfo'));
            	data && $('.headerImgDiv img').attr('src',data.headimgurl);
			/*} catch (e) {
				common.tips({'msg':'请用微信浏览器打开！'});
			}*/

            //手机号码
            var userInfo = localStorage.getItem('userInfo'),userTel = $('.user-tel');
            if (userInfo) {
            	try {
            		var data = JSON.parse(userInfo);
                    userTel.html(data.mobile);
				} catch (e) {
					userTel.html('<a href="'+ WX_ROOT +'base/login" style="color: #f1eff0;">登录/注册</a>');
				}
            }else{
            	userTel.html('<a href="'+ WX_ROOT +'base/login" style="color: #f1eff0;">登录/注册</a>');
            }
            
        }
    }
   
$(document).ready(function() { 
	var CLEAR_FLAG = localStorage.getItem(CLEAR_FLAG_KEY),//全新的清空策略
		mobile = localStorage.getItem('mobile'),
		userInfo = localStorage.getItem('userInfo'),
		dataTime = new Date(ENV_DATE).getTime();
	if (userInfo && !CLEAR_FLAG) {
		localStorage.clear();
	    sessionStorage.clear();
	    
	    if(mobile) localStorage.setItem('mobile', mobile);//保留手机号
	    localStorage.setItem(CLEAR_FLAG_KEY, dataTime);
	    localStorage.setItem('userInfo', 'testUser');//暂定
	    
	    /*common.tips({
	        msg:'亲爱的天使客户，本次车险活动即将于7.18正式开始，此前的内测信息已清空，烦请重新注册！',
	        stayTime:4000,
	        callback:function(){
	            window.location.href= WX_ROOT + 'login'
	        }
	    })*/
	    center.init();
	}else{
		localStorage.setItem(CLEAR_FLAG_KEY, dataTime);
		center.init();
	}
	//common.appendNav()
	////$('.navlist').addClass('dis_none')
    //
	//$('.ic-mine').css('background-position','-375px 0')
	//$('.cartA').addClass('currentNav')
	//$('.cartA').attr('href','')
});