import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useQuestionStore} from "~/pinia/questionStore";
import {Question} from "@/types/questionType";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {handleAnonymity, time} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";
import {setQuestions} from "~/composables/question";

export const questionFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理提交提问的逻辑
        console.log('提交提问');
        const questionStore = useQuestionStore();
        const userInfoStore = useUserInfoStore();
        const setQuestion = setQuestions(data.companyInfoId, userInfoStore.getUserId());
        console.log(data.anonymity);
        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
        console.log(name);
        setQuestion.publishQuestion(data.textareaValue, 4,data.fileList,name,userInfoStore.getAvatar()).then((res) => {
            //查看评论提交结果
            if(res.id){
                let obj:Question = {
                    "id": res.id,
                    "user_id": userInfoStore.getUserId(),
                    "name": name,
                    "avatar": userInfoStore.getAvatar(),
                    "question": data.textareaValue,
                    "created_time": time(),
                    "like_count": 0,
                    "dislike_count": 0,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image": data.fileList.map(item => Object.values(item)[0] as string),
                    "answer_list": []
                };
                questionStore.addQuestion(obj);
                console.log('评论成功');
            }
        });
    },
    get(index: number | string){
        const questionStore= useQuestionStore();
        return questionStore.getQuestion(index);
    },
    delete(index: number,companyInfoId:number,id: number){
        const questionStore = useQuestionStore();
        questionStore.deleteQuestion(index);
        const userInfoStore = useUserInfoStore();
        const setQuestion = setQuestions(companyInfoId, userInfoStore.getUserId());
        setQuestion.deleteQuestion(id).then((res) => {
            console.log(res);
        })
    },
    updateReaction(index: number, newReaction: Reaction, companyInfoId: number, questionId: number){
        const questionStore = useQuestionStore();
        questionStore.updateQuestionReaction(index,newReaction);
        const userInfoStore = useUserInfoStore();
        const setQuestion = setQuestions(companyInfoId, userInfoStore.getUserId());
        setQuestion.likeQuestion(questionId,newReaction).then((res) => {
            console.log('likeQuestion');
            console.log(res);
            console.log('点赞完成，前端在这儿之前发生了变化已经');
        })
    }
}
