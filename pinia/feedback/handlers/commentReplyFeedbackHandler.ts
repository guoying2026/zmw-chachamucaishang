import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {CommentStore} from "~/types/commentStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {setComments} from "~/composables/comment";
import {handleAnonymity, time} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";
import {Reply} from "~/types/commentType";

export const commentReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑

        const commentStore:CommentStore = useCommentStore();
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(data.companyInfoId, userInfoStore.getUserId());

        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());

        setComment.publishCommentReply(data.textareaValue, data.fileList,name,userInfoStore.getAvatar(),data.mainId,data.mainReplyId).then((res) => {
            //查看评论提交结果
            if(res.id){

                let obj:Reply = {
                    "id": res.id,
                    "user_id": userInfoStore.getUserId() || 0,
                    "name": name,
                    "avatar": userInfoStore.getAvatar() || 'https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg',
                    "comment": data.textareaValue,
                    "created_time": time(),
                    "like_count": 0,
                    "dislike_count": 0,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image": data.fileList.map(item => Object.values(item)[0] as string),
                    "replyUserId": data.replyUserId,
                    "replyUser": data.replyUser,
                };
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
        setComment.deleteCommentReply(id,companyInfoId,mainId).then((res) => {

        })
    },
    updateReplyReaction(index: number,replyIndex: number, newReaction: Reaction, companyInfoId: number, commentId: number,commentReplyId: number){

        const commentStore = useCommentStore();
        commentStore.updateReplyReaction(index,replyIndex,newReaction);
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(companyInfoId, userInfoStore.getUserId());
        setComment.likeCommentReply(commentId,newReaction,commentReplyId).then((res) => {

        })
    }
}
