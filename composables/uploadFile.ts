import { ref } from 'vue';
import { getAnswerOssSignatureApi, pushAnswerOssApi } from "~/server/api/ossUploadFile.post";
import { handeSrcHttpsUtil, guidUtil } from "~/utils/httpReplace";

export function useFileUploadLogic(emit: (eventName: string, value: any) => void) {
    const fileList = ref([]);
    const submitFileList = ref<Record<number, string>[]>([]);
    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);

    const handleChange = async (uploadFile: any) => {
        if (uploadFile.status == 'ready') {
            emit('uploading', true);
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
            if (typeof result === 'object' && result.status === 200) {
                submitFileList.value.push({[fileRawUid]: fileUrl});
                emit('update:fileList', submitFileList.value);
                emit('uploading', false);
            } else {
                handleRemove(uploadFile);
                emit('uploading', false);
            }
        }
    };

    const handleRemove = (file: any): void => {
        submitFileList.value = submitFileList.value.filter(item => !item[file.raw.uid]);
    };

    const handlePictureCardPreview = (file: any): void => {
        dialogImageUrl.value = file.url;
        dialogVisible.value = true;
    };

    return {
        fileList,
        submitFileList,
        dialogImageUrl,
        dialogVisible,
        handleChange,
        handleRemove,
        handlePictureCardPreview
    };
}
