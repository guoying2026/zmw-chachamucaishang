import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Reply} from "@/types/complaintType";
import {ComplaintStore} from "~/types/complaintStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {createReplyObject} from "~/pinia/feedback/handlers/createReplyObject";

export const complaintReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉回复提交的逻辑
        console.log('处理回复主投诉提交逻辑');
        const complaintStore:ComplaintStore = useComplaintStore();
        let obj = createReplyObject(data);
        complaintStore.addComplaintReply(data.index,data.replyIndex,data.isReplyReply,obj);
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
