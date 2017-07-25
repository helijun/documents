"use strict";
var VERSION = (new Date()).getTime();//开发，测试环境 || 20170517;//生产环境
var H5TOKEN = 'h5_token';//h5（微信)平台证书缓存key名称

//url地址
var URL = {
    BASE: 'http://' + window.location.host,//域名url，如本地则是为空
    PIC: 'http://static.ssqifu.cn',//图片服务器地址、暂时为本目录
    CORS: '/portal/api/cors',//跨域地址
    SSO: ''//单点登录
};

//接口地址
var API = {
    
};

//接口状态码
var CODE = {
    FAIL: 0, //失败
    SUCCESS: 1, //成功
};

//相关提示信息
var MSG = {
    success: '成功',
    addSuccess: '添加成功',
    updateSuccess: '保存成功',
    noData: '没有数据',
    uploadImageError: '上传图片失败，请刷新页面后重试！',
    systemError: '系统异常'
};

require.config({
	urlArgs: "v=" +  VERSION,
    baseUrl : "/static",
    paths: {
    	//必须插件
        jquery:'plugin/jquery/jquery-1.9.0.min',
        fastclick: 'plugin/jquery/fastclick',
        underscore: 'plugin/underscore/underscore',
        common: 'js/common',
        jqueryWeUI: 'plugin/jqweui/js/jquery-weui',
        swiper: 'plugin/jqweui/js/swiper',
        dateFormat: 'utils/date/dateFormat',
        amap: "http://webapi.amap.com/maps?v=1.3&key=fdce27a4cc7a66646d6c99571828778d"　　　　
    },
    shim: {
    	jqueryWeUI: {
            deps: ['jquery','css!plugin/jqweui/css/jquery-weui'],
            exports: '$'
        },
        dateFormat: {
            deps: ['jquery'],
            exports: '$'
        },
        common: {
            deps: ['jquery'],
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    },
    waitSeconds: 15
});

