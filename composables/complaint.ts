// composables/complaints.ts

import {useComplaintStore} from '~/pinia/complaintStore';
import {
    complaintListApi, deleteComplaintApi, deleteComplaintReplyApi,
    likedComplaintApi,
    likedComplaintReplyApi,
    publishComplaintApi,
    publishComplaintReplyApi
} from "~/server/api/complaint";
import {Reaction} from "~/types/feedback";

export const setComplaints = (companyInfoId: number, userId: number) => {
    const fetchComplaints = async () => {
        
        try {
            
            const response = await complaintListApi({ company_info_id: companyInfoId, user_id: userId });
            
            
            const complaintStore = useComplaintStore();
            complaintStore.setComplaints(response.data);
            
            
            
        } catch (error) {
            console.error("Error fetching complaints:", error);
            // 这里你可以处理错误，比如显示一个通知或其他 UI 反馈
        }
    }
    const deleteComplaint = async (id: number) => {
        try {
            return await deleteComplaintApi({
                id: id,
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the complaint:", error);
        }
    }
    const deleteComplaintReply = async (id: number,company_complaint_id:number) => {
        try {
            return await deleteComplaintReplyApi({
                id: id,
                company_complaint_id,
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the complaint:", error);
        }
    }
    const likeComplaint = async (complaint_id: number, newReaction: Reaction) => {
        try {
            return await likedComplaintApi({
                companyInfoId: companyInfoId,
                complaint_id: complaint_id,
                userId: userId,
                newReaction: newReaction
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the complaint:", error);
        }
    }
    const likeComplaintReply = async(complaint_id: number, newReaction: Reaction,complaint_reply_id: number) => {
        try {
            return await likedComplaintReplyApi({
                companyInfoId: companyInfoId,
                complaint_id: complaint_id,
                complaint_reply_id: complaint_reply_id,
                userId: userId,
                newReaction: newReaction
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the complaint:", error);
        }
    }
    const publishComplaint = async (complaint: string, image: string[],name: string,avatar: string) => {
        try {
            return await publishComplaintApi({
                companyInfoId: companyInfoId,
                complaint: complaint,
                image: image,
                userId: userId,
                name: name,
                avatar: avatar,
            });
            // 你可以在这里处理API的响应，如更新状态或显示通知等
        } catch (error) {
            console.error("Error publishing complaint:", error);
            // 这里你可以处理错误，例如显示通知或其他UI反馈
        }
    }
    const publishComplaintReply = async (complaint: string, image: string[],name: string,avatar: string,complaintId: number, complaintReplyId: number ) => {
        try {
            return await publishComplaintReplyApi({
                companyInfoId: companyInfoId,
                complaintId: complaintId,
                complaintReplyId: complaintReplyId,
                complaint: complaint,
                image: image,
                userId: userId,
                name: name,
                avatar: avatar
            });
            // 你可以在这里处理API的响应，如更新状态或显示通知等
        } catch (error) {
            console.error("Error publishing complaint reply:", error);
            // 这里你可以处理错误，例如显示通知或其他UI反馈
        }
    }
    return { fetchComplaints, deleteComplaint,deleteComplaintReply,likeComplaint, likeComplaintReply,publishComplaint,publishComplaintReply};
}
