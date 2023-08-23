<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <div @click="handleComment">
      <slot name="trigger"></slot>
    </div>
    <!-- 如果internalShow为真，显示遮罩层和评论框 -->
    <div class="overlay" v-if="addStore.show" @click="addStore.closeCommentBox">
      <div class="add-box" @click.stop>
        <img class="close-box" @click="addStore.closeCommentBox" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_574ad6b3-3918-4434-babf-0fd2db4a90a5.png" alt="关闭按钮">
        <h1>{{titleBox}}</h1>
        <!-- 文本域用于输入评论 -->
        <div class="add-box-2">
          <text>评论商家：{{companyName}}</text>
          <el-checkbox v-model="anonymity">匿名评价</el-checkbox>
        </div>
        <Textarea
            :placeholderText="placeholderText"
            :store="addStore"
        />
        <FileUpload
            :store="addStore"
        />
        <div class="add-box-3">
          <Tag color="orange" :tag="submitText" @click="submitComment"></Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineProps, watch, onMounted} from 'vue';
import { FeedbackProcessStore} from "~/types/commentStore";
import {useFeedbackProcessStore} from "~/pinia/feedbackProcessStore";
const addStore = useFeedbackProcessStore(); // 这里使用随机字符串作为ID，确保每次创建的状态都是独立的

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
  type: {
    type: String,
    required: true,
    validator: (value: string) => ['comment', 'commentReply','question','answer','complaint','complaintReply'].includes(value)
  }
});
const anonymity = ref(false)

// title-box="我要回复"  placeholder-text="我们鼓励真实有帮助的回复" submit-text="发布回复"
watch(() => anonymity.value, (newVal) => {
  addStore.setAnonymity(newVal);
});
const titleBox = ref('')
const placeholderText = ref('')
const submitText = ref('')
onMounted(()=>{
  console.log("Type Prop:", props.type);
  switch(props.type){
    case 'comment':
      titleBox.value = "我要评论";
      placeholderText.value = "我们鼓励真实有帮助的评论";
      submitText.value = "发布评论";
      break;
    case 'commentReply':
      titleBox.value = "我要回复";
      placeholderText.value = "我们鼓励真实有帮助的回复";
      submitText.value = "发布回复";
      break;
    case 'complaint':
      titleBox.value = "我要投诉";
      placeholderText.value = "我们鼓励真实有帮助的投诉";
      submitText.value = "发布投诉";
      break;
    case 'complaintReply':
      titleBox.value = '我要回复';
      placeholderText.value = "我们鼓励真实有帮助的回复";
      submitText.value = "发布回复";
      break;
    case 'question':
      titleBox.value = '我要提问';
      placeholderText.value = "我们鼓励真实有帮助的提问";
      submitText.value = "发布提问";
      break;
    case 'answer':
      titleBox.value = '我要回答';
      placeholderText.value = "我们鼓励真实有帮助的回答";
      submitText.value = "发布回答";
      break;
  }
});
const handleComment = () => {
  addStore.openCommentBox();
  addStore.setIndex(props.index);
  addStore.setType(props.type);
}
const submitComment = () => {
  console.log('点动了吗');

  if(addStore.fileBeingUploaded){
    ElMessage({
      showClose: true,
      message: '文件正在上传中，请稍后再试',
      type: 'warning',
    })
    return;  // 如果文件正在上传，不继续执行
  } else {
    console.log('劲来回复');
    addStore.addFeedback();
  }
};

//添加评论结束
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
