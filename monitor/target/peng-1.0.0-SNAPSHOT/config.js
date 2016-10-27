require.config({
	baseUrl : "/",
    paths: {
    	jquery:'plugin/jquery/jquery-3.1.0.min',
    	jquip:'plugin/jquip/jquip.all.min',//jquery精简版
        fastclick: 'plugin/jquery/fastclick',
        common: 'dist/js/common',
        page: 'plugin/jsBrigde/page',//js跟原生交互、page.js
        formValidate: 'plugin/validate/form-validate',//表单验证插件、from github，参考jquery validate，经过改造
        rules: 'plugin/validate/rules',//验证相关的正则表达式
        
        jqueryWeUI: 'plugin/jqweui/js/jquery-weui.min',
        jqueryLazyload: 'plugin/lazyLoad/jquery.lazyload',//图片懒加载
        
        mdater: 'plugin/mdater/js/jquery.mdater.min',//日期选择插件，from github，经过改造
        dateFormat: 'utils/dateFormat.min',//日期格式化工具组件，自己封装、轻量级
        moment: 'plugin/moment/moment-2.14.1.min',//moment()日期插件，强大、重量级
        
        move: 'plugin/move/move.min'//css3js调用组件
    },
    shim: {
        jqueryWeUI: {
            deps: ['jquery'],
            exports: '$'
        },
        jqueryLazyload: {
            deps: ['jquery'],
            exports: '$'
        }
    }
});