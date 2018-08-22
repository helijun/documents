# 使用webpack构建多页面开发环境

## 使用
1. 更改npm来源 npm config set registry https://registry.npm.taobao.org  
2. 安装依赖 npm install 
3. 修改webpack.config dev-server --host 为本机ip地址
4. npm run start 开发热加载
5. npm run build 生产压缩打包

## 已完成
1. 基本的目录结构
2. 初步的开发环境配置，实时刷新  20171120 - 打包配置优化，如公用目录定义变量、压缩等
3. 集成jquery
4. html/js/css引入图片测试
5. 集成layui
6. 添加animate.css 滚屏流动加载效果

## 待完善
1. 关于jquery插件问题

## 存在问题

## 注
1. index.html 网页主入口
2. src/page 所有页面
3. gulp 用来构建一个测试build后的目录的本地服务器
