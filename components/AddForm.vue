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
          <text>{{titleBox}}：{{replyUser}}</text>
          <el-checkbox v-model="state.anonymity">匿名{{titleBox}}</el-checkbox>
        </div>
        <Textarea
            :placeholderText="placeholderText"
            @update:value="setTextareaValue"
        />
        <FileUpload
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
import {ref} from "vue";

// 接收父组件传递的show属性
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  replyIndex: {
    type: Number,
    required: true,
  },
  companyInfoId:{
    type: Number,
    required: true,
  },
  replyUserId:{
    type: Number,
    required: true,
  },
  replyUser: {
    type: String,
    required: true,
  },
  mainId:{
    type: Number,
    required: true,
  },
  mainReplyId: {
    type: Number,
    required: true,
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
  isReplyReply: {
    type: Boolean,
    default: false
  },
  isPcAppraise:{
    type: Boolean,
    default: false,
  },
});
const placeholderText = ref('我们鼓励真实有帮助的' + props.titleBox);
const submitText = ref('发布' + props.titleBox);
const {
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
<style scoped>
.add-box-3{
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-box{
  width: 20px;
  height: 20px;
  align-self: flex-end;
}
.add-box-2{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  color: #333;
}
.add-box h1{
  align-self: center;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 2px;
  background-size: cover;
  background-position: center;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: #000;
  z-index: 999;
}

.add-box {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  width: 766px;
  height: 550px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 25px;
  background: url(https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_8bf78604-a95e-4cc5-b5cc-06d01140952c.png);
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
}

.overlay:deep(.el-checkbox__inner) {
  border-radius: 10px;
}
</style>
