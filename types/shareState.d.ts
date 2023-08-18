type SharedState = {
    fileList: any[];
    fileBeingUploaded: boolean;
    textareaValue: string;  // 这里不再是 Ref<string>
};
