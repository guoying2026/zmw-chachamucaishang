import {FeedbackData, Reaction} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useComplaintStore} from "~/pinia/complaintStore";
import {ComplaintStore} from "~/types/complaintStore";
import {ReplyFeedbackHandler} from "~/pinia/feedback/handlers/ReplyFeedbackHandler";
import {setComplaints} from "~/composables/complaint";
import {handleAnonymity, time} from "~/utils/handler";
import {useUserInfoStore} from "~/pinia/userInfo";
import {Reply} from "~/types/complaintType";

export const complaintReplyFeedbackHandler: FeedbackHandler & ReplyFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        
        const complaintStore:ComplaintStore = useComplaintStore();
        const userInfoStore = useUserInfoStore();
        const setComplaint = setComplaints(data.companyInfoId, userInfoStore.getUserId());
        
        let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
        
        setComplaint.publishComplaintReply(data.textareaValue, data.fileList,name,userInfoStore.getAvatar(),data.mainId,data.mainReplyId).then((res) => {
            //查看评论提交结果
            if(res.id){
                
                let obj:Reply = {
                    "id": res.id,
                    "user_id": userInfoStore.getUserId() || 0,
                    "name": name,
                    "avatar": userInfoStore.getAvatar() || 'https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg',
                    "complaint": data.textareaValue,
                    "created_time": time(),
                    "like_count": 0,
                    "dislike_count": 0,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image": data.fileList.map(item => Object.values(item)[0] as string),
                    "replyUserId": data.replyUserId,
                    "replyUser": data.replyUser,
                };
                complaintStore.addComplaintReply(data.index,data.replyIndex,data.isReplyReply,obj);
            }
        });
    },
    getReply(index: number, replyIndex: number){
        const complaintStore= useComplaintStore();
        return complaintStore.getReply(index,replyIndex);
    },
    deleteReply(index: number, replyIndex: number,companyInfoId: number,mainId: number,id:number): any {
        const complaintStore = useComplaintStore();
        complaintStore.deleteComplaintReply(index,replyIndex);
        const userInfoStore = useUserInfoStore();
        const setComplaint = setComplaints(companyInfoId, userInfoStore.getUserId());
        setComplaint.deleteComplaintReply(id,mainId).then((res) => {
            
        })
    },
    updateReplyReaction(index: number,replyIndex: number, newReaction: Reaction, companyInfoId: number, complaintId: number,complaintReplyId: number){
        
        const complaintStore = useComplaintStore();
        complaintStore.updateReplyReaction(index,replyIndex,newReaction);
        const userInfoStore = useUserInfoStore();
        const setComplaint = setComplaints(companyInfoId, userInfoStore.getUserId());
        setComplaint.likeComplaintReply(complaintId,newReaction,complaintReplyId).then((res) => {
            
        })
    }
}
