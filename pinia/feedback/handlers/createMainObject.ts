import { useUserInfoStore } from "~/pinia/userInfo";
import { FeedbackData } from "~/types/feedback";
import {handleAnonymity, time} from "~/utils/handler";
import {Comment} from "~/types/commentType";

export const createMainObject = (data: FeedbackData) => {
    const userInfoStore = useUserInfoStore();
    let user = handleAnonymity(data.anonymity, userInfoStore.getNickName());
    console.log(userInfoStore.getAvatar());
    let obj:Comment = {
        "user_id": userInfoStore.getUserId(),
        "user": user,
        "avatar": userInfoStore.getAvatar(),
        "content": data.textareaValue,
        "time": time(),
        "likes": 0,
        "dislikes": 0,
        "currentUser": 1,
        "currentUserReaction": 'none',
        "image": data.fileList.map(item => Object.values(item)[0] as string),
        "replies": []
    };

    return obj;
}
