//禾思科技唯一全局变量
var ENV = {
    VERSION: (new Date()).getTime(), //开发，测试环境
    API: '/', //配合nginx跨域，所有ajax api前缀
    FILE_URL: '/',//图片上传地址
    //PAGE: '/meeting/', //页面地址
    PAGE: '/' //页面、js资源、图片地址
}

//js路径配置项
require.config({
    urlArgs: 'v=' + ENV.VERSION,
    baseUrl: ENV.PAGE,
    paths: {
        jquery: 'plugin/jquery/jquery-3.1.0.min',
        common: 'js/common/common'
    },
    shim: {
        common: {
            deps: ['jquery'],
            exports: '$'
        }
    }
});