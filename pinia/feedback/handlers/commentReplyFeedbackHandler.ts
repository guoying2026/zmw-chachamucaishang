import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {CommentStore} from "~/types/commentStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {createReplyObject} from "~/pinia/feedback/handlers/createReplyObject";
import {setComments} from "~/composables/comment";
import {handleAnonymity} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";

export const commentReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理回复提交逻辑');
        const commentStore:CommentStore = useCommentStore();
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(data.companyInfoId, userInfoStore.getUserId());
        console.log(data.anonymity);
        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
        console.log(name);
        setComment.publishCommentReply(data.textareaValue, data.fileList,name,userInfoStore.getAvatar(),data.mainId,data.mainReplyId).then((res) => {
            //查看评论提交结果
            if(res.id){
                console.log('评论成功');
                let obj = createReplyObject(data,res.id);
                commentStore.addCommentReply(data.index,data.replyIndex,data.isReplyReply,obj);
            }
        });
    },
    getReply(index: number, replyIndex: number){
        const commentStore= useCommentStore();
        return commentStore.getReply(index,replyIndex);
    },
    deleteReply(index: number, replyIndex: number,companyInfoId: number,mainId: number,id:number): any {
        const commentStore = useCommentStore();
        commentStore.deleteCommentReply(index,replyIndex);
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(companyInfoId, userInfoStore.getUserId());
        setComment.deleteCommentReply(id).then((res) => {
            console.log(res);
        })
    },
    updateReplyReaction(index: number,replyIndex: number, newReaction: Reaction, companyInfoId: number, commentId: number,commentReplyId: number){
        console.log('找到回复点赞函数');
        const commentStore = useCommentStore();
        commentStore.updateReplyReaction(index,replyIndex,newReaction);
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(companyInfoId, userInfoStore.getUserId());
        setComment.likeCommentReply(commentId,newReaction,commentReplyId).then((res) => {
            console.log(res);
        })
    }
}
