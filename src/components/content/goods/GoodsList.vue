<template>
<div class="goods">
  <GoodsListItem v-for="item in goods" :goods-item="item" />
<!--  {{goods}}-->
</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
  goods: {
    type: Array,
    default() {
      return []
    }
  }
  }
}
</script>

<style scoped>
/*为了一行显示2个*/
.goods {
  display: flex;

  /* 默认不包裹nowrap */
  flex-wrap: wrap;

  /*均等分*/
  justify-content: space-around;

  padding: 2px;

}


</style>
