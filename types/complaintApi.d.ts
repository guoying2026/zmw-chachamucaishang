// 定义函数的输入参数类型
interface ComplaintListParams {
    company_info_id: number;
    user_id: number;
}

// 定义函数返回数据的类型（假设的，你可能需要根据实际的 API 响应进行调整）
interface ComplaintListResponse {
    data: {
        data: any[]; // 你可能需要为这里的数据定义更具体的类型
        company_complaint_count: number;
        company_complaint_reply_count: number;
        all_like_count: number;
    };
    status: number;
}
