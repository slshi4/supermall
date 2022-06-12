<template>
  <div id="app">
<!-- 排除Detail组件不让它keepAlive，意味着组件的created()每次都会执行    exclude="Detail"-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/*@import "./assets/css/base.css";*/
@import "assets/css/base.css";

</style>
