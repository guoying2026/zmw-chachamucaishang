// commentStore.ts
import { defineStore } from 'pinia';
import { UseCommentStore } from '@/types/commentStore';
import {Reaction,Comment} from "~/types/commentType";

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
                    "replies": []
                }
            ],
        }
    },

    //方法
    actions: {
        addComment(this: UseCommentStore, comment: Comment) {
            this.comments.unshift(comment);
        },
        // 更新评论的点赞状态和当前用户
        updateCommentReaction(this: UseCommentStore,index: string | number, newReaction: Reaction) {
            console.log('执行updateCommentReaction');
            console.log(newReaction);
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
            console.log(this.comments[index].currentUserReaction);
            console.log(this.comments[index]);
        },
    },
});
