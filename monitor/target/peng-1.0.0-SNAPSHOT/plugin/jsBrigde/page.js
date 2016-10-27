/**
 * js跟原生交互、页面跳转相关
 * @author helijun
 */
var u = navigator.userAgent,
	isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	
var dnApp = {
		
	/**
	 * h5跳转h5页面，通过app webview跳转
	 * @param opts
	 * 		  url 跳转h5的页面链接
	 * 		  data 传递带参
	 */
    openPage:function(opts){
    	
    	var options = {
       	 	data: '',
       	 	url: null,
       	 	title: '达农保险',
            callback:null,
        }
    	
    	$.extend(true, options, opts || {});
    	
    	try {
    		var u = navigator.userAgent,
        		isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        		isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        		
        	var json = '{"url":"'+ options.url +'","title":"'+ options.title +'","data":"'+ options.data +'"}';	
        	if (isIOS) {
        		openPage(json)
			}else if(isAndroid){
				window.Android.openPage(json);  
			}	
		} catch (e) {
			window.location.href = options.url;//非app端
		}
    	
    	options.callback && options.callback();
    },
    
    /**
     * h5跳转原生页面
     * @param opts
     * 		  ios 苹果端页面地址
     * 		  andriod 安卓端页面地址
     * 		  title 标题
     * 		  data 带参数据
     * 
     * @return url 最终app端接收的跳转原生页面
     */
    openActivity: function(opts){
		var options = {
			data: '',
			ios: null,
			android: null,
			title: '达农保险',
			url: null,
			callback: null
		}

		$.extend(true, options, opts || {});

		try {
			var u = navigator.userAgent,
				agent,//给app的真实地址
				isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
				
			if(isIOS){
				agent = options.ios;
			}else if(isAndroid){
				agent = options.android;
			}
			
			var json={};
				json.url = agent;
				json.title = options.title;
				json.data = options.data;
			if(isIOS){
				openActivity(JSON.stringify(json))
			}else if(isAndroid){
				window.Android.openActivity(JSON.stringify(json));
			}

		} catch (e) {
			window.location.href = options.url;//非app端
		}

		options.callback && options.callback();
    },
    
    /**
     * 关闭当前窗口页面
     */
    closePage: function(){
    	try {
    		closePage();
		} catch (e) {
			common.tips({msg:'关闭当前窗口页面失败！'})
		}
    },

    /**
     * 打开订单详情原生页面
     * type：0-非车险，1-车险
     */
    openWarrantyDetail: function(ordersId,type){
    	try {
	    	var json = null;
	    	
	    	if (ordersId && type) {
	    		json = '{"ordersId":"'+ ordersId +'","type":"'+ type +'"}';
			}
	    	
    		if(isIOS){
    			openWarrantyDetail(json);
			}else if(isAndroid){
				window.Android.openWarrantyDetail(json);
			}
		} catch (e) {
			common.tips({msg:'请在app里查看订单详情页！'})
		}
    },
    
	/**
	 * 打开登录原生页面
	 * 
	 * url 回调页
	 *
	 */
	openLogin: function(url){
		try {
			if(isIOS){
				openLogin(url);
			}else if(isAndroid){
				window.Android.openLogin(url);
			}
		} catch (e) {
			common.tips({msg:'请在app里打开！'})
		}
	}
}
