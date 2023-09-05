export const handleAnonymity = (anonymity: boolean,user: string) => {
    if (anonymity) {
        return '匿名';
    } else {
        if (isValidPhoneNumber(user)) {
            return user.slice(0, 3) + '****' + user.slice(7);
        } else {
            return user;
        }
    }
}
export const isValidPhoneNumber = (username: string) => {
    // 正则表达式匹配11位数字
    const regex = /^\d{11}$/;
    return regex.test(username);
}
