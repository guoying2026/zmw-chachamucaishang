<template>
  <div class="comment">
    <div class="comment_item" v-for="(comment, index) in store.comments">
      <div class="comment_item_1">
        <img class="avatar-name__img" :src="comment.avatar" width="32" height="32" :alt="comment.user">
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{comment.user}}</strong>
        </div>
      </div>
      <div class="comment_item_2">
        <p class="margin-10-top ">{{comment.content}}</p>
        <div class="comment_item_3">
          <text class=" time grey-color">{{comment.time}}</text>
          <div class="comment_item_4">
            <LikeSwitch :index="index" :store="store" commentOrReply="comment"></LikeSwitch>
            <AddComment :store="addStore" title-box="我要回复" company-name="张珊珊木材加工厂" placeholder-text="我们鼓励真实有帮助的回复" submit-text="发布回复">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color" @click="handleCommentReply(<number>index)">回复</text>
              </template>
            </AddComment>
          </div>
        </div>
      </div>
      <div class="reply" v-if="comment.replies && comment.replies.length">
        <div class="reply_item" v-for="(reply,replyIndex) in comment.replies">
          <div class="reply_item_1">
            <img class="avatar-name__img" :src="reply.avatar" width="32" height="32" :alt="reply.user">
            <div class="avatar-name__name margin-10-left">
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{reply.user}}</strong>
            </div>
          </div>
          <div class="reply_item_2">
            <p class="margin-10-top">{{reply.content}}</p>
            <div class="reply_item_3">
              <text class=" time grey-color">{{reply.time}}</text>
              <div class="reply_item_4">
                <LikeSwitch :index="index" :replyIndex="replyIndex" :store="store" commentOrReply="reply"></LikeSwitch>
                <AddComment :store="addStore" title-box="我要回复" company-name="张珊珊木材加工厂" placeholder-text="我们鼓励真实有帮助的回复" submit-text="发布回复">
                  <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left grey-color" @click="handleCommentReply(<number>index)">回复</text>
                  </template>
                </AddComment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import '~/assets/css/comment.scss'
import { defineProps } from 'vue';
import LikeSwitch from "~/components/LikeSwitch.vue";
import AddComment from "~/components/Comment/AddComment.vue";
import {CommentStore} from "@/types/commentStore";
import {useFeedbackProcessStore} from "~/pinia/feedbackProcessStore";

// 接收父组件传递的show属性
const props = defineProps({
  store:{
    type: Object as () => CommentStore,
    required: true
  },
});

const addStore = useFeedbackProcessStore();
const handleCommentReply = (index: number) => {
  addStore.openCommentBox();
  addStore.setIndex(index);
  addStore.setType('commentReply');
}
</script>
