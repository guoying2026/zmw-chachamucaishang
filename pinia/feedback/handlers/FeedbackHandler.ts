import {FeedbackData} from "~/types/feedback";
import {UnwrapRef} from "vue";
import {RefSymbol} from "@vue/reactivity";

export interface FeedbackHandler {
    add(data: {
        replyUserId: any;
        replyIndex: any;
        replyUser: any;
        index: any;
        isReplyReply: any;
        fileBeingUploaded: boolean; anonymity: boolean; fileList: any[]; textareaValue: string ;
    }): void;
}
