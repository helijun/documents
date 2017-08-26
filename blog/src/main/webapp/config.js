//何立军的个人网站唯一全局变量
window.liliangel = {
    version: (new Date()).getTime(),//开发环境
    errorTips: '哎哟，网络好像有点问题了..',
    _ROOT: '',//测试
    _XHR: '/rest/',
    _CORS: '/cors/',
    _STATIC: '',
    _WX: ''
}

require.config({
	urlArgs: "v=" +  liliangel.version,
    baseUrl : "/",
    paths: {
    	//必须插件
        jquery:'plugin/jquery/jquery-1.9.0.min',
        common: 'dist/js/common',
        artTemplate: 'plugin/template/artTemplate-3.0',
        artDialog: 'plugin/artDialog/dialog-min',
        jqueryWeUI: 'plugin/jqweui/js/jquery-weui.min',
        bootstrap: 'plugin/bootstrap-3.3.5-dist/js/bootstrap.min',

        li: 'plugin/li/li-1.0.0',//先自己封装一个ajax
        calconverter: 'plugin/li/calendar-converter',//弄公历互相转换

        mdater: 'plugin/mdater/js/jquery.mdater.min',
        dateFormat: 'utils/date/dateFormat'
    },
    shim: {
    	jqueryWeUI: {
            deps: ['jquery'],
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery'],
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
        artDialog: ['css!plugin/artDialog/ui-dialog'],
        mdater: ['css!plugin/mdater/css/jquery.mdater.min']
    },
    waitSeconds: 15
});

