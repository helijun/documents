;
(function () {
	'use strict';
	
	var common = {
			init: function(){
				common.initTemplateHelper();
				common.renderHtml();
				common.watch();
				setTimeout(function(){common.insertPageRecord()},0)
			},

			/**
		     * 获取URL参数
		     * @param name url参数名
		     * @returns
		     */
		    getUrlParameter:function(name) {
		        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		        var r = window.location.search.substr(1).match(reg);
		        if (r != null) return decodeURI(r[2]) || '';
		    },

		    /**
		     * 通用的加载中
		     * @param  {[type]} flag    [显示隐藏的标识]
		     * @param  {[type]} el      [在哪里显示隐藏的dom]
		     * @param  {[type]} replace [是否替换，默认替换]
		     * @return {[type]}         [description]
		     */
			loading: function(flag,el,replace){
				if ('hide' === flag) {
					$('.li-spinner').remove();
				}else{
					$('.li-spinner').remove();
					var html = [
						'<div class="li-spinner">',
							'<div class="first-bounce"></div>',
							'<div class="next-bounce"></div>',
						'</div>'
					]
					if (replace) {
						$(el).append(html.join(''))
					}else{
						$(el).html(html.join(''))
					}
					
				}
			},

			/**
			 * 提示信息
			 * @return {[type]} [description]
			 */
			tips: function(opts){
				if (typeof opts == 'string') {
		    		return;
				}
		    	
		    	var options = {
		       	 	msg: '请稍后..',
		       	 	type: 'default',
		       	 	stayTime: 2000,
		       	 	updateText: false,
		            callback: null,
		        }
		    	
		    	$.extend(true, options, opts || {});
		    	
		    	var $commonTips = $('.li-tips');
		    	if (options.updateText) {
		    		$commonTips.text(options.msg);
		    	}else{
		    		var html = [
			    		'<div class="li-tips tips-'+ options.type +'">'+ options.msg +'</div>'
			    	];

			    	$('body').append(html.join());
		    	}

		    	setTimeout(function(){
		    		$commonTips.remove();

		    		options.callback && options.callback();
		    	},options.stayTime)
			},
		    
		    /**
		     * 加载js
		     * @param src
		     * @param ver
		     */
		    loadJs: function(src,ver){
		    	var script = document.createElement("script"),
			    	head = document.head || document.getElementsByTagName('head')[0];
	
			    script.type = "text/javascript";
			    
			    var path = src;
			    
			    ver && path + 'ver=' + ver;
			    script.src = path;
	
			    head.appendChild(script);
		    },
			
			//初始化模板函数
			initTemplateHelper: function(){
				require(['artTemplate'],function(template){
					//图片路径
					template.helper('$picPath', function (img) {
	                    if(img.indexOf('http://wx') >= 0 ){
	                    	return img;//容错处理
	                    }else{
	                    	return PC_PIC_PATH + img;
	                    }
					})
				})
			},
		    
		    //渲染html
            renderHtml: function(){
            
            },
            
            //渲染组件
            renderComponent: function(){
            	
            },

            /**
		     * 右侧滑菜单显示
		     * @param event
		     */
		    rightNavShow: function(event){
		    	$('.nav-right-mask').show();
		        setTimeout(function(){
		            $('.nav-right-content').css({right:'0'}).off().on('click',function(event){
		            	event.stopPropagation();
		            });
		        },100)
		        
		        event.stopPropagation();
		        event.preventDefault();
		    },

            /**
		     * 右侧滑菜单隐藏
		     * @param event
		     */
		    rightNavHide: function(event){

		    	$('.nav-right-mask').hide();
		        setTimeout(function(){
		            $('.nav-right-content').css({right:'-800px'});
		        },100)

		        event.stopPropagation();
		        event.preventDefault();
		    },

		    /**
		     * 添加页面访问记录
		     * @return {[type]} [description]
		     */
            insertPageRecord: function(){
            	var self = common;

            	var par = {};
            		par.source = self.getUrlParameter('from') || 'index';
            		par.page = 1;
            		par.browser = self.browser();
            		par.model = self.phoneType();

            	$.ajax({
                    url: liliangel._XHR + 'record/page',
                    type: "POST",
                    data: {json: JSON.stringify(par)}
                });
            },

            browser: function(){
			    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
			    if (userAgent.indexOf("Opera") > -1) {
			        return "Opera"
			    }; //判断是否Opera浏览器
			    if (userAgent.indexOf("Firefox") > -1) {
			        return "Firefox";
			    } //判断是否Firefox浏览器
			    if (userAgent.indexOf("Chrome") > -1){
				  	return "Chrome";
				}
			    if (userAgent.indexOf("Safari") > -1) {
			        return "Safari";
			    } //判断是否Safari浏览器
			    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			        return "IE";
			    }; //判断是否IE浏览器
			},

			phoneType: function(){ 

				//正则,忽略大小写
				var u =window.navigator.userAgent;
				if(/iPad|Pad|iPhone|Android/.test(u)){
				   	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
						isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

					if(isIOS){
						return 'ios';
					}else if(isAndroid){
						return 'android';
					}
				}else{
					return 'pc';
				}
			},

           	//事件监听
            watch: function(){
                var self = common;
            }
		    	
    	};
	common.init();

	liliangel.common = common;
})();