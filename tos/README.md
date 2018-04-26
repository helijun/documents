# TOS 官网

## 使用
1. 访问https://nodejs.org/en/ 安装node环境，建议版本v6 + 
2. 打开node客户端，更改npm来源 npm config set registry https://registry.npm.taobao.org    
3. cd到当前erp所在目录（项目根目录）安装依赖 npm install 
4. 打开node_modules/gulp-asset-rev/index.js，大概是84行，修改 var verStr = (options.verConnecter || "-") + md5; 为 var verStr = (options.verConnecter || "") + md5;  修改 src = src.replace(verStr, '').replace(/(\.[^\.]+)$/, verStr + "$1"); 为 src = src + "?v=" + parseInt(new Date().getTime() / 1000);
5. npm run start 启动项目，访问localhost:9001 查看，开发环境实时刷新页面
6. npm run build 生产构建，生产的dist目录里代码为正式/测试上线代码

## 注意
1. 简体中文页面：html lang=zh-cmn-Hans
2. 繁体中文页面：html lang=zh-cmn-Hant
3. 英语页面：html lang=en

## 构建步骤
1. gulp clean:dist
2. gulp copySrc
3. gulp i18n:zh-tw 执行两遍
4. gulp i18n:zh 执行两遍
5. gulp i18n:en 已上执行两遍后再执行一遍