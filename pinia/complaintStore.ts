// complaintStore.ts
import { defineStore } from 'pinia';
import { ComplaintStore } from '~/types/complaintStore';
import { Complaint, Reply} from "~/types/complaintType";
import {Reaction} from "~/types/feedback";


export const useComplaintStore = defineStore('complaintStore', {
    state: () => {
        return {
            complaints: [
                {
                    "id":0,
                    "user_id": 1,
                    "name": "Marcin Tireder",
                    "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                    "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                    "time": "2020-08-09 12:12:30",
                    "like_count": 12,
                    "dislike_count": 12,
                    "currentUser": 1,
                    "currentUserReaction": 0,
                    "image":[
                        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    ],
                    "replies": [
                        {
                            "id": 1,
                            "user_id": 2,
                            "name": "guo guo",
                            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                            "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                            "time": "2020-08-09 12:12:30",
                            "like_count": 12,
                            "dislike_count": 12,
                            "currentUser": 1,
                            "currentUserReaction": 1,
                            "replyUserId": 1,
                            "replyUser": 'Marcin Tireder',
                            "image":[
                                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
                            ],
                        },
                        {
                            "id" : 3,
                            "user_id": 3,
                            "name": "Ran ran",
                            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                            "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                            "time": "2020-08-09 12:12:35",
                            "like_count": 12,
                            "dislike_count": 12,
                            "currentUser": 1,
                            "currentUserReaction": 2,
                            "replyUserId": 2,
                            "replyUser": 'guo guo',
                            "image": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "user_id": 4,
                    "name": "最初的梦想",
                    "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                    "content": "上个周末，我搬家具的时候，没想到沙发从手里滑出，砸在了我那美丽的枫木地板上。当时我真的气坏了，地板上出现了一道明显的划痕，让我觉得心疼不已。原本觉得枫木地板很美观耐用，但现在看来，这种地板在耐磨和抗冲击方面还是有待提高。我真心希望商家能重视这个问题，优化地板的制作工艺，让它在遇到类似意外时能更好地抵抗划痕。毕竟，我们花了不少钱购买这样的地板，自然希望能长时间保持美观。而且，生活中类似的意外难免会发生，如果地板能提高耐磨性和抗冲击性，那我们在享受枫木地板美观舒适的同时，也会更加放心。",
                    "time": "2020-08-09 12:12:30",
                    "like_count": 12,
                    "dislike_count": 12,
                    "currentUser": 1,
                    "currentUserReaction": 1,
                    "image": [],
                    "replies": [],
                }
            ],
        }
    },

    //方法
    actions: {
        addComplaint(this: ComplaintStore, complaint: Complaint) {
            this.complaints.unshift(complaint);
        },
        addComplaintReply(this: ComplaintStore, index: number | string,replyIndex: number, isReplyReply: boolean,complaintReply: Reply){
            if(!isReplyReply){
                console.log('走到这一步');
                console.log(index);
                this.complaints[index].replies.unshift(complaintReply);
            } else {
                this.complaints[index].replies.splice(replyIndex+1,0,complaintReply);
            }
        },
        getComplaint(this: ComplaintStore, index: number | string){
            return this.complaints[index];
        },
        getComplaintReply(this: ComplaintStore, index: number | string, replyIndex: number | string){
            return this.complaints[index].replies[replyIndex];
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
                switch(replyToUpdate.currentUserReaction) {
                    case 1:
                        if (newReaction*1 === 1) {
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
                        } else if (newReaction*1 === 2) {
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
