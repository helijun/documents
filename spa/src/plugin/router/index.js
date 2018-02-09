
router.start({
	view: '.module-container',
	baseUrl: ENV.PAGE,
	router: {
		'meeting-list': {
			templateUrl: 'tpl/meeting/list.tpl',
			controller: 'js/meeting/list.js'
		},
		'device-list-org': {
			templateUrl: 'tpl/device-org/list.tpl',
			controller: 'js/device-org/list.js'
		},
		'device-list': {
			templateUrl: 'tpl/device/list.tpl',
			controller: 'js/device/list.js'
		},
		'defaults': 'device-list' //默认路由
	},
	errorTemplateId: '#errorTpl',  //可选的错误模板，用来处理加载html模块异常时展示错误内容
	enterCallback: function(){
		console.log('enterCallback')
	}
});

router.to('meeting-list');