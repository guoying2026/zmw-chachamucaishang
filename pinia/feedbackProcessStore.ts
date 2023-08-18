import { defineStore } from 'pinia';
// @ts-ignore
import {FeedbackData, StoreOptions} from "~/types/feedback";
// @ts-ignore
import { serviceContainer } from '~/pinia/feedback/FeedbackServiceContainer';

export const useFeedbackProcessStore = defineStore('feedbackProcessStore', {
    state: () => {
        return {
            show: false,
            fileList: [] as any[],
            fileBeingUploaded: false,
            textareaValue: '',
            anonymity: false,
            feedbackData: [] as FeedbackData[],
            type: ''
        }
    },
    actions: {
        openCommentBox() {
            console.log('openCommentBox is called');
            this.show = true;
        },
        closeCommentBox() {
            this.show = false;
        },
        setType(value: string){
            this.type = value;
        },
        setAnonymity(value: boolean) {
            this.anonymity = value;
        },
        setFileList(files: any[]) {
            this.fileList = files;
        },
        setFileBeingUploaded(status: boolean) {
            this.fileBeingUploaded = status;
        },
        setTextareaValue(value: string) {
            this.textareaValue = value;
        },
        clearAll() {
            this.fileList = [];
            this.textareaValue = '';
            this.fileBeingUploaded = false;
        },
        addFeedback() {
            console.log('进来addFeedback');
            console.log(this.type);
            const handler = serviceContainer.getHandler(this.type);
            console.log(handler);
            if (handler) {
                console.log('实例化容器成功');
                console.log(this.$state);
                handler.handle(this.$state);
                this.feedbackData.push(this.$state);
                this.closeCommentBox();
            }
        }
    },
});
