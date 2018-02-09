'use strict';

//禾思科技唯一全局变量
var ENV = {
    VERSION: new Date().getTime(), //开发，测试环境
    API: '/facemeeting/', //配合nginx跨域，所有ajax api前缀
    FILE_URL: '/facemeeting/', //图片上传地址
    //PAGE: '/meeting/', //页面地址
    PAGE: '/', //页面、js资源、图片地址
    H5: 'http://' + window.location.host + '/page/apply/index.html', //h5页面访问地址前缀
    BASE: 'http://' + window.location.host //域名url，如本地则是为空
};