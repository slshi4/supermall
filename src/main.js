import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store';

import toast from 'components/common/toast';
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false

//vue实例是可以作为事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件(手写的)
Vue.use(toast);



//解决移动端300ms延迟  attach附加
FastClick.attach(document.body);

// Vue.use(VueLazyLoad);
Vue.use(VueLazyLoad,{
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

//setTimeout这个方法异步，即使不设置时间，它会放到下次事件循环的尾部执行
console.log("aaa");
setTimeout(() =>{
  console.log("bbb");
})
console.log("ccc");
// aaa-->ccc-->bbb
