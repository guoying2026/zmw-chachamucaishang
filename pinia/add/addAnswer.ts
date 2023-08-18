import { defineStore } from 'pinia';

export const useAddAnswerStore = defineStore('addAnswerStore', {
    state: () => {
        return {
            fileList: [] as any[],
            fileBeingUploaded: false,
            textareaValue: '',
        }
    },
    // persist: true,
    //计算
    getters: {},

    //方法
    actions: {
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
