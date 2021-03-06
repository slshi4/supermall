
import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";


export default {
  addCart(context,payload){
    //todo 1.payload新添加的商品
    // let oldProduct = null;
    // for(let item in state.cartList) {
    //   if (item.iid === payload.iid) {
    //       oldProduct = item;
    //   }
    // }
    // //todo 2.判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1;
    // }else {
    //   payload.count = 1;
    //   state.cartList.push(payload);
    // }
    //方式二:
    // let index = state.cartList.indexOf(payload);
    return new Promise((resolve, reject) => {
      //方式三: 1,查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find( item => item.iid === payload.iid);
      //2.判断 oldProduct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER,oldProduct);
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART,payload);
        resolve('添加了新的商品')
      }
    })

  },
}
