export const handleAnonymity = (anonymity: boolean,user: string) => {
    if (anonymity) {
        return '匿名';
    } else {
        return user;
    }
}
