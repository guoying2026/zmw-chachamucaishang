// commentStore.ts
import { defineStore } from 'pinia';
import { CommentStore } from '@/types/commentStore';
import {Reaction} from "~/types/feedback";
import {Comment, Reply} from "~/types/commentType";

export const useCommentStore = defineStore('commentStore', {
    state: () => {
        return {
            comments: [
                {
                    "user_id": 1,
                    "user": "Marcin Tireder",
                    "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                    "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                    "time": "2020-08-09 12:12:30",
                    "likes": 12,
                    "dislikes": 12,
                    "currentUser": 1,
                    "currentUserReaction": 'none',
                    "image":[
                        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    ],
                    "replies": [
                        {
                            "user_id": 1,
                            "user": "Marcin Tireder",
                            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                            "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                            "time": "2020-08-09 12:12:30",
                            "likes": 12,
                            "dislikes": 12,
                            "currentUser": 1,
                            "currentUserReaction": 'liked',
                            "image":[
                                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
                            ],
                        },
                        {
                            "user_id": 1,
                            "user": "Marcin Tireder",
                            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                            "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                            "time": "2020-08-09 12:12:30",
                            "likes": 12,
                            "dislikes": 12,
                            "currentUser": 1,
                            "currentUserReaction": 'disliked',
                            "image":[],
                        }
                    ]
                },
                {
                    "user_id": 1,
                    "user": "最初的梦想",
                    "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                    "content": "上个周末，我搬家具的时候，没想到沙发从手里滑出，砸在了我那美丽的枫木地板上。当时我真的气坏了，地板上出现了一道明显的划痕，让我觉得心疼不已。原本觉得枫木地板很美观耐用，但现在看来，这种地板在耐磨和抗冲击方面还是有待提高。我真心希望商家能重视这个问题，优化地板的制作工艺，让它在遇到类似意外时能更好地抵抗划痕。毕竟，我们花了不少钱购买这样的地板，自然希望能长时间保持美观。而且，生活中类似的意外难免会发生，如果地板能提高耐磨性和抗冲击性，那我们在享受枫木地板美观舒适的同时，也会更加放心。",
                    "time": "2020-08-09 12:12:30",
                    "likes": 12,
                    "dislikes": 12,
                    "currentUser": 1,
                    "currentUserReaction": 'liked',
                    "image":[],
                    "replies": []
                }
            ],
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
        addCommentReply(this: CommentStore, index: number | string, commentReply: Reply){
            this.comments[index].replies.unshift(commentReply);
        },
        getComment(this: CommentStore, index: number | string){
            return this.comments[index];
        },
        getReply(this: CommentStore, index: number | string, replyIndex: number | string){
            return this.comments[index].replies[replyIndex];
        },
        addCommentReplyReply(this: CommentStore,index: number| string,replyIndex: number,replyReply: Reply){
            this.comments[index].replies.splice(replyIndex + 1, 0, replyReply);
        },
        // 更新评论的点赞状态和当前用户
        updateCommentReaction(this: CommentStore,index: number | string, newReaction: Reaction) {
            // 获取特定索引处的评论对象
            const commentToUpdate = this.comments[index];
            if (commentToUpdate) {
                // 更新评论对象的用户点赞状态和数量
                if (commentToUpdate.currentUserReaction === 'liked' && newReaction === 'liked') {
                    // 已点赞，切换为不点赞
                    commentToUpdate.currentUserReaction = 'none';
                    commentToUpdate.likes--;
                } else if (commentToUpdate.currentUserReaction === 'liked' && newReaction === 'disliked') {
                    // 已点赞，切换为倒赞
                    commentToUpdate.currentUserReaction = 'disliked';
                    commentToUpdate.likes--;
                    commentToUpdate.dislikes++;
                } else if (commentToUpdate.currentUserReaction === 'disliked' && newReaction === 'disliked') {
                    // 已倒赞，切换为不点赞
                    commentToUpdate.currentUserReaction = 'none';
                    commentToUpdate.dislikes--;
                } else if (commentToUpdate.currentUserReaction === 'disliked' && newReaction === 'liked') {
                    // 已倒赞，切换为点赞
                    commentToUpdate.currentUserReaction = 'liked';
                    commentToUpdate.likes++;
                    commentToUpdate.dislikes--;
                } else if (commentToUpdate.currentUserReaction === 'none' && newReaction === 'liked') {
                    // 未点赞，切换为点赞
                    commentToUpdate.currentUserReaction = 'liked';
                    commentToUpdate.likes++;
                } else if (commentToUpdate.currentUserReaction === 'none' && newReaction === 'disliked') {
                    // 未点赞，切换为倒赞
                    commentToUpdate.currentUserReaction = 'disliked';
                    commentToUpdate.dislikes++;
                }
            }
        },
        updateReplyReaction(this: CommentStore, index: number | string,replyIndex: number | string, newReaction: Reaction) {
            // 获取特定索引处的回复对象
            const replyToUpdate = this.comments[index].replies[replyIndex];

            if (replyToUpdate) {
                // 更新回复对象的用户点赞状态和数量
                switch(replyToUpdate.currentUserReaction) {
                    case 'liked':
                        if (newReaction === 'liked') {
                            replyToUpdate.currentUserReaction = 'none';
                            replyToUpdate.likes--;
                        } else if (newReaction === 'disliked') {
                            replyToUpdate.currentUserReaction = 'disliked';
                            replyToUpdate.likes--;
                            replyToUpdate.dislikes++;
                        }
                        break;

                    case 'disliked':
                        if (newReaction === 'liked') {
                            replyToUpdate.currentUserReaction = 'liked';
                            replyToUpdate.likes++;
                            replyToUpdate.dislikes--;
                        } else if (newReaction === 'disliked') {
                            replyToUpdate.currentUserReaction = 'none';
                            replyToUpdate.dislikes--;
                        }
                        break;

                    case 'none':
                        if (newReaction === 'liked') {
                            replyToUpdate.currentUserReaction = 'liked';
                            replyToUpdate.likes++;
                        } else if (newReaction === 'disliked') {
                            replyToUpdate.currentUserReaction = 'disliked';
                            replyToUpdate.dislikes++;
                        }
                        break;
                }
            }
        }
    },
});
