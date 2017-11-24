/**
 * js跟原生交互、页面跳转相关
 * @author helijun
 */
var u = navigator.userAgent,
	isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	
var dnApp = {
		
	/**
	 * h5跳转h5页面，通用的
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
				try {
					openPage(json);//UIWebView
				} catch (e) {
					window.webkit.messageHandlers.openPage.postMessage(json);//WKWebView
				}
			}else if(isAndroid){
				window.Android.openPage(json);  
			}	
		} catch (e) {
			window.location.href = options.url;//非app端
		}
    	
    	options.callback && options.callback();
    },
    
    /**
     * h5跳转h5页面，跟openPage平行，拼接token
     * @param opts
     */
    openPageWithToken: function(opts){
    	var options = {
           	 	url: null,
           	 	title: '达农保险',
                callback:null,
            }
        	
    	$.extend(true, options, opts || {});
    	
    	try {
    		var u = navigator.userAgent,
        		isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        		isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        		
        	var json = '{"url":"'+ options.url +'","title":"'+ options.title +'"}';	
        	if (isIOS) {
				try {
					openPageWithToken(json);//UIWebView
				} catch (e) {
					window.webkit.messageHandlers.openPageWithToken.postMessage(json);//WKWebView
				}
			}else if(isAndroid){
				window.Android.openPageWithToken(json);  
			}	
		} catch (e) {
			window.location.href = options.url;//非app端
		}
    	
    	options.callback && options.callback();
    },
    
    /**
     * h5跳转原生页面，通用的
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
				try {
					openActivity(JSON.stringify(json))
				} catch (e) {
					window.webkit.messageHandlers.openActivity.postMessage(JSON.stringify(json));//WKWebView
				}
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
	 * notCarInsureId: 非车险专用，订单主键
     */
    openWarrantyDetail: function(ordersId,type,notCarInsureId){
    	try {
	    	var json = null;
	    	
	    	if (ordersId) {
	    		json = '{"ordersId":"'+ ordersId +'","type":"'+ type +'"}';
			}
	    	
	    	if (notCarInsureId) {
	    		json = '{"ordersId":"'+ notCarInsureId +'","type":"'+ type +'"}';
			}
	    	
    		if(isIOS){
    			try {
    				openWarrantyDetail(json);
				} catch (e) {
					window.webkit.messageHandlers.openWarrantyDetail.postMessage(json);
				}
			}else if(isAndroid){
				window.Android.openWarrantyDetail(json);
			}
		} catch (e) {
			if(type == 1){
				window.location.href = WX_ROOT + "usercenter/insureDetail?myInsurancePolicy_id=" + ordersId;
			}else{
				var myInsurancePolicy_id = ordersId;
				if (notCarInsureId) {
					myInsurancePolicy_id = notCarInsureId;
				}
				
				window.location.href = WX_ROOT + "usercenter/notCarInsureDetail?myInsurancePolicy_id=" + myInsurancePolicy_id;
			}
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
				try {
					openLogin(url);
				} catch (e) {
					window.webkit.messageHandlers.openLogin.postMessage(url);
				}
			}else if(isAndroid){
				window.Android.openLogin(url);
			}
		} catch (e) {
			console.log(common)
			common.toLoginPage();
		}
	}
}
