import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Comment} from "@/types/commentType";
import { CommentStore } from "@/types/commentStore";

export const commentFeedbackHandler: FeedbackHandler = {
    handle(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理主评论提交逻辑');
        const commentStore:CommentStore = useCommentStore();
        console.log(data);
        let obj:Comment = {
            "user_id": 1,
            "user": "Marcin Tireder",
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

        console.log(commentStore.comments);
    }
}
