/**
 * 微信分享组件
 * @author helijun
 * @return {[type]}   [description]
 */
(function($) {
 	//分享
	$.share = function(opts,wx) {
		var options = {
	        	currentUrl: window.location.href.split('#')[0],
	        	imgUrl: null,
	        	title: '达农保险',
	        	desc: null,
	        	shareUrl: null,
	        	success: function(){
	        		//分享统计，分享来源 1 朋友圈 2分享给朋友  3分享到QQ  4分享到QQ空间
	                common && common.saveShareRecord(options.title, options.desc, options.shareUrl, options.imgUrl, 1);
	        	}
	        }
		
		$.extend(true, options, opts || {});
		
		//判断是否已经授权
		if(!wechatShare.options.isSignature){
			$.signature(wx,opts,options.currentUrl,$.share)
		}else{
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

	//jsSDK授权
	$.signature = function(wx,opts,currentUrl,callback){

		$.ajax({
            data: {url: currentUrl},
            type: "GET",
            url: WX_ROOT + "wechat/signature",
            success: function (json) {
                if (json) {
                    var data = JSON.parse(json);
                    
                    wx.config({
                        debug: false,
                        appId: data.appid,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                        	'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                    
                    wechatShare.options.isSignature = true;
                    
                    callback && callback(opts,wx);
                }
            }
        });
	}

	var wechatShare = {
        init: function(){
            var self = wechatShare;
            
        },
        options: {
            isSignature: false
        },

        render: function(){
            var self = wechatShare;
        }
    }

})(jQuery);