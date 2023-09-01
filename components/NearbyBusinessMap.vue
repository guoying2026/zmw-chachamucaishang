<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <div @click="openNearbyMapBox">
      <slot name="trigger"></slot>
    </div>
    <div class="overlay" v-if="show">
      <img class="close-box" @click="closeNearbyMapBox" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_574ad6b3-3918-4434-babf-0fd2db4a90a5.png" alt="关闭按钮">
      <div class="main">
        <!-- Left: Map -->
        <div class="main_map">
          <BusinessMap :lat="lat" :lng="lng" :address="address" :isNearBy="isNearBy"></BusinessMap>
        </div>

        <!-- Right: List -->
        <div class="list">
          <text>{{companyName}}</text>
          <div class="list_item margin-10-top">
            <div class="list_item_1">
              <div class="list_item_1_left">
                <text class="list_item_1_left_top">88</text>
                <text class="">信用分</text>
              </div>
              <div class="list_item_1_right">
                <div class="list_item_1_right_top">
                  <text class="list_item_1_right_top_1">温州木材集团有限公司</text>
                  <text class="list_item_1_right_top_2">在业</text>
                </div>
                <div class="brown_min">
                  <text>法定代表人：王明伟</text>
                  <text class="margin-10-left">注册资本：200万元</text>
                </div>
              </div>
            </div>
            <div class="list_item_2 brown_min">
              <text>距商家23km</text>
              <text>注册日期：2023-09-09</text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.brown_min{
  color:#B6A493;
}
.list_item_1_left_top{
  font-size: 20px;
}
.list_item_1_right_top_2{
  border: #20B16A 1px solid;
  padding: 1px 5px;
  color: #20B16A;
  border-radius: 5px;
  margin-left: 10px;
}
.list_item_1_right_top{
  display: flex;
  flex-direction: row;
}
.list_item_1_right_top_1{
  font-size: 16px;
}
.list_item_1_right{
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 10px 5px 0;
}
.list_item_2{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px;
}
.list_item_1_left{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3F1E00;
  border-radius: 5px;
  padding: 0 5px 5px 5px;
}
.list_item_1{
  display: flex;
  flex-direction: row;
}
.list_item{
  border-radius: 10px;
  font-size: 10px;
  padding: 10px;
  background-color: #684525;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list{
  width: 40%;
  color: #fff;
  background-color: #3F1E00;
  padding: 20px;
}
.main_map{
  width: 60%;
  height: 100vh;
}
.main{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.overlay{
  position: fixed;
  top: 60px;
  left: 0;
  width: 100vw;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: #000;
  z-index: 999;
}
.close-box{
  width: 20px;
  height: 20px;
  align-self: flex-end;
}
</style>

<script lang="ts" setup>
const props = defineProps({
  lng: {
    type: Number,
    default: 0,
  },
  lat: {
    type: Number,
    default: 0,
  },
  address:{
    type: String,
    default: '',
  },
  isNearBy:{
    type: Boolean,
    default: false,
  },
  companyName:{
    type: String,
    defalut: '',
  }
});
const show = ref(false)
const list = ref(['项目1', '项目2', '项目3']);  // 示例数据
const openNearbyMapBox = () => show.value = true;
const closeNearbyMapBox = () => show.value = false;

</script>
