// composables/comments.ts

import {useCommentStore} from '~/pinia/commentStore';
import {
    commentListApi, deleteCommentApi, deleteCommentReplyApi,
    likedCommentApi,
    likedCommentReplyApi,
    publishCommentApi,
    publishCommentReplyApi
} from "~/server/api/comment";
import {Reaction} from "~/types/feedback";

export const setComments = (companyInfoId: number, userId: number) => {
    const fetchComments = async () => {

        try {

            const response = await commentListApi({ company_info_id: companyInfoId, user_id: userId });


            const commentStore = useCommentStore();
            commentStore.setComments(response.data);



        } catch (error) {
            console.error("Error fetching comments:", error);
            // 这里你可以处理错误，比如显示一个通知或其他 UI 反馈
        }
    }
    const deleteComment = async (id: number) => {
        try {
            return await deleteCommentApi({
                company_info_id: companyInfoId,
                id: id,
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the comment:", error);
        }
    }
    const deleteCommentReply = async (id: number,company_comment_id: number) => {
        try {
            return await deleteCommentReplyApi({
                id: id,
                company_info_id: companyInfoId,
                company_comment_id: company_comment_id,
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the comment:", error);
        }
    }
    const likeComment = async (comment_id: number, newReaction: Reaction) => {
        try {
            return await likedCommentApi({
                companyInfoId: companyInfoId,
                comment_id: comment_id,
                userId: userId,
                newReaction: newReaction
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the comment:", error);
        }
    }
    const likeCommentReply = async(comment_id: number, newReaction: Reaction,comment_reply_id: number) => {
        try {
            return await likedCommentReplyApi({
                companyInfoId: companyInfoId,
                comment_id: comment_id,
                comment_reply_id: comment_reply_id,
                userId: userId,
                newReaction: newReaction
            });
            // 处理结果
        } catch (error) {
            console.error("Error liking the comment:", error);
        }
    }
    const publishComment = async (comment: string, commentScore: number,image: string[],name: string,avatar: string) => {
        try {
            return await publishCommentApi({
                companyInfoId: companyInfoId,
                comment: comment,
                commentScore: commentScore,
                image: image,
                userId: userId,
                name: name,
                avatar: avatar,
            });
            // 你可以在这里处理API的响应，如更新状态或显示通知等
        } catch (error) {
            console.error("Error publishing comment:", error);
            // 这里你可以处理错误，例如显示通知或其他UI反馈
        }
    }
    const publishCommentReply = async (comment: string, image: string[],name: string,avatar: string,commentId: number, commentReplyId: number ) => {
        try {
            return await publishCommentReplyApi({
                companyInfoId: companyInfoId,
                commentId: commentId,
                commentReplyId: commentReplyId,
                comment: comment,
                image: image,
                userId: userId,
                name: name,
                avatar: avatar
            });
            // 你可以在这里处理API的响应，如更新状态或显示通知等
        } catch (error) {
            console.error("Error publishing comment reply:", error);
            // 这里你可以处理错误，例如显示通知或其他UI反馈
        }
    }
    return { fetchComments, deleteComment,deleteCommentReply,likeComment, likeCommentReply,publishComment,publishCommentReply};
}
