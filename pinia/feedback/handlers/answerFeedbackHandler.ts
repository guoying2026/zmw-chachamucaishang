import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useQuestionStore} from "~/pinia/questionStore";
import {Answer} from "@/types/questionType";
import {QuestionStore} from "~/types/questionStore";

export const answerFeedbackHandler: FeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理提交回答逻辑');
        const questionStore:QuestionStore = useQuestionStore();
        let obj:Answer = {
            "user_id": 1,
            "user": "Marcin Tireder",
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "answer": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
        };
        questionStore.addAnswer(data.index,obj);
    }
}
