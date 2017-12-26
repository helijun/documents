;(function(win){
	"use strict";
	//全局变量 >> HSKJ
	var HSKJ = {
	    //全局初始化函数
		ready: function(callback){
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
	                    HSKJ.ajaxError();
	                }
	            },
	            error: function(){
	                console.error(opts.baseUrl || opts.url,' ajax is error');
	                opts.error != undefined ? opts.error() : HSKJ.commonError();
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
		 * el 显示模板html的地方
		 * tplpath 模板路径
		 * data 渲染模板的数据
		 * callback 渲染完成后回调函数
		 */
		renderTpl: function (el, tplPath, data, callback) {
			require([tplPath], function (html) {
				$(el).html(_.template(html)(data));
				callback && callback();
			})	
		},

	    //所有全局事件监听
	    watch: function(){
	        var self = this;

	        //ajax 错误监听
	        $(document).on('ajaxError', function(e, xhr, options){
	            var status = xhr.status;
	            /*if (404 == status) {
	                self.openPage(404)
	            }else if(500 == status){
	                self.openPage(500)
	            }*/
			}).on('click', '.tabs-item', function(){
				$(this).addClass('active').siblings().removeClass('active');
			})
	    }
	}

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function() {
			return HSKJ;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = HSKJ;
		module.exports.HSKJ = HSKJ;
	} else {
		win.HSKJ = HSKJ;
	}

})(window)
