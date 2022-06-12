<template>
  <div class="shop-info" v-if="shopData !== null">
    <div class="shop-head">
      <div class="shop-logo">
        <img :src="shopData.shopLogo" alt="">
      </div>
      <div class="shop-name">{{ shopData.name }}</div>
    </div>
    <div class="shop-body">
      <div class="body-left">
        <div class="sells">
          <div class="c-sells">{{( shopData.sells / 10000).toFixed(1) + '万'}}</div>
          <div>总销量</div>
        </div>
        <div class="goods">
          <div class="c-goods">{{ shopData.cGoods }}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="body-right">
        <table>
          <tr class="score-item" v-for="item in shopData.score" :key="item.id">
            <td class="name">{{ item.name }}</td>
            <td class="score" :class="item.isBetter ? 'red' : 'green'">{{ item.score }}</td>
            <td class="assess" :class="item.isBetter ? 'red-bg' : 'green-bg'">
              {{ item.isBetter ? '高' : '低' }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter-wrap">
      <div class="enter">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
name: "DetailShopInfo",
  props: {
    shopData: Object,
  },
}
</script>

<style scoped>
.shop-info {
  padding: 1.5625rem .5rem;
  color: #222;
  border-bottom: .3rem solid #f2f5f8;
}
.shop-head {
  display: flex;
  align-items: center;
}
.shop-logo {
  width: 2.8125rem;
  height: 2.8125rem;
  margin-right: .5rem;
  border: 1px solid #ccc;
  border-radius: 10rem;
  overflow: hidden;
}
.shop-logo img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.shop-body {
  margin-top: 1rem;
  display: flex;
  justify-content:space-around;
  align-items: center;
}
.body-left {
  display: flex;
  justify-content:space-around;
  border-right: 2px solid #ccc;
  flex: 1;
  color: #222;
  font-size: .75rem;
}
.body-right {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.sells,.goods {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.c-sells,.c-goods {
  margin-bottom: .5rem;
  font-size: 1rem;
}
.score-item {
  display: flex;
  align-self: start;
  font-size: .875rem;
  margin: .5rem 0;
}
.body-right .score {
  margin-left: .5rem;
  width: 2rem;
}
.body-right .assess {
  margin-left: .5rem;
  color: #fff;
}
.green {
  color: #5ea732;
}
.red {
  color: #fe313a;
}
.green-bg {
  background: #5ea732;
}
.red-bg {
  background: #fe313a;
}
.enter-wrap {
  display: flex;
  justify-content: center;
  margin-top: .5rem;
}
.enter {
  width: 9.375rem;
  background: #f2f5f8;
  text-align: center;
  padding: .25rem 0;
  border-radius: .5rem;
}
</style>
