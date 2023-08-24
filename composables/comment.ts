// composables/comments.ts

import { useCommentStore } from '~/pinia/commentStore';
import {commentListApi} from "~/server/api/comment";

export const useComments = (companyInfoId: number, userId: number) => {
    const commentStore = useCommentStore();

    const fetchComments = async () => {
        try {
            const response = await commentListApi({ company_info_id: companyInfoId, user_id: userId });
            commentStore.setComments(response.data.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
            // 这里你可以处理错误，比如显示一个通知或其他 UI 反馈
        }
    }

    return { fetchComments };
}
