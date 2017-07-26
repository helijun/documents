/**
 * liui js v1.1.0
 * @author helijun
 * description 依赖jquery或者zepto，集成了
 * 弹框组件
 */
;(function($){
    var $body = $('body');
    
    $.overflowHide = function(){
        $body.css({'overflow':'hidden'})
    }
    $.overflowAuto = function(){
        $body.css({'overflow':'auto'})
    }

    $.successShow = function(text,closeTime){
        var success = [
            '<section class="li-alert-success">',
                '<div class="li-rotate li-icon-success"></div>',
                '<p>'+ (text || '成功！') +'</p>',
            '</section>'
        ]
        $body.append(success.join(''))

        setTimeout(function(){
            $('.li-alert-success').remove();
        },closeTime || 1500)
    }

    $.loadingShow = function(text){
        var loading = [
            '<section class="li-alert-loading">',
                '<div class="li-rotate li-icon-loading"></div>',
                '<p>'+ (text || '努力加载中... ') +'</p>',
            '</section>'
        ]
        $body.append(loading.join(''))
    }
    $.loadingHide = function(){
        $('.li-alert-loading').remove()
    }

    $.tip = function(opts){
        var defaultOpts = {
                content: '',//内容  文字 || html
                type: 'info',//提示类型
                closeTime: 2000,
                callback: function(){},
                effect: 'fadeIn'
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        if(opts.type === 'info'){
            opts.content = '<span>'+ opts.content +'</span>'
        }
     
        $body.append('<div class="li-tips-'+ opts.type +'" id="tipsMain">'+ opts.content +'</div>');

        setTimeout(function(){
            $('#tipsMain').remove();
            opts.callback && opts.callback();
        },opts.closeTime)
    }

    $.dialog = function(opts){
        var defaultOpts = {
                title: '',//标题
                content: '',//内容  文字 || html
                height: 20,//默认屏幕（父级）的50%
                width: 60,//默认屏幕（父级）的80%
                effect: 'fadeIn',//出现效果，默认下跌落
                delayTime: 500,//效果延时时间，默认.5s
                buttons: [
                    {
                        text: '确定',
                        color: '#ff1c0b',
                        onclick: function(){}
                    },
                    {
                        text: '取消',
                        color: '',
                        onclick: function(){}
                    }
                ],
                before : function() {
                    console.log('before')
                }, 
                close: function() {
                    console.log('close')
                }
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        var titleHtml = '',
            contentHtml = '',
            btnHtml = '',
            btnClass = 'li-col-' + parseInt(100/opts.buttons.length);

        //标题
        opts.title && (titleHtml = '<div class="li-dialog-title">'+ opts.title +'</div>')

        //内容
        if(opts.type === 'transparent'){
            contentHtml = opts.content;
        }else{
            contentHtml = '<div class="li-dialog-txt">'+ opts.content +'</div>';
        }

        //按钮
        opts.buttons.forEach(function(element,i){
            btnHtml += '<div class='+ btnClass +' style="color:'+ element.color +'" id="elBtn'+ i +'">'+ element.text +'</div>'
        })

        var alertHtml = [
            '<section class="li-dialog" id="dialogMain">',
                '<div class="li-mask" id="alertMask"></div>',
                '<div class="li-dialog-content '+ opts.type +'" id="dialogContent">',
                titleHtml,
                contentHtml,
                '<div class="li-row li-dialog-footer">'+ btnHtml +'</div>',
                '</div>',
            '</section>'
        ]
        $body.append(alertHtml.join(''))
        $.overflowHide();

        var $dialogContent = $('#dialogContent'),
            $dialogMain = $('#dialogMain');

        $dialogContent.css({
            'height': opts.height + '%',
            'top': (100 - opts.height)/2 + '%',
            'width': opts.width + '%',
            'left': (100 - opts.width)/2 + '%'
        })

        $('#alertMask').css({
            '-webkit-animation-duration' : opts.delayTime/1000 + 's'
        })

        var effect = {
            'fadeIn': 'top',
            'fadeInStart': '-100%',
            'fadeInValue': (100 - opts.height)/2 + '%',
            'sideLeft': 'left',
            'sideLeftStart': '-100%',
            'sideLeftValue': (100 - opts.width)/2 + '%',
            'scale': '-webkit-transform',
            'scaleStart': 'scale(0)',
            'scaleValue': 'scale(1)',
            'info': '-webkit-transform',
            'infoStart': 'scale(1.2)',
            'infoValue': 'scale(1)'
        }

        setTimeout(function(){
            $dialogContent.css(effect[opts.effect],effect[opts.effect + 'Start']).show();

            setTimeout(function(){
                $dialogContent.css(effect[opts.effect], effect[opts.effect + 'Value'])
                opts.close && opts.close()
            },10)
        },opts.delayTime)

        //按钮事件
        opts.buttons.forEach(function(element,i){
            $('#elBtn'+ i).on('click',function(){
                element.onclick();
            })       
        })
    }

    $.alert = function(opts){
        var defaultOpts = {
                title: '',//标题
                content: '',//内容  文字 || html
                height: 50,//默认屏幕（父级）的50%
                width: 80,//默认屏幕（父级）的80%
                type: 'default',//弹框类型，transparent 透明、没有边距，铺满
                effect: 'fadeIn',//出现效果，默认下跌落
                delayTime: 500,//效果延时时间，默认.5s
                autoClose: false,//自动关闭
                autoTime: 2000, //自动关闭时间默认2s
                autoEffect: 'default',//关闭效果
                buttons: [
                    {
                        text: '知道了',
                        color: '#ff1c0b',
                        onclick: function(){}
                    }
                ],
                okShow: false,
                ok: '确定',
                okCallback: function(){},//确定回调
                cancelShow: false,
                cancel: '取消',
                cancelCallback: function(){},//取消回调
                before : function() {
                    console.log('before')
                }, 
                close: function() {
                    console.log('close')
                },
                blankclose: false//空白处点击关闭
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        opts.before && opts.before();

        var titleHtml = '',
            contentHtml = '',
            btnHtml = '',
            btnClass = 'li-col-' + parseInt(100/opts.buttons.length);

        //标题
        opts.title && (titleHtml = '<div class="li-dialog-title">'+ opts.title +'</div>')

        //内容
        if(opts.type === 'transparent'){
            contentHtml = opts.content;
        }else{
            contentHtml = '<div class="li-dialog-txt">'+ opts.content +'</div>';
        }

        //按钮
        opts.buttons.forEach(function(element,i){
            btnHtml += '<div class='+ btnClass +' style="color:'+ element.color +'" id="elBtn'+ i +'">'+ element.text +'</div>'
        })

        var alertHtml = [
                '<section class="li-dialog" id="dialogMain">',
                    '<div class="li-mask" id="alertMask"></div>',
                    '<div class="li-dialog-content '+ opts.type +'" id="dialogContent">',
                    titleHtml,
                    contentHtml,
                    '<div class="li-row li-dialog-footer">'+ btnHtml +'</div>',
                    '</div>',
                '</section>'
            ]

        $body.append(alertHtml.join(''))
        $.overflowHide();

        var $dialogContent = $('#dialogContent'),
            $dialogMain = $('#dialogMain');

        $dialogContent.css({
            'height': opts.height + '%',
            'top': (100 - opts.height)/2 + '%',
            'width': opts.width + '%',
            'left': (100 - opts.width)/2 + '%'
        })

        $('#alertMask').css({
            '-webkit-animation-duration' : opts.delayTime/1000 + 's'
        })

        var effect = {
            'fadeIn': 'top',
            'fadeInStart': '-100%',
            'fadeInValue': (100 - opts.height)/2 + '%',
            'sideLeft': 'left',
            'sideLeftStart': '-100%',
            'sideLeftValue': (100 - opts.width)/2 + '%',
            'scale': '-webkit-transform',
            'scaleStart': 'scale(0)',
            'scaleValue': 'scale(1)',
            'info': '-webkit-transform',
            'infoStart': 'scale(1.2)',
            'infoValue': 'scale(1)'
        }

        setTimeout(function(){
            $dialogContent.css(effect[opts.effect],effect[opts.effect + 'Start']).show();

            setTimeout(function(){
                $dialogContent.css(effect[opts.effect], effect[opts.effect + 'Value'])
                opts.close && opts.close()
            },10)
        },opts.delayTime)

        if(opts.blankclose) {
            $('.li-mask').on('click',function(event){
                $.alertClose();
                opts.close && opts.close()
                event.stopPropagation()
                event.preventDefault()
            })

            $('.li-dialog-content').on('click',function(event){
                event.stopPropagation()
                event.preventDefault()
            })
        }

        if(opts.autoClose && opts.autoTime > 0) {
            setTimeout(function(){$.alertClose()},opts.autoTime)
            opts.close && opts.close()
        }

        //按钮事件
        opts.buttons.forEach(function(element,i){
            $('#elBtn'+ i).on('click',function(){
                element.onclick();
            })       
        })
    }

    $.alertClose = function(){
        $('#dialogMain').remove();
        $.overflowAuto();
    }

    $.fullAlert = function(opts){
        var defaultOpts = {
                content: '',//内容  文字 || html
                before : function() {
                    console.log('before')
                }, 
                after: function(){
                    console.log('after')
                },
                close: function() {
                    console.log('close')
                }
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        opts.before && opts.before();

        var alertHtml = [
                '<section class="li-full-alert" id="fullAlert">',
                    opts.content,
                '</section>'
            ]

        $body.append(alertHtml.join(''))

        var $fullAlert = $('.li-full-alert');

        setTimeout(function(){
            $fullAlert.css({'bottom':'0%'});
            opts.after() && opts.after()
            //$.overflowHide();
        },opts.delayTime)

        $('.fullalert-close').off().on('click',function(event){
            $.fullAlertClose()
        })
    }

    $.fullAlertClose = function(){
        var $fullAlert = $('.li-full-alert');
        $fullAlert.css({'bottom':'-100%'})
        setTimeout(function(){
            $fullAlert.remove();
            //$.overflowAuto();
        },1000)
    }

    $.actionSheet = function(opts){
        var defaultOpts = {
                title: '',//标题
                content: '',//内容  文字 || html
                class: '',//特殊样式、为区分一个页面多个actionsheet 
                effect: 'popup',//出现效果，默认下跌落
                content: [
                    {
                        text: '知道了',
                        value: '-1',
                        color: '#ff1c0b',
                        onclick: function(){}
                    }
                ],
                delayTime: 100,//效果延时时间，默认.5s
                before : function() {
                    console.log('before')
                }, 
                after: function(){
                    console.log('after')
                },
                close: function() {
                    console.log('close')
                },
                blankclose: false//空白处点击关闭
            }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }

        opts.before && opts.before();

        var titleHtml = '',
            contentHtml = '',
            btnHtml = '',
            btnClass = 'li-col-100';

        //标题
        opts.title && (titleHtml = '<div class="li-sheet-title">'+ opts.title +'</div>')

        //sheets
        opts.content.forEach(function(element,i){
            contentHtml += '<div class="li-col-100 li-sheet-elment li-bottom" data-value='+ element.value +' style="color:'+ (element.color || 'black') +'">'+ element.text +'</div>';
        })

        console.log('opts.content',opts.content)
        console.log('contentHtml',contentHtml)
        
        var alertHtml = [
                '<section class="li-sheet" id="sheetMain">',
                    '<div class="li-mask" id="alertMask"></div>',
                    '<div class="li-sheet-content '+ opts.class +'" id="sheetContent">',
                    titleHtml,
                    contentHtml,
                    '</div>',
                '</section>'
            ]

        $body.append(alertHtml.join(''))

        var $sheetContent = $('#sheetContent'),
            $sheetMain = $('#sheetMain');

        setTimeout(function(){
        	$sheetContent.css({'bottom':'0%'})
            opts.after() && opts.after()
        },opts.delayTime)

        if(opts.blankclose) {
            $('#sheetMain').on('click',function(event){
            	$sheetMain.remove()
                opts.close && opts.close()
                event.stopPropagation()
                event.preventDefault()
            })

            $('#sheetContent').on('click',function(event){
                event.stopPropagation()
                event.preventDefault()
            })
        }
    }


    $.tabs = function(opts){
        $('.li-tabs').on('click','.li-tabs-node',function(event){
            var current = $(event.currentTarget),
                $content = $('.li-tabs-content'),
                $contentActive = $('.li-tabs-content[data-node='+ current.attr('data-node') +']');
            if(current.children('span').hasClass('active')) return;
            current.children('span').addClass('active');
            $content.removeClass('active');
            $contentActive.addClass('active');
            current.siblings().children('span').removeClass('active');
            eval(opts[current.attr('data-node')])();
            console.log('点击了节点',current.attr('data-node'))
        })
    }

})(jQuery || Zepto)