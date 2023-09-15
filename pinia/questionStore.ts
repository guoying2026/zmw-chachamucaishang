// questionStore.ts
import { defineStore } from 'pinia';
import { QuestionStore } from '@/types/questionStore';
import {Question, Answer} from "~/types/questionType";
import {Reaction} from "~/types/feedback";

export const useQuestionStore = defineStore('questionStore', {
    state: () => {
        return {
            questions: [],
        }
    },
    getters:{
        getQuestionsCount(): number{
            return this.questions.length;
        },
    },
    //方法
    actions: {
        setQuestions(questions: any) {
            this.questions = questions;
        },
        addQuestion(this: QuestionStore, question: Question) {
            this.questions.unshift(question);
        },
        addAnswer(this: QuestionStore, index: number, answer: Answer){
            this.questions[index].answer_list.unshift(answer);
        },
        getQuestion(this: QuestionStore, index: number | string){
            return this.questions[index];
        },
        getAnswer(this: QuestionStore, index: number | string, replyIndex: number | string){
            return this.questions[index].answer_list[replyIndex];
        },
        deleteQuestion(this: QuestionStore,index: number){
            return this.questions.splice(index,1);
        },
        deleteAnswer(this: QuestionStore,index: number,replyIndex: number){
            return this.questions[index].answer_list.splice(replyIndex,1);
        },
        // 更新评论的点赞状态和当前用户
        updateQuestionReaction(this: QuestionStore,index: number | string, newReaction: Reaction) {
            // 获取特定索引处的评论对象
            const questionToUpdate = this.questions[index];
            if(questionToUpdate.currentUserReaction === null){
                questionToUpdate.currentUserReaction = 0;
            }
            if (questionToUpdate) {
                // 更新评论对象的用户点赞状态和数量
                if (questionToUpdate.currentUserReaction*1 === 1 && newReaction*1 === 0) {
                    // 已点赞，切换为不点赞
                    questionToUpdate.currentUserReaction = 0;
                    questionToUpdate.like_count--;
                } else if (questionToUpdate.currentUserReaction*1 === 1 && newReaction*1 === 2) {
                    // 已点赞，切换为倒赞
                    questionToUpdate.currentUserReaction = 2;
                    questionToUpdate.like_count--;
                    questionToUpdate.dislike_count++;
                } else if (questionToUpdate.currentUserReaction*1 === 2 && newReaction*1 === 0) {
                    // 已倒赞，切换为不点赞
                    questionToUpdate.currentUserReaction = 0;
                    questionToUpdate.dislike_count--;
                } else if (questionToUpdate.currentUserReaction*1 === 2 && newReaction*1 === 1) {
                    // 已倒赞，切换为点赞
                    questionToUpdate.currentUserReaction = 1;
                    questionToUpdate.like_count++;
                    questionToUpdate.dislike_count--;
                } else if (questionToUpdate.currentUserReaction*1 === 0 && newReaction*1 === 1) {
                    // 未点赞，切换为点赞
                    questionToUpdate.currentUserReaction = 1;
                    questionToUpdate.like_count++;
                } else if (questionToUpdate.currentUserReaction*1 === 0 && newReaction*1 === 2) {
                    // 未点赞，切换为倒赞
                    questionToUpdate.currentUserReaction = 2;
                    questionToUpdate.dislike_count++;
                }
            }
        },
        updateAnswerReaction(this: QuestionStore, index: number | string,replyIndex: number | string, newReaction: Reaction) {
            // 获取特定索引处的回复对象
            const replyToUpdate = this.questions[index].answer_list[replyIndex];

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
