// types/questionType.d.ts

// 单个回复的类型定义
export interface Answer {
    user_id: number;
    user: string;
    avatar: string;
    answer: string;
    time: string;
    likes: number;
    dislikes: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: [];
}

// 单个评论的类型定义
export interface Question {
    user_id: number;
    user: string;
    avatar: string;
    question: string;
    time: string;
    likes: number;
    dislikes: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: [],
    answer_list: Answer[];
}
