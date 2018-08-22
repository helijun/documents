import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

String.prototype.firstUpperCase = function() {
  return this.replace(/^\S/,function(s){return s.toUpperCase();});
}

function pathFormat(path) {
  let pathArray = path.replace('/', '').split('/');
  //取最后一个，格式化首字母大写
  let lastEle = pathArray[pathArray.length - 1];
  return path.replace(lastEle, lastEle.firstUpperCase())
}

const routerConfig = require('./config');
//需要 prerender 的页面，通常再modules文件夹下
let fromConfigRouters = routerConfig.routes.map((item, index) => {
  return {
    path: item.path,
    name: item.path.replace('/', '').split('/').join('-'),
    component: require('@/modules' + pathFormat(item.path))
  }
})

//不需要预渲染的，或者不满足通用的路由页面
let routers = [
  {
    path: '/',
    name: 'index',
    component: require('@/modules/Index')
  }
]

export default new Router({
  mode: 'history',
  routes: [...fromConfigRouters, ...routers]
})
