import { useUserInfoStore } from "~/pinia/userInfo";
import { FeedbackData } from "~/types/feedback";
import {handleAnonymity, time} from "~/utils/handler";
import {Reply} from "~/types/commentType";

export const createReplyObject = (data: FeedbackData) => {
    const userInfoStore = useUserInfoStore();
    let user = handleAnonymity(data.anonymity, userInfoStore.getNickName());
    console.log(userInfoStore.getAvatar());
    let obj:Reply = {
        "user_id": userInfoStore.getUserId() || 0,
        "user": user,
        "avatar": userInfoStore.getAvatar() || 'https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg',
        "content": data.textareaValue,
        "time": time(),
        "likes": 0,
        "dislikes": 0,
        "currentUser": 1,
        "currentUserReaction": 'none',
        "image": data.fileList.map(item => Object.values(item)[0] as string),
        "replyUserId": data.replyUserId,
        "replyUser": data.replyUser,
    };

    return obj;
}
