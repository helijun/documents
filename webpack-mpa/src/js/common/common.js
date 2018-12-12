
let MT = {
	//全局初始化函数
	init: function(callback){
		this.watch();
		callback && callback();
	},
	//发送get请求
	GET: function(options){
		var self = this;
		self.ajax(options,'get');
	},
	//发送post请求
	POST: function(options){
		var self = this;
		self.ajax(options,'post');
	},
	ajax: function(opts,type){
		var selfData = {
				url: opts.url,//真实的url
				params: JSON.stringify(opts.params)
			};

		if (opts.baseUrl) {//非跨域
			selfData = opts.data;
		}

		$.ajax({
			url: opts.baseUrl || URL.CORS,
			data: selfData,
			type: type,
			async: opts.async,
			beforeSend: function() {
				opts.beforeSend && opts.beforeSend();
			},
			success: function(json) {
				if(json){
					console.log(opts.baseUrl || opts.url,' ajax is successful',json);
					opts.success && opts.success(json);

					if(opts[json.status]){//区分不同的状态码回调函数
						console.log(opts.baseUrl || opts.url,'ajax status is', json.status, '并已回调'+ json.status +'方法');
						eval(opts[json.status])(json);
					}
				}else{
					console.error(opts.baseUrl || opts.url,'ajax 数据返回格式异常');
					MT.ajaxError();
				}
			},
			error: function(){
				console.error(opts.baseUrl || opts.url,' ajax is error');
				opts.error != undefined ? opts.error() : MT.commonError();
			},
			complete: function(XMLHttpRequest, textStatus) {
				console.log(opts.baseUrl || opts.url,' ajax is complete');
			},
			timeout: opts.timeout || 20000
		})
	},

	/**
	 * 获取url后面的参数，优化后版本
	 * @param  {[type]} name [par]
	 * @return {[type]}
	 */
	getUrlParameter: function(name){
		var _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
			_regNext = window.location.search.substr(1).match(_reg);
		if (_regNext != null) return decodeURI(_regNext[2]) || '';
		else return '';
	},

	/**
	 * 格式化小数取整
	 * @param  {[type]} number [par]
	 * @return {[type]}
	 */
	toFixedZero: function(number){
		var number_str=""+number;
		var arr=[];
		var index=number_str.indexOf(".");
		if(index === -1){  //整数
				return number_str;
		}else {
				arr=number_str.split(".");
				return arr[0];
		}
	},
	
	/**
	 * 格式化小数点后两位
	 * @param  {[type]} number [number]
	 * @return {[type]}
	 */
	toFixedTwo: function(number){
		var number_str=""+number;
		var arr=[];
		var index=number_str.indexOf(".");
		if(index === -1){  //整数
				return number_str+".00";
		}else {
				arr=number_str.split(".");
				if(arr[1].length === 1){  //小数点后面有一位数字
					return [arr[0],arr[1]+"0"].join(".");
				}else if(arr[1].length === 2){ //小数点后面有两位数字
					return [arr[0],arr[1]].join(".");
				}else { //小数点后面大于两位数字
					return [arr[0],arr[1].substring(0,2)].join(".");
				}
		}
	},

	/**
	 * 获取登录证书
	 * @return {[string]} [token]
	 */
	getToken: function(){
		var token = this.getUrlParameter('token') || localStorage.getItem('token') || '';
		console.info('当前获取的token是：',token);
		return '02b95b0f-0c21-492b-b1c9-674d08559d23' || token;
	},
	//执行登录
	doLogin: function(){
		localStorage.setItem('token',"adminfor123456");
		this.openPage(URL.BASE + '/main/index');
	},
	/**
	 * 判断是否登录
	 */
	checkLogin: function(){
		var self = this;
		if(self.getToken()){
			//todo  验证登录是否过期、策略待定
		}else{
			self.toLoginPage();
		}
	},

	/**
	 * 去登录页面
	 */
	toLoginPage: function(){
		if(window.location.href.indexOf('login') > -1) return;
		this.openPage(URL.BASE + '/main/login');
	},

	/**
	 * 去下载页面
	 */
	toDownload: function(userId){
		if(!userId) return;
		this.openPage(URL.BASE + '/download?userid=' + userId);
	},

	/**
	 * 渲染点击打开大图
	 * 
	 * src -- data-big-img 大图路径、img开头，前缀已做处理
	 * w --   data-width 大图宽
	 * h --   data-height 大图高
	 */

	renderOpenBigImg: () => {
		$('img').on('click', (event) => {
			var self = $(event.currentTarget);
			var bigImgPath = self.attr('data-big-img');
			if (!bigImgPath) return;

			var pswpElement = document.querySelectorAll('.pswp')[0];
			var items = [
				{
					src: require('../../' + bigImgPath),
					w: self.attr('data-width'),
					h: self.attr('data-height')
				}
			];
			var options = {
				index: 0, // start at first slide
				bgOpacity: .925,
				shareEl: false
			};

			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		})
	},

	/**
	 * 选中导航条
	 */
	selectNav: function() {
		let url = window.location.href.split('/maitian/')[1];
		$('.nav-href').each((k, v) => {
			let thisHref = $(v).attr('href');
			thisHref = thisHref.split('#')[0];
			thisHref = thisHref.split('?')[0];
			thisHref = thisHref.replace('/maitian/', '');
			if (!url){//首页
				$('.index-page').addClass('layui-this')
				return false
			}
			if (url && url == thisHref){
				$(v).parents('li').addClass('layui-this')
			}
		})
	},

	/**
	 * 移动端导航点击
	 */
	toggleMobileNav: function() {
		$('.mt-menu-mobile').on('click', () => {
			$('.mt-menu-content').toggleClass('layui-hide')
		})

		$('.mt-menu-mask').on('click', () => {
			$('.mt-menu-content').toggleClass('layui-hide')
		})
	},

	/**
	 * 数据请求失败提示
	 * @param  {[type]}
	 * @return {[type]}         [description]
	 */
	ajaxError: function(){
		alert('请求失败，请稍后重试！');
	},

	/**
	 * 去错误页面
	 */
	toErrorPage: function(status){
		this.openPage(URL.BASE + status);
	},

	/**
	 * 通用的跳转页面
	 *
	 * target "_blank" 新窗口打开
	 * @return {[type]} [description]
	 */
	openPage: function(href,target){
		if (target) {
			window.open(href, target)
		}else{
			//todo  暂定使用location.href 没有版本号
			window.location.href = href;
		}
	},

	/**
	 * 通用的加载中动画
	 */
	loadingShow: function(){
		//TODO
	},

	/**
	 * 加载中动画消失
	 * @return {[type]} [description]
	 */
	loadingHide: function(){
		
	},

	/**
     * 动态加载JS，同步
     */
	synchronizationScript: function (url, callback) {
		$.ajax({
			async: false,
			dataType: "script",
			url: url,
			success: function (json) {
				callback && callback();
			}
		});
	},

	/**
     * 图片懒加载
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
	imgLazy: function (opts) {
		var store = [],
			offset,
			throttle,
			poll;

		function _inView(el) {
			var coords = el.getBoundingClientRect();
			return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
		};

		function _pollImages() {
			for (var i = store.length; i--;) {
				var self = store[i];
				if (_inView(self)) {
					self.src = self.getAttribute('data-lazy-img');
					store.splice(i, 1);
				}
			}
		};

		function _throttle() {
			clearTimeout(poll);
			poll = setTimeout(_pollImages, throttle);
		};

		function init(obj) {
			var nodes = document.querySelectorAll('[data-lazy-img]');
			var opts = obj || {};
			offset = opts.offset || 0;
			throttle = opts.throttle || 250;

			for (var i = 0; i < nodes.length; i++) {
				store.push(nodes[i]);
			}

			_throttle();

			if (document.addEventListener) {
				window.addEventListener('scroll', _throttle, false);
			} else {
				window.attachEvent('onscroll', _throttle);
			}
		};

		return {
			init: init,
			render: _throttle
		};
	},

	/**
     * 动态加载JS，异步
     */
	loadScript: function (url, callback) {
		var script = document.createElement("script");
		var head = document.head || document.getElementsByTagName('head')[0];
		script.type = "text/javascript";
		script.src = url + '?ver=' + Math.random();

		if (callback) {
			script.onload = script.onreadystatechange = function () {
				setTimeout(function () {
					callback();
				}, 20);
			}
		}

		head.appendChild(script);
	},

	/**
	 * 通用的错误提示
	 * @param  {[type]} element [待展示错误的dom]
	 * @return {[type]}         [description]
	 */
	commonError: function(element){
		console.error('出错');
	},
	
	//判断是否是ie浏览器
	isIe: (layer) => {
		const device = layui.device();
		console.log('当前device', device);

		if (device.ie && device.ie < 8) {
			layer.alert('如果您非得使用ie，那么请使用ie10+');
		}
	},
	getScreenWidth: function(){
		//TODO 兼容ie8
		return window.innerWidth
	},
	getScreenHeight: function(){
		return window.innerHeight
	},

	//渲染动画  TODO
	renderAnimate: (el, type) => {
		$(el + ' [data-mt-animate]').each(function (k, v) {
			let json = JSON.parse($(v).attr('data-mt-animate'));
			let selfDomOffsetTop = $(v).offset().top;
			let screenHeight = $(window).height();
			let screenScrollTop = $(window).scrollTop()
			let dampVal = 0;//阻尼系数

			if (type && type == 'srcoll'){
				dampVal = 100;
			}
			return;//暂时不做动画
			if (selfDomOffsetTop <= screenHeight //出现时就在屏幕里面
				|| selfDomOffsetTop + dampVal <= screenScrollTop) {
				if (json.delay){
					setTimeout(() => {
						$(v).addClass('animated ' + json.animate);
					}, json.delay);
				}else{
					$(v).addClass('animated ' + json.animate);
				}
			} else {
				$(v).removeClass('animated ' + json.animate);
			}
		})
	},

	//图片懒加载  TODO

	//所有全局事件监听
	watch: function(){
		var self = this;

		//ajax 错误监听
		$(document).on('ajaxError', function(e, xhr, options){
			var status = xhr.status;
			/*if (404 == status) {
				self.openPage(404)
			}else if(500 == status){
				self.openPage(500)
			}*/
		})
	}
}

window.MT = MT;
//module.exports = MT;
	