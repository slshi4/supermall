<template>
  <div class="cart-list">
   <scroll class="content"  ref="scroll" :pull-up-load="true">

       <cart-list-item v-for="(item ,index) in cartList"
                       :key="index"
                       :item-info="item" />


   </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {CartListItem, Scroll},
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    console.log('cart activated');
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>

  /*.wrapper {*/
  /*  height: 100vh;*/
  /*}*/

  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
    /*height: 100vh;*/
  }

  .content {
    height: 100%;
    overflow: hidden;
  }


</style>
