<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <div @click="openCommentBox">
      <slot name="trigger"></slot>
    </div>
    <!-- 如果internalShow为真，显示遮罩层和评论框 -->
    <div class="overlay" v-if="show">
      <div class="first">
        <img class="left-box" @click="closeCommentBox" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_ce4aa947-e622-42d0-b414-d36f7091cdf5.png" alt=""/>
        <text>{{titleBox}}{{companyName}}</text>
        <img class="close-box" @click="closeCommentBox" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_807d33b5-bef1-44b0-b79d-cab4a897057c.png" alt="关闭按钮">
      </div>
      <text class="title">{{titleBox}}商家</text>
        <!-- 文本域用于输入评论 -->
        <TextareaMobile
            :placeholderText="placeholderText"
            @update:value="setTextareaValue"
        />
        <FileUploadMobile
            @update:fileList="updateParentFileList"
            @uploading="setFileBeingUploaded"
        />
      <div class="add-box-2">
        <el-checkbox v-model="state.anonymity">匿名{{titleBox}}</el-checkbox>
      </div>
        <div class="add-box-3">
          <Tag color="gradient-background" :tag="submitText" @click="submitComment"></Tag>
        </div>
      </div>
  </div>
</template>
<style scoped>
.left-box{
  width: 12px;
  height: 16px;
}
.first span{
  font-size: 25px;
}
.title{
  margin-top:30px;
}
.first{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}
.add-box-2:deep(.el-checkbox__label){
  color: #fff;
  width: 100%;
}
.add-box-3{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.close-box{
  width: 15px;
  height: 15px;
}
.add-box-2{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  color: #000;
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
.overlay:deep(.el-textarea__inner){
  color: #fff;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: #000;
  color: #fff;
  z-index: 999;
  font-size: 14px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
}

.overlay:deep(.el-checkbox__inner) {
  border-radius: 10px;
  color: #fff;
}
</style>
<script lang="ts" setup>
import {addFormLogic} from "~/composables/addForm";
import TextareaMobile from "~/components/TextareaMobile.vue";
import {onMounted, ref} from "vue";

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
const placeholderText = ref('');
onMounted(()=>{
  if(props.feedbackType == 'comment'){
    placeholderText.value = '快来说说对商家的看法';
  } else if(props.feedbackType == 'commentReply' || props.feedbackType == 'complaintReply' || props.feedbackType == 'answer'){
    placeholderText.value = '快来对ta说点儿说什么吧';
  } else if(props.feedbackType == 'complaint'){
    placeholderText.value = '请您清晰描述您的问题';
  } else if(props.feedbackType == 'question'){
    placeholderText.value = '心中有疑惑，就问问买过商品的人吧';
  }
})
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
