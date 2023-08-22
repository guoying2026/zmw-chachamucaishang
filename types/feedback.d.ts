// 定义反馈处理器的接口
export interface FeedbackHandler {
    addFeedback(data: FeedbackData): void;
    // 可能还有其他的方法，根据你的需求来。
}

// types/feedback.ts
export type StoreOptions = {
    type: string;
};

export interface FeedbackData {
    //... 定义反馈数据的属性
    textareaValue: string;           // 反馈的文本内容
    fileList: string[];           // 附带的文件列表（
    fileBeingUploaded: boolean;
    anonymity: boolean;      // 反馈是否匿名
    show: boolean;
    index: Number;
}
