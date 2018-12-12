# nuxt

```
cd /data/web/webapps/yijianyi/web
```
> Nuxt.js project

## 参考文档
```
https://zh.nuxtjs.org/guide/installation
```


## 目录结构

```

├─assets   资源目录，未编译的静态资源如scss、js
├─components  组件目录
├─layouts  布局目录
├─mock   mock数据
├─node_modules  
├─pages   页面目录
 ├─index.vue
 ├─....   
├─plugins  插件
├─server   express服务
├─static   静态文件目录
├─store   vuex store
├─utils   工具方法

```

## 生成静态站点
在不断开localhost:3000的情况下运行下面的命令，将生成dist目录部署服务器即可
```
nuxt generate
```

## 如何在linux服务器端安装nodejs环境

1. 下载所需的包文件，当下node的最新稳定版本为6.10.3 (具体可根据node的英文官网查看)
```
wget https://npm.taobao.org/mirrors/node/v6.10.3/node-v6.10.3-linux-x64.tar.xz
```

2. 然后对xz文件进行解压
```
xz -d node-v6.10.3-linux-x64.tar.xz
```

3. 对tar目录进行解压
```
tar -xvf node-v6.10.3-linux-x64.tar
```

4. 返回根目录，对文件设置软连接
```
cd /
ln -s /node-v6.10.3-linux-x64/bin/node /usr/local/bin/node
```

5. 同样对npm也设置软连接
```
ln -s /node-v6.10.3-linux-x64/bin/npm /usr/local/bin/npm
```

6. 查看版本号是否安装成功
```
node -v
```