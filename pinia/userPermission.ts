import { useLocalStorage } from "@vueuse/core";

import {
  UserPermissionList,
  UserPermissionStoreList
} from "~/types/userPermission"

/**
 * 权限名称列表
 */
const permissionNameList = [
  {
    id: 'getUserLocation',
    name: '位置信息',
  },
] as const

/**
 * 记录用户已授权的权限，仅记录权限名称(标识)
 */
export const useUserPermissionStore = defineStore('userPermissionStore', () => {
  /**
   * 用户的权限列表
   */
  const permissionList = useLocalStorage('user-permission', {} as UserPermissionStoreList)

  /**
   * 获取所有的权限
   * @returns 
   */
  const getAllPermissionList = (): UserPermissionList => {
    // 获取用户的权限列表
    let _list = permissionList.value

    // 定义要展示的结果
    let ret: UserPermissionList = {}

    // 遍历所有的权限列表
    permissionNameList.map(item => item.id).forEach((permissionName, index) => {
      // 获取用户权限列表的当前权限项目
      let permissionItem = _list[permissionName]

      // 如果该权限从未向用户提出授权请求，则按照默认处理
      if (!permissionItem) permissionItem = {
        isAllow: false,
      }

      ret[permissionName] = {
        ...permissionItem,
        showName: permissionNameList[index].name,
      }
    })

    return ret
  }

  /**
   * 获取所有已允许授权的权限
   * @returns 
   */
  const getAllowedPermissionList = (): UserPermissionList => {
    // 获取用户的权限列表
    let _list = permissionList.value

    // 定义要展示的结果
    let ret: UserPermissionList = {}

    // 遍历所有的权限列表
    permissionNameList.map(item => item.id).forEach((permissionName, index) => {
      // 跳过未进行授权操作和已拒绝授权的权限
      if (!_list[permissionName] || _list[permissionName].isAllow === false) return false

      ret[permissionName] = {
        ..._list[permissionName],
        showName: permissionNameList[index].name,
      }
    })

    return ret
  }

  /**
   * 获取所有已拒绝授权的权限
   * @returns 
   */
  const getDeniedPermissionList = (): UserPermissionList => {
    // 获取用户的权限列表
    let _list = permissionList.value

    // 定义要展示的结果
    let ret: UserPermissionList = {}

    // 遍历所有的权限列表
    permissionNameList.map(item => item.id).forEach((permissionName, index) => {
      // 跳过未进行授权操作和已允许授权的权限
      if (!_list[permissionName] || _list[permissionName].isAllow === true) return false

      ret[permissionName] = {
        ..._list[permissionName],
        showName: permissionNameList[index].name,
      }
    })

    return ret
  }

  /**
   * 检查用户是否已经允许某个权限的授权
   * @param permission 权限标识
   * @returns 
   */
  const checkIsAllowed = (permission: (typeof permissionNameList)[number]['id']): boolean => {
    // 获取用户的权限列表
    let _list = permissionList.value

    if (!permission || permission.trim() == '') return false

    // 如果权限名称列表没有包含该权限，则删除该权限
    if (!permissionNameList.map(item => item.id).includes(permission)) {
      delete _list[permission]

      permissionList.value = _list

      return false
    }

    // 如果用户从未对该权限进行是否授权的操作
    if (!_list.hasOwnProperty(permission)) return false

    return _list[permission].isAllow
  }

  /**
   * 拒绝某个权限的授权
   * @param permission 权限标识
   */
  const deny = (permission: (typeof permissionNameList)[number]['id']) => {
    // 获取用户的权限列表
    let _list = permissionList.value

    if (!permission || permission.trim() == '') return;

    if (!_list[permission]) _list[permission] = {
      isAllow: false,
    }

    _list[permission].isAllow = false

    // 如果权限名称列表没有包含该权限，则删除该权限
    if (!permissionNameList.map(item => item.id).includes(permission)) {
      delete _list[permission]
    }

    permissionList.value = _list
  }

  /**
   * 允许某个权限的授权
   * @param permission 权限标识
   */
  const allow = (permission: (typeof permissionNameList)[number]['id']) => {
    // 获取用户的权限列表
    let _list = permissionList.value

    if (!permission || permission.trim() == '') return;

    if (!_list[permission]) _list[permission] = {
      isAllow: true,
    }

    _list[permission].isAllow = true

    // 如果权限名称列表没有包含该权限，则删除该权限
    if (!permissionNameList.map(item => item.id).includes(permission)) {
      delete _list[permission]
    }

    permissionList.value = _list
  }

  /**
   * 重置所有权限的授权操作
   */
  const resetAll = () => {
    permissionList.value = {}
  }

  return {
    getAllPermissionList,
    getAllowedPermissionList,
    getDeniedPermissionList,
    checkIsAllowed,
    deny,
    allow,
    resetAll,
  }
})