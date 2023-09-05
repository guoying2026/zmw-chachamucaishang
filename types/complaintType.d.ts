// types/complaintType.d.ts

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
    image: String[];
    replyUserId: number,
    replyUser: string,
}


// 单个评论的类型定义
export interface Complaint {
    user_id: number;
    user: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    dislikes: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: String[];
    replies: Reply[];
}
