/**
 * 微信分享、网页授权组件
 * @author helijun
 * @return {[type]}   [description]
 */
(function($) {
	var ua = navigator.userAgent.toLowerCase(),
	    isWechat = ua.indexOf('micromessenger') != -1;
	
 	//分享
	$.share = function(opts,wx) {
		var options = {
				ajaxAsync: false,
	        	currentUrl: window.location.href.split('#')[0],
	        	imgUrl: null,
	        	title: '素身祈福',
	        	desc: null,
	        	shareUrl: null,
	        	jsApiList: [
                	'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ],
	        	success: function(){
	        		//分享统计，分享来源 1 朋友圈 2分享给朋友  3分享到QQ  4分享到QQ空间
	                //TODO
	        	}
	        }
		
		$.extend(true, options, opts || {});

		if(!isWechat){
			console.log('非微信浏览器，不进行分享配置！')
			return;
		}
		
		//判断是否已经授权
		if(!wechatShare.options.isSignature){
			$.signature(wx,options,$.share);
		}else{
			if(options.jsApiList){//需要重新渲染js api列表配置
				var data = wechatShare.options.data;
                wx.config({
                    debug: WXDEBUG,
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: options.jsApiList
                });
			}
			wx.ready(function(){
	            //分享到朋友圈
	            wx.onMenuShareTimeline({
	                title: options.title,
	                link: options.shareUrl,
	                imgUrl: options.imgUrl,
	                success: function () {
	                    options.success()
	                }
	            });

	            //分享给朋友
	            wx.onMenuShareAppMessage({
	                title: options.title,
	                desc: options.desc,
	                link: options.shareUrl,
	                imgUrl: options.imgUrl,
	                success: function () {
	                	options.success()
	                }
	            });
	        });
		}
	}
	
	//网页授权、获取用户信息
	$.authorization = function(opts,wx){
		var options = {
				ajaxAsync: false,
	        	currentUrl: window.location.href.split('#')[0],
	        	title: '素身祈福',
	        	isHide: true,//是否在进入授权页时隐藏已经渲染的页面元素
	        	init: function(){}
	        }
		
		$.extend(true, options, opts || {});

		if(!isWechat){
			console.log('非微信浏览器，不走网页授权！')
			options.init();
			return;
		}

		//判断是否已经授权
		if(!wechatShare.options.isSignature){
			$.signature(wx,options,$.authorization);//类似递归
		}else{
			//判断本地是否保存有微信用户信息
			var wxUserInfo = localStorage.getItem(CACHE.wx_user_token);
	        if (!wxUserInfo) {
	            var code = wechatShare.getUrlParameter('code');
	            if (code) {
	            	options.isHide && $('body').removeClass('li-none');
	                wechatShare.getWxUserInfo();
	                options.init();
	            }else{
	            	options.isHide && $('body').addClass('li-none');
	                //没有微信用户信息，没有授权-->> 需要授权，跳转授权页面
	                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ wechatShare.options.wxappid +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
	            }
	        }else{
	            options.init();
	        }
		}
	}

	//jsSDK授权证书
	$.signature = function(wx,options,callback){
		$.ajax({
            data: {url: options.currentUrl},
            type: "GET",
            async: options.ajaxAsync,
            url: URL.BASE + API.wxSignature,
            success: function (json) {
                if (json) {
                    var data = JSON.parse(json);
                    wechatShare.options.data = data;
                    wx.config({
                        debug: WXDEBUG,
                        appId: data.appid,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature
                    });
                    wx.error(function(res){
                        console.error('获取授权证书失败！')
                    });
                    
                    wechatShare.options.isSignature = true;
                    wechatShare.options.wxappid = data.appid;
                    
                    callback && callback(options,wx);
                }
            }
        })
	}

	var wechatShare = {
        init: function(){
            var self = wechatShare;
            
        },
        options: {
        	data: null,
            isSignature: false,
            wxappid: null,
        },

        /**
	     * 授权后获取用户的基本信息
	     */
	    getWxUserInfo: function(par){
	    	var code = wechatShare.getUrlParameter("code");
	    	
	    	if (par) code = par;
	    	
	    	$.ajax({
				async: false,
				data: {code: code},
				type : "GET",
				url : URL.BASE + API.authorization,
				success : function(json) {
					if (json){
						try {
							//保证写入的wxUserInfo是正确的
							var data = JSON.parse(json);
							if (data.openid) {
								console.log('授权后获取用户的基本信息是',data);
								localStorage.setItem(CACHE.wx_user_token,json);//写微信用户信息
							}
						} catch (e) {
							console.error('保存微信用户信息失败，请重新授权！')
						}
					}
				}
			});
	    },

	    /**
	     * 获取url后面的参数，避免依赖，冗余一层
	     * @param  {[type]} name [par]
	     * @return {[type]}      
	     */
	    getUrlParameter: function(name){
	        var _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
	            _regNext = window.location.search.substr(1).match(_reg);
	        if (_regNext != null) return decodeURI(_regNext[2]) || '';
	        else return '';
	    },
    }

})(jQuery);