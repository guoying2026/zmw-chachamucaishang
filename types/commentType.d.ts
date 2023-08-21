// types/commentType.d.ts

// 单个回复的类型定义
export interface Reply {
    user_id: number;
    user: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    dislikes: number;
    currentUser: number;
    currentUserReaction: Reaction;
}

// 用户的点赞反应类型
export type Reaction = 'none' | 'liked' | 'disliked';

// 单个评论的类型定义
export interface Comment {
    user_id: number;
    user: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    dislikes: number;
    currentUser: number;
    currentUserReaction: Reaction;
    replies: Reply[];
}
