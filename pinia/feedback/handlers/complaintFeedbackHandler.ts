import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Complaint} from "@/types/complaintType";
import { ComplaintStore } from "@/types/complaintStore";

export const complaintFeedbackHandler: FeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉提交的逻辑
        const complaintStore:ComplaintStore = useComplaintStore();
        let obj:Complaint = {
            "user_id": 1,
            "user": "Marcin Tireder",
            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
            "content": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "replies": []
        };
        complaintStore.addComplaint(obj);
    }
}
