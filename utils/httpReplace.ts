// utils/httpReplace.ts

/**
 * 转换https协议
 * @param url 要转换的URL
 * @returns 转换后的URL
 */
export const formatHttpsProtocol = (url: string): string => {
    if (!url || url.trim().length === 0) {
        return '';
    }
    //这是因为当我们用 split('//') 对 URL 进行分割后，返回的数组最后一个元素（通过 pop() 获取）总是不包含协议的 URL 部分，无论 URL 是否包含协议前缀
    return 'https://' + url.split('//').pop()!;
}

/**
 * 转换http协议
 * @param url 要转换的URL
 * @returns 转换后的URL
 */
export const formatHttpProtocol = (url: string): string => {
    if (!url || url.trim().length === 0) {
        return '';
    }
    return 'http://' + url.split('//').pop()!;
}

/**
 * 将给定的src处理为https协议
 * @param src 要处理的URL
 * @returns 处理后的URL
 */
export const handeSrcHttpsUtil = (src: string): string => {
    if (src.indexOf('https') === -1) {
        //如果 URL 不包含 "https"，那么直接取 split('//') 后的最后一个元素即可获得不包含协议的 URL 部分。这种方法同时处理了 URL 包含 "//" 和不包含 "//" 的两种情况。
        return 'https://' + (src.split('//').pop() || '');
    }
    return src;
}

/**
 * 生成GUID/UUID
 * @returns 生成的GUID
 */
export const guidUtil = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 根据给定的URL生成正则表达式
 * @param url 要匹配的URL
 * @returns 生成的正则表达式
 */
export const regUrl = (url: string): RegExp => {
    return new RegExp(url + ".*");
}
