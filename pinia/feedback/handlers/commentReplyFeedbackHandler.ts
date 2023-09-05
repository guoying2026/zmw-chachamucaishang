import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Reply} from "@/types/commentType";
import {CommentStore} from "~/types/commentStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {createReplyObject} from "~/pinia/feedback/handlers/createReplyObject";

export const commentReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理回复主评论提交逻辑');
        const commentStore:CommentStore = useCommentStore();
        let obj = createReplyObject(data);
        commentStore.addCommentReply(data.index,obj);
    },
    getReply(index: number | string, replyIndex: number | string){
        const commentStore= useCommentStore();
        return commentStore.getReply(index,replyIndex);
    },
    updateReplyReaction(index: number | string,replyIndex: number | string, newReaction: Reaction){
        const commentStore= useCommentStore();
        return commentStore.updateReplyReaction(index,replyIndex,newReaction);
    }
}
