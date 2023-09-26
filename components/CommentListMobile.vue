<template>
  <div class="comment">
    <NoDetail class="margin-20-bottom" :is-height350="false" v-if="commentStore.getCommentsCount <= 0"></NoDetail>
    <template v-for="(comment, index) in commentStore.comments" :key="index" v-else>
      <div class="comment_item" :class="isMobileAppraise?'brown_item_bg': 'blue_comment'" v-if="index < effectiveLimit">
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
          <text class="time" :class="isMobileAppraise?'grey-color':'blue-color'">{{comment.created_time}}</text>
          <div class="comment_item_4">
            <LikeSwitch
                :index="Number(index)"
                :reply-index="0"
                feedbackType="comment"
                :company-info-id="companyInfoId"
                :main-id="Number(comment.id)"
                :main-reply-id="0"></LikeSwitch>
            <AddFormMobile v-if="userInfoStore.getUserId()*1 > 0"
                           :index="Number(index)"
                           :reply-index="0"
                           :company-info-id="companyInfoId"
                           :reply-user-id="Number(comment.user_id)"
                           :reply-user="comment.name"
                           :main-id="Number(comment.id)"
                           :main-reply-id="0"
                           title-box="回复"
                           feedbackType="commentReply"
                           :isShowReply="isShowReply"
                           >
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left" :class="isMobileAppraise?'grey-color': 'blue-color'">回复</text>
              </template>
            </AddFormMobile>
            <LoginPopup v-else>
              <template #open>
                <text class="margin-20-left" :class="isMobileAppraise?'grey-color': 'blue-color'">回复</text>
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
                <text class="margin-20-left" :class="isMobileAppraise?'grey-color': 'blue-color'">删除</text>
              </template>
            </DeleteListItem>
          </div>
        </div>
      </div>
      <div class="reply" v-if="comment.replies && comment.replies.length && isShowReply">
        <div class="blue_reply reply_item" v-for="(reply,replyIndex) in comment.replies">
          <div class="reply_item_1">
            <img class="avatar-name__img" :src="reply.avatar" width="32" height="32" :alt="reply.user">
            <div class="avatar-name__name margin-10-left">
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-if="reply.reply_user_id*1 === comment.user_id*1 || reply.company_comment_reply_id*1 === 0 || comment.user_id*1 === userInfoStore.getUserId()*1">{{reply.name}}</strong>
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-else>{{reply.name}} 回复 {{reply.replyUser}}</strong>
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
                    class="image_list"
                    fit="cover"
                    :zoom-rate="1.2"
                    :preview-src-list="reply.image"
                    :initial-index="Number(indexReplyImage)"
                    lazy />
              </el-col>
            </el-row>
            <div class="reply_item_3">
              <text class="time" :class="isMobileAppraise?'grey-color':'blue-color'">{{reply.created_time}}</text>
              <div class="reply_item_4">
                <LikeSwitch
                    :index="Number(index)"
                    :replyIndex="Number(replyIndex)"
                    feedbackType="commentReply"
                    :company-info-id="companyInfoId"
                    :main-id="Number(comment.id)"
                    :main-reply-id="Number(reply.id)"
                ></LikeSwitch>
                <AddFormMobile v-if="userInfoStore.getUserId()*1 > 0"
                               :index="Number(index)"
                               :reply-index="Number(replyIndex)"
                               :company-info-id="companyInfoId"
                               :reply-user-id="Number(reply.user_id)"
                               :reply-user="reply.name"
                               :main-id="Number(comment.id)"
                               :main-reply-id="Number(reply.id)"
                               title-box="回复"
                               feedbackType="commentReply"
                               :isReplyReply="true"
                               :isShowReply="isShowReply"
                               >
                  <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left" :class="isMobileAppraise?'grey-color': 'blue-color'">回复</text>
                  </template>
                </AddFormMobile>
                <LoginPopup v-else>
                  <template #open>
                    <text class="margin-20-left" :class="isMobileAppraise?'grey-color': 'blue-color'">回复</text>
                  </template>
                </LoginPopup>
                <DeleteListItem
                    :main-reply-id="Number(reply.id)"
                    :main-id="Number(comment.id)"
                    :company-info-id="companyInfoId"
                    feedback-type="commentReply"
                    :reply-index="Number(replyIndex)"
                    :index="Number(index)"
                    v-if="reply.user_id*1 === userInfoStore.getUserId()*1"
                >
                  <template #trigger>
                    <text class="margin-20-left" :class="isMobileAppraise?'grey-color': 'blue-color'">删除</text>
                  </template>
                </DeleteListItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import 'assets/css/comment.scss'
import LikeSwitch from "~/components/LikeSwitch.vue";
import {useCommentStore} from "~/pinia/commentStore";
import {useUserInfoStore} from "~/pinia/userInfo";
import {setComments} from "~/composables/comment";
import DeleteListItem from "~/components/DeleteListItem.vue";
import NoDetail from "~/components/NoDetail.vue";

const commentStore = useCommentStore();
const userInfoStore = useUserInfoStore();
const userId = userInfoStore.getUserId();
const props = defineProps({
  isShowReply:{
    type: Boolean,
    default: true
  },
  isMobileAppraise:{
    type: Boolean,
    default: false,
  },
  companyInfoId:{
    type: Number,
    required: true,
  },
  limit:Number,
});
// If limit is not provided, it will default to the length of comments
const effectiveLimit = computed(() => {
  return props.limit !== undefined ? props.limit : commentStore.getCommentsCount;
});
const { fetchComments } = setComments(props.companyInfoId, userInfoStore.getUserId());
// 在组件挂载时加载评论
watch([() => props.companyInfoId, userInfoStore.getUserId], () => {
  fetchComments();
}, { immediate: true });
</script>
