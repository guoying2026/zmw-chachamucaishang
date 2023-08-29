<template>
  <div class="addBox">
    <el-input
        v-model="localTextareaValue"
        maxlength="500"
        :placeholder="placeholderText"
        show-word-limit
        type="textarea"
        :rows="5"
        resize="none"
    />

    <!--    @input="handleTextareaChange($event)"这个里面为什么要加$event,在 Vue 中，$event 是一个特殊的变量，它引用了原生的 DOM 事件。当你使用 Vue 的事件监听器（如 @input、@click 等）在模板中监听一个事件，并且你想访问原生事件对象时，你可以使用 $event 来传递它。
    在您的例子中，@input="handleTextareaChange($event)" 将输入事件的原生事件对象传递给 handleTextareaChange 方法。这意味着在 handleTextareaChange 函数中，你可以访问到这个事件对象，从中提取所需的信息，如输入框的值等。
    不过，由于你使用了 v-model 和 el-input 组件，$event 实际上会是输入框的当前值，而不是完整的事件对象。所以，handleTextareaChange 函数可以直接接收这个值：
    这样写确实有点冗余，因为 v-model 已经自动处理了输入事件，并更新了绑定的数据属性。但在某些情况下，你可能需要额外的逻辑来处理输入事件，这时候访问 $event 会很有用。-->
  </div>
</template>
<script lang="ts" setup>
import {useTextareaLogic} from "~/composables/textarea";
import {defineProps,defineEmits} from "vue";

const props = defineProps({
  placeholderText: {
    type: String,
    default: ''
  },
});
const emit = defineEmits();
const {
  localTextareaValue,
} = useTextareaLogic(emit);
</script>

<style scoped>
.addBox{
  margin-top: 10px;
  width: 100%;
}
.addBox:deep(.el-textarea__inner) {
  box-shadow: 0 0 0 0;
  background: #181818;
  border:none !important;
}
.addBox:deep(.el-textarea__inner:hover) {
  box-shadow: 0 0 0 0;
}
.addBox:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 0;
}
.addBox:deep(.el-textarea .el-input__count){
  color: #757575;
  background: #181818;
}
.addBox:deep(.el-textarea__inner){
  color:#757575;
}
</style>
