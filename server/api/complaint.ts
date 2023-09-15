// Base URL for the API
import {Reaction} from "~/types/feedback";


const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://api.jinrongwan.cn/' : 'https://zmwapi.jinrongwan.cn/';
// const BASE_URL = "https://api.jinrongwan.cn/"; // 替换为你的后端URL

// 获取评论的函数
export const complaintListApi = async ({ company_info_id, user_id }: ComplaintListParams): Promise<ComplaintListResponse> => {
    
    // 构造查询字符串
    const queryString = new URLSearchParams({ company_info_id: String(company_info_id), user_id: String(user_id) }).toString();

    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/companyComplaintList?${queryString}`, {
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
export const deleteComplaintApi = async({id}:{id:number;}) => {
    const formData = new URLSearchParams();
    formData.append('id',id.toString());
    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/deleteComplaint`, {
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
export const deleteComplaintReplyApi = async({id,company_complaint_id}:{id:number;company_complaint_id:number}) => {
    const formData = new URLSearchParams();
    formData.append('id',id.toString());
    formData.append('company_complaint_id',company_complaint_id.toString());
    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/deleteComplaintReply`, {
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
export const likedComplaintApi = async ({companyInfoId, complaint_id, userId, newReaction}: { companyInfoId: number; complaint_id: number; userId: number;newReaction: Reaction }) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('company_complaint_id', complaint_id.toString());
    formData.append('user_id', userId.toString());
    formData.append('is_liked', newReaction.toString());

    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/likedComplaint`, {
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
export const likedComplaintReplyApi = async ({companyInfoId, complaint_id, complaint_reply_id,userId, newReaction}: { companyInfoId: number; complaint_id: number; complaint_reply_id: number;userId: number;newReaction: Reaction;}) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('company_complaint_id', complaint_id.toString());
    formData.append('company_complaint_reply_id',complaint_reply_id.toString());
    formData.append('user_id', userId.toString());
    formData.append('is_liked', newReaction.toString());

    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/likedComplaintReply`, {
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
export const publishComplaintApi = async({companyInfoId, complaint, image, userId, name, avatar}: {companyInfoId: number; complaint: string; image: string[]; userId: number;name: string; avatar: string;}) => {

    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('complaint', complaint);
    for (let imgObj of image) {
        for (let url of Object.values(imgObj)) {
            formData.append('image[]', url);
        }
    }
    formData.append('user_id', userId.toString());
    formData.append('name', name);
    formData.append('avatar',avatar);

    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/publishComplaint`, {
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
export const addComplaintAllApi = async({companyInfoId,complaints}:{companyInfoId: number;complaints:{ complaint: string; name: string; complaint_score: number; created_time: string; }[]}) => {
    
    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('complaints',JSON.stringify(complaints));

    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/addCompanyComplaintAll`, {
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
export const publishComplaintReplyApi = async({companyInfoId,complaint,image,userId, name, avatar,complaintId,complaintReplyId}:{companyInfoId: number; complaint: string;image: string[], userId: number;name: string; avatar: string;complaintId: number;complaintReplyId: number;}) => {
    const formData = new URLSearchParams();
    formData.append('company_info_id', companyInfoId.toString());
    formData.append('company_complaint_id',complaintId.toString());
    formData.append('company_complaint_reply_id',complaintReplyId.toString());
    formData.append('complaint', complaint);
    for (let imgObj of image) {
        for (let url of Object.values(imgObj)) {
            formData.append('image[]', url);
        }
    }
    formData.append('user_id', userId.toString());
    formData.append('name', name);
    formData.append('avatar',avatar);

    const response = await fetch(`${BASE_URL}/Pc/CompanyComplaint/publishComplaintReply`, {
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
