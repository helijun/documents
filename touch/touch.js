/**
 * 手指滑动组件
 * @author helijun
 * @return {[type]}   [description]
 */
(function(win) {

	var touchMain = {
        init: function(){
            var self = touchMain;
            
        },
        
        options: {
        	startX: null,
        	startY: null
        },
        
        touchStart: function(event){
        	var self = touchMain;
            try{
                var touch = event.touches[0], //获取第一个触点
                    x = Number(touch.pageX), //页面触点X坐标
                    y = Number(touch.pageY); //页面触点Y坐标
                //记录触点初始位置
                self.options.startX = x;
                self.options.startY = y;
            }catch(e){
                console.log(e.message)
            }
        },
        
        /**
         * 滑动时判断下滑、上滑
         * @param  {[type]} event        
         * @param  {[type]} upcallback   [上滑回调函数]
         * @param  {[type]} downcallback [下滑回调函数]
         */
        touchMove: function(event,upcallback,downcallback){
        	var self = touchMain;
            try{
                var touch = event.touches[0], //获取第一个触点
                    x = Number(touch.pageX), //页面触点X坐标
                    y = Number(touch.pageY); //页面触点Y坐标
                
                //判断滑动方向
                if (y - self.options.startY > 0) {
                    //alert('下滑了！');
                    downcallback && downcallback();
                }else{
                	//alert('上滑了！');
                	upcallback && upcallback();
                }
            }catch(e){
            	console.log('滑动时出错:',e.message)
            }
        },
        
        touchEnd: function(event){
        	var self = touchMain;
            try{
                var touch = event.touches[0], //获取第一个触点
                    x = Number(touch.pageX), //页面触点X坐标
                    y = Number(touch.pageY); //页面触点Y坐标
                //判断滑动方向
                if (y - self.options.startY > 0) {
                    console.log('下滑了！');
                }else{
                    console.log('上滑了！');
                }
            }catch(e){
                console.log(e.message)
            }
        },

        render: function(){
            var self = touchMain;
        }
    }
	touchMain.init();
	
	win.touchMain = touchMain;

})(window);