<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            v-bind:pullUpLoad="pullUpLoad"
            :probe-type="3"
            @scroll="contentScroll">
<!--      <ul>
        <li v-for = "item in $store.state.cartList">
          {{item}}
        </li>
      </ul>-->
     <detail-swiper :top-images="topImages" />
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop-data="shop" />
     <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
     <detail-param-info :param-info="paramInfo" ref="param"/>
     <detail-comment-info :comment-info="commentInfo" ref="comment"/>
     <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"  />

<!--    <toast :message="message" :show="show" />    &lt;!&ndash; 字符串不用加冒号 &ndash;&gt;-->
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

//参数
import DetailParamInfo from "./childComps/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import {debounce} from "common/utils";
import {itemListMixin,backTopMixin} from "common/mixin";

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";
// import BackTop from "components/content/backTop/BackTop";

//把vuex中 action映射到detail.vue中
import {mapActions} from 'vuex'

// import Toast from "components/common/toast/Toast";

export default {
name: "Detail",
  mixins: [itemListMixin,backTopMixin],
  data() {
  return {
    iid: null,
    topImages: [],
    goods: {},
    shop: {},
    detailInfo : {},
    pullUpLoad: true,
    paramInfo: {},
    commentInfo: {},
    recommends: [],
    // itemImgListener: null,
    themeTopYs: [],
    getThemeTopY: null,
    currentIndex: 0,
    // isShowBackTop: false,

    // message: '',
    // show: false,
  }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,  //推荐复用GoodsList组件
    DetailBottomBar,
    // BackTop,
    // Toast,

  },
  created() {
    console.log(this.$route.params);
    // 保存传入的iid
    this.iid = this.$route.params.id;
    // 2.根据iid请求详情页数据，放在这里页面不会自动刷新,除非在keep-alive中排除组件:exclude = 'Detail'
    this.getDetail();

    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    //4.给getThemeTopY赋值 gThemeTopY赋值进行防抖，避免被调用多次
    this.getThemeTopY = debounce(() => {

      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);//方便后面进行：内容滚动显示正确的标题 防止数组越界
      console.log(this.themeTopYs);
    },100)

  },
  mounted() {
    console.log('我是Detail中的内容 mounted ');


  },
  updated() {
    console.log('执行了====================updated');
    //这是可以的，没问题
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  activated() {
    //解决Vue用router.push(传参)跳转页面，参数改变,跳转页面数据不自动刷新需要手动刷新的解决办法
    //原因分析:页面加载刷新的问题，与使用create方法有关。且相同组件，vue内部不会销毁会复用，导致create()只会触发一次
    /**
     * created():在创建vue对象时，当html渲染之前就触发，但是注意，全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()
     * 只会触发一次。
     * activated():在Vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发，可用于初始化页面数据。所以要放入
     * activated()函数中调用
     */
    // 解决办法:
    // this.iid = this.$route.params.id;
    // //2.根据iid请求详情页数据
    // this.getDetail();
  },
  deactivated() {
    //todo 由于Detail.vue 在 App.vue keep-alive中已经被排除(即没有做缓存)，所以在离开组件Detail 并不会调用deactivated()方法
    //所以不能在这里面做全局事件的取消
    console.log('Detail deactivated');
  },
  destroyed() {
    console.log('Detail destroyed');
    //在destroyed方法中 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  methods: {

   ...mapActions(['addCart']), //数组
    //对象方式映射
    // ...mapActions({
    //   add: 'addCart'
    // }),

    imageLoad() {
      //todo 方式一
      // this.$refs.scroll.refresh();

      //todo 方式二
      this.refresh();

      //getThemeTopY 用了防抖函数，避免被调用多次
      this.getThemeTopY();

      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

    },
    /**
     * 获取详情页相关数据
     */
  getDetail() {
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
    //1.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      //7.取出评论的信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //TODO 第一次获取：值不对 值不对原因：this.$refs.prams.$el压根没有渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);


      //todo 该函数会等所有组件完全渲染完，会回调 nextTick()方法,这样 themeTopYs属性才会有值，而非 undefine
      this.$nextTick(() => {
        //todo 第二次获取：值不对 值不对的原因：图片没有计算在内
        //todo 根据最新的数据，对应的DOM是已经被渲染出来
        //todo 但是图片依然是没有加载完成(目前获取到offsetTop不包含其中的图片)。
        //TODO offSetTop值不对的时候，都是因为图片的问题。
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });

    })
  },
    titleClick(index) {
      console.log('联动效果================='+index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
    },
    /**
     * 联动效果
     * @param position
     */
    contentScroll(position) {
      // console.log('--------------------------------------------------'+position);
      //todo 1.获取y值
      const positionY = -position.y;
      //todo 2.positionY和主题中值进行比较
      //[0, 15596, 16273, 16563]
      //positionY在0-15596之间，index = 0
      //positionY在15596-16273之间，index =1
      //positionY在16273-16563之间，index =2
      //positionY在16563- 无穷大之间，index =3
      let length = this.themeTopYs.length;
      /*for (let i= 0; i < length ;i++){
        //for(let i in themeTopYs)这个用法  console.log(i); //str i是字符串 i+1  => 01
        //字符串装int  1. i * 1  2. parseInt(i)
        //this.currentIndex !== i 防止被频繁调用赋值
        if (this.currentIndex !== i && (( i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
          (i === length -1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }*/
      for (let i= 0; i < length-1 ;i++){
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //todo 3.backTop
      // this.isShowBackTop= (-position.y >1000)
       this.listenerIsShowBackTop(position);
    },

    /*backClick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500); //加个时间让他回到顶部有个过程，不至于那么快
      this.$refs.scroll.scrollTo(0,0,300);
    },*/
    addToCart() {
      // console.log('addToCart---------');
      //todo 1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //todo 2.将商品添加到购物车里面
      // 方法放到 mutations addCart 不建议
      // this.$store.commit('addCart',product);
      //方法放到actions里面推荐
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // });

      this.addCart(product).then(res => {
        console.log(res);
       /* this.show = true;
        this.message = res;
        setTimeout(() => {
        this.show = false;
        this.message= '';
        },1500)*/
        console.log(this.$toast);
        // this.$toast.show(res,2000);
        this.$toast.show();
      });

    },
  }


}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;

}

/*.detail-nav {*/
/*  position: relative;*/
/*  z-index: 9;*/
/*  background-color: #ffffff;*/
/*}*/

.content {
  height: calc(100% - 44px - 49px);
}
</style>
