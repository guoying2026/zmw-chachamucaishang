<template>
  <div class="comment">
    <div class="comment_item brown_item_bg" v-for="(comment, index) in commentStore.comments">
      <div class="comment_item_1">
        <img class="avatar-name__img" :src="comment.avatar" width="32" height="32" :alt="comment.user">
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{comment.user}}</strong>
        </div>
      </div>
      <div class="comment_item_2">
        <p class="margin-10-top ">{{comment.content}}</p>
        <el-row :gutter="8" v-if="comment.image.length" class="margin-10-bottom row-image-box">
          <el-col
              v-for="(itemImage, indexImage) in comment.image"
              :key="indexImage"
              :span="8"
              :md="8"
          >
            <el-image
                :hide-on-click-modal=true
                :src="itemImage"
                class="image_list"
                fit="cover"
                :zoom-rate="1.2"
                :preview-src-list="comment.image"
                :initial-index="Number(indexImage)"
                lazy />
          </el-col>
        </el-row>
        <div class="comment_item_3">
          <text class=" time grey-color">{{comment.time}}</text>
          <div class="comment_item_4">
            <LikeSwitch :index="index" feedbackType="comment"></LikeSwitch>
            <AddForm :index="index" v-if="comment.user_id !== userId" title-box="回复" :company-name="comment.user" feedbackType="commentReply" :reply-user-id="comment.user_id" :reply-user="comment.user">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color">回复</text>
              </template>
            </AddForm>
<!--            <text class="margin-20-left grey-color" v-else>删除</text>-->
          </div>
        </div>
      </div>
      <div class="reply" v-if="comment.replies && comment.replies.length && isShowReply">
        <div class="reply_item" v-for="(reply,replyIndex) in comment.replies">
          <div class="reply_item_1">
            <img class="avatar-name__img" :src="reply.avatar" width="32" height="32" :alt="reply.user" />
            <div class="avatar-name__name margin-10-left">
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-if="reply.replyUserId === comment.user_id">{{reply.user}}</strong>
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-else>{{reply.user}} 回复 {{reply.replyUser}}</strong>
            </div>
          </div>
          <div class="reply_item_2">
            <p class="margin-10-top">{{reply.content}}</p>
            <el-row :gutter="8" v-if="reply.image.length" class="margin-10-bottom row-image-box">
              <el-col
                  v-for="(itemReplyImage, indexReplyImage) in reply.image"
                  :key="indexReplyImage"
                  :span="8"
                  :md="8"
              >
                <el-image
                    :hide-on-click-modal=true
                    :src="itemReplyImage"
                    class="image_list_reply"
                    fit="cover"
                    :zoom-rate="1.2"
                    :preview-src-list="reply.image"
                    :initial-index="Number(indexReplyImage)"
                    lazy />
              </el-col>
            </el-row>
            <div class="reply_item_3">
              <text class="time grey-color">{{reply.time}}</text>
              <div class="reply_item_4">
                <LikeSwitch :index="index" :replyIndex="replyIndex" feedbackType="commentReply"></LikeSwitch>
                <AddForm v-if="reply.user_id !== userId" title-box="回复" :company-name="reply.user" feedbackType="commentReply" :index="index" :reply-index="Number(replyIndex)" :isReplyReply="true" :reply-user-id="reply.user_id" :reply-user="reply.user">
                  <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left grey-color">回复</text>
                  </template>
                </AddForm>
<!--                <text class="margin-20-left grey-color" v-else>删除</text>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'assets/css/comment.scss'
import LikeSwitch from "~/components/LikeSwitch.vue";
import {CommentStore} from "~/types/commentStore";
import {useCommentStore} from "~/pinia/commentStore";
import {useUserInfoStore} from "~/pinia/userInfo";

const commentStore:CommentStore = useCommentStore();
const userInfoStore = useUserInfoStore();
const userId = userInfoStore.getUserId();
const props = defineProps({
  isShowReply:{
    type: Boolean,
    default: true
  },
});
</script>
