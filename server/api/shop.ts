import {ShopDetailParams} from "~/types/shopApi";

const BASE_URL = "https://api.jinrongwan.cn/"; // 替换为你的后端URL


export const shopDetailApi = async (id: ShopDetailParams['company_info_id']) => {
    const response = await fetch(`${BASE_URL}/Pc/Index/shopDetail?company_info_id=${id}`);

    // Ensure the response is successful before proceeding
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching shop details: ${errorData.message || 'Unknown error'}`);
    }
    
    const result = await response.json();
    
    return result;
};
