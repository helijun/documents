/**
 * js调用原生设备或相关
 * @author helijun
 */
var u = navigator.userAgent,
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

var dnAppDevice = {
		
    /**
     * 调起原生的分享、如果不在webview则调微信分享
     * @return {[type]} [description]
     */
	openNativeShare: function(opts){
        var options = {
            title: '达农保险',//分享标题
            desc: '',//描述
            link: '',//页面链接
            imgUrl: '',//图片地址
            flag: 0,//默认0微信+朋友圈，1全平台
            success: null//成功回调函数
        }

        $.extend(true, options, opts || {});

        try {
            if(isIOS){
                window.webkit.messageHandlers.shareByHtml.postMessage(JSON.stringify(options));//WKWebView
            }else if(isAndroid){
                window.Android.shareByHtml(JSON.stringify(options));
            }
        } catch (e) {
            //非app端
        	try {
        		$.toast("请下载新版app或者在微信浏览器里分享！", "cancel");
			} catch (e) {
				// TODO: handle exception
				common.tips({msg:'请下载新版app或者在微信浏览器里分享！'})
				console.log('没有引入jqweui',e)
			}
        }
    },	 

    /**
     * 调用原生摄像头、相册
     * return 图片全路径
     */
    takePhonto: function(){
    	console.log('打开相机')
        return takePhonto()
    },

    /**
     * 地理定位
     * return json:地址位置坐标、省/城/市名
     */
    geoLocation: function(){
    	
    }
}