;
(function (win, undefined) {
	'use strict';
	
	var common = {
			init: function(){
				common.initTemplateHelper();
				common.renderHtml();
				common.watch();
			},

			/**
			 * 通用的加载中
			 * @return {[type]} [description]
			 */
			loading: function(){
				require(['artDialog'],function(){
					dialog({
					    skin: 'min-dialog tips'
					}).show();
				})
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
		            callback:null,
		        }
		    	
		    	$.extend(true, options, opts || {});
		    	
		    	
		    	var html = [
		    		'<div class="common-tips tips-'+ options.type +'">'+ options.msg +'</div>'
		    	];

		    	$('body').append(html.join());

		    	setTimeout(function(){
		    		$('.common-tips').remove();
		    		options.callback && options.callback();
		    	},options.stayTime)
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
		     * 初始化选中的导航
		     * @return {[type]} [description]
		     */
		    initNav: function(){
		    	/*var currentHref = window.location.href.split(PC_ROOT)[1];
		    	if (currentHref == '/') {
		    		$('.nav-text p:nth-child(1)').addClass('active');
				}else{
					$('.nav-text p').each(function(k,v){
		    			$(v).attr('data-href').indexOf(currentHref) > -1 && $(v).addClass('active');
	            	})
				}*/
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

           	//事件监听
            watch: function(){
                var self = common;
            }
		    	
    	};
	common.init();

	win.common = common;
})(window);