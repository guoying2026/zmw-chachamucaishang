import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";

export const commentFeedbackHandler: FeedbackHandler = {
    handle(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理主评论提交逻辑');
        const commentStore = useCommentStore();
        console.log(data);
        let obj = {
                "user": "Marcin Treder",
                "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                "content": data.textareaValue,
                "time": "2020-08-09 12:12:30",
                "likes": 0,
                "dislikes": 0,
                "replies": []
            };
        commentStore.addComment(obj);

        console.log(commentStore.comments);
    }
}
