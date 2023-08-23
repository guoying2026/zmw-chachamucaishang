import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Reply} from "@/types/commentType";
import {CommentStore} from "~/types/commentStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {handleAnonymity} from "~/utils/handler";

export const commentReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理回复主评论提交逻辑');
        const commentStore:CommentStore = useCommentStore();
        let user = handleAnonymity(data.anonymity,"Marcin Tireder");
        let obj:Reply = {
            "user_id": 1,
            "user": user,
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "content": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "image": data.fileList.map(item => Object.values(item)[0] as string),
        };
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
