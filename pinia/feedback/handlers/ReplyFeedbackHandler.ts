import { Reaction} from "~/types/feedback";

export interface ReplyFeedbackHandler{
    getReply(index: number | string, replyIndex: number | string): any;
    // 函数重载签名
    updateReplyReaction(index: number | string, replyIndex:number | string, newReaction: Reaction): void;
}
