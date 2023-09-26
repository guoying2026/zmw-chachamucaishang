// types/complaintType.d.ts
import {Reaction} from "~/types/feedback";

// 单个回复的类型定义
export interface Reply {
    id: number;
    user_id: number;
    name: string;
    avatar: string;
    complaint: string;
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
export interface Complaint {
    id: number;
    user_id: number;
    name: string;
    avatar: string;
    complaint: string;
    created_time: string;
    like_count: number;
    dislike_count: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: String[];
    replies: Reply[];
}
