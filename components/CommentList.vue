<template>
  <NoDetail v-if="commentStore.getCommentsCount <= 0"></NoDetail>
  <div class="comment" v-else>
    <div class="comment_item brown_item_bg" v-for="(comment, index) in commentStore.comments">
      <div class="comment_item_1">
        <img class="avatar-name__img" :src="comment.avatar" width="32" height="32" :alt="comment.name">
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{comment.name}}</strong>
        </div>
      </div>
      <div class="comment_item_2">
        <p class="margin-10-top ">{{comment.comment}}</p>
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
          <text class=" time grey-color">{{comment.created_time}}</text>
          <div class="comment_item_4">
            <LikeSwitch
                :index="Number(index)"
                :reply-index="0"
                feedbackType="comment"
                :company-info-id="companyInfoId"
                :main-id="Number(comment.id)"
                :main-reply-id="0"
            ></LikeSwitch>
            <AddForm v-if="userInfoStore.getUserId()*1 > 0"
                :index="Number(index)"
                :reply-index="0"
                :company-info-id="companyInfoId"
                :reply-user-id="Number(comment.user_id)"
                :reply-user="comment.name"
                :main-id="Number(comment.id)"
                :main-reply-id="0"
                title-box="回复"
                feedbackType="commentReply"
                >
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color">回复</text>
              </template>
            </AddForm>
            <LoginPopup v-else>
              <template #open>
                <text class="margin-20-left grey-color">回复</text>
              </template>
            </LoginPopup>
            <DeleteListItem
                :main-reply-id="0"
                :main-id="Number(comment.id)"
                :company-info-id="companyInfoId"
                feedback-type="comment"
                :reply-index="0"
                :index="Number(index)"
                v-if="comment.user_id*1 === userInfoStore.getUserId()*1"
            >
              <template #trigger>
                <text class="margin-20-left grey-color">删除</text>
              </template>
            </DeleteListItem>
          </div>
        </div>
      </div>
      <div class="reply" v-if="comment.replies && isShowReply">
        <div class="reply_item" v-for="(reply,replyIndex) in comment.replies">
          <div class="reply_item_1">
            <img class="avatar-name__img" :src="reply.avatar" width="32" height="32" :alt="reply.name" />
            <div class="avatar-name__name margin-10-left">
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-if="reply.reply_user_id*1 === comment.user_id*1 || reply.company_comment_reply_id*1 === 0 || comment.user_id*1 === userInfoStore.getUserId()*1">{{reply.name}}</strong>
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-else>{{reply.name}} 回复 {{reply.reply_user_name}}</strong>
            </div>
          </div>
          <div class="reply_item_2">
            <p class="margin-10-top">{{reply.comment}}</p>
            <el-row :gutter="8" v-if="reply.image" class="margin-10-bottom row-image-box">
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
              <text class="time grey-color">{{reply.created_time}}</text>
              <div class="reply_item_4">
                <LikeSwitch
                    :index="Number(index)"
                    :replyIndex="Number(replyIndex)"
                    feedbackType="commentReply"
                    :company-info-id="companyInfoId"
                    :main-id="Number(comment.id)"
                    :main-reply-id="reply.id"
                ></LikeSwitch>
                <AddForm v-if="userInfoStore.getUserId()*1 > 0"
                         :index="Number(index)"
                         :reply-index="Number(replyIndex)"
                         :company-info-id="companyInfoId"
                         :reply-user-id="Number(reply.user_id)"
                         :reply-user="reply.name"
                         :main-id="Number(comment.id)"
                         :main-reply-id="reply.id"
                         title-box="回复"
                         feedbackType="commentReply"
                         :isReplyReply="true"
                >
                <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left grey-color">回复</text>
                  </template>
                </AddForm>
                <LoginPopup v-else>
                  <template #open>
                    <text class="margin-20-left grey-color">回复</text>
                  </template>
                </LoginPopup>
                <DeleteListItem
                    :main-reply-id="reply.id"
                    :main-id="Number(comment.id)"
                    :company-info-id="companyInfoId"
                    feedback-type="commentReply"
                    :reply-index="Number(replyIndex)"
                    :index="Number(index)"
                    v-if="reply.user_id*1 === userInfoStore.getUserId()*1"
                >
                  <template #trigger>
                    <text class="margin-20-left grey-color">删除</text>
                  </template>
                </DeleteListItem>
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
import NoDetail from "~/components/NoDetail.vue";
import {setComments} from "~/composables/comment";
import DeleteListItem from "~/components/DeleteListItem.vue";

const commentStore:CommentStore = useCommentStore();
const userInfoStore = useUserInfoStore();
const props = defineProps({
  isShowReply:{
    type: Boolean,
    default: true
  },
  companyInfoId:{
    type: Number,
    required: true,
  }
});
const { fetchComments } = setComments(props.companyInfoId, userInfoStore.getUserId());
// 在组件挂载时加载评论
watch([() => props.companyInfoId, userInfoStore.getUserId], () => {
  fetchComments();
}, { immediate: true });
</script>
