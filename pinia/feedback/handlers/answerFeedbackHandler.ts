import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useQuestionStore} from "~/pinia/questionStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {setQuestions} from "~/composables/question";
import {handleAnonymity, time} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";
import {Answer} from "~/types/questionType";

export const answerFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        
        const questionStore = useQuestionStore();
        const userInfoStore = useUserInfoStore();
        const setQuestion = setQuestions(data.companyInfoId, userInfoStore.getUserId());
        
        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
        
        setQuestion.publishAnswer(data.textareaValue, data.fileList,name,userInfoStore.getAvatar(),data.mainId).then((res) => {
            //查看评论提交结果
            if(res.id){
                
                let obj:Answer = {
                    "id": res.id,
                    "user_id": userInfoStore.getUserId() || 0,
                    "name": name,
                    "avatar": userInfoStore.getAvatar() || 'https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg',
                    "answer": data.textareaValue,
                    "created_time": time(),
                    "like_count": 0,
                    "dislike_count": 0,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image": data.fileList.map(item => Object.values(item)[0] as string),
                };
                questionStore.addAnswer(data.index,obj);
            }
        });
    },
    getReply(index: number, replyIndex: number){
        const questionStore= useQuestionStore();
        return questionStore.getAnswer(index,replyIndex);
    },
    deleteReply(index: number, replyIndex: number,companyInfoId: number,mainId: number,id:number): any {
        const questionStore = useQuestionStore();
        questionStore.deleteAnswer(index,replyIndex);
        const userInfoStore = useUserInfoStore();
        const setQuestion = setQuestions(companyInfoId, userInfoStore.getUserId());
        setQuestion.deleteAnswer(id,mainId).then((res) => {
            
        })
    },
    updateReplyReaction(index: number,replyIndex: number, newReaction: Reaction, companyInfoId: number, commentId: number,answerId: number){
        
        const questionStore = useQuestionStore();
        questionStore.updateAnswerReaction(index,replyIndex,newReaction);
        const userInfoStore = useUserInfoStore();
        const setQuestion = setQuestions(companyInfoId, userInfoStore.getUserId());
        setQuestion.likeAnswer(commentId,newReaction,answerId).then((res) => {
            
        })
    }
}
