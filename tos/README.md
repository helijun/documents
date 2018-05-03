# TOS 官网

## 使用
1. 访问https://nodejs.org/en/ 安装node环境，建议版本v6 + 
2. 打开node客户端，更改npm来源 npm config set registry https://registry.npm.taobao.org    
3. cd到当前erp所在目录（项目根目录）安装依赖 npm install 
4. npm run start 启动项目，访问localhost:418 查看，开发环境实时刷新页面

## 注意
1. 简体中文页面：html lang=zh-cmn-Hans
2. 繁体中文页面：html lang=zh-cmn-Hant
3. 英语页面：html lang=en

## 构建步骤
1. gulp clean:dist
2. gulp i18n:zh-tw 执行两遍
3. gulp i18n:zh 执行两遍
4. gulp i18n:en 执行一遍
5. 手动复制src/assets,src/plugin 到dist
6. 删除dist/assets/sass&sass-old （也可不执行此步骤）
7. 检查zh/index.html,zh-tw/index.html ，可能html底部有多余的需要删除

## 部署
将dist目录放在服务器即可