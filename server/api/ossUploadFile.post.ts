// ossAPI.ts

// 导入必要的类型和函数
import { ref } from 'vue';

// 定义请求的基本URL，可以根据实际需求进行修改
const BASE_URL = 'https://api.jinrongwan.cn/';

/**
 * 获取Oss加密信息
 * @param data 请求的数据
 * @returns Promise 返回Oss加密信息
 */
export const getAnswerOssSignatureApi = async (data: Record<string, any>) => {
    try {
        // 使用fetch发送POST请求
        const response = await fetch(`${BASE_URL}/Mobile/Index/getAnswerOssSignature`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            // 将传入的data转换为URL参数格式
            body: new URLSearchParams(data).toString()
        });

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        // 返回响应的JSON数据
        return await response.json();
    } catch (error) {
        console.error("Failed to get Oss signature:", error);
        throw error;
    }
}

/**
 * 上传文件到OSS
 * @param url 上传的目标URL
 * @param formData 表单数据
 * @returns Promise 返回上传结果
 */
export const pushAnswerOssApi = async (url: string, formData: FormData) => {
    try {
        // 使用fetch发送POST请求
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        });

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`Error pushing to OSS: ${response.statusText}`);
        }

        // 返回响应的JSON数据
        return await response.json();
    } catch (error) {
        console.error("Failed to push to OSS:", error);
        throw error;
    }
}
