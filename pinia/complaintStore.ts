// complaintStore.ts
import { defineStore } from 'pinia';
import { ComplaintStore } from '@/types/complaintStore';
import {Reaction} from "~/types/feedback";
import {Complaint, Reply} from "~/types/complaintType";

export const useComplaintStore = defineStore('complaintStore', {
    state: () => {
        return {
            complaints: [],
        }
    },
    getters:{
        getComplaintsCount(): number{
            return this.complaints.length;
        },
    },
    //方法
    actions: {
        // 设置评论的方法
        setComplaints(complaints: any) {
            this.complaints = complaints;
        },
        addComplaint(this: ComplaintStore, complaint: Complaint) {
            this.complaints.unshift(complaint);
        },
        addComplaintReply(this: ComplaintStore,index: number, replyIndex: number, isReplyReply: boolean,complaintReply: Reply){
            if(!isReplyReply){


                this.complaints[index].replies.unshift(complaintReply);
            } else {
                this.complaints[index].replies.splice(replyIndex+1,0,complaintReply);
            }
        },
        getComplaint(this: ComplaintStore, index: number | string){
            return this.complaints[index];
        },
        getReply(this: ComplaintStore, index: number | string, replyIndex: number | string){
            return this.complaints[index].replies[replyIndex];
        },
        deleteComplaint(this: ComplaintStore,index: number){
            return this.complaints.splice(index,1);
        },
        deleteComplaintReply(this: ComplaintStore,index: number,replyIndex: number){
            return this.complaints[index].replies.splice(replyIndex,1);
        },
        // 更新评论的点赞状态和当前用户
        updateComplaintReaction(this: ComplaintStore,index: number | string, newReaction: Reaction) {
            // 获取特定索引处的评论对象
            const complaintToUpdate = this.complaints[index];


            if(complaintToUpdate.currentUserReaction === null){
                complaintToUpdate.currentUserReaction = 0;
            }

            if (complaintToUpdate) {

                // 更新评论对象的用户点赞状态和数量
                if (complaintToUpdate.currentUserReaction*1 === 1 && newReaction*1 === 0) {
                    // 已点赞，切换为不点赞
                    complaintToUpdate.currentUserReaction = 0;
                    complaintToUpdate.like_count--;
                } else if (complaintToUpdate.currentUserReaction*1 === 1 && newReaction*1 === 2) {
                    // 已点赞，切换为倒赞
                    complaintToUpdate.currentUserReaction = 2;
                    complaintToUpdate.like_count--;
                    complaintToUpdate.dislike_count++;
                } else if (complaintToUpdate.currentUserReaction*1 === 2 && newReaction*1 === 0) {
                    // 已倒赞，切换为不点赞
                    complaintToUpdate.currentUserReaction = 0;
                    complaintToUpdate.dislike_count--;
                } else if (complaintToUpdate.currentUserReaction*1 === 2 && newReaction*1 === 1) {
                    // 已倒赞，切换为点赞
                    complaintToUpdate.currentUserReaction = 1;
                    complaintToUpdate.like_count++;
                    complaintToUpdate.dislike_count--;
                } else if (complaintToUpdate.currentUserReaction*1 === 0 && newReaction*1 === 1) {
                    // 未点赞，切换为点赞
                    complaintToUpdate.currentUserReaction = 1;
                    complaintToUpdate.like_count++;
                } else if (complaintToUpdate.currentUserReaction*1 === 0 && newReaction*1 === 2) {
                    // 未点赞，切换为倒赞
                    complaintToUpdate.currentUserReaction = 2;
                    complaintToUpdate.dislike_count++;
                }
            }

        },
        updateReplyReaction(this: ComplaintStore, index: number | string,replyIndex: number | string, newReaction: Reaction) {
            // 获取特定索引处的回复对象
            const replyToUpdate = this.complaints[index].replies[replyIndex];
            if (replyToUpdate) {
                // 更新回复对象的用户点赞状态和数量
                let current = replyToUpdate.currentUserReaction*1;
                switch(current) {
                    case 1:
                        if (newReaction*1 === 0) {
                            replyToUpdate.currentUserReaction = 0;
                            replyToUpdate.like_count--;
                        } else if (newReaction*1 === 2) {
                            replyToUpdate.currentUserReaction = 2;
                            replyToUpdate.like_count--;
                            replyToUpdate.dislike_count++;
                        }
                        break;

                    case 2:
                        if (newReaction*1 === 1) {
                            replyToUpdate.currentUserReaction = 1;
                            replyToUpdate.like_count++;
                            replyToUpdate.dislike_count--;
                        } else if (newReaction*1 === 0) {
                            replyToUpdate.currentUserReaction = 0;
                            replyToUpdate.dislike_count--;
                        }
                        break;

                    case 0:
                        if (newReaction*1 === 1) {
                            replyToUpdate.currentUserReaction = 1;
                            replyToUpdate.like_count++;
                        } else if (newReaction*1 === 2) {
                            replyToUpdate.currentUserReaction = 2;
                            replyToUpdate.dislike_count++;
                        }
                        break;
                }
            }
        }
    },
});
