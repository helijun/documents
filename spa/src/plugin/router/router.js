(function(win, $){
    window.onhashchange = function () {
        console.log('hash值改变')
        startRouter();
    };
    window.onpopstate = function () { //后退时，不添加随机字符，不然会导致死循环
        console.log('触发了onpopstate')
        router.isNotBack = false;
    };

    function spaRouter() {
        
    }
    spaRouter.prototype.config = function (config) {
        var self = this;
        this.baseUrl = config.baseUrl;
        this.enterCallback = config.enterCallback;
        this.routerMap = config.router;
        this.mainView = config.view || 'body';
        this.errorTplId = config.errorTplId;
        this.catchHtmls = [];
        this.isNotBack = true;//是否为后退
        this.isNotLook = true;//是否有权限访问
        startRouter();
    };
    var paramStack = [];
    spaRouter.prototype.getParam = function (id) {
        if (id == 'all') {
            return paramStack;
        }

        return paramStack[id];
    };

    spaRouter.prototype.setParam = function (obj) {
        paramStack = obj;
    };
    spaRouter.prototype.delParam = function (id) {
        if (typeof id === 'undefined') {
            return false;
        }
        var index = 0;
        $.each(paramStack, function (i, e) {
            if (e.id === id) {
                index = i;
            }
        });
        $.each(paramStack, function (i, e) {
            if (i > index) {
                paramStack[i - 1] = e;
            }
        });
    };
    spaRouter.prototype.clear = function (id) {
        var index = 0;
        console.log('清除了所有的stack')
        paramStack = [];
    };

    spaRouter.prototype.stringify = function (routerUrl, paramObj) {
        var paramStr = '', hash;
        for (var i in paramObj) {
            paramStr += i + '=' + encodeURIComponent(paramObj[i]) + '&';
        }
        if (paramStr === '') {
            hash = routerUrl;
        }
        else {
            paramStr = paramStr.substring(0, paramStr.length - 1);
            hash = routerUrl + '?' + paramStr;
        }
        return hash;
    };
    spaRouter.prototype.parse = function (routerHash) {
        var hash = typeof routerHash === 'undefined' ? location.hash : routerHash;
        var obj = {
            url: '',
            param: {}
        };
        var param = {}, url = '';
        var pIndex = hash.indexOf('?');
        if (hash === '') {
            return obj;
        }

        if (pIndex > -1) {
            url = hash.substring(1, pIndex);
            var paramStr = hash.substring(pIndex + 1);
            var paramArr = paramStr.split('&');

            $.each(paramArr, function (i, e) {
                var item = e.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if (key !== '') {
                    param[key] = decodeURIComponent(val);
                }


            });
        }
        else {
            url = hash.substring(1);
            param = {};
        }
        return {
            url: url,
            param: param
        };
    };
    //param显示传参，如页面需要单独刷新，无法使用上面的隐式传参
    spaRouter.prototype.to = function (component, param, target, callback) {
        var paramStr = '';
        if (param) {
            for (var i in param) { //arguments方式无法获取key名称，妥协使用一个对象来代替传入多个参数
                paramStr += i + '=' + param[i] + '&'
            }
        }

        var url = '#' + component + '?' + paramStr + 'v=' + randomString();
        if (target && target == '_blank'){
            window.open(url, target);
            startRouter(callback);
        }else{
            pushState(url)
            startRouter(callback);
        }
    }

    spaRouter.prototype.getUrlParameter = function (name) {
        return getUrlParameter(name);
    }

    function startRouter(callback) {
        try {
            var routeObj = router.parse(location.hash);
            if (routeObj.url) {
                routeObj.role = router.routerMap[routeObj.url].role || '';
            }

            router.enterCallback && router.enterCallback(routeObj);
            if (router.isNotLook) {
                routerAction(routeObj, callback);
            }
        } catch (error) {
            alert('错误的地址')
            console.error(error)
        }
    }

    //添加随机码
    function addRandom() {
        var newUrl = window.location.href;
        if (newUrl.indexOf('v=') <= -1) {
            //newUrl = newUrl.split('v=')[0] + 'v=' + randomString()
            if (newUrl.indexOf('?') > -1) {
                newUrl += '&v=' + randomString()
            } else {
                newUrl += '?v=' + randomString()
            }

            pushState(newUrl)
        }
    }

    function pushState(newUrl) {
        if (!!(window.history && history.pushState)) {
            console.log('newUrl', newUrl)
            history.pushState(null, null, newUrl);
        } else {
            // TODO Polyfill库History.js
        }
    }

    function getUrlParameter(name) {
        try {
            var parameterArr = window.location.href.split('?')[1].split('&v=')[0].split('&');
            var newList = {};
            for (var i in parameterArr) {
                newList[parameterArr[i].split('=')[0]] = parameterArr[i].split('=')[1]
            }
            return newList[name]
        } catch (error) {
            console.error('解析参数时出现异常')
        }
        
    }

    function routerAction(routeObj, callback) {

        var routerItem = router.routerMap[routeObj.url];

        console.log('routeObj.url', routeObj.url)
        console.log('router.routerMap', router.routerMap)
        console.log('this.baseUrl', router.baseUrl)
        console.log('this.routerItem', routerItem)

        if (typeof routerItem === 'undefined') {
            var defaultsRoute = router.routerMap.defaults;
            routerItem = router.routerMap[defaultsRoute];
            location.hash = defaultsRoute + '?v=' + randomString();
            return false;
        }

        if (!routerItem.templateUrl){
            loadScript(routerItem.controller, routerItem, callback);    
        }else {
            var isExitCatch = isRouterUrlExitsInCatchHtmls(routerItem.templateUrl);
            if (isExitCatch) {
                loadPageHtmlFromCatch(routerItem, callback);
            } else {
                fetchHtmlFromServer(routerItem, callback);
            }
        }
    }

    function fetchHtmlFromServer(routerItem, callback) {
        $.ajax({
            type: 'GET',
            async: false,
            url: router.baseUrl + routerItem.templateUrl,
            dataType: 'html',
            success: function (data, status, xhr) {
                $(router.mainView).html(data);
                loadScript(routerItem.controller, callback);
                saveHtmlsToCatch(routerItem.templateUrl, data);
            },
            error: function (xhr, errorType, error) {
                if ($(router.errorTplId).length === 0) {
                    return false;
                }
                var errHtml = $(router.errorTplId).html();
                errHtml = errHtml.replace(/{{errStatus}}/, xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/, xhr.responseText);
                $(router.mainView).html(errHtml);
            }
        });
    }

    function loadPageHtmlFromCatch(routerItem, callback) {
        var htmls = getHtmlsFromCatch(routerItem.templateUrl);
        $(router.mainView).html(htmls);
        loadScript(routerItem.controller, callback);
    }

    function getHtmlsFromCatch(routerUrl) {
        for (var i = 0, e; i < router.catchHtmls.length; i++) {
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
        for (var i = 0, e; i < router.catchHtmls.length; i++) {
            e = router.catchHtmls[i];
            if (e.routerUrl === routerUrl) {
                return true;
            }
        }
        return false;
    }

    function loadScript(src, routerItem, callback) {
        require([src], function (loadFun) {
            loadFun();

            callback && callback(routerItem);
        })

        router.isNotBack && addRandom(); //添加随机码
    }

    function randomString(len) {
        　　len = len || 6;
        　　var $chars = 'abcdefghijklmnopqrstuvwxyz';
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
    }

    win.router = new spaRouter();
})(window, jQuery);