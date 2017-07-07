var luckyLottery = {
    init: function(){
        luckyLottery.registerHelper();
        //luckyLottery.initMemberEventLotteryNum();
        luckyLottery.getCjMemberResultList();
        luckyLottery.imgChange();
        luckyLottery.runNews();
        common.saveWeixinInfoToUser(window.location.href);
        luckyLottery.author();
        luckyLottery.bind();
    },
    options: {
    	signature:null,
        timestamp:null,
        nonceStr:null,
        appid:null,
        canLottery:true
    },
    enterWxAuthor: function(){
		var wxUserInfo = localStorage.getItem("wxUserInfo");
		if (!wxUserInfo) {
			var code = common.getUrlParameter('code');
			if (code) {
				common.getWxUserInfo(code);
				luckyLottery.init();
			}else{
				//没有微信用户信息，没有授权-->> 需要授权，跳转授权页面
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
			}
		}else{
			luckyLottery.init();
		}
	},
    //公告栏滚动
    runNews: function () {
    var $li = $(".ad ul li"), liNum = $li.length, k = 0;
        function run() {
            if (k == 0) {
                $li.eq(k).show();
                k++
            } else if (k == liNum) {
                $li.eq(0).show();
                k = 1;
            } else {
                $li.eq(k).show();
                $li.eq(k - 1).hide();
                k++
            }
        }
        run();
        setInterval(run, 4000)
    },

    imgChange:function(){
        setInterval(function(){
            var src='http://www.szqhflkj.cn/weixin/static/img/flag2.png'
            var key=$('.flag img').attr('src')
            if(key==src){
                $('.flag img').attr('src', WX_STATIC + 'img/flag1.png')
            }else{
                $('.flag img').attr('src', WX_STATIC + 'img/flag2.png')
            }
        },300)
    },
    registerHelper: function() {
        Handlebars.registerHelper('time', function (value, options) {
            return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' ');
        });
        Handlebars.registerHelper('nickname', function (value, options) {
            if(''==value||null==value){
                return '--'
            }else{
                return value;
            }
        });
        Handlebars.registerHelper('compare', function(left, operator, right, options) {
            if (arguments.length < 3) {
                throw new Error('Handlerbars Helper "compare" needs 2 parameters');
            }
            var operators = {
                '==':     function(l, r) {return l == r; },
                '===':    function(l, r) {return l === r; },
                '!=':     function(l, r) {return l != r; },
                '!==':    function(l, r) {return l !== r; },
                '<':      function(l, r) {return l < r; },
                '>':      function(l, r) {return l > r; },
                '<=':     function(l, r) {return l <= r; },
                '>=':     function(l, r) {return l >= r; },
                'typeof': function(l, r) {return typeof l == r; }
            };

            if (!operators[operator]) {
                throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
            }

            var result = operators[operator](left, right);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });

        Handlebars.registerHelper('headImg', function (value, options) {

            if(''==value||null==value){
                return 'http://www.szqhflkj.cn/weixin/static/img/logo.png'
            }else{
                return value;
            }
        });
        
        Handlebars.registerHelper('date', function (value, options) {
            return value.substr(5,11)
        });
    },
    lottery:function (token) {
        if(!luckyLottery.options.canLottery) {
            return;
        }
        luckyLottery.options.canLottery=false
        
        common.tips({
            msg: '活动已结束！',
            stayTime: 4000,
        });
        /*$.ajax( {
            type : 'POST',
            url : WX_ROOT + 'usercenter/doLottery',
            data:{token:token},
            beforeSend : function(){
                common.tips({'msg':'请稍后..',stayTime:-1});
                //$("#inner").rotate( { // inner内部指针转动，outer外部转盘转动
                //    duration : 3000, // 转动时间
                //    angle : 0, // 开始角度
                //    animateTo : 1350 + 100, // 转动角度
                //    easing : $.easing.easeOutSine // 动画扩展
                //});
            },
            success : function(json) {
                //点击抽奖之后返回数据之前不能再点击
                    luckyLottery.options.canLottery=true;
                if (json) {
                    var data = JSON.parse(json.data);
                    if (600 == data.code) {
                        common.tips('hide');

                        var angle = parseInt(data.detail.angle); // 角度
                        var msg = data.detail.msg; // 奖品 提示信息

                        $("#inner").rotate( { // inner内部指针转动，outer外部转盘转动
                            duration : 3000, // 转动时间
                            angle : 0, // 开始角度
                            animateTo : 1800 + angle, // 转动角度
                            easing : $.easing.easeOutSine, // 动画扩展
                            callback : function() {
                                // 初始化页面获取用户抽奖次数
                                luckyLottery.initMemberEventLotteryNum();
                                // 查询最近获奖记录
                                luckyLottery.getCjMemberResultList();
                                //提示信息
                                if(data.detail.isWin){
                                    common.showId($(".lotteryResultDiv"))
                                    $('.failContent').addClass('dis_none')
                                    $('.contentDiv').removeClass('dis_none')
                                    $(".lotteryResult").text( msg);
                                }else{
                                    common.showId($(".lotteryResultDiv"))
                                    $('.contentDiv').addClass('dis_none')
                                    $('.failContent').removeClass('dis_none')
                                    $(".lotteryResult").text( msg);
                                    $(".leftNum").text( data.detail.leftNum);
                                }
                            }
                        });
                    }else if(610 == data.code){
                    	common.tips({
                    		msg: '身份验证过期，请重新登录！',
                    		updateText: true,
                    		stayTime: 2000,
                    		callback: function(){
                    			window.location.href= WX_ROOT + 'base/login'
                    		}
                    	});
                    }else if(603 == data.code){
                        common.tips({
                            msg: '抽奖已结束！',
                            stayTime: 2000,
                        });
                    }else if(619 == data.code){
                        common.tips({
                            msg: '本次抽奖活动每人最多只有20次抽奖机会，您已用完。but，邀请注册不设上限，赶紧去屠榜，给其他宝宝留个抽奖机会吧~！',
                            updateText: true,
                            stayTime: 4000,
                        });
                    }else{
                        common.tips({'msg':data.msg});
                    }
                }else{
                    window.location.href= WX_ROOT + 'info/500'
                }
            },
            complete:function(){
                    luckyLottery.options.canLottery=true;
            }
        })*/
    },
    
    /**
     * 初始化 获取用户抽奖次数
     */
    initMemberEventLotteryNum: function () {
    
        var token = localStorage.getItem('token');
        if (token){
            $.ajax( {
                type : 'POST',
                url : WX_ROOT + 'usercenter/queryUserLeftLotteryCount',
                dataType : 'json',
                data:{token:localStorage.getItem('token')},
                cache : false,
                success : function(data) {
                    var num=JSON.parse(data).detail;
                    $(".lotteryNum").text(+-+num);
                    if(0==num){
                        $('.myRecordDiv p:nth-of-type(1)').html('您的抽奖机会已用完，赶紧去邀请好友注册赢得新的抽奖机会吧')
                    }else{
                        $('.myRecordDiv p:nth-of-type(1)').html('当前还剩余<span class="lotteryNum">'+num+'</span>次抽奖机会')
                    }
                }
            });
        }else{
            /*common.showId($('.loginTipSection'))*/
        	 $('.myRecordDiv p:nth-of-type(1)').html('请先登录！！')
        }    
    },
    /**
     * 查询最近获奖记录
     *
     * @return
     */
    getCjMemberResultList:function (pageNumber) {

        var pageNumber = pageNumber || 1,
            pageSize = 10;

        $.ajax({
            type: "post",
            url: WX_ROOT + "usercenter/queryCjResult",
            data: {pageNumber:pageNumber,pageSize:pageSize},
            success: function (data, status) {
                var tabTemplate1 = Handlebars.compile($('#winListDiv').html());
                var tabTemplate2 = Handlebars.compile($('#adListDiv').html());
                $('.ad ul').html(tabTemplate2(JSON.parse(data).detail.list));
                $('.listDiv').html(tabTemplate1(JSON.parse(data).detail.list));
            }
        });
    },
    author: function(){
    	var redirect_uri = window.location.href.split('#')[0],authorUrl; 
        
        if (!luckyLottery.options.signature) {
            $.ajax({
    			async: false,
    			data: {url:redirect_uri},
    			type : "GET",
    			url : WX_ROOT + "wechat/signature",
                beforSend: function(){
                	common.alert({'stayTime':-1});
                },
    			success : function(json) {
    				if (json) {
    					var data = JSON.parse(json);
    					luckyLottery.options.signature = data.signature;
    					luckyLottery.options.nonceStr = data.nonceStr;
    					luckyLottery.options.timestamp = data.timestamp;  
    					luckyLottery.options.appid = data.appid;
    					
    					var userInfo = localStorage.getItem('userInfo');
    					if (userInfo && 'testUser'!=userInfo) {
							var userInfoJson = JSON.parse(userInfo);
							//分享出去的带上分享人手机号
							authorUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ luckyLottery.options.appid +"&redirect_uri="+ window.location.href.split('?')[0] +"&state="+ userInfoJson.mobile +"&response_type=code&scope=snsapi_base#wechat_redirect";
						}else{
							authorUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ luckyLottery.options.appid +"&redirect_uri="+ window.location.href.split('?')[0] +"&response_type=code&scope=snsapi_base#wechat_redirect";
						}
					}else{
						common.tips({msg:'系统繁忙,获取signature失败!'});
					}
    			},
                complete:function(){
                	common.alert({show:false});
                }
    		});
		}

        luckyLottery.share(luckyLottery.options.appid, luckyLottery.options.timestamp, luckyLottery.options.signature, luckyLottery.options.nonceStr, authorUrl);

    },
    share: function(appid,timestamp,signature,nonceStr,url){
    	wx.config({
    	    debug: false, 
    	    appId: appid, 
    	    timestamp: timestamp, 
    	    nonceStr: nonceStr, 
    	    signature: signature,
    	    jsApiList: ['onMenuShareTimeline',
    	                'onMenuShareAppMessage'
						]
    	}); 
    	wx.ready(function(){
    		var imgUrl = 'http://www.szqhflkj.cn/weixin/static/img/indexShare.jpg',
    			title = '买车险，找达农，Get您的私人车管家！',
    			desc = '比价、投保、理赔、救援、专人专服，这么贴心还不约么~';
    			
    		//分享到朋友圈
    		wx.onMenuShareTimeline({
			    title: title, 
			    link: url, 
			    imgUrl: imgUrl,
			    success: function () { 
			    	common.showId($('.shareSuccessfulTipSection'));
			    	common.saveShareRecord(title,desc,url,imgUrl,1);
        	    }
			});
    		
    		//分享给朋友
    		wx.onMenuShareAppMessage({
        	    title: title, 
        	    desc: desc, 
        	    link: url, 
        	    imgUrl: imgUrl, // 分享图标
        	    success: function () { 
        	    	common.showId($('.shareSuccessfulTipSection'));
        	    	common.saveShareRecord(title,desc,url,imgUrl,2);
        	    }
        	});
    	});
    	
    	wx.error(function(res){
    		/*common.tips({'msg':'获取授权证书失败！'})*/
    		common.tips({
    			msg:'唉哟，分享出错了。亲重新试一次吧！',
    			callback:function(){
    				location.reload();//刷新页面，重新获取证书
    			}
    		})
    	});
    },
    
    /**
     * 判断是否在系统保存了授权后微信的信息
     *//*
    queryIsWeixinAuthorize:function(par){

    	var wxUserInfo = localStorage.getItem('wxUserInfo'),
    		isWeixinAuthorize = false;
    	
    	if (!wxUserInfo) return;
    	
    	var wxData = JSON.parse(wxUserInfo);
    	$.ajax({
			async: false,
			data: {openid:wxData.openid},
			type : "GET",
			url : WX_ROOT + "wechat/queryIsWeixinAuthorize",
			success : function(json) {
				var jsonData = JSON.parse(json);
				if ('true' == jsonData.detail || true == jsonData.detail) {
					isWeixinAuthorize = true;
				}
			}
		});
    	
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
					async: false,
	    			data: {jsonData:JSON.stringify(par)},
	    			type : "POST",
	    			url : WX_ROOT + "wechat/saveUserWeixin",
	    			success : function(json) {
	    				if (json){
	    					var jsonData = JSON.parse(json.data);
	    					//成功
	    					if (600 == jsonData.msgCode) {
	    						common.tips({
	    		                    msg:'刷新微信授权信息成功'
	    		                })
							}
	    				}
	    			}
	    		});
			}
		}
		
    },*/

    bind: function(){
    	$('.registerBtn').on('tap',function(){
            window.location.href = WX_ROOT + 'base/regist';
        })
        $('.inviteBtn').on('tap',function(){
           common.showId($('.shareSection'))
        })
        $('.shareSection .morLayerDiv').on('tap',function(){
            common.close($('.shareSection'))
        })
        $('.loginBtn').on('tap',function(){
            window.location.href = WX_ROOT + 'base/login'
        })
    	var stateMobile = common.getUrlParameter('state');
        if (stateMobile) {
            //将推荐人手机号码写到本地
            localStorage.setItem('inviteMobile',stateMobile);
/*
            common.tips({'msg':'推荐人手机号'+stateMobile});*/
        }
    	
        var token  = localStorage.getItem('token');
        $('.btnDiv').on('tap',function(){
            if (token)    
                window.location.href = WX_ROOT + 'insurance/insureResult'
            else
                common.showId($('.loginTipSection'))
        })

        $('.arrowDiv1').on('tap',function(){
            if (token){
                luckyLottery.lottery(token);
            }
            else{
                common.showId($('.loginTipSection'))
            }
        })

        $('.myrecord').on('tap',function(){
            var token  = localStorage.getItem('token');
            if (token)    
                window.location.href= WX_ROOT + 'usercenter/myWinRecord'
            else
                common.showId($('.loginTipSection'))
        })

        $('.closeBtn').on('tap',function(){
            common.close($('.lotteryResultDiv'));
            common.close($('.loginTipSection'));
        })

        $('.iKnowBtn').on('tap',function(){
            common.close($('.lotteryResultDiv'))
        })
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

	    var stateMobile = common.getUrlParameter('state');
        if (stateMobile) {
            //将推荐人手机号码写到本地
            localStorage.setItem('inviteMobile',stateMobile);
        }
        
	    localStorage.setItem(CLEAR_FLAG_KEY, dataTime);
	    localStorage.setItem('userInfo', 'testUser');//暂定
	    
	    /*common.tips({
	        msg:'亲爱的天使客户，本次车险活动即将于7.18正式开始，此前的内测信息已清空，烦请重新注册！',
	        stayTime:4000,
	        callback:function(){
	            window.location.href= WX_ROOT + 'base/regist'
	        }
	    })*/
	    luckyLottery.enterWxAuthor();
	}else{
		localStorage.setItem(CLEAR_FLAG_KEY, dataTime);
		luckyLottery.enterWxAuthor();
	}
    //common.appendNav()
    //$('.ic-game').css('background-position','-318px 0')
    //$('.gameA').addClass('currentNav')
    //$('.gameA').attr('href','')
});