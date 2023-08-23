<template>
  <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_f83d6988-3896-4443-b09f-0aa1ddbfbf26.png"/>
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
        <div class="comment_item_3">
          <text class=" time grey-color">{{complaint.time}}</text>
          <div class="comment_item_4">
            <LikeSwitch :index="index" feedbackType="complaint"></LikeSwitch>
            <AddComment company-name="张姗姗木材加工厂" type="complaintReply">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color">回复</text>
              </template>
            </AddComment>
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
            <div class="reply_item_3">
              <text class=" time grey-color">{{reply.time}}</text>
              <div class="reply_item_4">
                <LikeSwitch :index="index" :replyIndex="replyIndex" feedbackType="complaintReply"></LikeSwitch>
                <AddComment :index="index" company-name="张姗姗木材加工厂" type="complaintReply">
                  <!-- 定义插槽内容 -->
                  <template #trigger>
                    <text class="margin-20-left grey-color">回复</text>
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
<script setup lang="ts">
import LikeSwitch from "~/components/LikeSwitch.vue";
import AddComment from "~/components/Comment/AddComment.vue";
import NoDetail from "~/components/NoDetail.vue";
import {ComplaintStore} from "~/types/complaintStore";
import {useComplaintStore} from "~/pinia/complaintStore";

const complaintStore:ComplaintStore = useComplaintStore();
</script>
