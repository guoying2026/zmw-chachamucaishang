<template>
  <div class="comment">
    <div class="comment_item" v-for="(comment, index) in commentStore.comments">
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
            <LikeSwitch :index="index" commentOrReply="comment"></LikeSwitch>
            <AddComment company-name="张姗姗木材加工厂" type="commentReply">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color">回复</text>
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
                <LikeSwitch :index="index" :replyIndex="replyIndex" commentOrReply="reply"></LikeSwitch>
                <AddComment :index="index" company-name="张姗姗木材加工厂" type="commentReply">
                  <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left grey-color">回复</text>
                  </template>
                </AddComment>
              </div>
            </div>
          </div>
        </div>
      </div>1
    </div>
  </div>
</template>
<script lang="ts" setup>
import '~/assets/css/comment.scss'
import LikeSwitch from "~/components/LikeSwitch.vue";
import AddComment from "~/components/Comment/AddComment.vue";
import {CommentStore} from "@/types/commentStore";
import {useCommentStore} from "~/pinia/commentStore";

const commentStore:CommentStore = useCommentStore();

</script>
