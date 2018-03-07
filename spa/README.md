# 基于jquery的spa，使用requirejs，集成jquery.router

## 使用
1. 访问https://nodejs.org/en/ 安装node环境，建议版本v6 + 
2. 打开node客户端，更改npm来源 npm config set registry https://registry.npm.taobao.org    
3. 在当前目录（项目根目录）安装依赖 npm install 
4. npm run start 启动项目，访问localhost:1821 查看

## 简要思路
在页面跳转的时候使用history.pushState(stateObject, title, url)改变url的hash值（如：#....），通常情况是预先配置好的路由key，这个时候会触发window.onhashchange事件，回调函数里执行业务逻辑并最终控制页面的跳转，这样一来就基本达到了路由的能力。同时再配合window.onpopstate事件，当页面后退时触发，进行相关的逻辑控制。

## 简要实现
### API
#### router.config(obj) //配置路由对应的key-value
```
var roleid = 2;
router.config({
    view: '.module-container', //渲染模板的dom
    baseUrl: '/', //资源根路径
    router: {
        'page-test1': {
            templateUrl: 'tpl/test/test1.tpl', //模板或页面地址
            controller: 'js/test/test1.js', //页面对应的js
            role: [1, 2] //能访问页面的角色id
        },
        'page-test2': {
            templateUrl: 'tpl/test/test2.tpl',
            controller: 'js/test/test2.js',
            role: 1
        },
        'page-test3': {
            controller: 'js/test/test3.js',
            role: 2
        },
        'defaults': 'page-test1' //默认路由
    },
    errorTplId: '#errorTpl',  //可选的错误模板，用来处理加载html模块异常时展示错误内容
    enterCallback: function (routeObj) {
        //回车键后的回调函数，通常可做页面权限控制、数据统计等等
        console.log('enterCallback')
        if (!routeObj.url) return;
        if (typeof routeObj.role == 'object') {
            var notLook = false;
            for (var i = 0; i < routeObj.role.length; i++) {
                if (routeObj.role[i] == roleid) {
                    notLook = true;
                    break;
                }
            }
            if (!notLook) {
                router.isNotLook = false;
                alert('无权访问')
            } else {
                router.isNotLook = true;
            }
        } else {
            if (routeObj.role != roleid) {
                router.isNotLook = false;
                alert('无权访问')
            } else {
                router.isNotLook = true;
            }
        }
    }
});
```

#### router.to(string, {}, [null || '_self' || '_blank'] , callback) //页面跳转、显示传参
```
router.to('page-test1', {
    'test1': '我是带过来的参数'
})
router.getUrlParameter('test1')
```

#### router.get/set/delParam/clear() //隐式传参
```
router.setParam({
    'test1': '我是带过来的参数，不显示在url上哦'
})
router.to('page-test1');
router.getParam('test1')
```

### 属性
- view  渲染模板的dom，默认body
- baseUrl  资源根路径
- errorTplId  错误时渲染的模板id，后续可扩展404、500等
- templateUrl 模板或页面地址，这里暂时只能是静态的
- controller 页面对应的js，如需动态页面，在这里面渲染模板
- role 页面级角色权限id

### 存在问题
1. 没有集成ES6，无法享受新特性带来的技术红利。（尝试使用gulp-babel编译成ES5，并通过webpack构建成bundle.js，但是遇到各种问题，如使用jquery和jquery系列插件，很多并不支持CommonJS规范等等，最终无奈放弃）
2. 独立组件并没有形成生命周期，如注册事件后，已跳转到其他页面，并不能销毁事件等，必须妥协使用先off再on的做法
3. 没有数据流的概念，数据操作很混乱