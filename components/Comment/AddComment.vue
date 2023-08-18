<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <slot name="trigger"></slot>

    <!-- 如果internalShow为真，显示遮罩层和评论框 -->
    <div class="overlay" v-if="store.show" @click="store.closeCommentBox">
      <div class="add-box" @click.stop>
        <img class="close-box" @click="store.closeCommentBox" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_574ad6b3-3918-4434-babf-0fd2db4a90a5.png" alt="关闭按钮">
        <h1>我要评论</h1>
        <!-- 文本域用于输入评论 -->
        <div class="add-box-2">
          <text>评论商家：张家港木业有限公司</text>
          <el-checkbox v-model="anonymity">匿名评价</el-checkbox>
        </div>
        <Textarea
            placeholderText="我们鼓励真实有帮助的评价"
            :store="store"
        />
        <FileUpload
            :store="store"
        />
        <div class="add-box-3">
          <Tag color="orange" tag="发布评论" @click="submitComment"></Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps,watch } from 'vue';

// 接收父组件传递的show属性
const props = defineProps({
  store:{
    type: Object,
    required: true
  }
});
const anonymity = ref(false)
console.log(props.store);
watch(() => anonymity.value, (newVal) => {
  console.log(newVal);
  props.store.setAnonymity(newVal);
  console.log(props.store.anonymity);
});
const submitComment = () => {
  console.log("提交评论");
  if(props.store.fileBeingUploaded){
    ElMessage({
      showClose: true,
      message: '文件正在上传中，请稍后再试',
      type: 'warning',
    })
    return;  // 如果文件正在上传，不继续执行
  } else {
    console.log(props.store.$state);
    console.log('提交评论');
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
