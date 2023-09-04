<template>
  <!-- 上传文件开始 -->
  <div class="file_upload">
    <div class="tips">
      <text>上传图片：</text>
      <text class="limit">（仅限上传3张图片）</text>
    </div>
    <el-upload
        class="upload_css"
        action="#"
        list-type="picture-card"
        v-model:file-list="fileList"
        :auto-upload="false"
        :on-change="handleChange"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="3"
        :class="{'hide-upload-btn': fileList.length >= 3}"
    >
      <img v-if="fileList.length < 3" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_89ef73df-afa2-4f6b-b2d1-0faaf684cf0d.png" alt="上传图片">
    </el-upload>
<!--    <el-dialog v-model="dialogVisible">-->
<!--      <img w-full :src="dialogImageUrl" alt="Preview Image" />-->
<!--    </el-dialog>-->
  </div>
  <!-- 上传文件结束 -->
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue';
import {useFileUploadLogic} from "~/composables/uploadFile";

const emit = defineEmits();

const {
  fileList,
  submitFileList,
  dialogImageUrl,
  dialogVisible,
  handleChange,
  handleRemove,
  handlePictureCardPreview
} = useFileUploadLogic(emit);
</script>

<style scoped>
.file_upload >>> .hide-upload-btn .el-upload--picture-card {
  display: none;
}
.upload_css{
  margin-top: 20px;
}
.upload_css img{
  width: 148px;
  height: 148px;
}
/* 可以添加您需要的CSS样式 */
.file_upload >>> .el-upload--picture-card{
  border: none !important;
  border-radius: 10px;
}
.tips{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: #333;
  margin-top: 20px;
}
.tips .limit{
  font-size: 14px;
}
</style>
