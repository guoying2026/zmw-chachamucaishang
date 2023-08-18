import { defineStore } from 'pinia';

export const useAddCommentStore = defineStore('addCommentStore', {
    state: () => {
        return {
            show: false,
            fileList: [] as any[],
            fileBeingUploaded: false,
            textareaValue: '',
            anonymity: false,
        }
    },
    // persist: true,
    //计算
    getters: {},

    //方法
    actions: {
        openCommentBox() {
            this.show = true;
        },
        closeCommentBox() {
            this.show = false;
        },
        setAnonymity(value:boolean){
            this.anonymity = value;
        },
        setFileList(files: any[]) {
            this.fileList = files;
        },
        setFileBeingUploaded(status: boolean) {
            this.fileBeingUploaded = status;
        },
        setTextareaValue(value: string) {
            console.log('Setting textareaValue:', value);
            this.textareaValue = value;
            console.log('打印终极');
            console.log(this.textareaValue);
        },
        clearAll() {
            this.fileList = [];
            this.textareaValue = '';
            this.fileBeingUploaded = false;
        },
    },
});
