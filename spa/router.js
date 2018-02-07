(function(){
    function spaRouter(){
        
    }
    spaRouter.prototype.start = function(config){
        var self = this;
        this.baseUrl = config.baseUrl;
        this.enterCallback = config.enterCallback;
        this.routerMap = config.router;
        this.mainView = config.view;
        this.errorTemplateId = config.errorTemplateId;
        this.catchHtmls = [];
        startRouter();
        window.onhashchange = function(){
            startRouter();
        };
    };
    var messageStack = [];
    // {
    //     'id': 'home_bindcard',
    //     'content': {
    //     }
    // }
    spaRouter.prototype.getMessage = function(id){
        var msg = {};
        $.each(messageStack,function(i,e){
            if(e.id===id){
                msg = e;
            }
        });
        return msg;
    };

    spaRouter.prototype.setMessage = function(obj){
        var _obj = JSON.parse(JSON.stringify(obj));
        $.each(messageStack,function(i,e){
            if(e.id===_obj.id){
                e = _obj;
                return false;
            }
        });
        messageStack.push(_obj);
    };
    spaRouter.prototype.delMessage = function(id){
        if(typeof id==='undefined'){
            return false;
        }
        var index = 0;
        $.each(messageStack,function(i,e){
            if(e.id===id){
                index = i;
            }
        });
        $.each(messageStack,function(i,e){
            if(i>index){
                messageStack[i-1] = e;
            }
        });
    };
    spaRouter.prototype.clearMessage = function(id){
        var index = 0;
        messageStack = [];
    };
    
    spaRouter.prototype.stringify = function(routerUrl,paramObj){
        var paramStr='' ,hash;
        for(var i in  paramObj){
            paramStr += i + '=' + encodeURIComponent(paramObj[i]) + '&';
        }
        if(paramStr === ''){
            hash = routerUrl;
        }
        else{
            paramStr = paramStr.substring(0,paramStr.length-1);
            hash = routerUrl + '?' + paramStr;
        }
        return hash;
    };
    spaRouter.prototype.parse = function(routerHash){
        var hash = typeof routerHash ==='undefined'?location.hash:routerHash;
        var obj = {
            url:'',
            param: {}
        };
        var param = {},url='';
        var pIndex = hash.indexOf('?');
        if(hash===''){
            return obj;
        }

        if(pIndex>-1){
            url = hash.substring(1,pIndex);
            var paramStr = hash.substring(pIndex+1);
            var paramArr = paramStr.split('&');
            
            $.each(paramArr,function(i,e){
                var item = e.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if(key!==''){
                    param[key] = decodeURIComponent(val);
                }
                

            });
        }
        else{
            url = hash.substring(1);
            param = {};
        }
        return {
            url:url,
            param: param
        };
    };
    function startRouter() {
        router.enterCallback && router.enterCallback();

        var routeObj = router.parse(location.hash);
        routerAction(routeObj);
    }

    function addRandom() {
        var newUrl = window.location.href;
        if (newUrl.indexOf('v=') <= -1) {
            //newUrl = newUrl.split('v=')[0] + 'v=' + randomString()
            if (newUrl.indexOf('?') > -1) {
                newUrl += '&v=' + randomString()
            } else {
                newUrl += '?v=' + randomString()
            }
        }

        if (!!(window.history && history.pushState)) {
            console.log('newUrl', newUrl)
            history.pushState(null, null, newUrl);
        } else {
            // TODO Polyfill库History.js
        }
    }
    function routerAction (routeObj){
        var routerItem = router.routerMap[routeObj.url];
        console.log('this.baseUrl', router.baseUrl)
        console.log('this.routerItem', routerItem)
        
        if(typeof routerItem==='undefined'){
            var defaultsRoute = router.routerMap.defaults;
            routerItem = router.routerMap[defaultsRoute];
            location.hash = defaultsRoute + '?v=' + randomString();
            return false;
        }
        var isExitCatch = isRouterUrlExitsInCatchHtmls(routerItem.templateUrl);
        if (isExitCatch) {
            loadPageHtmlFromCatch(routerItem);
        } else {
            fetchHtmlFromServer(routerItem);
        }
        
    }
    function fetchHtmlFromServer(routerItem) {
        $.ajax({
            type: 'GET',
            async: false,
            url: router.baseUrl + routerItem.templateUrl,
            dataType: 'html',
            success: function(data, status, xhr){
                $(router.mainView).html(data);
                loadScript(routerItem.controller);
                saveHtmlsToCatch(routerItem.templateUrl, data);
            },
            error: function(xhr, errorType, error){
                if($(router.errorTemplateId).length===0){
                    return false;
                }
                var errHtml = $(router.errorTemplateId).html();
                errHtml = errHtml.replace(/{{errStatus}}/,xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/,xhr.responseText);
                $(router.mainView).html(errHtml);
            }
        });
    }
    function loadPageHtmlFromCatch(routerItem) {
        var htmls = getHtmlsFromCatch(routerItem.templateUrl);
        $(router.mainView).html(htmls);
        loadScript(routerItem.controller);
    }
    function getHtmlsFromCatch(routerUrl) {
        for(var i=0,e;i<router.catchHtmls.length;i++) {
            e = router.catchHtmls[i];
            if (e.routerUrl === routerUrl) {
                return e.htmls;
            }
        }
        return '';
    }

    function saveHtmlsToCatch(routerUrl, htmls) {
        var obj = {
            routerUrl: routerUrl,
            htmls: htmls,
        };
        router.catchHtmls.push(obj);
    }

    function isRouterUrlExitsInCatchHtmls(routerUrl) {
        for(var i=0,e;i<router.catchHtmls.length;i++) {
            e = router.catchHtmls[i];
            if (e.routerUrl === routerUrl) {
                return true;
            }
        }
        return false;
    }
    
    function loadScript(src, callback) {
        
        var script = document.createElement('script'),
            loaded;
        script.setAttribute('src', router.baseUrl + src);
        script.onreadystatechange = script.onload = function() {
            script.onreadystatechange = null;
            document.documentElement.removeChild(script);
            script = null;
            if (!loaded) {
                if(typeof callback==='function')
                    callback();
            }
            loaded = true;
        };
        document.documentElement.appendChild(script);
        addRandom(); //添加随机码
    }

    function randomString(len) {
    　　len = len || 6;
    　　var $chars = 'abcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }

    window.router = new spaRouter();
})();