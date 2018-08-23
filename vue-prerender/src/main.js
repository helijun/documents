// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.$router = router

Vue.mixin({
  data () {
    return {
      dataReady: false
    }
  }
})

// 注册全局自定义指令
Vue.directive('min-height', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    let minHeight = window.innerHeight; //el.parentElement.clientHeight 
    if(minHeight) {
      el.style.minHeight = minHeight + 'px'
    }
  }
})

// 返回事件监听
const onBack = {}
onBack.install = function(_Vue, options) {
  // 注入组件
  _Vue.mixin({
    created () {
      if (this.$options.onBack) {
        console.log('执行onBack')
        this.$options.onBack.call(this)
      }
    }    
  })
}
Vue.use(onBack)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
