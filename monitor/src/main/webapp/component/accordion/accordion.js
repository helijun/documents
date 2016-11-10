/**
* 手风琴组件
* @author helijun
**/
;(function(win) {
    var currentTarget, multiple;
    var Accordion = function(el, multiple) {
        currentTarget = $(el) || {};
        multiple = multiple || false;
        $(document)
        .on("click", el + " .link", this.dropdown)
        .on("click", el + " .submenu li", this.subClick)

    };
    //一级菜单
    Accordion.prototype.dropdown = function(e) {
        var $this = $(this);
        
        $.render($this);
        console.log('渲染的一级页面模板',$this.attr('data-template'))
        
        $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass("open");
        $this.siblings().children().removeClass('sub-select')
        
        if (!multiple) {
            currentTarget.find(".submenu").not($next).slideUp().parent().removeClass("open")
        }
    };
    //二级菜单
    Accordion.prototype.subClick = function(e) {
        var $this = $(this);
        window.curMachine = $this.attr('data-machineId');
        $this.addClass('sub-select').siblings().removeClass('sub-select');
        $.render($this);
        console.log('渲染的二级页面模板',$this.attr('data-template'))
        console.log('渲染的二级页面机组id',$this.attr('data-machineId'))
    };
    
	$.render = function(_self){
		var currentRender = _self.attr('data-template').trim();
        setTimeout(function(){
        	require([
        	        'artTemplate',
                 	'text!component/pages/'+ currentRender +'/'+ currentRender +'.tpl',
                 	currentRender
                 ],function(template,tpl){
        			var $body = $('body'),
        				isRepeat = false;
                     
        			 $body.find('script').each(function(index,el){
                    	 if ($(el).attr('id') === currentRender + 'Tpl') {
                    		 isRepeat = true;
						}
                     });
        			 //避免重复添加
    				 !isRepeat && $body.append(tpl);
        			 
    				 //渲染右边界面、模拟iframe
                     $('article').find('#mainRight').html(template(currentRender+'Tpl', window[currentRender['data']]));
                     isRepeat && window[currentRender].init();
                 })
        }, 0)//异步渲染模板页面
	}

    new Accordion(".accordion", false)
})(window);