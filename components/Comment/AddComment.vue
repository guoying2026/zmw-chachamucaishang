<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <slot name="trigger"></slot>

    <!-- 如果internalShow为真，显示遮罩层和评论框 -->
    <div class="overlay" v-if="internalShow" @click="closeCommentBox">
      <div class="comment-box" @click.stop>
        <img class="close-box" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_574ad6b3-3918-4434-babf-0fd2db4a90a5.png">
        <h1>我要评论</h1>
        <!-- 文本域用于输入评论 -->
        <div class="comment-box-2">
          <text>评论商家：张家港木业有限公司</text>
        </div>
        <AddForm @submit-comment="handleCommentSubmission" placeholderText="我们鼓励真实有帮助的评价"></AddForm>
        <!-- 提交按钮，点击时触发submitComment方法 -->
        <div class="comment-box-3">
          <Tag color="orange" tag="发布评论" @click="submitComment"></Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// 接收父组件传递的show属性
const props = defineProps<{
  show: boolean;
}>();

// 用于触发更新show的值的事件
const emit = defineEmits();

const internalShow = ref(props.show);
//使用了watch来观察props.show和internalShow的变化。这种做法更为严格，确保子组件的本地状态（internalShow）和父组件传递的props.show始终保持同步。
//当props.show变化时，它会同步到internalShow。
//当internalShow变化时，它会检查是否与props.show有差异，如果有，则通过事件通知父组件。
//这种做法适合于子组件和父组件之间的状态需要始终保持同步的场景。例如，如果父组件可能会因其他原因更改show，并且我们希望子组件能够捕捉到这种变化并做出响应。
watch(() => props.show, (newValue) => {
  internalShow.value = newValue;
});

// 更新showCommentBox的值并触发更新事件
watch(internalShow, (newVal) => {
  if (newVal !== props.show) {
    emit('update:show', newVal);
  }
});

const handleCommentSubmission = (payload: { text: any; files: any; }) => {
  console.log("Comment submitted:", payload.text);
  console.log("Files submitted:", payload.files);
  // Handle the comment and file submission logic here.
}

// 提交评论的方法
const submitComment = () => {
  console.log("提交评论");
  // 提交评论后隐藏评论框
  internalShow.value = false;
};

// 关闭评论框的方法
const closeCommentBox = () => {
  internalShow.value = false;
};

//发布评论开始
//发布评论结束
//添加评论结束
</script>

<style scoped>
.comment-box-3{
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-box{
  width: 20px;
  height: 20px;
  align-self: flex-end;
}
.comment-box-2{
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 10px;
  color: #333;
}
.comment-box h1{
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
}

.comment-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  width: 766px;
  height: 500px;
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
</style>

