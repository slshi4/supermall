<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button
      :is-checked="isSelectAll"
      class="check-button" @click.native="checkClick" />    <!--监听组件点击@click.native -->
    <span>全选</span>
  </div>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";


export default {
name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
  ...mapGetters(['cartList']),
    //toFixed(2) 保留2位小数
    totalPrice() {
      return '￥' +this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price * currentValue.count;
      },0).toFixed(2)
    },
   checkLength() {
      // return this.$store.state.cartList.filter(item  => item.checked).length;
      return this.cartList.filter(item  => item.checked).length;
   },
    isSelectAll() {
      if (this.cartList.length === 0)  return false;
    //todo 方法一:数字是可以取反的,全选，性能可能不高
   // return !(this.cartList.filter(item => !item.checked).length)

      //todo 方法二: find方法
     // return  (!this.cartList.find(item => !item.checked))

      //todo 方法三:常规方式
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }


  },
  methods: {
    //监听全选按钮的点击
    checkClick() {
      // console.log('------------');
      if (this.isSelectAll) {  //默认全部选中
       this.cartList.forEach(item => item.checked = false );
      }else {    //默认部分或者全部不选中
        this.cartList.forEach(item => item.checked = true);
      }
      //todo 注意此处不能:简化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll);
    },

    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000);
      }
    }

  }

}
</script>

<style scoped>

.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

 .check-button {
   width: 22px;
   height: 22px;
   line-height: 22px;
   margin-right: 5px;
 }

 .total-price {
   margin-left: 30px;
   flex: 1;
 }

 .calculate {
   width: 90px;
   background-color: red;
   color: #ffffff;
   text-align: center;
 }


</style>
