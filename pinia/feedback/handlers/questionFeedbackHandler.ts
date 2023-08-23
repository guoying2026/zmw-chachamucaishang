import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useQuestionStore} from "~/pinia/questionStore";
import {Question} from "@/types/questionType";
import { QuestionStore } from "@/types/questionStore";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";

export const questionFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理提交提问的逻辑
        console.log('提交提问');
        const questionStore:QuestionStore = useQuestionStore();
        let obj:Question = {
            "user_id": 1,
            "user": "Marcin Tireder",
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "question": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "answer_list": []
        };
        questionStore.addQuestion(obj);
    },
    get(index: number | string){
        const questionStore= useQuestionStore();
        return questionStore.getQuestion(index);
    },
    updateReaction(index: number | string, newReaction: Reaction){
        const questionStore= useQuestionStore();
        return questionStore.updateQuestionReaction(index,newReaction);
    },
}
