import { useUserInfoStore } from "~/pinia/userInfo";
import { FeedbackData } from "~/types/feedback";
import {handleAnonymity, time} from "~/utils/handler";
import {Comment} from "~/types/commentType";

export const createMainObject = (data: FeedbackData,id: number) => {
    const userInfoStore = useUserInfoStore();
    let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
    console.log(userInfoStore.getAvatar());
    let obj:Comment = {
        "id": id,
        "user_id": userInfoStore.getUserId(),
        "name": name,
        "avatar": userInfoStore.getAvatar(),
        "comment": data.textareaValue,
        "created_time": time(),
        "like_count": 0,
        "dislike_count": 0,
        "currentUser": 1,
        "currentUserReaction": 0,
        "image": data.fileList.map(item => Object.values(item)[0] as string),
        "replies": []
    };

    return obj;
}
