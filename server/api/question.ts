// Base URL for the API
import {Reaction} from "~/types/feedback";


const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://api.jinrongwan.cn/' : 'https://zmwapi.jinrongwan.cn/';
// const BASE_URL = "https://api.jinrongwan.cn/"; // 替换为你的后端URL

// 获取评论的函数
export const questionListApi = async ({ company_info_id, user_id }: QuestionListParams): Promise<QuestionListResponse> => {
    
    // 构造查询字符串
    const queryString = new URLSearchParams({ company_info_id: String(company_info_id), user_id: String(user_id) }).toString();

    const response = await fetch(`${BASE_URL}/Pc/Question/questionList?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    
    return data;
}
export const deleteQuestionApi = async({id}:{id:number;}) => {
    const formData = new URLSearchParams();
    formData.append('id',id.toString());
    const response = await fetch(`${BASE_URL}/Pc/Question/deleteQuestion`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}
export const deleteAnswerApi = async({id,question_id}:{id:number;question_id:number}) => {
    const formData = new URLSearchParams();
    formData.append('id',id.toString());
    formData.append('answer_question_id',question_id.toString())
    const response = await fetch(`${BASE_URL}/Pc/Question/deleteAnswer`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}
export const likedQuestionApi = async ({companyInfoId, question_id, userId, newReaction}: { companyInfoId: number; question_id: number; userId: number;newReaction: Reaction }) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('answer_question_id', question_id.toString());
    formData.append('user_id', userId.toString());
    formData.append('is_liked', newReaction.toString());

    const response = await fetch(`${BASE_URL}/Pc/Question/likeQuestion`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}
export const likedAnswerApi = async ({companyInfoId, question_id, question_reply_id,userId, newReaction}: { companyInfoId: number; question_id: number; question_reply_id: number;userId: number;newReaction: Reaction;}) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('answer_question_id', question_id.toString());
    formData.append('answer_id',question_reply_id.toString());
    formData.append('user_id', userId.toString());
    formData.append('is_liked', newReaction.toString());

    const response = await fetch(`${BASE_URL}/Pc/Question/likeAnswer`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}
export const publishQuestionApi = async({companyInfoId, question,questionScore, image, userId, name, avatar}: {companyInfoId: number; question: string; questionScore: number;image: string[]; userId: number;name: string; avatar: string;}) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('question', question);
    for (let imgObj of image) {
        for (let url of Object.values(imgObj)) {
            formData.append('image[]', url);
        }
    }
    formData.append('user_id', userId.toString());
    formData.append('name', name);
    formData.append('avatar',avatar);

    const response = await fetch(`${BASE_URL}/Pc/Question/publishQuestion`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}
export const publishAnswerApi = async({companyInfoId,answer,image,userId, name, avatar,questionId}:{companyInfoId: number; answer: string;image: string[], userId: number;name: string; avatar: string;questionId: number;}) => {
    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('answer_question_id',questionId.toString());
    formData.append('answer', answer);
    for (let imgObj of image) {
        for (let url of Object.values(imgObj)) {
            formData.append('image[]', url);
        }
    }
    formData.append('user_id', userId.toString());
    formData.append('name', name);
    formData.append('avatar',avatar);

    const response = await fetch(`${BASE_URL}/Pc/Question/publishAnswer`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}
