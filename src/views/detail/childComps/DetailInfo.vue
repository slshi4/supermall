<template>
  <div class="detail-info" v-if=" detailInfoData !== null">
    <div class="detail-description">
      <div class="decoration-top"></div>
      <div class="description-text">{{ detailInfoData.description }}</div>
      <div class="decoration-bottom"></div>
    </div>
    <div class="detail-title">穿着效果</div>
    <div class="detail-image">
      <div v-for="item in detailInfoData.detailImage" :key="item.id">
        <img :src="item" alt="" @load="imageLoad">
      </div>
    </div>
  </div>
</template>

<script>
// 工具函数
import {debounce} from 'common/utils.js'

export default {
  props: {
    detailInfoData: Object,
  },
  methods: {
    imageLoad() {
      this.$EventBus.$emit('detailInfoLoad')
    }
  },
}
</script>

<style>
.detail-info {
  padding: 1.25rem 0;
  border-bottom: .3rem solid #f2f5f8;
}
.detail-description {
  margin: 0 1rem;
  padding: 1rem 0;
  font-size: .875rem;
  position: relative;
}
.decoration-top {
  position: absolute;
  top: 0;
  width: 5rem;
  height: .125rem;
  background-color: #ccc;
}
.decoration-top::after {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: .35rem;
  height: .35rem;
  background-color: #222;
}
.decoration-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 5rem;
  height: .125rem;
  background-color: #ccc;
}
.decoration-bottom::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: .35rem;
  height: .35rem;
  background-color: #222;
}
.detail-title {
  margin: .625rem 1rem;
}
.detail-image img{
  width: 100%;
}
</style>
