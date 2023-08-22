import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import {FeedbackData, StoreOptions} from "~/types/feedback";
// @ts-ignore
import { serviceContainer } from '~/pinia/feedback/FeedbackServiceContainer';

const initialState = (id: string = uuidv4()): FeedbackData => ({
    id,
    show: false,
    fileList: [] as any[],
    fileBeingUploaded: false,
    textareaValue: '',
    anonymity: false,
    type: '',
    index: 0,
})
export const useFeedbackProcessStore = defineStore({
    id: 'feedbackProcessStore',
    state: () => initialState(),
    actions: {
        openCommentBox(type?: string) {
            this.show = true;
        },
        closeCommentBox() {
            this.show = false;
        },
        setIndex(index: number){
            this.index = index;
        },
        setType(value: string){
            this.type = value;
        },
        setAnonymity(value: boolean) {
            this.anonymity = value;
        },
        setFileList(files: string[]) {
            this.fileList = files;
        },
        setFileBeingUploaded(status: boolean) {
            this.fileBeingUploaded = status;
        },
        setTextareaValue(value: string) {
            this.textareaValue = value;
        },
        // 这个方法会将状态重置为初始值
        resetState() {
            // 使用 Object.assign() 来确保我们重置每个属性，而不是直接重新赋值整个 state 对象
            Object.assign(this, initialState(this.id));
        },
        addFeedback() {
            //如果没有传递 type 参数（即 type 为 undefined）并且 this.type 的值为空字符串，则给出一个警告并退出函数。
            if (!this.type && this.type === '') {
                console.warn('Warning: You must provide a type value!');
                return;
            }
            const handler = serviceContainer.getHandler(this.type);
            if (handler) {
                handler.handle(this.$state);
                this.closeCommentBox();
                this.resetState();
            }
        }
    },
});
