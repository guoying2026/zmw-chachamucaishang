import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Reply} from "@/types/complaintType";
import {ComplaintStore} from "~/types/complaintStore";
import {useCommentStore} from "~/pinia/commentStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";

export const complaintReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉回复提交的逻辑
        console.log('处理回复主投诉提交逻辑');
        const complaintStore:ComplaintStore = useComplaintStore();
        let obj:Reply = {
            "user_id": 1,
            "user": "Marcin Tireder",
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "content": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
        };
        complaintStore.addComplaintReply(data.index,obj);
    },
    getReply(index: number | string, replyIndex: number | string){
        const commentStore= useComplaintStore();
        return commentStore.getComplaintReply(index,replyIndex);
    },
    updateReplyReaction(index: number | string,replyIndex: number | string, newReaction: Reaction){
        const commentStore= useComplaintStore();
        return commentStore.updateReplyReaction(index,replyIndex,newReaction);
    }
}
