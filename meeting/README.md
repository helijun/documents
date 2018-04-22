# meeting

## 结构介绍
- 使用传统jquery+requirejs+template 实现一个轻量单页面组件化的架构
- 构建工具使用gulp
- 主框架使用layui
- 集成路由功能，自己编写的路由插件
- 主页index.html
- dist 为生产构建后代码存放目录
- src 为开发所有资源存放目录
- tpl 所有动态模板
- page 所有纯静态页面
- plugin 存放插件

## 使用
1. 访问https://nodejs.org/en/ 安装node环境，建议版本v6 + 
2. 打开node客户端，更改npm来源 npm config set registry https://registry.npm.taobao.org    
3. 在当前目录（项目根目录）安装依赖 npm install 
4. 更改nginx.conf server_name为自己ip，启动nginx服务 
5. npm run start 启动项目，访问localhost:1224 查看，开发环境实时刷新页面
6. npm run build 生产构建，生产的dist目录里代码为正式/测试上线代码

## 记录
- 所有页面class以page-开头，模板tpl-，模块module-，元素element-
- 带有class = module-go-back 后退/返回
- 带有class = module-go-regist 跳转注册页面
- 带有class = module-go-login 跳转登录页面
- 带有class = module-go-forgot 跳转找回密码

### 页面js基本结构遵循
```
HSKJ.ready(function() { //注意，如果页面不需要登录的，不能使用HSKJ.ready()
      var xxx = {
            init: function(){
                //ajax...
                this.renderHtml();
                this.wactch();
            },
            
            renderHtml: function(){
                //通常情况下这里是渲染模板
            },
            wactch: function() {
                $(document).on('click', '.xx-xx', function(){

                })      
            }
        }
        xxx.init();
    })
```
### 关于路由
整体配置详情参看base/index.js
```
    /**
    *   string 页面
    *   {} 显示参数
    *   callback js加载完后回调
    **/
    router.to(string,{},callback)

    //隐式传参详情见会议编辑页面
    meeting-edit
```

### 关于ajax请求
所有页面的ajax调用使用如下方法：
```
HSKJ.POST({
    url: 'xxx',
    data: {},
    beforeSend: function(){
        HSKJ.loadingShow(); //如果需要显示loading则添加
    },
    success: function (json) {
        if(json && json.code == 0){
            
        }else{
            layui.layer.msg(json.message)
        }
    }
})
```

### layui分页数据表要点
- 数据表参考设备管理（device/list）这条线，详细参数文档[点击这里](http://www.layui.com/doc/modules/table.html)，这里列出基本使用步骤：
- 在对应的tpl里面添加渲染数据表的区域html，定义好id、lay-filter
```
<table class="layui-hide" id="tableContent" lay-filter="deviceListTable"></table>
```

- 在对应的js里面的renderHtml方法中调用HSKJ.renderTpl(..)渲染上面的模板，并在回调函数中 renderTable()渲染表格，例
```
layui.table.render({
    url: '/api/facemeeting/systemuser/device/query',
    id: 'deviceListTable',
    elem: '#tableContent'//渲染区域，对应tpl中table id
    , cols: [[ //标题栏，其中field对应数据表字段名
        { field: 'deviceid', title: '序号', sort: true }
        , { field: 'name', title: '全部型号' }
        , { field: 'activationdate', title: '生产日期' }
        , { field: 'macaddress', title: 'Mac地址' }
        , { field: 'softversion', title: '软件版本' }
        , { field: 'activationdate', title: '激活日期' }
        , { field: 'organizationid', title: '授权单位', sort: true }
        , { field: 'status', title: '在线状态', sort: true, templet: '#deviceTableStatusTpl' }//deviceTableStatusTpl对应index.html里模板id，即<script ... id...>
        , { field: 'joinTime', title: '操作', toolbar: '#tableToolbar' } //这里tableToolbar对应index.html里面的script id
    ]]
    , skin: 'line' //表格风格
    , page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        layout: ['prev', 'page', 'next'] //自定义分页布局
        //,curr: 5 //设定初始在第 5 页
        , first: false //不显示首页
        , last: false //不显示尾页
        , theme: '#3ddfd5' //背景主题颜色
    }
    , limit: 2 //每页默认显示的数量
});
```

- 接口返回数据集合格式data[{list}]，count字段为总页数
- 渲染表格默认带参为page=1&limit=xx，即第一页，一页limit多少条，点击下一页会自动触发请求并带上新page值
- 当需要带条件查询时，可以使用表格重载功能，例：
```
layui.table.reload('deviceListTable', {
    where: { //设定异步数据接口的额外参数，重载数据
        aaaaaa: 'xxx' //带上的新参数
        , bbb: 'yyy'
    }
    , page: {
        curr: 1 //重新从第 1 页开始
    }
});
```

- 上面渲染时操作栏里写的toolbar，通常是编辑、删除等等，这里也不用手动填写事件，使用layuit提供的工具条监听功能，例：
```
layui.table.on('tool(deviceListTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的DOM对象
    console.log('点击的当前行的数据', data);
    if (layEvent === 'edit') { //编辑
        layui.layer.msg('编辑TODO')
    } else if (layEvent === 'del') { //删除
        layer.open({
            title: '提示',
            shadeClose: true,
            id: 'deviceDelDialog',
            skin: 'skin-flex-center',
            area: ['569px', '222px'],
            btnAlign: 'c'
            , content: $('#delDialog').html(),
        });
    }
});
```

