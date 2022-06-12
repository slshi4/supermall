import Vue from 'vue'
import VueRouter from "vue-router";

//懒加载
const home= () => import('../views/home/Home')
const category= () => import('../views/category/Category')
const cart= () => import('../views/cart/Cart')
const profile= () => import('../views/profile/Profile')
const detail= () => import('../views/detail/Detail')
//1.安装插件
Vue.use(VueRouter);

//2.创建router


const routes=[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail/:id',
    component: detail
  },
]

const router =new VueRouter({
  routes,
  mode: 'history'
})

//3.导出
export default router;
