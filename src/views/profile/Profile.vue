<template>
  <div>
<!--    v-bind:probe-type="3"-->
  <scroll class="content">
      <ul>
        <li>列表11</li>
        <li>列表21</li>
        <li>列表31</li>
        <li>列表41</li>
        <li>列表51</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表511</li>
        <li>列表511</li>
        <li>列表511</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表51</li>
        <li>列表511</li>
        <li>列表511</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表5</li>
        <li>列表51</li>
      </ul>
  </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Profile",
  components: {
    Scroll,
  }
}
</script>

<style scoped>
.content {
  height: 300px;
  background-color: red;
  overflow: hidden;
}
</style>
