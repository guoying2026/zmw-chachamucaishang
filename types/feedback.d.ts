// 定义反馈处理器的接口
export interface FeedbackHandler {
    addFeedback(data: FeedbackData): void;
    // 可能还有其他的方法，根据你的需求来。
}

export interface FeedbackData {
    id: string;
    textareaValue: string;           // 反馈的文本内容
    fileList: string[];              // 附带的文件列表
    fileBeingUploaded: boolean;
    anonymity: boolean;              // 反馈是否匿名
    show: boolean;
    index: number|string;                   // 注意，我改成了number（小写），因为TypeScript中的数字类型是小写的。
    type: string;                   // 添加这行
}
