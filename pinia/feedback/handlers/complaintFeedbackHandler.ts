import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {Complaint} from "@/types/complaintType";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {useUserInfoStore} from "~/pinia/userInfo";
import {handleAnonymity, time} from "~/utils/handler";
import {setComplaints} from "~/composables/complaint";

export const complaintFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主投诉提交的逻辑
        const complaintStore = useComplaintStore();
        const userInfoStore = useUserInfoStore();
        const setComplaint = setComplaints(data.companyInfoId, userInfoStore.getUserId());
        console.log(data.anonymity);
        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
        console.log(name);
        setComplaint.publishComplaint(data.textareaValue,data.fileList,name,userInfoStore.getAvatar()).then((res) => {
            //查看评论提交结果
            if(res.id){
                let obj:Complaint = {
                    "id": res.id,
                    "user_id": userInfoStore.getUserId(),
                    "name": name,
                    "avatar": userInfoStore.getAvatar(),
                    "complaint": data.textareaValue,
                    "created_time": time(),
                    "like_count": 0,
                    "dislike_count": 0,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image": data.fileList.map(item => Object.values(item)[0] as string),
                    "replies": []
                };
                complaintStore.addComplaint(obj);
                console.log('评论成功');
            }
        });
    },
    get(index: number){
        const complaintStore= useComplaintStore();
        return complaintStore.getComplaint(index);
    },
    delete(index: number,companyInfoId:number,id: number){
        const complaintStore = useComplaintStore();
        complaintStore.deleteComplaint(index);
        const userInfoStore = useUserInfoStore();
        const setComplaint = setComplaints(companyInfoId, userInfoStore.getUserId());
        setComplaint.deleteComplaint(id).then((res) => {
            console.log(res);
        })
    },
    updateReaction(index: number, newReaction: Reaction, companyInfoId: number, complaintId: number){
        const complaintStore = useComplaintStore();
        complaintStore.updateComplaintReaction(index,newReaction);
        const userInfoStore = useUserInfoStore();
        const setComplaint = setComplaints(companyInfoId, userInfoStore.getUserId());
        setComplaint.likeComplaint(complaintId,newReaction).then((res) => {
            console.log('likeComplaint');
            console.log(res);
            console.log('点赞完成，前端在这儿之前发生了变化已经');
        })
    }
}
