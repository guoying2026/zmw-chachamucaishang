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
            
            let obj = {
                index: props.index,
                replyIndex: props.replyIndex,
                isReplyReply: props.isReplyReply,
                replyUserId: props.replyUserId,
                replyUser: props.replyUser,
                companyInfoId: props.companyInfoId,
                mainId: props.mainId,
                mainReplyId: props.mainReplyId,
            };
            const mergedObj = {...obj,...state.value};
            
            currentHandler.value.add(mergedObj);
            const router = useRouter();
            
            
            closeCommentBox();
            if(props.feedbackType == 'commentReply' && props.isShowReply === false){
                router.push({
                    path:'/mobileAppraise',
                    query:{
                        id: props.companyInfoId,
                        tab: 7
                    }
                });
            } else if(props.feedbackType == 'complaintReply' && props.isShowReply === false){
                router.push({
                    path:'/mobileAppraise',
                    query:{
                        id: props.companyInfoId,
                        tab: 9
                    }
                });
            } else if(props.feedbackType == 'commentReply' && props.isPcAppraise === true){
                
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
