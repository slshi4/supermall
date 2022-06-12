<template>
  <div class="cart">
  <!-- 导航   -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  <!-- 商品的列表   -->
    <cart-list />

  <!--底部汇总  -->
    <cart-bottom-bar  class="bottom-bar"/>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import {mapGetters} from 'vuex';

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //todo mapGetters两种语法: 方式一
    // ...mapGetters({
    //   cartLength:'cartLength',
    // })
    //TODO 方式二
    ...mapGetters(['cartLength'])

  /*  cartLength() {
    // return  this.$store.state.cartList.length;
      return this.$store.getters.cartLength;
    },*/

  },
}
</script>

<style scoped>
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;

    /*font-weight: 700;*/
  }




</style>
