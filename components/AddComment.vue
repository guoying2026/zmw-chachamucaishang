<template>
  <div>
    <!-- 插槽用于放置触发按钮 -->
    <slot name="trigger"></slot>

    <!-- 如果internalShow为真，显示遮罩层和评论框 -->
    <div class="overlay" v-if="internalShow" @click="closeCommentBox">
      <div class="comment-box" @click.stop>
        <!-- 文本域用于输入评论 -->
        <textarea placeholder="请输入您的评论..."></textarea>
        <!-- 提交按钮，点击时触发submitComment方法 -->
        <button @click="submitComment">提交评论</button>
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
</script>


<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.comment-box {
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

