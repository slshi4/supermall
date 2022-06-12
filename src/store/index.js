/**
 * vuex 重构
 */
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//todo 1.安装插件
Vue.use(Vuex);

const state = {
  cartList: []
}

//todo 2.创建Store对象 vuex4 写法
const  store =  new Vuex.Store({
  state,
  mutations,
  actions,
  getters,

});

//TODO 3.挂载Vue实例上
export default store
