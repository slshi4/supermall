<template>
  <tab-bar>
    <TabBarItem path="/home" activeColor="yellow">
      <img slot="img-icon" src="~assets/img/tabbar/home.svg">
      <img slot="img-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="img-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category" active-color="pink">
      <img slot="img-icon" src="~assets/img/tabbar/category.svg">
      <img slot="img-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="img-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/cart" active-color="blue">
      <img slot="img-icon" src="~assets/img/tabbar/shopcart.svg">
      <img slot="img-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
      <div slot="img-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile" active-color="yellow">
      <img slot="img-icon" src="~assets/img/tabbar/profile.svg">
      <img slot="img-icon-active" src="~assets/img/tabbar/profile_active.svg">
      <div slot="img-text">我的</div>
    </TabBarItem>
    <!--      <TabBarItem>-->
    <!--        <img slot="img-icon" src="./assets/img/tabbar/home.jpg">-->
    <!--        <img slot="img-icon-active" src="./assets/img/tabbar/activeHome.jpg">-->
    <!--        <div slot="img-text">关于</div>-->
    <!--      </TabBarItem>-->
  </tab-bar>
</template>

<script>
// import TabBar from "../tabbar/TabBar";
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }

}
</script>

<style scoped>

</style>
