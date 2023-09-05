import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {CommentStore} from "~/types/commentStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {createReplyObject} from "~/pinia/feedback/handlers/createReplyObject";

export const commentReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理回复提交逻辑');
        const commentStore:CommentStore = useCommentStore();
        let obj = createReplyObject(data);
        console.log(obj);
        return commentStore.addCommentReply(data.index,data.replyIndex,data.isReplyReply,obj);
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
