import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {Answer} from "@/types/questionType";
import {QuestionStore} from "~/types/questionStore";
import {useQuestionStore} from "~/pinia/questionStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {handleAnonymity, time} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";


export const answerFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理提交回答逻辑');
        const questionStore:QuestionStore = useQuestionStore();
        // 实例化用户信息存储
        const userInfoStore = useUserInfoStore();
        let user = handleAnonymity(data.anonymity,userInfoStore.getNickName());
        let obj:Answer = {
            "user_id": userInfoStore.getUserId(),
            "user": user,
            "avatar": userInfoStore.getAvatar(),
            "answer": data.textareaValue,
            "time": time(),
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
