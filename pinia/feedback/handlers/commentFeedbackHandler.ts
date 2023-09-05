import {FeedbackData} from "~/types/feedback";
import {FeedbackHandler} from "~/pinia/feedback/handlers/FeedbackHandler";
import {useCommentStore} from "~/pinia/commentStore";
import {Comment} from "@/types/commentType";
import {Reaction} from "~/types/feedback";
import {MainFeedbackHandler} from "~/pinia/feedback/handlers/MainFeedbackHandler";
import {handleAnonymity} from "~/utils/handler";
import { useUserInfoStore } from "~/pinia/userInfo"

export const commentFeedbackHandler: FeedbackHandler & MainFeedbackHandler = {
    add(data: FeedbackData) {
        // 处理主评论提交的逻辑
        console.log('处理主评论提交逻辑');
        console.log(data.fileList);
        const commentStore = useCommentStore();
        // 实例化用户信息存储
        const userInfoStore = useUserInfoStore()
        let user = handleAnonymity(data.anonymity,userInfoStore.getNickName());
        let obj:Comment = {
            "user_id": userInfoStore.getUserId(),
            "user": user,
            "avatar": userInfoStore.getAvatar(),
            "content": data.textareaValue,
            "time": "2020-08-09 12:12:30",
            "likes": 0,
            "dislikes": 0,
            "currentUser": 1,
            "currentUserReaction": 'none',
            "image": data.fileList.map(item => Object.values(item)[0] as string),
            "replies": []
            };
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
