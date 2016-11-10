;
(function (win) {
	'use strict';
	
	var runState = {
	        init: function(){
	            var self = runState;
	            	runState.renderHtml();
	            	runState.renderComponent();
	            	runState.watch();
	        },
	        
	        //全局属性
	        options: {
	        	
	        },
	        
	        data: {
	            navBtn:[
	                  	{
	                		name: '实时监测',
	                		href: '/index/detect',
	                        isCheck: true
	                  	},
	                  	{
	                		name: '健康诊断',
	                		href: '/index/health',
	                        isCheck: false
	                  	}
	                ],
	            title: '机组状态监测系统',
	            time: '2016-10-26 21:34:18',
	            user: {
	                name: '何立军'
	            }
	        },
	        
	        //渲染html
	        renderHtml: function(){
	        	
	        },
	        
	        //渲染组件
	        renderComponent: function(){
	        	
	        },

	       	//事件监听
	        watch: function(){
	            var self = runState;
	            
	            var $body = $('body');
	            $body.on();
	        }
	    }
		runState.init();

		win.runState = runState;
})(window);