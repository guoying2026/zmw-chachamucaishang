<style scoped>
.complaint_first {
  position: relative;
  display: inline-block;
}

.complaint_first img {
  display: block;
  width: 100%;
  height: auto;
}

.text-container {
  width: 60%;
  position: absolute;
  bottom: 15%;
  right: 6%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5px;  /* 用于在容器两侧加上一些间距 */
}

.text {
  font-size: 10px;
}
.gradient-background {
  background: linear-gradient(to right, #B1621A, #BB600D);
  padding: 5px 20px 8px 18px;
  border-radius: 50px;
}
.text-click{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
<template>
  <div class="complaint_first">
    <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_f83d6988-3896-4443-b09f-0aa1ddbfbf26.png" alt="背景" v-if="isShowReply"/>
    <div class="text-container">
      <div class="text text-click">
        <text>点击</text>
        <AddForm v-if="userInfoStore.getUserId()*1 > 0"
                 :index="0"
                 :reply-index="0"
                 :company-info-id="companyInfoId"
                 :reply-user-id="0"
                 :reply-user="companyName"
                 :main-id="0"
                 :main-reply-id="0"
                 title-box="投诉"
                 feedback-type="complaint"
        >
          <!-- 定义插槽内容 -->
          <template #trigger>
            <text class="gradient-background margin-10-left">我要投诉</text>
          </template>
        </AddForm>
        <LoginPopup v-else>
          <template #open>
            <text class="gradient-background margin-10-left">我要投诉</text>
          </template>
        </LoginPopup>
      </div>
      <div class="text">平台审核内容</div>
      <div class="text">展示投诉内容</div>
    </div>
  </div>
  <NoDetail tag="我要投诉" text="没有投诉" v-if="complaintStore.complaints.length < 0"></NoDetail>

  <div class="comment complaint" v-else>
    <div class="comment_item blue_item_bg" v-for="(complaint, index) in complaintStore.complaints">
      <div class="comment_item_1">
        <img class="avatar-name__img" :src="complaint.avatar" width="32" height="32" :alt="complaint.name">
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{complaint.name}}</strong>
        </div>
      </div>
      <div class="comment_item_2">
        <p class="margin-10-top ">{{complaint.complaint}}</p>
        <el-row :gutter="8" v-if="complaint.image.length" class="margin-10-bottom row-image-box">
          <el-col
              v-for="(itemImage, indexImage) in complaint.image"
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
                :preview-src-list="complaint.image"
                :initial-index="Number(indexImage)"
                lazy />
          </el-col>
        </el-row>
        <div class="comment_item_3">
          <text class=" time grey-color">{{complaint.created_time}}</text>
          <div class="comment_item_4">
            <LikeSwitch
                :index="Number(index)"
                :reply-index="0"
                feedbackType="complaint"
                :company-info-id="companyInfoId"
                :main-id="Number(complaint.id)"
                :main-reply-id="0"
            ></LikeSwitch>
            <AddForm  v-if="userInfoStore.getUserId()*1 > 0"
                      :index="Number(index)"
                      :reply-index="0"
                      :company-info-id="companyInfoId"
                      :reply-user-id="Number(complaint.user_id)"
                      :reply-user="complaint.name"
                      :main-id="Number(complaint.id)"
                      :main-reply-id="0"
                      title-box="回复"
                      feedback-type="complaintReply"
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
                :main-id="Number(complaint.id)"
                :company-info-id="companyInfoId"
                feedback-type="complaint"
                :reply-index="0"
                :index="Number(index)"
                v-if="complaint.user_id*1 === userInfoStore.getUserId()*1"
            >
              <template #trigger>
                <text class="margin-20-left grey-color">删除</text>
              </template>
            </DeleteListItem>
          </div>
        </div>
      </div>
      <div class="reply" v-if="complaint.replies && complaint.replies.length && isShowReply">
        <div class="reply_item" v-for="(reply,replyIndex) in complaint.replies">
          <div class="reply_item_1">
            <img class="avatar-name__img" :src="reply.avatar" width="32" height="32" :alt="reply.user">
            <div class="avatar-name__name margin-10-left">
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-if="reply.replyUserId === complaint.user_id">{{reply.name}}</strong>
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false" v-else>{{reply.name}} 回复 {{reply.replyUser}}</strong>
            </div>
          </div>
          <div class="reply_item_2">
            <p class="margin-10-top">{{reply.complaint}}</p>
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
              <text class=" time grey-color">{{reply.created_time}}</text>
              <div class="reply_item_4">
                <LikeSwitch
                    :index="Number(index)"
                    :replyIndex="Number(replyIndex)"
                    feedbackType="complaintReply"
                    :company-info-id="companyInfoId"
                    :main-id="Number(complaint.id)"
                    :main-reply-id="reply.id"
                ></LikeSwitch>
                <AddForm v-if="userInfoStore.getUserId()*1 > 0"
                         :index="Number(index)"
                         :reply-index="Number(replyIndex)"
                         :company-info-id="companyInfoId"
                         :reply-user-id="Number(reply.user_id)"
                         :reply-user="reply.name"
                         :main-id="Number(complaint.id)"
                         :main-reply-id="reply.id"
                         title-box="回复"
                         feedback-type="complaintReply"
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
                    :main-id="Number(complaint.id)"
                    :company-info-id="companyInfoId"
                    feedback-type="complaintReply"
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
<script setup lang="ts">
import LikeSwitch from "~/components/LikeSwitch.vue";
import NoDetail from "~/components/NoDetail.vue";
import {ComplaintStore} from "~/types/complaintStore";
import {useComplaintStore} from "~/pinia/complaintStore";
import {useUserInfoStore} from "~/pinia/userInfo";
import {setComplaints} from "~/composables/complaint";
import DeleteListItem from "~/components/DeleteListItem.vue";

const complaintStore:ComplaintStore = useComplaintStore();
const userInfoStore = useUserInfoStore();
const props = defineProps({
  isShowReply:{
    type: Boolean,
    default: true
  },
  companyName:{
    type: String,
    default: '',
  },
  companyInfoId:{
    type: Number,
    required: true,
  }
});
const { fetchComplaints } = setComplaints(props.companyInfoId, userInfoStore.getUserId());
// 在组件挂载时加载评论
watch([() => props.companyInfoId, userInfoStore.getUserId], () => {
  fetchComplaints();
}, { immediate: true });
</script>
