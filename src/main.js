import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store';

import toast from 'components/common/toast';

Vue.config.productionTip = false

//vue实例是可以作为事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件(手写的)
Vue.use(toast);


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
