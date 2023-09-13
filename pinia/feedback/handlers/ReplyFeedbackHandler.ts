import { Reaction} from "~/types/feedback";

export interface ReplyFeedbackHandler{
    getReply(index: number, replyIndex: number): any;
    deleteReply(index: number, replyIndex: number,companyInfoId: number,id:number): any;
    // 函数重载签名
    updateReplyReaction(index: number, replyIndex:number, newReaction: Reaction, companyInfoId: number,mainId: number,replyId: number): void;
}
