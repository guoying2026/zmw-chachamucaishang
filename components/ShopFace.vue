<style scoped>
.second_1{
  margin-top: -40px;
  width: 94%;
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_a27b2d45-6b65-4208-b159-31cf256bd2fb.png");
}
.second_1 .second_1_1{
  color:#707070;
  font-weight: bolder;
  font-size: clamp(16px, 1.4vw, 20px);
  margin-top: 20px;
}
.second_1 .second_1_2{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}
.second_1 .second_1_2 .second_1_2_item{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5%;
  width: 30%;
  color: #000;
}
.second_1 .second_1_2 .second_1_2_first{
  height: clamp(50px, 5.56vw, 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.second_1 .second_1_2 .second_1_2_item .second_1_2_item_middle{
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.second_1 .second_1_2 .second_1_2_item .second_1_2_item_middle .second_1_2_item_middle_number{
  display: flex;
  padding: 2px 8px;
  font-size: clamp(30px, 3.5vw, 50px);
  font-weight: 600;
  background-color: #E21B00;
  color: #fff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-family: system-ui;
}
.second_1_2_item_left{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.grey-line{
  width: 80%;
  height: 1px;
  border-top: solid #CFCFCF 1px;
  margin: 10px 0;
}
@media (max-width: 768px) {
  .second_1 .second_1_1 {
    margin-top: 10px;
    color: #333333;
    letter-spacing: 1.5px;
  }

  .second_1 {
    margin-top: -40px;
    width: 94%;
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_a27b2d45-6b65-4208-b159-31cf256bd2fb.png");
  }
  .medal{
    width: 20px;
  }
}
</style>
<template>
  <div class="second_1">
    <NuxtLink :to="'/detail?id='+companyId">
      <span class="second_1_1">{{companyName}}</span>
    </NuxtLink>
    <div class="second_1_2">
      <div class="second_1_2_item">
        <div class="second_1_2_first">
          <div class="second_1_2_item_left">
            <img class="medal" v-if="creditScore >= -1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e2d929f8-8994-4ba6-b731-d4779bf41cf2.png" alt=""/>
            <img class="medal" v-if="creditScore >= -1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_c5514216-f624-444c-bb74-24b956dfaab0.png" alt=""/>
            <img class="medal" v-if="creditScore > 25" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_63b5d737-53a8-407f-bec4-9f92e207c88c.png" alt=""/>
            <img class="medal" v-if="creditScore > 25" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_f2fdbec2-a1bc-490d-ba2e-383830efbd3a.png" alt=""/>
          </div>
          <div class="second_1_2_item_left margin-10-top">
            <img class="medal" v-if="creditScore > 50" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e2d929f8-8994-4ba6-b731-d4779bf41cf2.png" alt=""/>
            <img class="medal" v-if="creditScore > 50" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_c5514216-f624-444c-bb74-24b956dfaab0.png" alt=""/>
            <img class="medal" v-if="creditScore > 75" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_63b5d737-53a8-407f-bec4-9f92e207c88c.png" alt=""/>
            <img class="medal" v-if="creditScore > 75" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_f2fdbec2-a1bc-490d-ba2e-383830efbd3a.png" alt=""/>
          </div>
        </div>
        <text class="grey-line"></text>
        <div class="second_1_2_third">勋章</div>
      </div>
      <div class="second_1_2_item">
        <div class="second_1_2_first second_1_2_item_middle">
          <text class="second_1_2_item_middle_number">{{creditScore}}</text>
        </div>
        <text class="grey-line"></text>
        <div class="second_1_2_third">信用分</div>
      </div>
      <div class="second_1_2_item">
        <img v-if="creditScore >= -1 && creditScore <= 25" class="second_1_2_first second_1_2_item_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_b3f68a6d-3f39-4c00-bcb9-3bc223275f46.png" alt=""/>
        <img v-else-if="creditScore > 25 && creditScore <= 50" class="second_1_2_first second_1_2_item_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_1d7c135f-d036-4159-bcf3-62d40562d9df.png" alt=""/>
        <img v-else-if="creditScore > 50 && creditScore <= 75" class="second_1_2_first second_1_2_item_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_beee94e2-8cae-462d-bef5-6fb30bd4631d.png" alt=""/>
        <img v-else-if="creditScore > 75" class="second_1_2_first second_1_2_item_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_a3ca6564-02b3-46f8-bb0d-3939254ed41b.png" alt=""/>
        <text class="grey-line"></text>
        <div class="second_1_2_third">等级</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  creditScore:{
    type: Number,
    default: 0,
  },
  companyName: {
    type: String,
    default: "",
  },
  companyId:{
    type: Number,
    required: true,
  }
});
</script>
