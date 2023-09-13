import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Reaction} from "~/types/feedback";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {createMainObject} from "~/pinia/feedback/handlers/createMainObject";
import {setComments} from "~/composables/comment";
import {useUserInfoStore} from "~/pinia/userInfo";
import {handleAnonymity} from "~/utils/handler";

export const commentFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理主评论提交逻辑');
        console.log(data.fileList);
        const commentStore = useCommentStore();
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(data.companyInfoId, userInfoStore.getUserId());
        console.log(data.anonymity);
        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
        console.log(name);
        setComment.publishComment(data.textareaValue, 4,data.fileList,name,userInfoStore.getAvatar()).then((res) => {
            //查看评论提交结果
            if(res.id){
                let obj = createMainObject(data,res.id);
                commentStore.addComment(obj);
                console.log('评论成功');
            }
        });
    },
    get(index: number){
        const commentStore= useCommentStore();
        return commentStore.getComment(index);
    },
    delete(index: number,companyInfoId:number,id: number){
        const commentStore = useCommentStore();
        commentStore.deleteComment(index);
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(companyInfoId, userInfoStore.getUserId());
        setComment.deleteComment(id).then((res) => {
            console.log(res);
        })
    },
    updateReaction(index: number, newReaction: Reaction, companyInfoId: number, commentId: number){
        const commentStore = useCommentStore();
        commentStore.updateCommentReaction(index,newReaction);
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(companyInfoId, userInfoStore.getUserId());
        setComment.likeComment(commentId,newReaction).then((res) => {
            console.log('likeComment');
            console.log(res);
            console.log('点赞完成，前端在这儿之前发生了变化已经');
        })
    }
}
