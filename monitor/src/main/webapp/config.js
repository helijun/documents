var _VER = (new Date()).getTime(),//开发环境
	//_ver = '1.0.0',

	_XHR = '/rest/',
	_PATH = ''; //图片

var errorTips = '哎哟，网络好像有点问题了..';

require.config({
	urlArgs: "v=" +  _VER,
    baseUrl : "/",
    paths: {
    	//必须插件
        jquery:'plugin/jquery/jquery-1.9.0.min',
        common: 'dist/js/common',
        dateFormat: 'utils/date/dateFormat',
        artTemplate: 'plugin/template/artTemplate-3.0',
        artDialog: 'plugin/artDialog/dialog-min',
        headerData: 'component/header/header',
        leftNavData: 'component/leftNav/leftNav',
        bootstrap: 'plugin/bootstrap-3.3.5-dist/js/bootstrap.min',
        bootstrapValidator: 'plugin/bootstrapValidator/js/bootstrapValidator.min',
        accordion: 'component/accordion/accordion',
        
        //页面组件
        runState: 'component/pages/runState/runState',
        machineRunState: 'component/pages/machineRunState/machineRunState',
        setting: 'component/pages/setting/setting'
    },
    shim: {
    	common: ['css!dist/css/common'],
    	artTemplate: ['css!plugin/bootstrap-3.3.5-dist/css/bootstrap.min'],
    	bootstrapValidator: ['css!plugin/bootstrapValidator/css/bootstrapValidator.min'],
    	artDialog: ['css!plugin/artDialog/ui-dialog'],
    	headerData: ['css!component/header/header'],
    	leftNavData: ['css!component/leftNav/leftNav'],
    	accordion: ['css!component/accordion/accordion']
    },
    waitSeconds: 15
});

