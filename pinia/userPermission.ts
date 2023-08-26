import { useLocalStorage } from "@vueuse/core";

const permissionNameList = [
  'getUserLocation'
]

const defaultPermissionList = JSON.parse('{' + permissionNameList.map(item => {
  return '"' + item + '": false'
}).join(',') + '}') as {[x:string]:boolean}

/**
 * 记录用户已授权的权限，仅记录权限名称(标识)
 */
export const useUserPermissionStore = defineStore('userPermissionStore', () => {
  const permissionList = useLocalStorage('user-permission', {} as (typeof defaultPermissionList))

  /**
   * 获取所有已授权的权限
   * @returns 
   */
  const getAuthorizedPermissionList = () => {
    let _list = permissionList.value
    return _list
  }

  /**
   * 拒绝某个权限的授权
   * @param permission 权限名称(标识)
   * @returns 
   */
  const denyPermission = (permission: string) => {
    if (!permission || permission.trim() == '') return;
    if (!permissionNameList.includes(permission)) return;
    let _list = permissionList.value
    _list[permission] = false
    permissionList.value = _list
  }

  /**
   * 允许某个权限的授权
   * @param permission 权限名称(标识)
   * @returns 
   */
  const allowPermission = (permission: string) => {
    if (!permission || permission.trim() == '') return;
    let _list = permissionList.value
    _list[permission] = true
    permissionList.value = _list
  }

  /**
   * 删除所有权限的授权
   */
  const clearAllPermissions = () => {
  }

  return {
    getAuthorizedPermissionList,
    denyPermission,
    allowPermission,
    clearAllPermissions,
  }
})