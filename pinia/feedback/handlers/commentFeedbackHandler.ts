import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Comment} from "@/types/commentType";
import {Reaction} from "~/types/feedback";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {handleAnonymity} from "~/utils/handler";

export const commentFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        const commentStore = useCommentStore();
        let user = handleAnonymity(data.anonymity,"Marcin Tireder");
        let obj:Comment = {
            "user_id": 1,
            "user": user,
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "content": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "replies": []
            };
        commentStore.addComment(obj);
    },
    get(index: number | string){
        const commentStore= useCommentStore();
        return commentStore.getComment(index);
    },
    updateReaction(index: number | string, newReaction: Reaction){
        const commentStore= useCommentStore();
        return commentStore.updateCommentReaction(index,newReaction);
    }
}
