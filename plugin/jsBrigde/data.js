/**
 * js跟原生交互、运营数据统计相关
 * @author helijun
 */
var u = navigator.userAgent,
	isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	
var dnAppData = {
		
	//统计下单次数
	addOrderStatistics: function(callback){
    	try {
        	if (isIOS) {
				try {
					addOrderStatistics();//UIWebView
				} catch (e) {
					window.webkit.messageHandlers.addOrderStatistics.postMessage('');//WKWebView
				} 
			}else if(isAndroid){
				window.Android.addOrderStatistics();  
			}	
        	
        	callback && callback();
		} catch (e) {
			console.log(e)//非app端
		}
    },
    
    //统计支付次数
    addPaySuccessStatistics: function(callback){
    	try {
        	if (isIOS) {
				try {
					addPaySuccessStatistics();//UIWebView
				} catch (e) {
					window.webkit.messageHandlers.addPaySuccessStatistics.postMessage('');//WKWebView
				} 
			}else if(isAndroid){
				window.Android.addPaySuccessStatistics();  
			}	
        	
        	callback && callback();
		} catch (e) {
			console.log(e)//非app端
		}
    },
    
    /**
     * 获取原生端的相关数据值
     * @param flag -- token
     * @param callback -- app回调的方法
     */
    getVwData: function(flag,callback){
    	try {
    		var json = '{"flag":"'+ flag +'","callback":"'+ callback +'"}';
        	if (isIOS) {
				window.webkit.messageHandlers.getVwData.postMessage(json);//WKWebView
			}else if(isAndroid){
				window.Android.getVwData(json);  
			}	
		} catch (e) {
			var data = null;
			if("token" === flag){
				data = localStorage.getItem('token') || common.getUrlParameter('token') || null;
			}
			
			//callback && eval(callback)(data);
		}
    }
}
