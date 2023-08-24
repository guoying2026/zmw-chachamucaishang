import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {Answer} from "@/types/questionType";
import {QuestionStore} from "~/types/questionStore";
import {useQuestionStore} from "~/pinia/questionStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {handleAnonymity} from "~/utils/handler";


export const answerFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理提交回答逻辑');
        const questionStore:QuestionStore = useQuestionStore();
        let user = handleAnonymity(data.anonymity,"Marcin Tireder");
        let obj:Answer = {
            "user_id": 1,
            "user": user,
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "answer": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "image": data.fileList.map(item => Object.values(item)[0] as string),
        };
        questionStore.addAnswer(data.index,obj);
    },
    getReply(index: number|string, replyIndex: number | string){
        const questionStore= useQuestionStore();
        return questionStore.getAnswer(index,replyIndex);
    },
    updateReplyReaction(index: number|string,replyIndex: number | string, newReaction: Reaction){
        const questionStore= useQuestionStore();
        return questionStore.updateAnswerReaction(index,replyIndex,newReaction);
    }
}