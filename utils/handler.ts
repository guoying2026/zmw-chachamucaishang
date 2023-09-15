export const handleAnonymity = (anonymity: boolean,user: string) => {
    if (anonymity) {
        return '匿名';
    } else {
        if (isValidPhoneNumber(user)) {
            return user.slice(0, 3) + '****' + user.slice(7);
        } else {
            return 'Ma';
        }
    }
}
export const isValidPhoneNumber = (username: string) => {
    // 正则表达式匹配11位数字
    const regex = /^\d{11}$/;
    return regex.test(username);
}

export const time = () => {
    // 创建当前日期对象
    const currentDate = new Date();

// 获取年、月、日
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 注意：getMonth() 返回的月份从0开始，所以要加1
    const day = currentDate.getDate().toString().padStart(2, '0');

// 获取小时、分钟、秒
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

// 格式化日期和时间
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    
    return formattedDateTime;
}
