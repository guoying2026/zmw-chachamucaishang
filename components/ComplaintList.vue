<template>
  <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_reply_img__miniapp_f83d6988-3896-4443-b09f-0aa1ddbfbf26.png" alt="背景"/>
  <NoDetail tag="我要投诉" text="没有投诉" v-if="complaintStore.complaints.length < 0"></NoDetail>

  <div class="comment" v-else>
    <div class="comment_item" v-for="(complaint, index) in complaintStore.complaints">
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
      <div class="reply" v-if="complaint.replies && complaint.replies.length">
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

const complaintStore:ComplaintStore = useComplaintStore();
</script>
