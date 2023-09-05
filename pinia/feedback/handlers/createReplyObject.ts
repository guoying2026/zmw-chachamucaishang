import { useUserInfoStore } from "~/pinia/userInfo";
import { FeedbackData } from "~/types/feedback";
import { handleAnonymity } from "~/utils/handler";
import {Reply} from "~/types/commentType";

export const createReplyObject = (data: FeedbackData) => {
    const userInfoStore = useUserInfoStore();
    let user = handleAnonymity(data.anonymity, userInfoStore.getNickName());
    let obj:Reply = {
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
    };

    return obj;
}
