# manage-system #
基于Vue.js 2.x系列 + Element UI 的后台管理系统

## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- bus.js           	 // Event Bus
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|           |-- Tags.vue           	 // 页面切换标签组件
	|       |-- page                   	 // 主要路由页面
	|           |-- 403.vue
	|           |-- 404.vue
	|           |-- BaseCharts.vue       // 基础图表
	|           |-- BaseForm.vue         // 基础表单
	|           |-- BaseTable.vue        // 基础表格
	|           |-- DashBoard.vue        // 系统首页
	|           |-- DragList.vue         // 拖拽列表组件
	|           |-- Login.vue          	 // 登录
	|           |-- Markdown.vue         // markdown组件
	|           |-- Premission.vue       // 权限测试组件
	|           |-- Upload.vue           // 图片上传
	|           |-- VueEditor.vue        // 富文本编辑器
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明

## 本地开发 ##
```
	npm install

	npm run start
```
## 构建生产 ##

```
	npm run build
```

## 组件使用说明与演示 ##

### 二、如何切换主题色呢？ ###

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 background-color/text-color/active-text-color 属性去掉即可。

### 服务器目录
```
cd /home/health/html/
```
### sql
spring.datasource.type=com.zaxxer.hikari.HikariDataSource
#spring.datasource.url = jdbc\:mysql\://39.108.171.172\:3306/fr?characterEncoding\=UTF-8&characterSetResults\=UTF-8&useSSL\=false
#spring.datasource.url = jdbc\:mysql\://120.77.205.97\:3306/fr?characterEncoding\=UTF-8&characterSetResults\=UTF-8&useSSL\=false
spring.datasource.url = jdbc\:mysql\://collectpolicy.myxolo.net\:3306/health?characterEncoding\=UTF-8&amp;characterSetResults\=UTF-8&amp;useSSL\=false

spring.datasource.username = root
spring.datasource.password = lava@123



### 网址
1. 新环境  47.92.230.234   root    ccpay559CCPAY
2. https://ccpay.gk0312.cn 域名
3. /usr/share/nginx/html
4. pc https://ccpay.gk0312.cn/
5. 微信 https://ccpay.gk0312.cn/#/wechat/index
6. 公众号登录ccsqwsfwzx688 @163.com  密码cc2171821

7. /usr/share/nginx/html3  支付2期 测试线上页面地址
8. https://yhpay.gk0312.cn/#/login


## 说明
接入参考地址：https://yhpay.gk0312.cn/#/pay/index?name=helj&serialnumber=12312312&businessid=gh10002&sum=1&paydesc=desc&callbackUrl=https%3A%2F%2Fwww.baidu.com ，注意callbackUrl须带协议且encodeURIComponent转码



### 命令参考
1. https://blog.csdn.net/zsnpromsie/article/details/79100377   使用nginx
2. https://www.jianshu.com/p/c3294887c6b6 搭建nginx
3. https://www.cnblogs.com/malcolmfeng/p/6816119.html host修改
