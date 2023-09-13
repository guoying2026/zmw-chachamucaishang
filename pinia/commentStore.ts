// commentStore.ts
import { defineStore } from 'pinia';
import { CommentStore } from '@/types/commentStore';
import {Reaction} from "~/types/feedback";
import {Comment, Reply} from "~/types/commentType";

export const useCommentStore = defineStore('commentStore', {
    state: () => {
        return {
            comments: [],
        }
    },
    getters:{
        getCommentsCount(): number{
            return this.comments.length;
        },
    },
    //方法
    actions: {
        // 设置评论的方法
        setComments(comments: any) {
            this.comments = comments;
        },
        addComment(this: CommentStore, comment: Comment) {
            this.comments.unshift(comment);
        },
        addCommentReply(this: CommentStore,index: number, replyIndex: number, isReplyReply: boolean,commentReply: Reply){
            if(!isReplyReply){
                console.log('走到这一步');
                console.log(index);
                this.comments[index].replies.unshift(commentReply);
            } else {
                this.comments[index].replies.splice(replyIndex+1,0,commentReply);
            }
        },
        getComment(this: CommentStore, index: number | string){
            return this.comments[index];
        },
        getReply(this: CommentStore, index: number | string, replyIndex: number | string){
            return this.comments[index].replies[replyIndex];
        },
        deleteComment(this: CommentStore,index: number){
            return this.comments.splice(index,1);
        },
        deleteCommentReply(this: CommentStore,index: number,replyIndex: number){
            return this.comments[index].replies.splice(replyIndex,1);
        },
        // 更新评论的点赞状态和当前用户
        updateCommentReaction(this: CommentStore,index: number | string, newReaction: Reaction) {
            // 获取特定索引处的评论对象
            const commentToUpdate = this.comments[index];
            console.log(commentToUpdate);
            console.log(commentToUpdate.currentUserReaction);
            if(commentToUpdate.currentUserReaction === null){
                commentToUpdate.currentUserReaction = 0;
            }
            console.log(newReaction);
            if (commentToUpdate) {
                console.log(commentToUpdate);
                // 更新评论对象的用户点赞状态和数量
                if (commentToUpdate.currentUserReaction*1 === 1 && newReaction*1 === 0) {
                    // 已点赞，切换为不点赞
                    commentToUpdate.currentUserReaction = 0;
                    commentToUpdate.like_count--;
                } else if (commentToUpdate.currentUserReaction*1 === 1 && newReaction*1 === 2) {
                    // 已点赞，切换为倒赞
                    commentToUpdate.currentUserReaction = 2;
                    commentToUpdate.like_count--;
                    commentToUpdate.dislike_count++;
                } else if (commentToUpdate.currentUserReaction*1 === 2 && newReaction*1 === 0) {
                    // 已倒赞，切换为不点赞
                    commentToUpdate.currentUserReaction = 0;
                    commentToUpdate.dislike_count--;
                } else if (commentToUpdate.currentUserReaction*1 === 2 && newReaction*1 === 1) {
                    // 已倒赞，切换为点赞
                    commentToUpdate.currentUserReaction = 1;
                    commentToUpdate.like_count++;
                    commentToUpdate.dislike_count--;
                } else if (commentToUpdate.currentUserReaction*1 === 0 && newReaction*1 === 1) {
                    // 未点赞，切换为点赞
                    commentToUpdate.currentUserReaction = 1;
                    commentToUpdate.like_count++;
                } else if (commentToUpdate.currentUserReaction*1 === 0 && newReaction*1 === 2) {
                    // 未点赞，切换为倒赞
                    commentToUpdate.currentUserReaction = 2;
                    commentToUpdate.dislike_count++;
                }
            }
            console.log('前端切换点赞状态完成');
        },
        updateReplyReaction(this: CommentStore, index: number | string,replyIndex: number | string, newReaction: Reaction) {
            // 获取特定索引处的回复对象
            const replyToUpdate = this.comments[index].replies[replyIndex];
            if (replyToUpdate) {
                // 更新回复对象的用户点赞状态和数量
                let current = replyToUpdate.currentUserReaction*1;
                switch(current) {
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
