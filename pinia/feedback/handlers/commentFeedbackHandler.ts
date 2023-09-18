import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Reaction} from "~/types/feedback";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {setComments} from "~/composables/comment";
import {useUserInfoStore} from "~/pinia/userInfo";
import {handleAnonymity, time} from "~/utils/handler";
import {Comment} from "~/types/commentType";

export const commentFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑


        const commentStore = useCommentStore();
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(data.companyInfoId, userInfoStore.getUserId());

        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());

        setComment.publishComment(data.textareaValue, 4,data.fileList,name,userInfoStore.getAvatar()).then((res) => {
            //查看评论提交结果
            if(res.id){
                let obj:Comment = {
                    "id": res.id,
                    "user_id": userInfoStore.getUserId(),
                    "name": name,
                    "avatar": userInfoStore.getAvatar(),
                    "comment": data.textareaValue,
                    "created_time": time(),
                    "like_count": 0,
                    "dislike_count": 0,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image": data.fileList.map(item => Object.values(item)[0] as string),
                    "replies": []
                };
                commentStore.addComment(obj);

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

        })
    },
    updateReaction(index: number, newReaction: Reaction, companyInfoId: number, commentId: number){
        const commentStore = useCommentStore();
        commentStore.updateCommentReaction(index,newReaction);
        const userInfoStore = useUserInfoStore();
        const setComment = setComments(companyInfoId, userInfoStore.getUserId());
        setComment.likeComment(commentId,newReaction).then((res) => {



        })
    }
}
