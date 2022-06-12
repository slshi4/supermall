<template>
  <div class="detailBaseInfo">
    <h3>{{goods.title}}</h3>
    <div class="price_box">
      <span>{{goods.newPrice}}</span>
      <i>
        {{goods.realPrice}}
        <button>{{goods.discount}}</button>
      </i>
    </div>
    <div class="columns">
      <p v-for="item in goods.columns">{{item}}</p>
    </div>
    <div class="services">
      <p v-for="item in goods.services">{{item.name}}</p>
    </div>
  </div>

</template>


<script>
export default {
name: "DetailBaseInfo",
  props: {
    goods:{
      type: Object,
      default() {
        return {}
      }
    },
  }
}
</script>

<style scoped>
.detailBaseInfo {
  width: 100%;
  padding: 10px;
}
.detailBaseInfo h3 {
  font-size: 16px;
  color: #333;
  font-weight: normal;
  line-height: 24px;
}
.price_box {
  padding-top: 10px;
}
.price_box span {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-high-text);
}
.price_box i {
  font-style: normal;
  color: #999;
  font-size: 10px;
  margin-left: 5px;
  position: relative;
}
.price_box button {
  position: absolute;
  top: -10px;
  left: 50px;
  border: none;
  background-color: var(--color-high-text);
  width: 50px;
  height: 22px;
  border-radius: 40px;
  font-size: 10px;
  color: #fff;
}
.columns, .services {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.columns p,
.services p {
  font-size: 12px;
  color: #999;
  /*flex: 1;*/
}
</style>
