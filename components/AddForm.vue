<template>
  <div class="addBox">
    <el-input
        v-model="textarea"
        maxlength="500"
        :placeholder="placeholderText"
        show-word-limit
        type="textarea"
        :rows="5"
        resize="none"
    />
    <FileUpload @update-files="handleFilesUpdate"></FileUpload>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
  placeholderText: {
    type: String,
    default: ''
  }
});
const textarea = ref('');
const fileList = ref([]);

const handleFilesUpdate = (files: never[]) => {
  fileList.value = files;
}

const emits = defineEmits(['submit-comment']);

const submitComment = () => {
  emits('submit-comment', { text: textarea.value, files: fileList.value });
}
</script>
<style>
.addBox{
  margin-top: 10px;
}
</style>
