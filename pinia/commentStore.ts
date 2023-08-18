// tabItemStore.ts
import { defineStore } from 'pinia';

export const useCommentStore = defineStore('commentStore', {
    state: () => {
        return {
            comments: [
                {
                    "user": "Marcin Treder",
                    "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                    "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                    "time": "2020-08-09 12:12:30",
                    "likes": 12,
                    "dislikes": 12,
                    "replies": [
                        {
                            "user": "Marcin Treder",
                            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                            "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                            "time": "2020-08-09 12:12:30",
                            "likes": 12,
                            "dislikes": 12
                        },
                        {
                            "user": "Marcin Treder",
                            "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                            "content": "我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。",
                            "time": "2020-08-09 12:12:30",
                            "likes": 12,
                            "dislikes": 12
                        }
                    ]
                },
                {
                    "user": "最初的梦想",
                    "avatar": "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg",
                    "content": "上个周末，我搬家具的时候，没想到沙发从手里滑出，砸在了我那美丽的枫木地板上。当时我真的气坏了，地板上出现了一道明显的划痕，让我觉得心疼不已。原本觉得枫木地板很美观耐用，但现在看来，这种地板在耐磨和抗冲击方面还是有待提高。我真心希望商家能重视这个问题，优化地板的制作工艺，让它在遇到类似意外时能更好地抵抗划痕。毕竟，我们花了不少钱购买这样的地板，自然希望能长时间保持美观。而且，生活中类似的意外难免会发生，如果地板能提高耐磨性和抗冲击性，那我们在享受枫木地板美观舒适的同时，也会更加放心。",
                    "time": "2020-08-09 12:12:30",
                    "likes": 12,
                    "dislikes": 12,
                    "replies": []
                }
            ],
        }
    },

    //方法
    actions: {
        addComment(comment) {
            this.comments.unshift(comment);
        }
    },
});
