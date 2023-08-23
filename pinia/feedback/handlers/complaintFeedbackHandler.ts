import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Complaint} from "@/types/complaintType";
import { ComplaintStore } from "@/types/complaintStore";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {handleAnonymity} from "~/utils/handler";

export const complaintFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉提交的逻辑
        const complaintStore:ComplaintStore = useComplaintStore();
        let user = handleAnonymity(data.anonymity,"Marcin Tireder");
        let obj:Complaint = {
            "user_id": 1,
            "user": user,
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
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
