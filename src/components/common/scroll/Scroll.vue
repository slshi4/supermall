<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      scroll: null,
      message: '哈哈啊哈',
    }
  },
  mounted() {
    // console.log(document.querySelector('.wrapper'));拿到的不一定是准确的
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
       disableTouch : false,  //必须有否则不能滑动
       observeDOM: true, //解决使用better-scroll刷新页面后无法滚动的问题
      probeType: this.probeType,
      pullUpLoad:  this.pullUpLoad,
      click: true,

    })

    console.log(this.scroll);
    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      //通过自定义事件，把事件发出去
      this.$emit('scroll',position);
    })

    //3.监听上拉事件
     this.scroll.on('pullingUp', () =>{
       // console.log('上拉加载更多');
       this.$emit('pullingUp');
     })

    // this.scroll.scrollTo(0,0);
  },

  methods: {
    //time=300,如果别人不传的话，就会使用默认值
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time);
    },

    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log("--------scroll");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return  this.scroll ? this.scroll.y : 0
    }
  }

}
</script>

<style scoped>

</style>
