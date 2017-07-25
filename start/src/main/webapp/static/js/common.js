;(function(win){
	"use strict";
	//全局变量 >> START
	var START = {
	    //全局初始化函数
	    init: function(callback){
	        this.watch();
	        callback && callback();
	    },
	    //发送get请求
	    GET: function(options){
	        var self = this;
	        self.ajax(options,'get');
	    },
	    //发送post请求
	    POST: function(options){
	        var self = this;
	        self.ajax(options,'post');
	    },
	    ajax: function(opts,type){
	        var selfData = {
	                url: opts.url,//真实的url
	                params: JSON.stringify(opts.params)
	            };

	        if (opts.baseUrl) {//非跨域
	            selfData = opts.data;
	        }

	        $.ajax({
	            url: opts.baseUrl || URL.CORS,
	            data: selfData,
	            type: type,
	            async: opts.async,
	            beforeSend: function() {
	                opts.beforeSend && opts.beforeSend();
	            },
	            success: function(json) {
	                if(json){
	                    console.log(opts.baseUrl || opts.url,' ajax is successful',json);
	                    opts.success && opts.success(json);

	                    if(opts[json.status]){//区分不同的状态码回调函数
	                    	console.log(opts.baseUrl || opts.url,'ajax status is', json.status, '并已回调'+ json.status +'方法');
	                    	eval(opts[json.status])(json);
	                    }
	                }else{
	                    console.error(opts.baseUrl || opts.url,'ajax 数据返回格式异常');
	                    START.ajaxError();
	                }
	            },
	            error: function(){
	                console.error(opts.baseUrl || opts.url,' ajax is error');
	                opts.error != undefined ? opts.error() : START.commonError();
	            },
	            complete: function(XMLHttpRequest, textStatus) {
	                console.log(opts.baseUrl || opts.url,' ajax is complete');
	            },
	            timeout: opts.timeout || 20000
	        })
	    },

	    /**
	     * 获取url后面的参数，优化后版本
	     * @param  {[type]} name [par]
	     * @return {[type]}      
	     */
	    getUrlParameter: function(name){
	        var _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
	            _regNext = window.location.search.substr(1).match(_reg);
	        if (_regNext != null) return decodeURI(_regNext[2]) || '';
	        else return '';
	    },

	    /**
	     * 获取登录证书
	     * @return {[string]} [token]
	     */
	    getToken: function(){
	        var token = this.getUrlParameter('token') || localStorage.getItem('token') || '';
	        console.info('当前获取的token是：',token);
	        return '02b95b0f-0c21-492b-b1c9-674d08559d23' || token;
	    },
	    //执行登录
	    doLogin: function(){
	        localStorage.setItem('token',"adminfor123456");
	        this.openPage(URL.BASE + '/main/index');
	    },
	    /**
	     * 判断是否登录
	     */
	    checkLogin: function(){
	        var self = this;
	        if(self.getToken()){
	            //todo  验证登录是否过期、策略待定
	        }else{
	            self.toLoginPage();
	        }
	    },

	    /**
	     * 去登录页面
	     */
	    toLoginPage: function(){
	        if(window.location.href.indexOf('login') > -1) return;
	        this.openPage(URL.BASE + '/main/login');
	    },

	    /**
	     * 去下载页面
	     */
	    toDownload: function(userId){
	        if(!userId) return;
	        this.openPage(URL.BASE + '/download?userid=' + userId);
	    },

	    /**
         * 数据请求失败提示
         * @param  {[type]} 
         * @return {[type]}         [description]
         */
        ajaxError: function(){
        	alert('请求失败，请稍后重试！');
        },

	    /**
	     * 去错误页面
	     */
	    toErrorPage: function(status){
	        this.openPage(URL.BASE + status);
	    },

	    /**
	     * 通用的跳转页面
	     *
	     * target "_blank" 新窗口打开
	     * @return {[type]} [description]
	     */
	    openPage: function(href,target){
	    	if (target) {
	    		window.open(href, target)
	    	}else{
	    		//todo  暂定使用location.href 没有版本号
	    		window.location.href = href;
	    	}
	    },

        /**
         * 通用的加载中动画
         */
        loadingShow: function(){
        	//TODO
        },

        /**
         * 加载中动画消失
         * @return {[type]} [description]
         */
	    loadingHide: function(){
	    	
        },

        /**
         * 通用的错误提示
         * @param  {[type]} element [待展示错误的dom]
         * @return {[type]}         [description]
         */
        commonError: function(element){
            console.error('出错');
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
         * 动态渲染下拉框
         * data-kv : {"value":"id","name":"title,cid","space":"-"}
           data-from : /item/list?page=1&rows=20 注意url前面有/
           返回数据必须是CRARESULT格式
         * @param  {[type]} element [description]
         * @return {[type]}         [description]
         */
        renderSelect: function(element){
        	var el = element || 'select',
        		thisSpace = ',';

        	var keyValue = JSON.parse($(el).attr('data-kv')) || '';
        	if(!keyValue){
        		console.info('请配置好正确的渲染下拉框字段，如{"value":"id","name":"title,cid","space":"-"}')
        		return;
        	}

        	START.GET({
        		async: false,
                baseUrl: URL.BASE + $(el).attr('data-from'),
                beforeSend: function(){
                    START.loadingShow()
                },
                success: function(json){
                    if(json && json.status == CODE.SUCCESS){
                    	/*var data = '{"data":[{"id":5365634,"title":"阿尔卡特 (OT-927) 炭黑 联通3G手机 双卡双待1","cid":560,"status":1},{"id":536563,"title":"阿尔卡特 (OT-927) 炭黑 联通3G手机 双卡双待","cid":560,"status":1}]}';
                        	json = JSON.parse(data);
*/
	                    var optionsHtml = [];
	                    $(json.data).each(function(index, el) {
	                    	var optionName = '';
	                    	if(keyValue.name.indexOf(thisSpace) > -1) {
	                    		$(keyValue.name.split(thisSpace)).each(function(index2, el2){
	                    			optionName += (el[el2] + (index2 == keyValue.name.split(thisSpace).length - 1 ? '': el[el2] + keyValue.space))
	                    		})
	                    	}else{
	                    		optionName += el[keyValue.name]
	                    	}
	                    	optionsHtml.push('<option value="'+ el[keyValue.value] +'" ' + (index == 0?'select':'') +'>'+ optionName +'</option>')
	                    });
	                    $(el).html(optionsHtml.join(''));
                    }
                },
                error: function(){
                    START.commonError()
                }
            })
        },

	    //所有全局事件监听
	    watch: function(){
	        var self = this;

	        //ajax 错误监听
	        $(document).on('ajaxError', function(e, xhr, options){
	            var status = xhr.status;
	            if (404 == status) {
	                self.openPage(404)
	            }else if(500 == status){
	                self.openPage(500)
	            }
	        })
	    }
	}
	
	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function() {
			return START;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = START;
		module.exports.START = START;
	} else {
		win.START = START;
	}
	
})(window)