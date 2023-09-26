// types/commentType.d.ts

// 单个回复的类型定义
import {Reaction} from "~/types/feedback";

export interface Reply {
    id: number;
    user_id: number;
    name: string;
    avatar: string;
    comment: string;
    created_time: string;
    like_count: number;
    dislike_count: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: String[];
    replyUserId: number,
    replyUser: string,
}

// 单个评论的类型定义
export interface Comment {
    id: number;
    user_id: number;
    name: string;
    avatar: string;
    comment: string;
    created_time: string;
    like_count: number;
    dislike_count: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: String[];
    replies: Reply[];
}
