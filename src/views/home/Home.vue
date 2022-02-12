<template>
<div id="home">
<!--  <h2>首页</h2>-->
  <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
  <TabControl
    :titles="['流行','新款','精选']"
    @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed">
  </TabControl>
<!--  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>-->

  <scroll class="content" ref="scroll" v-bind:probe-type="3" @scroll="contentScroll"
          :pull-up-load="true" @pullingUp ='loadMore'>
<!--    <div ref="aaa"></div>-->
    <HomeSwiper :banners="banners" ref="swiper" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView/>
    <!--  v-on: 语法糖@     class="tab-control"   :class="{fixed: isTabFixed}"-->
    <TabControl
                :titles="['流行','新款','精选']"
                @tabClick="tabClick" ref="tabControl2" >
    </TabControl>
    <GoodsList :goods="showGoods"></GoodsList>
  </scroll>
<!--  <div>呵呵呵</div>-->
  <back-top @click.native="backClick" v-show="isShowBackTop"  />   <!--  @backClick="backClick"-->

<!--  <ul>-->
<!--    <li>列表11</li>-->
<!--    <li>列表21</li>-->
<!--    <li>列表31</li>-->
<!--    <li>列表41</li>-->
<!--    <li>列表51</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表1</li>-->
<!--    <li>列表2</li>-->
<!--    <li>列表3</li>-->
<!--    <li>列表4</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表511</li>-->
<!--    <li>列表511</li>-->
<!--    <li>列表511</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表5</li>-->
<!--    <li>列表51</li>-->









<!--  </ul>-->

</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";
// import {Swiper,SwiperItem} from 'components/common/swiper';


import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {getHomeMultidata, getHomeGoods} from 'network/home';

//工具类
import {debounce} from "common/utils";

export default {
name: "Home",
components:{
  NavBar,
  Scroll,
  TabControl,
  GoodsList,
  BackTop,

  // Swiper,
  // SwiperItem


  HomeSwiper,
  RecommendView,
  FeatureView,

},
  data() {
  return {
    // result :null
    banners: [],
    recommends: [],
    goods: {
      'pop':  {page: 0, list: [] },
      'new':  {page: 0, list: [] },
      'sell': {page: 0, list: [] },
    },
    currentType: 'pop',
    isShowBackTop: false,
    tabOffSetTop: 0,
    isTabFixed: false,
    saveY: 0,
    }
  },
  created() {
  //1.请求多个数据
    //函数调用 =>压入函数栈(保存函数调用过程中所有的变量)
    //函数调用结束 => 弹出函数栈(释放函数所有的变量)
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  computed: {
  showGoods() {
    return  this.goods[this.currentType].list
  }
  },
  mounted() {
    // console.log(this.$refs.swiper);
    // console.log(this.$refs.aaa);
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,500);
    //用事件总线监听
    this.$bus.$on("itemImageLoad", () => {
      // console.log("--------");
      // this.$refs.scroll.refresh();
      refresh()
      // console.log("--------");
    })


  },
  destroyed() {
    console.log('homeDestroy');
  },

  activated() {
    console.log("activated");
    console.log("activated"+ this.saveY);
    console.log(this.$refs.scroll);
    this.$refs.scroll.scrollTo(0,this.saveY,0)

    this.$refs.scroll.refresh();
  },

  deactivated() {
    console.log("deactivated");
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.$refs.scroll);
    console.log("deactivated"+ this.saveY);
  },

  methods: {
  /**
   * 事件监听相关的方法
   */
    tabClick(index) {
    // console.log(index);
    switch (index) {
      case 0:
        this.currentType = 'pop'
        break;
      case 1:
        this.currentType = 'new'
        break;
      case 2:
        this.currentType = 'sell'
    }
    //tabControl1,tabControl2 使两者保持一致
    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;
  },


    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result =res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log(res); //
       this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1;

       // this.$refs.scroll.scroll.finishPullUp();
        this.$refs.scroll.finishPullUp();

      })
    },

    backClick() {
      // console.log("组件能不能监听点击");
      // console.log(this.$refs.scroll.scroll);
      // console.log(this.$refs.scroll.message);
      // this.$refs.scroll.scroll.scrollTo(0,0);
      //this.$refs.scroll.scroll.scrollTo(0,0,500); //加个时间让他回到顶部有个过程，不至于那么快
      this.$refs.scroll.scrollTo(0,0);

    },

    contentScroll(position) {
      //1.判断BackTop是否显示
      // console.log(position);
      // if (-position.y < 1000){
      //   this.isShowBackTop =false;
      // }else {
      //   this.isShowBackTop = true;
      // }
      this.isShowBackTop= (-position.y >1000)

      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffSetTop
    },

    loadMore() {
      // console.log('下拉加载更多');
      this.getHomeGoods(this.currentType);

      //解决刷新后无法滚动问题
      this.$refs.scroll.scroll.refresh();
    },

    swiperImageLoad() {
      //2.获取tabControl的tabOffSetTop
      // this.tabOffSetTop = this.$refs.tabControl
      //所有的组件都有一个属性$el: 用于获取组件中的元素
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    },

  }
}
</script>

<style scoped>
#home {
  /*解决轮播图图片显示不全*/
  padding-top: 44px;

  /*视口vh：viewport 防止home被撑高*/
  height: 100vh;

  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  /*!*z-index解决购物街被覆盖*!*/
  /*z-index: 9;*/

}

/*类似固定，吸顶效果*/
/*.tab-control {*/
/*  !*sticky:浏览器根据一定值，决定是static 还是fixed,但是有些浏览器可能不支持*!*/
/*  position: sticky;*/
/*  top: 44px;*/

/*  z-index: 9;*/
/*}*/

/*吸顶效果,不能用*/
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  !*margin-top: 0px;*!*/
/*}*/

.content {
  /*height: 300px;*/
  /* 绝对定位*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}


</style>
