<template>
  <client-only>
  <div class="first">
    <img class="first_2" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_52ee4cb2-2ecf-4107-b71f-2d524663d765.png" alt=""/>
  </div>
  <div class="third dark_third_bg">
    <ShopFace :companyName="company_name" :companyId="Number(query.id)" :creditScore="Number(credit_score)"></ShopFace>
    <div class="third_2">
      <client-only>
        <div class="third_2_space blue-tab">
          <text class="tab_" :class="tab === 7?'white-color blue-underline':''" @click="switchTab(7)">评价</text>
          <text class="tab_" :class="tab === 8?'white-color blue-underline':''" @click="switchTab(8)">问答</text>
          <text class="tab_" :class="tab === 9?'white-color blue-underline':''" @click="switchTab(9)">投诉</text>
        </div>
      </client-only>
    </div>
    <CommentListMobile
        v-if="tab === 7"
        :company-info-id="Number(query.id)"
    ></CommentListMobile>
    <template v-if="tab === 7">
      <AddFormMobile v-if="userInfoStore.getUserId()*1 > 0"
                     :index="0"
                     :reply-index="0"
                     :company-info-id="Number(query.id)"
                     :reply-user-id="0"
                     :reply-user="company_name"
                     :main-id="0"
                     :main-reply-id="0"
                     title-box="评论"
                     feedback-type="comment"
      >
        <!-- 定义插槽内容 -->
        <template #trigger>
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_674067de-0fa6-4a1e-bd78-9ff51400b77a.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </AddFormMobile>
      <LoginPopup v-else>
        <template #open>
          <HoverButton >
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_674067de-0fa6-4a1e-bd78-9ff51400b77a.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </LoginPopup>
    </template>
    <!--移动端评论界面结束-->
    <!--      移动端提问界面开始-->
    <div class="nine" v-if="tab === 8">
      <QuestionListMobile :company-info-id="Number(query.id)"></QuestionListMobile>
      <AddFormMobile v-if="userInfoStore.getUserId()*1 > 0"
                     :index="0"
                     :reply-index="0"
                     :company-info-id="Number(query.id)"
                     :reply-user-id="0"
                     :reply-user="company_name"
                     :main-id="0"
                     :main-reply-id="0"
                     title-box="提问"
                     feedback-type="question">
        <!-- 定义插槽内容 -->
        <template #trigger>
          <!-- 当点击时触发openCommentBox方法 -->
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_296ceba6-2d6d-4c64-bcad-6ccdf60ff96c.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </AddFormMobile>
      <LoginPopup v-else>
        <template #open>
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_296ceba6-2d6d-4c64-bcad-6ccdf60ff96c.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </LoginPopup>
    </div>
    <!--    移动端提问界面结束-->
    <!--    移动端投诉界面开始-->
    <div class="nine" v-if="tab === 9">
      <ComplaintListMobile :company-info-id="Number(query.id)" :company-name="company_name"></ComplaintListMobile>
      <AddFormMobile v-if="userInfoStore.getUserId()*1 > 0"
                     :index="0"
                     :reply-index="0"
                     :company-info-id="Number(query.id)"
                     :reply-user-id="0"
                     :reply-user="company_name"
                     :main-id="0"
                     :main-reply-id="0"
                     title-box="投诉"
                     feedback-type="complaint"
      >
        <!-- 定义插槽内容 -->
        <template #trigger>
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_ae5c4513-e845-4bc7-bfd8-87b259c74666.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </AddFormMobile>
      <LoginPopup v-else>
        <template #open>
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_ae5c4513-e845-4bc7-bfd8-87b259c74666.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </LoginPopup>
    </div>
    <!--    移动端投诉界面结束-->
  </div>
  </client-only>
</template>
<script setup lang="ts">
import "assets/css/mobileAppraise.css";
import ShopFace from "~/components/ShopFace.vue";
import {useRoute} from "vue-router";
import {useShopDetails} from "~/composables/shop";
import {onMounted} from "vue";
import CommentListMobile from "~/components/CommentListMobile.vue";
import Tag from "~/components/Tag.vue";
import {useUserInfoStore} from "~/pinia/userInfo";
const route = useRoute();
const query = route.query;

const id = Number(query.id);
const tab = ref(Number(query.tab));

const shopDetails = useShopDetails(id);
const {
  company_name,
  credit_score,
  province,
  fetchShopDetails,
} = shopDetails;
onMounted(() => {
  fetchShopDetails();

});
const switchTab = (item :number) => {
  tab.value = item;
}
const userInfoStore = useUserInfoStore();
</script>
