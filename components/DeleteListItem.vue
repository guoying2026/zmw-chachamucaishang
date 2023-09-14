<template>
  <!-- 插槽用于放置触发按钮 -->
  <div @click="deleteItem" v-if="userInfoStore.getUserId()*1 > 0">
    <slot name="trigger"></slot>
  </div>
  <LoginPopup v-else>
    <div>
      <slot name="trigger"></slot>
    </div>
  </LoginPopup>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import {Reaction} from "~/types/feedback";

import {serviceContainer} from "~/pinia/feedback/FeedbackServiceContainer";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {useUserInfoStore} from "~/pinia/userInfo";
import LoginPopup from "~/components/LoginPopup.vue";
const userInfoStore = useUserInfoStore();

// 接收父组件传递的show属性
const props = defineProps({
  index:{
    type: Number,
    required: true
  },
  replyIndex:{
    type: Number,
    required: true
  },
  feedbackType: {
    type: String,
    required: true,
    validator: (value: string) => ['comment', 'commentReply', 'question', 'answer', 'complaint','complaintReply'].includes(value)
  },
  companyInfoId:{
    type: Number,
    required: true,
  },
  mainId:{
    type: Number,
    required: true,
  },
  mainReplyId:{
    type: Number,
    required: true
  }
});
const currentHandler = computed(() => {
  const handler = serviceContainer.getHandler(props.feedbackType);
  if (!handler) {
    throw new Error(`Handler not found for feedback type: ${props.feedbackType}`);
  }
  return handler;
});


const deleteItem = (newReaction: Reaction) => {
  console.log('进来了');
  if (['commentReply', 'answer', 'complaintReply'].includes(props.feedbackType)) {
    // 使用unknown作为中间类型进行断言
    const replyHandler = currentHandler.value as unknown as ReplyFeedbackHandler;

    if ("updateReplyReaction" in replyHandler) {
      console.log('开始找reply 点赞');
      replyHandler.deleteReply(props.index, props.replyIndex, props.companyInfoId, props.mainId, props.mainReplyId);
    } else {
      throw new Error("updateReplyReaction method is not available on the handler.");
    }
  } else {
    // 使用unknown作为中间类型进行断言
    const mainHandler = currentHandler.value as unknown as MainFeedbackHandler;

    if ("updateReaction" in mainHandler) {
      mainHandler.delete(props.index, props.companyInfoId, props.mainId);
    } else {
      throw new Error("updateReaction method is not available on the handler.");
    }
  }
};


</script>

<style scoped>
.like_div{
  display: flex;
}
.s_1{
  align-self: flex-start;
  align-items: flex-start;
}
.s_2{
  margin-left: 20px;
  align-self: flex-end;
  align-items: flex-end;
}
.comment_item_4_s{
  display: flex;
  flex-direction: row;
}
</style>
