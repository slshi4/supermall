//混入
import {debounce} from "./utils";

export const itemListMixin = {
  components: {
    //组件用的多也是可以混入的
  },
  methods: {
    //方法用的多也是可以混入的
  },
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {   //mounted是生命周期函数
    // const refresh = debounce(this.$refs.scroll.refresh,500);
    this.refresh = debounce(this.$refs.scroll.refresh,500);
    this.itemImgListener = () => {
      // refresh()
      this.refresh()
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入中的内容');
  }
}

/**
 * 回到顶部混入
 */
import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300);
    },
    listenerIsShowBackTop(position) {
      this.isShowBackTop= (-position.y >1000)
    },
  },
  components: {
    BackTop,
  },
}








