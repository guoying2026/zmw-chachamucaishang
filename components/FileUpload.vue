<template>
  <!-- 上传文件开始 -->
  <div>
    <el-upload
        class="margin-20-top"
        action="#"
        list-type="picture-card"
        v-model:file-list="fileList"
        :auto-upload="false"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
  <!-- 上传文件结束 -->
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getAnswerOssSignatureApi, pushAnswerOssApi } from "~/server/api/ossUploadFile.post";
import { handeSrcHttpsUtil, guidUtil } from "~/utils/httpReplace";
import { defineEmits } from 'vue';

const emits = defineEmits(['update-files']);


// 上传文件开始
const fileList = ref([]);
const submitFileList = ref<Record<number, string>[]>([]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleSuccess = (): void => {
  console.log('在执行handleSuccess');
};

const handleChange = async (uploadFile: any, uploadFiles: any) => {
  console.log('在执行handleChange');
  console.log(uploadFile);
  console.log(uploadFiles);

  const res = await getAnswerOssSignatureApi({type: 'sell_img'});

  if (res.data.status === 1000) {
    const post = res.data.data;
    post.host = handeSrcHttpsUtil(post.host);
    const fileKey = `${post.dir}_pc_image_${guidUtil()}.png`;
    const fileUrl = `${post.host}/${fileKey}`;
    const fileRawUid = uploadFile.raw.uid;
    const formData = new FormData();

    formData.append('OSSAccessKeyId', post.accessid);
    formData.append('name', 'file');
    formData.append('key', fileKey);
    formData.append('policy', post.policy);
    formData.append('success_action_status', '200');
    formData.append('signature', post.signature);
    formData.append('file', uploadFile.raw);

    const result = await pushAnswerOssApi(post.host, formData);

    if(result.status === 200){
      submitFileList.value.push({ [fileRawUid] : fileUrl });
      emits('update-files', submitFileList.value);
    }
  }
};

const handleRemove = (file: any, fileList: any[]): void => {
  submitFileList.value = submitFileList.value.filter(item => !item[file.raw.uid]);
  emits('update-files', submitFileList.value);
};

const handlePictureCardPreview = (file: any): void => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
</script>


<style scoped>
/* 可以添加您需要的CSS样式 */
</style>
