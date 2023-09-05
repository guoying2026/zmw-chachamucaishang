import { ref, computed } from 'vue';
import { serviceContainer } from '~/pinia/feedback/FeedbackServiceContainer';
import {useTabItemStore} from "~/pinia/tabItem";

export function addFormLogic(props: any) {
    const show = ref(false);

    const state = ref({
        fileList: [] as any[],
        fileBeingUploaded: false,
        textareaValue: '',
        anonymity: false,
    });

    const openCommentBox = () => show.value = true;
    const closeCommentBox = () => {
        console.log('执行关闭');
        show.value = false;
        resetState();
    }

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
            console.log(state.value);
            let obj = {
                index: props.index,
                replyIndex: props.replyIndex,
                isReplyReply: props.isReplyReply,
                replyUserId: props.replyUserId,
                replyUser: props.replyUser,
            };
            const mergedObj = {...obj,...state.value};
            console.log(mergedObj);
            currentHandler.value.add(mergedObj);
            const router = useRouter();
            console.log('aaaaaaaaaaaaaaaaaaaa')
            console.log(props);
            closeCommentBox();
            if(props.feedbackType == 'commentReply' && props.isShowReply === false){
                router.push({
                    path:'/mobileAppraise',
                    query:{
                        id: props.companyId,
                        tab: 7
                    }
                });
            } else if(props.feedbackType == 'complaintReply' && props.isShowReply === false){
                router.push({
                    path:'/mobileAppraise',
                    query:{
                        id: props.companyId,
                        tab: 9
                    }
                });
            } else if(props.feedbackType == 'commentReply' && props.isPcAppraise === true){
                console.log('走到is pc');
                const tabItemStore = useTabItemStore();
                tabItemStore.tabItem = 4;
            }
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
