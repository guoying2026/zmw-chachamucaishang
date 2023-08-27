export type UserPermissionStoreList = {
    [x: string]: {
        isAllow: boolean,
    }
}

export type UserPermissionList = {
    [permission: string]: {
        showName: string,
        isAllow: boolean,
    }
}