<template>
  <div class="no_detail" :class="isBlue ? 'blue':'brown'">
    <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_3e62a430-f614-4f2e-bcbe-eed8a2e282e6.png" alt="" />
    <text class="margin-10-top margin-10-bottom">{{text}}</text>
<!--    <Tag :tag=tag number="41" color="orange"  v-if="hasButton"></Tag>-->
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  tag:{
    type: String,
    default: '添加评论'
  },
  text:{
    type: String,
    default: '没有相关评论'
  },
  hasButton:{
    type: Boolean,
    default: true,
  },
  isBlue:{
    type: Boolean,
    default: false,
  }
})
</script>
<style scoped>
.no_detail{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  border-radius: 10px;
}
.brown{
  background: #562C05;
}
.blue{
  background: #061D51;
}
</style>
