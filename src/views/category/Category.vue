<template>
  <div class="wrapper" ref="aaaa">

    <!-- 1.无论是否设置click:false，button都可以点击   -->
    <button @click="btnClick">按钮</button>

    <!-- 2.必须设置click:true,那么div才能监听点击,用来控制div等元素是否可点击 -->
    <div @click="divClick">呵呵呵</div>


    <ul clsss="content">
      <button class="btn" @click="btnClick">btn</button>
      <li>x1</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x2</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x3</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x4</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x</li>
      <li>x45</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    }
  },
  //created 组件创建完后调用，但是template还没挂载
  created() {
    //错误的
    // console.log(this.$refs.aaaa);
    // this.scroll = new BScroll('.wrapper',{
    // })
  },
  mounted() {
    console.log(this.$refs.aaaa);
    console.log(document.querySelector('.wrapper'));
    this.scroll = new BScroll(this.$refs.aaaa,{
      disableTouch: false,  //必须有否则不能滑动
      probeType: 3,
      pullUpLoad: true,
      click: false,
    })
    this.scroll.on('scroll',(position) =>{
      // console.log(position);
    })
    this.scroll.on('pullingUp',() =>{
      console.log("shanglajiazai");
    })

  },
  methods:{
    btnClick() {
      console.log("btnClick");
    },
    divClick() {
      console.log("DIV-click");
    }
  }
}
</script>

<style scoped>
 .wrapper {
  /*必须给wrapper一个高度*/
  height: 150px;
  background-color: #ff5777;
  overflow: hidden;

  /*overflow-y: scroll;*/
}
</style>
