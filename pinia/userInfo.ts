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

  const isLoggedIn = () => {
    if (!userInfo.value) {
      return false
    }

    if (!userInfo.value.hasOwnProperty('user_id')) {
      return false
    }

    if (!userInfo.value.user_id) {
      return false
    }

    if (userInfo.value.user_id.trim().length == 0) {
      return false
    }

    if (isNaN(Number(userInfo.value.user_id.trim()))) {
      return false
    }

    if (Number(userInfo.value.user_id.trim()) == 0) {
      return false
    }

    return true
  }

  const logout = () => {
    removeUserId()
  }

  const login = (user: {
    user_id: string,
    phone: string,
    nick_name?: string,
    avatar?: string,
  }) => {
    if (
      !user.hasOwnProperty('user_id') 
      || user.user_id.trim().length == 0 
      || Number(user.user_id.trim()) == 0 
      || isNaN(Number(user.user_id.trim()))
    ) {
      user.user_id = ''
      if (
        userInfo.value 
        && userInfo.value.user_id 
        && typeof userInfo.value.user_id == 'string' 
        && userInfo.value.user_id.trim().length > 0 
        && !isNaN(Number(userInfo.value.user_id.trim())) 
        && Number(userInfo.value.user_id.trim()) != 0
      ) {
        user.user_id = userInfo.value.user_id
      }
    }

    if (!user.hasOwnProperty('phone') || user.phone.trim().length == 0) {
      user.phone = ''
      if (
        userInfo.value 
        && userInfo.value.phone 
        && typeof userInfo.value.phone == 'string' 
        && userInfo.value.phone.trim().length > 0
      ) {
        user.phone = userInfo.value.phone
      }
    }

    if (!user.hasOwnProperty('nick_name') || typeof user.nick_name != 'string' || user.nick_name.trim().length == 0) {
      user.nick_name = user.phone
      if (userInfo.value && userInfo.value.nick_name && userInfo.value.nick_name.trim().length > 0) {
        user.nick_name = userInfo.value.nick_name
      }
    }

    if (!user.hasOwnProperty('avatar') || typeof user.avatar != 'string' || user.avatar.trim().length == 0) {
      user.avatar = 'https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image47296ddc7ee77db34d9c3a6357d82b70.png'
      if (userInfo.value && userInfo.value.avatar && userInfo.value.avatar.trim().length > 0) {
        user.avatar = userInfo.value.avatar
      }
    }

    setUserInfo(user as UserInfo)
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
    isLoggedIn,
    logout,
    login,
  }

})