<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot  name="img-icon"></slot></div>
<!--    <slot v-if="!isActive" name="img-icon"></slot>-->
    <div v-else><slot  name="img-icon-active"></slot></div>
<!--    <slot v-el name="img-icon-active"></slot>-->
<!--    <div :class="{active:isActive}"><slot name="img-text"></slot></div>-->
    <div :style="activeStyle"><slot name="img-text"></slot></div>
<!--    <img src="../../assets/img/tabbar/home.jpg">-->
<!--    <div>首页</div>-->
  </div>
  <!--  <div class="tab-bar-item">-->
  <!--    <img src="../../assets/img/tabbar/home.jpg">-->
  <!--    分类-->
  <!--  </div>-->
  <!--  <div class="tab-bar-item">-->
  <!--    <img src="../../assets/img/tabbar/home.jpg">-->
  <!--    <div>购物车</div>-->
  <!--  </div>-->
  <!--  <div class="tab-bar-item">-->
  <!--    <img src="../../assets/img/tabbar/home.jpg">-->
  <!--    我的-->
  <!--  </div>-->
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: true
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isActive(){
      //indexOf(),判断受否存在，不存在返回-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    //计算属性，要进行封装，颜色动态
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : { }
    }
  },
  methods: {
  itemClick() {
    // console.log("itemClick");
    this.$router.push(this.path)
  }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1; /* 均等分 */
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle; /* 缩小1首页和图片空白区域,图片会空3px像素 */
}
/*.active {*/
/*  color: red;*/
/*}*/
</style>
