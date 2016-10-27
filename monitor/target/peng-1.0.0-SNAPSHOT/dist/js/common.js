/**
 * WX_ROOT 微信ajax请求前缀
 * APP_ROOT app跳转链接前缀
 * APP_PAY app支付链接前缀
 * WX_CORS 通用的跨域请求
 * WX_IMAGE 服务器图片相关静态资源获取路径
 * WX_STATIC 微信静态资源获取路径前缀
 * WX_MANAGE 后台工程地址
 * WX_SSO sso工程地址
 * WX_APPID 公众号Id
 * PIC_PATH app图片相关路径
 * ENV_DATE 第一次正式上线日期
 * CLEAR_FLAG_KEY 用户本地缓存清空策略key
 */
var WX_ROOT = '../',
	
	APP_ROOT = 'http://127.0.0.1:8082/',
	//APP_ROOT = 'http://192.168.1.74:8082/',//测试
	//APP_ROOT = 'http://h5.sztoda.com/'//正式
		
    APP_PAY = 'http://192.168.1.74:8086/',//支付、测试
    //APP_PAY = 'http://pay.sztoda.com/',//正式
    
	WX_STATIC = '../static/', 
    WX_CORS = '../wechat/cors',
    
	WX_MANAGE = 'http://manage.sztoda.cn/',//本地、测试
	//WX_MANAGE = 'http://manage.sztoda.com/', //正式
	
	WX_SSO = 'http://sso.sztoda.cn/', //本地、测试
	//WX_SSO = 'http://sso.sztoda.com/',  //正式
	
	WX_APPID = 'wx9d9f9dbda9815e29', //测试公众号
	//WX_APPID = 'wx1d88663a11c7452a', //正式公众号
	
	PIC_PATH = 'http://static.sztoda.cn', //图片，测试
	//PIC_PATH = 'http://static.sztoda.com', //图片
	
	ENV_DATE = '2016-07-18', 
	CLEAR_FLAG_KEY = 'CLEAR_FLAG_2016_07_18';

var common={
	/**
	 * 后退
	 */
    goback:function(){
    	$('.headerDiv').on('tap','i',function(){
    		window.history.go(-1);
    	});
    },
    
    /**
     * 普通的tips
     * @param opts  '' or {}
     * 
     * @param msg 提示信息
     * @param stayTime 停留时间
     * @param callback 消失后的回调函数
     */
    tips:function(opts){
    	
    	if (typeof opts == 'string' && opts == 'hide') {
    		$('.ui-tips-div').remove();
    		return;
		}
    	
    	var hasTips = $('.ui-tips-div');
    	if (hasTips.length > 0) hasTips.remove();
    	
    	var options = {
       	 	msg: '',
       	 	stayTime: 2000,
       	 	updateText: false,
            callback:null,
        }
    	
    	$.extend(true, options, opts || {});
    	
    	if (options.updateText) {
    		$('.ui-tips-div').html(options.msg);
		}else{
			$('body').append('<div class="ui-tips-div">'+ options.msg +'</div>');
			setTimeout(function(){
				$('.ui-tips-div').addClass('translateY-zero');
			},100)
			
		}
    	
    	if (options.stayTime != -1) {
    		setTimeout(function(){
				$('.ui-tips-div').removeClass('translateY-zero');
        		options.callback && options.callback();
        	},options.stayTime)
		}
    },
    
    /**
     * 通用的弹出框，默认显示
     * 
     * @param opts  '' or {}
     * 
     * @param type：
     * 				loading
     * 				success
     * 				error
     * 
     * callback 关闭后回调函数
     * isAutoClose 两秒后自动关闭
     */
    alert: function(opts){

    	if (typeof opts == 'string' && opts == 'hide') {
    		$('.ui-alert-block').remove();
    		return;
		}
    	
    	var options = {
        	 show: true,
             type: 'loading',
             msg: '正在加载..',
             callback:null,
             isAutoClose: false
         }
         
         $.extend(true, options, opts || {});
         
         if (options.show && options.show != 'false') {
        	 var alertHtml = [];
             
             alertHtml.push('<div class="ui-alert-block">');
             	alertHtml.push('<div class="ui-'+ options.type +'-cnt">');
             		alertHtml.push('<i class="ui-'+ options.type +'-bright"></i>');
             		alertHtml.push('<p>'+ options.msg +'</p>');
         		alertHtml.push('</div>');
             alertHtml.push('</div>');
             
             $('body').append(alertHtml.join(''));
 		 }else{
 			 $('.ui-alert-block').remove();
 		 } 

         if (options.isAutoClose) {
             setTimeout(function () {
            	 $('.ui-alert-block').remove();
             }, 2000);
         }
         
         options.callback && options.callback();
    },
    
    /**
     * 通用的错误提示图
     * 
     * @param selector 指定的显示错误图容器id
     */
    error: function(selector){
        return;
    	var errorImg = '<img class="width-all" src='+ WX_STATIC +'img/404.png>',
    		errorBody;
    	
    	selector?errorBody = $('#'+selector):errorBody = $('body');
    	
    	errorBody.html(errorImg);
    },
    
    /**
     * 点击时背景变色效果
     * @param selector
     * @param afterBackgroundColor
     * @param beforeBackgroundColor
     */
    tapbackground: function(selector,afterBackgroundColor,beforeBackgroundColor){
    	var _self = $('#'+selector),
    		defaultAfterBackgroundColor = '#CCC';
    		defaultBeforeBackgroundColor = '#FFF';
    	_self.css({'background-color': afterBackgroundColor || defaultAfterBackgroundColor});
    	setTimeout(function(){
    		_self.css({'background-color': beforeBackgroundColor || defaultBeforeBackgroundColor});
        }, 100);
    },
    
    /**
     * 点击时背景变色效果
     * @param selector
     * @param afterBackgroundColor
     * @param beforeBackgroundColor
     */
    tapChangeBg: function(selector,afterBackgroundColor,beforeBackgroundColor){
    	var _self = $(selector),
    		defaultAfterBackgroundColor = '#CCC';
    		defaultBeforeBackgroundColor = '#FFF';
    	_self.css({'background-color': afterBackgroundColor || defaultAfterBackgroundColor});
    	setTimeout(function(){
    		_self.css({'background-color': beforeBackgroundColor || defaultBeforeBackgroundColor});
        }, 100);
    },
    
    /**
     * 获取URL参数
     * @param name url参数名
     * @returns
     */
    getUrlParameter:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
    },
    
    /**
     * 动态加载JS，异步
     */
    loadScript: function (url, callback){
        var script = document.createElement("script");
        var head = document.head || document.getElementsByTagName('head')[0];
        script.type = "text/javascript";
        script.src = url + '?ver=' + Math.random();
        
        if(callback){
            script.onload = script.onreadystatechange = function(){
                setTimeout(function(){
                    callback();
                }, 20);
            }
        }
            
        head.appendChild(script);    
    },
    
    /**
     * 动态加载JS，同步
     */
    synchronizationScript:function(url,callback){
    	$.ajax({
    		async: false,
    		dataType: "script",
    		url : url,
    		success: function(json){
    			callback && callback();
    		}
    	});
    },

    /**
     * 通用的联动能改变函数
     * @param  {[type]} fisrtSelector     [改变的选择器]
     * @param  {[type]} nextSelectorArray [被改变的选择器数据]
     * @param  {[type]} condition         [是否满足改变的条件]
     * @return {[type]}                   [description]
     */
    togetherChange: function(fisrtSelector,nextSelectorArray,condition){
        $('body').on('change',fisrtSelector,function(e){
            var firstValue = $(fisrtSelector).val();
            
            $(nextSelectorArray).each(function(k,v){
            	if(condition) {
            		switch (parseInt(condition)) {
    				case 1:
    					if ($('#btbRelation' + (k + 1)).val() == 0) {
    						$(nextSelectorArray[k]).val(firstValue);
						}
    					break;
    				default:
    					break;
    				}
            	}else{
            		$(nextSelectorArray[k]).val(firstValue);
            	}
            })
        })
    },
    
    /**
     * 淡出
     * @param id
     */
    close:function (id) {
        id.removeClass("show").addClass("hide");
        id.find(".boxItem").removeClass("zoomIn").addClass("zoomOut");
        setTimeout(function(){
            id.hide().addClass("show").removeClass("hide");
        },500);
    },
    
    /**
     * 淡入
     * @param id
     */
    showId:function (id) {
        id.addClass("show").show();
        setTimeout(function(){
            id.removeClass("show");
        },500);
    },

    /**
     * 检测是否登录
     */
    checkLogin:function(){
    	var token = localStorage.getItem("token"),
    		isLogin = false;
    	if (token) {
    		$.ajax({
    			async: false,
    			data: {token:token},
    			type : "GET",
    			url : WX_ROOT +"wechat/queryIsTokenTimeout",
    			success : function(json) {
    				if (json) {
						var data = JSON.parse(json);
						if (data && data.timeout) {
							isLogin = data.timeout == 'false';
						}
					}
    			}
    		});
		}
    	return isLogin;
    },
    
    /**
     * 检测是否授权
     * @param url
     * @returns {Boolean}
     */
    checkIsWeixinAuthorize: function(url){
    	var wxUserInfo = localStorage.getItem('wxUserInfo'),
    		result = false,
    		wxData = null;
    	
	    if (!wxUserInfo) {
	    	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ url +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
	    	return;
	    }else{
			wxData = JSON.parse(wxUserInfo);
			
			if (!wxData.headimgurl || !wxData.nickname) {
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ url +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
		    	return;
			}
			
			$.ajax({
		    	async: false,
		    	data: {openid:wxData.openid},
		    	type : "GET",
		    	url : WX_ROOT + "wechat/queryIsWeixinAuthorize",
		    	success : function(json) {
		    		var jsonData = JSON.parse(json);
		    		if ('true' == jsonData.detail || true == jsonData.detail) {
		    			result = true;
		    		}
		    	}
		    });
		}
	    return result;
    },
    
    /**
     * 授权后获取用户的基本信息
     */
    getWxUserInfo:function(par){
    	var code = common.getUrlParameter("code");
    	
    	if (par) code = par;
    	
    	$.ajax({
			async: false,
			data: {code:code},
			type : "GET",
			url : WX_ROOT + "wechat/authorization",
			success : function(json) {
				if (json){
					try {
						//保证写入的wxUserInfo是正确的
						var data = JSON.parse(json);
						if (data.openid) {
							localStorage.setItem('wxUserInfo',json);//写微信用户信息
						}
					} catch (e) {
						// TODO: handle exception
					}
				}
					
				/*else
					window.location.href= WX_ROOT + 'page/info/500'*/
			}
		});
    },
    
    /**
     * 根据token获取用户的基本信息
     * @param token
     */
    queryUserByToken:function(par){
    	var token = localStorage.getItem('token');
    	
    	if (par) token = par;

    	$.ajax({
			async: false,
			data: {token:token},
			type : "GET",
			url : WX_ROOT + "wechat/queryUserByToken",
			success : function(json) {
				try {
					var data = JSON.parse(json);
					if (data.msgcode == 600) {
						/*var user = JSON.parse(data.detail).user;*/
						localStorage.setItem("userInfo",data.detail/*JSON.stringify(user)*/);
					}else if(data.msgcode == 610){
						common.tips({
		                    msg:'身份验证过期，请重新登录！',
		                    callback:function(){
		                        window.location.href= WX_ROOT + 'base/login'
		                    }
		                })
					}else{
						common.tips({'msg':data.msg,callback:function(){
							//跳转页面
							window.location.href = WX_ROOT + 'base/login';
						}});
					}
				} catch (e) {
					window.location.href= WX_ROOT + 'info/500'
				}
			}
		});
    },
    /**
     * 保存用户信息到微信表，且关联到user表
     */
    saveWeixinInfoToUser:function(url){

    	var wxUserInfo = localStorage.getItem('wxUserInfo'),
    		userInfo = localStorage.getItem('userInfo'),
    		par = {};
    	
    	try {
    		var wxData = JSON.parse(wxUserInfo);
    		if (wxData.headimgurl && wxData.nickname){
    			
    			if (userInfo) {
    				var userData = JSON.parse(userInfo);
    				par.mobile = userData.mobile || '';
    			}
    			
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
        			data: par,
        			type : "POST",
        			url : WX_ROOT + "wechat/saveWeixinInfoToUser",
        			success : function(json) {
        				if (json) {
        					var jsonData = JSON.parse(json.data);
        					if (600 == jsonData.msgCode) {
        						common.tips({msg:'刷新微信信息成功！'})
        					}
						}
        			}
        		});
    		}else{
    			localStorage.removeItem('wxUserInfo');
    			/*window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ url +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';*/
    		}
		} catch (e) {
			localStorage.removeItem('wxUserInfo');
			/*window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ url +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';*/
			//避免死循环，暂时注释
		}
    },
    
    /**
     * 保存用户分享信息，用来分享统计
     */
    saveShareRecord: function(title,desc,url,imgUrl,source){
    	//保存用户分享信息
    	var wxUserInfo = localStorage.getItem('wxUserInfo');
    	if (!wxUserInfo) return;
    	
    	try {
			var wxUserInfoJson = JSON.parse(wxUserInfo);
			
			dataJson = {};
	    	dataJson.openid = wxUserInfoJson.openid;
	    	dataJson.source = source;
	    	dataJson.title = title;
	    	dataJson.desp = desc;
	    	dataJson.link = url;
	    	dataJson.imgUrl = imgUrl;
	    	dataJson.type = "link";
		
	    	$.post(WX_ROOT + "wechat/saveShareRecord",{dataJson:JSON.stringify(dataJson)})
	    	
		} catch (e) {
			
		}
    },
	appendNav:function(){
		var html='';
			html+='<nav class="navlist" >'
			html+='<p class="cur homeA" >';
			html+=' <i class="ic-home" ></i><em>车险</em>';
			html+=' </p>';
			html+=' <p class="sort sortA" >'
			html+='  <i class="ic-xj"></i><em>邀请榜</em>';
			html+=' </p>';
			html+=' <p class="search gameA" >';
			html+=' <i class="ic-game"></i><em>抽奖</em>';
			html+=' </p>';
			html+='<p class="cart cartA" >';
			html+=' <i class="ic-mine"></i><em>我</em>'
			html+=' </p>';
			html+=' </nav>';
		$('body').append(html);
		
		$('body .homeA').on('tap',function(){

			if($(this).hasClass('currentNav')){
				return;
			}
			window.location.href=WX_ROOT +'base/index'	
			
		})
		$('body .sortA').on('tap',function(){
			if($(this).hasClass('currentNav')){
				return;
			}
			window.location.href=WX_ROOT +'usercenter/shareTopten'
		})
		$('body .gameA').on('tap',function(){
			if($(this).hasClass('currentNav')){
				return;
			}
			window.location.href=WX_ROOT +'usercenter/luckyLottery'	
		})
		$('body .cartA').on('tap',function(){
			if($(this).hasClass('currentNav')){
				return;
			}
			window.location.href=WX_ROOT +'usercenter/myCenter'	
		})
	}
}

$(document).ready(function() { 
	common.goback();
	//common.synchronizationScript("/static/js/base/"+ finalJS +".js");//加载全局环境变量

	/**
	 * ajax 全局错误监听
	 */
	$(document).on('ajaxError', function(e, xhr, options){
		var status = xhr.status;
		if (404 == status) {
	        common.error();//由于只有一张图片，所以都跳转错误页面
		}else if(500 == status){
			common.error();
		}
	})
}); 


