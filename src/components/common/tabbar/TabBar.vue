<template>
  <div id="tab-bar">
    <slot></slot>

  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  display: flex; /* 水平 */
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /*box-shadow: 0 -1px 1px rgba(100,100,100,.2); !*阴影效果 参数代表 x,y轴,偏移量，颜色rgba()*/
}

/*.tab-bar-item {*/
/*  flex: 1; !* 均等分 *!*/
/*  text-align: center;*/
/*  height: 49px;*/
/*}*/

/*.tab-bar-item img {*/
/*  width: 24px;*/
/*  height: 24px;*/
/*}*/

</style>
