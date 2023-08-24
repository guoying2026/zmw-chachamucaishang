// Base URL for the API
const BASE_URL = "https://api.jinrongwan.cn/"; // 替换为你的后端URL

// 获取评论的函数
export const commentListApi = async ({ company_info_id, user_id }: CommentListParams): Promise<CommentListResponse> => {
    const response = await fetch(`${BASE_URL}/Pc/CompanyComment/companyCommentList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company_info_id, user_id })
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    console.log('commentListApi');
    console.log(response.json());
    return response.json();
}
