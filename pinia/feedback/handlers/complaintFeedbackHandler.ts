import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Complaint} from "@/types/complaintType";
import { ComplaintStore } from "@/types/complaintStore";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {createMainObject} from "~/pinia/feedback/handlers/createMainObject";

export const complaintFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉提交的逻辑
        const complaintStore:ComplaintStore = useComplaintStore();
        let obj = createMainObject(data);
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
