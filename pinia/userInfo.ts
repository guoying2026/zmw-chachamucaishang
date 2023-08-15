import { UserInfo } from "types/userInfo"

export const useUserInfoStore = defineStore('userInfoStore', () => {
  const userInfo = useSessionStorage('user-info', {} as UserInfo);

  const getUserInfo = () => {
    return userInfo.value;
  }

  const setUserInfo = (user: UserInfo) => {
    userInfo.value = user
  }

  const getUserId = () => {
    return userInfo.value.user_id;
  }

  const setUserId = (user_id: string) => {
    userInfo.value.user_id = user_id
  }

  const removeUserId = () => {
    delete userInfo.value.user_id
  }

  const getPhone = () => {
    return userInfo.value.phone;
  }

  const setPhone = (phone: string) => {
    userInfo.value.phone = phone
  }

  const getNickName = () => {
    return userInfo.value.nick_name;
  }

  const setNickName = (nick_name: string) => {
    userInfo.value.nick_name = nick_name
  }

  const getAvatar = () => {
    return userInfo.value.avatar;
  }

  const setAvatar = (avatar: string) => {
    userInfo.value.avatar = avatar
  }

  return {
    getUserInfo,
    setUserInfo,
    getUserId,
    setUserId,
    removeUserId,
    getPhone,
    setPhone,
    getNickName,
    setNickName,
    getAvatar,
    setAvatar,
  }

})