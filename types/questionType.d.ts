// types/questionType.d.ts

import {Reaction} from "~/types/feedback";

// 单个回复的类型定义
export interface Answer {
    id: number;
    user_id: number;
    name: string;
    avatar: string;
    answer: string;
    created_time: string;
    like_count: number;
    dislike_count: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: String[];
}

// 单个评论的类型定义
export interface Question {
    id: number;
    user_id: number;
    name: string;
    avatar: string;
    question: string;
    created_time: string;
    like_count: number;
    dislike_count: number;
    currentUser: number;
    currentUserReaction: Reaction;
    image: String[];
    answer_list: Answer[];
}
