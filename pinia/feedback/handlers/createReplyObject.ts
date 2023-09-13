import { useUserInfoStore } from "~/pinia/userInfo";
import { FeedbackData } from "~/types/feedback";
import {handleAnonymity, time} from "~/utils/handler";
import {Reply} from "~/types/commentType";

export const createReplyObject = (data: FeedbackData,id:number) => {
    const userInfoStore = useUserInfoStore();
    let name = handleAnonymity(data.anonymity, userInfoStore.getNickName());
    console.log(userInfoStore.getAvatar());
    let obj:Reply = {
        "id": id,
        "user_id": userInfoStore.getUserId() || 0,
        "name": name,
        "avatar": userInfoStore.getAvatar() || 'https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg',
        "comment": data.textareaValue,
        "created_time": time(),
        "like_count": 0,
        "dislike_count": 0,
        "currentUser": 1,
        "currentUserReaction": 0,
        "image": data.fileList.map(item => Object.values(item)[0] as string),
        "replyUserId": data.replyUserId,
        "replyUser": data.replyUser,
    };

    return obj;
}
