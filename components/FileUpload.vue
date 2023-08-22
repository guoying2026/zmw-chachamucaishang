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
    >
      <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_89ef73df-afa2-4f6b-b2d1-0faaf684cf0d.png" alt="上传图片">
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
  <!-- 上传文件结束 -->
</template>

<script lang="ts" setup>
import { ref,defineProps } from 'vue';
import { getAnswerOssSignatureApi, pushAnswerOssApi } from "~/server/api/ossUploadFile.post";
import { handeSrcHttpsUtil, guidUtil } from "~/utils/httpReplace";


const props = defineProps({
  store:{
    type: Object,
    required: true
  },
});
// 上传文件开始
const fileList = ref([]);
const submitFileList = ref<Record<number, string>[]>([]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleChange = async (uploadFile: any) => {
  if (uploadFile.status == 'ready') {
    props.store?.setFileBeingUploaded(true);
  }

  const res = await getAnswerOssSignatureApi({type: 'sell_img'});
  if (res.status === 1000) {
    const post = res.data;
    post.host = handeSrcHttpsUtil(post.host);
    const fileKey = `${post.dir}_pc_image_${guidUtil()}.png`;
    const fileUrl = `${post.host}/${fileKey}`;
    console.log('上传文件地址');
    console.log(fileUrl);
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
    // Check if the result is an object (parsed from JSON) and has a status of 200
    if (typeof result === 'object' && result.status === 200) {
      submitFileList.value.push({[fileRawUid]: fileUrl});
      props.store?.setFileList(submitFileList.value);
      props.store?.setFileBeingUploaded(false);
    } else {
      handleRemove(uploadFile);
      props.store?.setFileBeingUploaded(false);
    }
  }
};

const handleRemove = (file: any): void => {
  submitFileList.value = submitFileList.value.filter(item => !item[file.raw.uid]);
  props.store.setFileList(submitFileList.value);
};

const handlePictureCardPreview = (file: any): void => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
</script>


<style scoped>
.upload_css{
  margin-top: 20px;
}
.upload_css img{
  width: 148px;
  height: 148px;
}
/* 可以添加您需要的CSS样式 */
.file_upload:deep(.el-upload--picture-card) {
  //--el-upload-picture-card-size: 148px;
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
