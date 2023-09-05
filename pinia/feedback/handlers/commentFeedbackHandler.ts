import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Reaction} from "~/types/feedback";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {createMainObject} from "~/pinia/feedback/handlers/createMainObject";

export const commentFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理主评论提交逻辑');
        console.log(data.fileList);
        const commentStore = useCommentStore();
        let obj = createMainObject(data);
        commentStore.addComment(obj);
    },
    get(index: number | string){
        const commentStore= useCommentStore();
        return commentStore.getComment(index);
    },
    updateReaction(index: number | string, newReaction: Reaction){
        const commentStore= useCommentStore();
        return commentStore.updateCommentReaction(index,newReaction);
    }
}
