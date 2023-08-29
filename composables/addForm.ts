import { ref, computed } from 'vue';
import { serviceContainer } from '~/pinia/feedback/FeedbackServiceContainer';

export function addFormLogic(props: any) {
    const show = ref(false);

    const state = ref({
        fileList: [] as any[],
        fileBeingUploaded: false,
        textareaValue: '',
        anonymity: false,
        index: 0,
    });

    const openCommentBox = () => show.value = true;
    const closeCommentBox = () => show.value = false;

    const updateParentFileList = (newFileList: any[]) => {
        state.value.fileList = newFileList;
    };

    const setFileBeingUploaded = (status: boolean) => {
        state.value.fileBeingUploaded = status;
    };

    const setTextareaValue = (value: string) => {
        state.value.textareaValue = value;
    };

    const resetState = () => {
        const initialState = {
            show: false,
            fileList: [],
            fileBeingUploaded: false,
            textareaValue: '',
            anonymity: false,
            type: '',
            index: 0,
        };
        Object.assign(state.value, initialState);
    };

    const currentHandler = computed(() => {
        const handler = serviceContainer.getHandler(props.feedbackType);
        if (!handler) {
            throw new Error(`Handler not found for feedback type: ${props.feedbackType}`);
        }
        return handler;
    });

    const submitComment = () => {
        if(state.value.fileBeingUploaded){
            ElMessage({
                showClose: true,
                message: '文件正在上传中，请稍后再试',
                type: 'warning',
            });
            return;
        } else {
            currentHandler.value.add(state.value);
            closeCommentBox();
        }
    };

    return {
        show,
        state,
        openCommentBox,
        closeCommentBox,
        updateParentFileList,
        setFileBeingUploaded,
        setTextareaValue,
        submitComment
    };
}
