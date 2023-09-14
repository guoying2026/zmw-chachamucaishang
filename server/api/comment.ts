// Base URL for the API
import {Reaction} from "~/types/feedback";

console.log(process.env.NODE_ENV);
const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://api.jinrongwan.cn/' : 'https://zmwapi.jinrongwan.cn/';
// const BASE_URL = "https://api.jinrongwan.cn/"; // 替换为你的后端URL

// 获取评论的函数
export const commentListApi = async ({ company_info_id, user_id }: CommentListParams): Promise<CommentListResponse> => {
    console.log('进来');
    // 构造查询字符串
    const queryString = new URLSearchParams({ company_info_id: String(company_info_id), user_id: String(user_id) }).toString();

    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/companyCommentList?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log('commentListApi', data);
    return data;
}
export const deleteCommentApi = async({id}:{id:number;}) => {
    const formData = new URLSearchParams();
    formData.append('id',id.toString());
    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/deleteComment`, {
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
export const deleteCommentReplyApi = async({id}:{id:number;}) => {
    const formData = new URLSearchParams();
    formData.append('id',id.toString());
    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/deleteCommentReply`, {
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
export const likedCommentApi = async ({companyInfoId, comment_id, userId, newReaction}: { companyInfoId: number; comment_id: number; userId: number;newReaction: Reaction }) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('company_comment_id', comment_id.toString());
    formData.append('user_id', userId.toString());
    formData.append('is_liked', newReaction.toString());

    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/likedComment`, {
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
export const likedCommentReplyApi = async ({companyInfoId, comment_id, comment_reply_id,userId, newReaction}: { companyInfoId: number; comment_id: number; comment_reply_id: number;userId: number;newReaction: Reaction;}) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('company_comment_id', comment_id.toString());
    formData.append('company_comment_reply_id',comment_reply_id.toString());
    formData.append('user_id', userId.toString());
    formData.append('is_liked', newReaction.toString());

    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/likedCommentReply`, {
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
export const publishCommentApi = async({companyInfoId, comment,commentScore, image, userId, name, avatar}: {companyInfoId: number; comment: string; commentScore: number;image: string[]; userId: number;name: string; avatar: string;}) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('comment', comment);
    formData.append('comment_score',commentScore.toString());
    for (let imgObj of image) {
        for (let url of Object.values(imgObj)) {
            formData.append('image[]', url);
        }
    }
    formData.append('user_id', userId.toString());
    formData.append('name', name);
    formData.append('avatar',avatar);

    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/publishComment`, {
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
export const addCommentAllApi = async({companyInfoId,comments}:{companyInfoId: number;comments:{ comment: string; name: string; comment_score: number; created_time: string; }[]}) => {
    console.log('批量导入评论');
    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('comments',JSON.stringify(comments));

    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/addCompanyCommentAll`, {
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
export const publishCommentReplyApi = async({companyInfoId,comment,image,userId, name, avatar,commentId,commentReplyId}:{companyInfoId: number; comment: string;image: string[], userId: number;name: string; avatar: string;commentId: number;commentReplyId: number;}) => {
    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('company_comment_id',commentId.toString());
    formData.append('company_comment_reply_id',commentReplyId.toString());
    formData.append('comment', comment);
    for (let imgObj of image) {
        for (let url of Object.values(imgObj)) {
            formData.append('image[]', url);
        }
    }
    formData.append('user_id', userId.toString());
    formData.append('name', name);
    formData.append('avatar',avatar);

    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/publishCommentReply`, {
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
