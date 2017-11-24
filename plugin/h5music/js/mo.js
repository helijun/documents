/*
 * mo v0.0.1
 * author : smohan
 * The MIT License (MIT)
 * Copyright (c) 2016 https://smohan.im(net)
 */
(() => {

    'use strict';

    const ArrayProto = Array.prototype

    /**
     * 过滤样式，返回样式数组
     * (classA classB ...) | (classA, classB ...) => [classA, classB]
     * @param className
     * @returns {Array}
     */
    const filterClassName = className => !className ? [] : className.trim().replace(/\s+/, ',').split(',')

    /**
     * 获取元素计算后的样式
     * @param  {HTMLElement} element
     * @return {Object}
     */
    const getComputedStyles = element => element.ownerDocument.defaultView.getComputedStyle(element, null)


    /**
     * CLASSES 样式操作
     * @type {Object}
     */
    const CLASSES = {
        contains(element, className) {
            if (element.classList) {
                return element.classList.contains(className)
            } else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
            }
        },
        add(element, className) {
            filterClassName(className).forEach(name => {
                name = name.trim();
                if (name && !CLASSES.contains(element, name)) {
                    if (element.classList) {
                        element.classList.add(name)
                    } else {
                        element.className += ' ' + name
                        element.className = element.className.trim()
                    }
                }
            });
        },
        remove(element, className) {
            filterClassName(className).forEach(name => {
                name = name.trim();
                if (name && CLASSES.contains(element, name)) {
                    if (element.classList) {
                        element.classList.remove(name)
                    } else {
                        element.className = element.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                        element.className = element.className.trim()
                    }
                }
            });
        },
        toggle(element, className) {
            filterClassName(className).forEach(name => {
                if (element.classList) {
                    return element.classList.toggle(name)
                } else {
                    return CLASSES.contains(element, name) ?
                        CLASSES.remove(element, name) :
                        CLASSES.add(element, name)
                }
            });
        },
    }

    /**
     * 拷贝源对象到目标对象
     * Polyfill https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     * @param target
     * @returns {{}}
     */
    const assign = function(target = {}) {
        target = Object(target)
        for (let i = 1, len = arguments.length; i < len; i++) {
            let source = arguments[i]
            if (source != null) {
                for (let key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key]
                    }
                }
            }
        }
        return target
    }

    const SelectorRegs = {
        id: /^#([\w-]+)$/,
        className: /^\.([\w-]+)$/,
        tagName: /^[\w-]+$/
    }

    /**
     * 获取元素对象集合
     * @param selector 选择器
     * @param context 父级上下文
     * @returns {*}
     */
    const qsa = (selector = '*', context = document) => {
        if (typeof selector === "string") {
            selector = selector.trim()
            let dom = [];
            if (SelectorRegs.id.test(selector)) {
                dom = document.getElementById(RegExp.$1)
                dom = dom ? [dom] : []
            } else if (SelectorRegs.className.test(selector)) {
                dom = context.getElementsByClassName(RegExp.$1)
            } else if (SelectorRegs.tagName.test(selector)) {
                dom = context.getElementsByTagName(selector)
            } else {
                dom = context.querySelectorAll(selector)
            }
            return ArrayProto.slice.call(dom)
        }
        return []
    }


    /**
     * matchSelector兼容模式
     * @param element
     * @param selector
     * @returns {*}
     */
    const matchSelector = (() => {
        const prop = Element.prototype;
        const matchesSelector =
            prop.matches ||
            prop.matchesSelector ||
            prop.mozMatchesSelector ||
            prop.msMatchesSelector ||
            prop.oMatchesSelector ||
            prop.webkitMatchesSelector
        return (element, selector) => matchesSelector.call(element, selector)
    })();

    /**
     * 对象遍历
     * @param object
     * @param callback
     */
    const each = (object, callback) => {
        if (typeof object === "object" && typeof callback === "function") {
            if (Array.isArray(object)) {
                for (let i = 0, len = object.length; i < len; i++) {
                    if (callback.call(object[i], i, object[i]) === false) {
                        break
                    }
                }
            } else if ('length' in object && typeof object.length === "number") { //这地方不太严谨，谨慎使用
                for (let k in object) {
                    if (callback.call(object[k], k, object[k]) === false) {
                        break
                    }
                }
            }
        }
    }

    /**
     * 事件绑定，支持简单事件代理
     * @param element
     * @param eventType
     * @param selector
     * @param callback
     */
    const bind = (element, eventType, selector, callback) => {
        let sel, handler;
        if (typeof selector === "function") {
            handler = selector
        } else if (typeof selector === "string" && typeof callback === "function") {
            sel = selector
        } else {
            return
        }
        if (sel) { //事件代理
            handler = function(e) {
                //todo, 多选择器支持
                const nodes = qsa(sel, element)
                let matched = false
                for (let i = 0, len = nodes.length; i < len; i++) {
                    const node = nodes[i]
                    if (node === e.target || node.contains(e.target)) {
                        matched = node
                        break
                    }
                }
                if (matched) {
                    callback.apply(matched, ArrayProto.slice.call(arguments))
                }
            }
        }

        element.addEventListener(eventType, handler, false)
    }

    /**
     * 事件解绑
     * @param element
     * @param eventType
     * @param callback
     */
    const unbind = (element, eventType, callback) => element.removeEventListener(eventType, callback, false)

    /**
     * 事件触发
     * @param element
     * @param eventName
     */
    const trigger = (element, eventName) => {
        const event = document.createEvent('HTMLEvents')
        event.initEvent(eventName, true, false)
        element.dispatchEvent(event)
    }


    /**
     * 将字面量对象转为URL字符串
     * @param data
     * @returns {string}
     */
    const paramStringify = data => {
        const arr = [];
        let key, value;
        for (key in data) {
            value = data[key]
            if (value) {
                arr.push(key + '=' + value.toString())
            }
        }
        return arr.join('&')
    }

    /**
     * http请求
     * @param options
     */
    const http = (options = {}) => {
        let url = options.url || window.location.href,
            done = options.done || null,
            fail = options.fail || null,
            data = options.data,
            dataString = paramStringify(data),
            method = options.type && /^(get|post)$/i.test(options.type) ? options.type.toUpperCase() : 'GET'
        const xhr = new XMLHttpRequest(),
            headers = options.headers || {}
        headers.accept = "application/json, text/javascript"
        if (method === 'POST') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        } else {
            headers['Content-Type'] = 'application/json; charset=UTF-8'
            url = url.indexOf('?') > -1 ? (url + dataString) : url
            dataString = undefined
        }
        xhr.open(method, url, true)
        for (let i in headers) {
            xhr.setRequestHeader(i, headers[i])
        }
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                let response = xhr.responseText
                try {
                    response = JSON.parse(response)
                } catch (e) {}
                done && done.call(null, response, xhr)
            } else {
                fail && fail.call(xhr.status, 'error', xhr)
            }
        }
        xhr.send(dataString)
    }

    const utils = {
        $: (selector, context) => qsa(selector, context)[0],
        $$: qsa,
        matchSelector,
        addClass: CLASSES.add,
        removeClass: CLASSES.remove,
        hasClass: CLASSES.contains,
        toggleClass: CLASSES.toggle,
        getStyles: getComputedStyles,
        assign: Object.assign || assign,
        each,
        bind,
        unbind,
        trigger,
        http
    }

    window.MoUtils = utils

})();