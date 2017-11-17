/**
 * 先封装一个ajax
 * @return {[type]} [description]
 */
;(function(){

    /*
    定义一个JS类
     function li(selector){
        console.log('selector',selector);
        //return L.init(selector);
    }

    var L = {
        init: function(selector){
            console.log('selector',selector)
            return document.body;
        },
    }

    工厂函数
    function L(selector){
        return new li(selector);
    }

    li.prototype = {
        setTime: function(body){
            console.log(body)
        }
    }*/



    //工厂函数
    function li(selector){
        return new I.init(selector)
    }

    var I = {
        //定义一个抽象js类
        init: function(selector){
            I.options.selector = selector;
            console.log('selector',I.options.selector)
            //return document.body
            ///return document.body;
        },
        options: {
            selector : null,
        }
    }

    I.init.prototype = {
        getOptions: function(){
            console.log('I.options.selector',I.options.selector)
        },
        html: function(html){
            var selector = I.options.selector;
            if (selector.charAt(0) === '.') {
                document.getElementByClass(selector.replace('.','')).innerHTML = html;
            }else if(selector.charAt(0) === '#'){
                document.getElementById(selector.replace('#','')).innerHTML = html;
            }else{
                document.getElementsByTagName(selector)[0].innerHTML = html;
            }
        },
        append: function(html){
            var selector = I.options.selector;
            console.log('append',selector)
        }
    }
/*
    console.log(li('body').html('<a href="http://www.liliangel.cn">网站</a>'))
    console.log(li('body').append());*/


    /**
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    li.toArray = function(obj){
        return Array.prototype.slice.call(obj, 0);
    }

    /**
     * unique array with objects based on a key (like 'id') or just by the array's value
     * @param {Array} src [{id:1},{id:2},{id:1}]
     * @param {String} [key]
     * @param {Boolean} [sort=False]
     * @returns {Array} [{id:1},{id:2}]
     */
    li.uniqueArray = function(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    }

    li.ajax = function(opts){
        var defaultOpts = {
            url: '', //ajax 请求地址
            type : 'GET', //请求的方法,默认为GET
            data : null, //请求的数据
            contentType : '',//请求头
            dataType : 'json', //请求的类型,默认为json
            async : true, //是否异步，默认为true
            timeout: 5000, //超时时间，默认5秒钟
            before : function() {
                console.log('before')
            }, //发送之前执行的函数
            error: function() {
                console.log('error')
            }, //错误执行的函数
            success: function() {
                console.log('success')
            } //请求成功的回调函数
        }

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i];
            }
        }

        var xhr = null;
        
        var ajax = {
            init: function(){
                opts.before();
                ajax.getData();
                opts.dataType === "jsonp" ? ajax.createJsonp() : ajax.createXHR();
            },

            options: {
                timeoutFlag: null, //超时标识
                timeoutBool: false //是否请求超时
            },

            //解析参数数据
            getData: function(){
                var name, value;
                if (opts.data) {
                    if (typeof opts.data === "string") {
                        opts.data = opts.data.split("&");
                        for (var i = 0, len = opts.data.length; i < len; i++) {
                            name = opts.data[i].split("=")[0];
                            value = opts.data[i].split("=")[1];
                            opts.data[i] = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                        }
                        opts.data = opts.data.replace("/%20/g", "+");
                    } else if (typeof opts.data === "object") {
                        var arr = [];
                        for (var name in opts.data) {
                            var value = opts.data[name].toString();
                            name = encodeURIComponent(name);
                            value = encodeURIComponent(value);
                            arr.push(name + "=" + value);
                        }
                        opts.data = arr.join("&").replace("/%20/g", "+");
                    }

                    //使用GET方法或JSONP，则手动添加到URL中
                    if (opts.type === "GET" || opts.dataType === "jsonp") {
                        opts.url += opts.url.indexOf("?") > -1 ? opts.data : "?" + opts.data;
                    }
                }
            },

            //创建jsonp
            createJsonp: function(){
                var script = document.createElement("script"),
                    timeName = new Date().getTime() + Math.round(Math.random() * 1000),
                    callback = "jsonp_" + timeName;

                window[callback] = function(data) {
                    clearTimeout(ajax.options.timeoutFlag);
                    document.body.removeChild(script);
                    try {
                        data && (data = JSON.parse(data));
                    } catch (e) {
                        console.error('ajax error for json parse responseText');
                    }  
                    ajax.success(data);
                }
                script.src = url +  (url.indexOf("?") > -1 ? "" : "?") + "callback=" + callback;
                script.type = "text/javascript";
                document.body.appendChild(script);
                ajax.timeout(callback, script);
            },

            //设置请求超时
            timeout: function(callback, script){
                if (opts.timeout !== undefined) {
                    ajax.options.timeoutFlag = setTimeout(function() {
                        if (opts.dataType === "jsonp") {
                            delete window[callback];
                            document.body.removeChild(script);
                        } else {
                            ajax.options.timeoutBool = true;
                            xhr && xhr.abort();
                        }
                    }, opts.timeout);
                }
            },

            //兼容IE6，XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的
            getXHR: function(){
                
                if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                } else {
                    //遍历IE中不同版本的ActiveX对象
                    var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
                    for (var i = 0; i < versions.length; i++) {
                        try {
                            var version = versions[i] + ".XMLHTTP";
                            return new ActiveXObject(version);
                        } catch (e) {
                            console.log('error ajax',e)
                        }
                    }
                }
            },

            //创建XHR
            createXHR: function(){
                //创建对象
                xhr = ajax.getXHR();
                xhr.open(opts.type, opts.url, opts.async);
                //设置请求头
                if (opts.type === "POST" && !opts.contentType) {
                    //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                } else if (opts.contentType) {
                    xhr.setRequestHeader("Content-Type", opts.contentType);
                }
                //添加监听
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (opts.timeout !== undefined) {
                            //由于执行abort()方法后，有可能触发onreadystatechange事件，
                            //所以设置一个ajax.options.timeoutBool标识，来忽略中止触发的事件。
                            if (ajax.options.timeoutBool) {
                                return;
                            }
                            clearTimeout(ajax.options.timeoutFlag);
                        }
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        	var responseText = xhr.responseText;
                        	try {
                        		xhr.responseText && (responseText = JSON.parse(responseText));
                                opts.success(responseText);
							} catch (e) {
								console.error('ajax error for json parse responseText');
                                //opts.error(xhr);
							}           
                        } else {
                            opts.error(xhr);
                        }
                    }
                };
                //发送请求
                xhr.send(opts.type === "GET" ? null : opts.data);
                ajax.timeout(); //请求超时    
            }
        }
        ajax.init();
    }

    // AMD && CMD
    if(typeof define === 'function'){
        define(function(){
            return li;
        });
    // CommonJS
    }else if(typeof module !== "undefined" && module !== null){
        module.exports = li;
    // window
    }else{
        window.li = li;
    }
})()