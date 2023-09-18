// composables/questions.ts

import {useQuestionStore} from '~/pinia/questionStore';
import {
    questionListApi, deleteQuestionApi, deleteAnswerApi,
    likedQuestionApi,
    likedAnswerApi,
    publishQuestionApi,
    publishAnswerApi
} from "~/server/api/question";
import {Reaction} from "~/types/feedback";

export const setQuestions = (companyInfoId: number, userId: number) => {
    const fetchQuestions = async () => {

        try {

            const response = await questionListApi({ company_info_id: companyInfoId, user_id: userId });


            const questionStore = useQuestionStore();
            questionStore.setQuestions(response.data);



        } catch (error) {
            console.error("Error fetching questions:", error);
            // 这里你可以处理错误，比如显示一个通知或其他 UI 反馈
        }
    }
    const deleteQuestion = async (id: number) => {
        try {
            return await deleteQuestionApi({
                id: id,
                companyInfoId,
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the question:", error);
        }
    }
    const deleteAnswer = async (id: number,question_id:number) => {
        try {
            return await deleteAnswerApi({
                id: id,
                question_id: question_id,
                companyInfoId
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the question:", error);
        }
    }
    const likeQuestion = async (question_id: number, newReaction: Reaction) => {
        try {
            return await likedQuestionApi({
                companyInfoId: companyInfoId,
                question_id: question_id,
                userId: userId,
                newReaction: newReaction
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the question:", error);
        }
    }
    const likeAnswer = async(question_id: number, newReaction: Reaction,question_reply_id: number) => {
        try {
            return await likedAnswerApi({
                companyInfoId: companyInfoId,
                question_id: question_id,
                question_reply_id: question_reply_id,
                userId: userId,
                newReaction: newReaction
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the question:", error);
        }
    }
    const publishQuestion = async (question: string, questionScore: number,image: string[],name: string,avatar: string) => {
        try {
            return await publishQuestionApi({
                companyInfoId: companyInfoId,
                question: question,
                questionScore: questionScore,
                image: image,
                userId: userId,
                name: name,
                avatar: avatar,
            });
            // 你可以在这里处理API的响应，如更新状态或显示通知等
        } catch (error) {
            console.error("Error publishing question:", error);
            // 这里你可以处理错误，例如显示通知或其他UI反馈
        }
    }
    const publishAnswer = async (answer: string, image: string[],name: string,avatar: string,questionId: number ) => {
        try {
            return await publishAnswerApi({
                companyInfoId: companyInfoId,
                questionId: questionId,
                answer,
                image: image,
                userId: userId,
                name: name,
                avatar: avatar
            });
            // 你可以在这里处理API的响应，如更新状态或显示通知等
        } catch (error) {
            console.error("Error publishing question reply:", error);
            // 这里你可以处理错误，例如显示通知或其他UI反馈
        }
    }
    return { fetchQuestions, deleteQuestion,deleteAnswer,likeQuestion, likeAnswer,publishQuestion,publishAnswer};
}
