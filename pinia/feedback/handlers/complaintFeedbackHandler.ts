import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Complaint} from "@/types/complaintType";
import { ComplaintStore } from "@/types/complaintStore";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {handleAnonymity} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";

export const complaintFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉提交的逻辑
        const complaintStore:ComplaintStore = useComplaintStore();
        const userInfoStore = useUserInfoStore();
        let user = handleAnonymity(data.anonymity,userInfoStore.getNickName());
        let obj:Complaint = {
            "user_id": userInfoStore.getUserId(),
            "user": user,
            "avatar": userInfoStore.getAvatar(),
            "content": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "image": data.fileList.map(item => Object.values(item)[0] as string),
            "replies": [],
        };
        complaintStore.addComplaint(obj);
    },
    get(index: number | string){
        const complaintStore= useComplaintStore();
        return complaintStore.getComplaint(index);
    },
    updateReaction(index: number | string, newReaction: Reaction){
        const complaintStore= useComplaintStore();
        return complaintStore.updateComplaintReaction(index,newReaction);
    }
}
