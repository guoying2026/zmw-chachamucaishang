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
  bottom: 9%;
  right: 5%;
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
        <AddForm title-box="投诉" company-name="张珊珊木材加工厂" feedback-type="complaint">
          <!-- 定义插槽内容 -->
          <template #trigger>
            <text class="gradient-background margin-10-left">我要投诉</text>
          </template>
        </AddForm>
      </div>
      <div class="text">平台审核内容</div>
      <div class="text">展示投诉内容</div>
    </div>
  </div>
  <NoDetail tag="我要投诉" text="没有投诉" v-if="complaintStore.complaints.length < 0"></NoDetail>

  <div class="comment complaint" v-else>
    <div class="comment_item blue_item_bg" v-for="(complaint, index) in complaintStore.complaints">
      <div class="comment_item_1">
        <img class="avatar-name__img" :src="complaint.avatar" width="32" height="32" :alt="complaint.user">
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{complaint.user}}</strong>
        </div>
      </div>
      <div class="comment_item_2">
        <p class="margin-10-top ">{{complaint.content}}</p>
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
          <text class=" time grey-color">{{complaint.time}}</text>
          <div class="comment_item_4">
            <LikeSwitch :index="index" feedbackType="complaint"></LikeSwitch>
            <AddForm title-box="回复" company-name="张姗姗木材加工厂" feedback-type="complaintReply">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color">回复</text>
              </template>
            </AddForm>
          </div>
        </div>
      </div>
      <div class="reply" v-if="complaint.replies && complaint.replies.length && isShowReply">
        <div class="reply_item" v-for="(reply,replyIndex) in complaint.replies">
          <div class="reply_item_1">
            <img class="avatar-name__img" :src="reply.avatar" width="32" height="32" :alt="reply.user">
            <div class="avatar-name__name margin-10-left">
              <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{reply.user}}</strong>
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
                    class="image_list"
                    fit="cover"
                    :zoom-rate="1.2"
                    :preview-src-list="reply.image"
                    :initial-index="Number(indexReplyImage)"
                    lazy />
              </el-col>
            </el-row>
            <div class="reply_item_3">
              <text class=" time grey-color">{{reply.time}}</text>
              <div class="reply_item_4">
                <LikeSwitch :index="index" :replyIndex="replyIndex" feedbackType="complaintReply"></LikeSwitch>
                <AddForm title-box="回复" :index="index" company-name="张姗姗木材加工厂" feedback-type="complaintReply">
                  <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left grey-color">回复</text>
                  </template>
                </AddForm>
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
import Tag from "~/components/Tag.vue";

const complaintStore:ComplaintStore = useComplaintStore();

const props = defineProps({
  isShowReply:{
    type: Boolean,
    default: true
  },
});
</script>
