<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <div @click="openCommentBox">
      <slot name="trigger"></slot>
    </div>
    <!-- 如果internalShow为真，显示遮罩层和评论框 -->
    <div class="overlay" v-if="show" @click="closeCommentBox">
      <div class="add-box" @click.stop>
        <img class="close-box" @click="closeCommentBox" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_574ad6b3-3918-4434-babf-0fd2db4a90a5.png" alt="关闭按钮">
        <h1>我要{{titleBox}}</h1>
        <!-- 文本域用于输入评论 -->
        <div class="add-box-2">
          <text>{{titleBox}}商家：{{companyName}}</text>
          <el-checkbox v-model="state.anonymity">匿名{{titleBox}}</el-checkbox>
        </div>
        <Textarea
            :placeholderText="placeholderText"
            @update:value="setTextareaValue"
        />
        <FileUpload
            :store="state"
            @update:fileList="updateParentFileList"
            @uploading="setFileBeingUploaded"
        />
        <div class="add-box-3">
          <Tag color="orange" :tag="submitText" @click="submitComment"></Tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {addFormLogic} from "~/composables/addForm";

// 接收父组件传递的show属性
const props = defineProps({
  index: {
    type: [Number,String],
    default: 0,
  },
  companyName: {
    type: String,
    default: '张姗姗木材加工厂',
  },
  titleBox: {
    type: String,
    required: true,
  },
  feedbackType: {
    type: String,
    required: true,
    validator: (value: string) => ['comment', 'commentReply', 'question', 'answer', 'complaint','complaintReply'].includes(value)
  },
});
const {
  placeholderText,
  submitText,
  show,
  state,
  openCommentBox,
  closeCommentBox,
  updateParentFileList,
  setFileBeingUploaded,
  setTextareaValue,
  submitComment
} = addFormLogic(props);
</script>
