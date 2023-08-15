<script setup lang="ts">
import { userLogin, useUser } from '~/composables/userAuth'

const emit = defineEmits(['close'])

const phoneNumberInputRef = ref()

const regCodeInputRef = ref()

const loginPhoneNumber = ref<string>('')

const loginRegCode = ref<string>('')

const isGettingRegCode = ref<boolean>(false)

const getRegCodeRemainSeconds = ref<number>(0)

const isShowPhoneFieldTips = ref<boolean>(false)

const phoneFieldTipsContent = ref<string>('请输入正确的手机号')

const isNeedCheckPhoneField = ref<boolean>(false)

const isShowRegCodeFieldTips = ref<boolean>(false)

const regCodeFieldTipsContent = ref<string>('请输入验证码')

const isNeedCheckRegCodeField = ref<boolean>(false)

function phoneNumberInputInputHandle(e: Event) {
  const event = e as InputEvent
  if (!isNeedCheckPhoneField.value) return;
  isShowPhoneFieldTips.value = loginPhoneNumber.value.trim().length == 0;
}

function regCodeInputInputHandle(e: Event) {
  const event = e as InputEvent
  if (!isNeedCheckRegCodeField.value) return;
  isShowRegCodeFieldTips.value = loginRegCode.value.trim().length == 0;
}

function sendRegCode() {
  // 如果没有填写手机号码，则自动聚焦到手机号码栏，并弹出提示
  if (!loginPhoneNumber.value || loginPhoneNumber.value.trim() === '') {
    phoneNumberInputRef.value.focus();
    isNeedCheckPhoneField.value = true;
    isShowPhoneFieldTips.value = true;
    return;
  }
  // 如果是已经发送验证码，并且重新发送倒计时未结束，则自动聚焦到验证码栏
  if (isGettingRegCode.value) {
    regCodeInputRef.value.focus();
    return;
  }
  // 执行发送api请求
  useFetch('/api/sendSmsCode', {
    method: 'post',
    body: {
      phone: loginPhoneNumber.value,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then(res => new Promise(resolve => resolve(res.data.value)))
  .then(res => {
    let res1 = res as {code: number, message: string, result?: any}
    if (res1.code == 500) {
      isNeedCheckPhoneField.value = true;
      isShowPhoneFieldTips.value = true;
      return;
    }
    // api请求成功运行,执行验证码重新发送倒计时
    isGettingRegCode.value = true;
    getRegCodeRemainSeconds.value = process.env.NODE_ENV == 'production' ? 60 : 10;
    let timerHandle = () => {
      getRegCodeRemainSeconds.value = getRegCodeRemainSeconds.value - 1;
      if (getRegCodeRemainSeconds.value >= 0) {
        setTimeout(timerHandle, 1000);
      } else {
        isGettingRegCode.value = false;
      }
    };
    setTimeout(timerHandle, 1000);
  })
}

function dealLogin() {
  // 如果没有填写手机号码，则自动聚焦到手机号码栏，并弹出提示
  if (!loginPhoneNumber.value || loginPhoneNumber.value.trim() === '') {
    phoneNumberInputRef.value.focus();
    isNeedCheckPhoneField.value = true;
    isShowPhoneFieldTips.value = true;
    return;
  }
  // 如果没有填写验证码，则自动聚焦到验证码栏，并弹出提示
  if (!loginRegCode.value) {
    regCodeInputRef.value.focus();
    isNeedCheckRegCodeField.value = true;
    isShowRegCodeFieldTips.value = true;
    return;
  }
  // 执行发送登录api请求
  useFetch('/api/userLogin', {
    method: 'post',
    body: {
      phone: loginPhoneNumber.value,
      code: loginRegCode.value,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then(res => new Promise(resolve => resolve(res.data.value)))
  .then(async res => {
    let res1 = res as {code: number, message: string, result?: any}
    if (res1.code == 500 || !res1.result) {
      isNeedCheckRegCodeField.value = true;
      isShowRegCodeFieldTips.value = true;
      return;
    }
    // api成功运行,存储用户信息
    let oldUser = await useUser()
    let ret = await userLogin({
      user_id: res1.result.user_id,
      phone: loginPhoneNumber.value,
      nick_name: oldUser?.nick_name ? oldUser?.nick_name : loginPhoneNumber.value,
      avatar: oldUser?.avatar ? oldUser?.avatar : 'https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image47296ddc7ee77db34d9c3a6357d82b70.png',
    })
    if (!ret) {
      isNeedCheckPhoneField.value = true
      isNeedCheckRegCodeField.value = true
      isShowPhoneFieldTips.value = true
      isShowRegCodeFieldTips.value = true
      return;
    }
    emit('close')
  })
}
</script>
<template>
  <!-- 手机号登录弹窗 -->
  <div @click.stop="$emit('close')" class="fixed top-0 left-0 w-screen h-screen login-pop-up-cover">
    <div @click.stop="false" class="fixed px-5 py-4 login-pop-up">
      <div class="relative text-center mb-2">
        <span class="text-xs md:text-sm font-normal tracking-wide login-pop-up-header-title">助力检索木材交易隐患，降低木材交易风险</span>
        <button @click.stop="$emit('close')" class="absolute -right-2 top-1 w-5 h-5 login-pop-up-header-close-button">
          <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
        </button>
      </div>
      <div class="inline-flex flex-col items-center w-full h-auto bg-white text-black px-2 py-4 overflow-hidden login-pop-up-main">
        <h1 class="text-xl font-extrabold tracking-widest">手机号登录</h1>
        <div class="relative inline-flex flex-col w-10/12">
          <input class="w-full h-10 px-2 py-1 mt-6 text-sm md:text-base login-pop-up-main-input-item" placeholder="请输入您的手机号" ref="phoneNumberInputRef" v-model="loginPhoneNumber" @input="phoneNumberInputInputHandle" />
          <span v-if="isShowPhoneFieldTips" class="absolute -bottom-5 left-3 text-xs login-poop-up-main-input-need-field-tips">{{ phoneFieldTipsContent }}</span>
        </div>
        <div class="relative inline-flex flex-col w-10/12">
          <div class="w-full h-10 mt-6 text-sm md:text-base login-pop-up-main-input-item">
            <input class="w-6/12 md:w-7/12 px-2 py-1" placeholder="请输入验证码" ref="regCodeInputRef" v-model="loginRegCode" @input="regCodeInputInputHandle" />
            <button @click.stop="sendRegCode" :class="'w-6/12 md:w-5/12 h-full login-pop-up-main-input-item-button'+(isGettingRegCode ? '-wait cursor-not-allowed' : '')"><template v-if="isGettingRegCode">重新发送({{ getRegCodeRemainSeconds }}s)</template><template v-else>获取验证码</template></button>
          </div>
          <span v-if="isShowRegCodeFieldTips" class="absolute -bottom-5 left-3 text-xs login-poop-up-main-input-need-field-tips">{{ regCodeFieldTipsContent }}</span>
        </div>
        <button @click.stop="dealLogin" class="w-10/12 text-white text-base md:text-xl font-normal py-2 mt-8 login-pop-up-main-login-button">注册/登录</button>
        <span class="w-10/12 text-xs md:text-sm text-center font-normal tracking-wide md:tracking-wider mt-4 login-pop-up-main-auto-regist-tips">未注册手机验证后自动注册并登录</span>
        <hr class="w-screen m-0 mt-4 bg-transparent border border-solid border-inherit" />
        <div class="w-10/12 text-xs text-center tracking-wide mt-4 whitespace-nowrap login-pop-up-main-agree-agreement-tips">登录即同意<button>《用户协议》</button>和<button>《隐私政策》</button></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
*:focus-visible {
  outline: unset;
}

.login-pop-up-cover {
  background: rgba(0,0,0,0.6);
  z-index: 9999;
}

.login-pop-up {
  left: calc((100vw - 310px) / 2);
  top: calc((100vh - 416.667px) / 2);
  width: 310px;
  height: 416.667px;
  background: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagec18bc389a1f73824d4b5708fda749ffd.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.login-pop-up-header-title {
  color: #C23D04;
}

.login-pop-up-header-close-button svg {
  left: 70%;
  cursor: pointer;
}

.login-pop-up,
.login-pop-up-main {
  border-radius: 16px;
}

.login-pop-up-main-input-item {
  border: 2px solid rgba(192,204,218,0.44);
  border-radius: 8px;
}

.login-poop-up-main-input-need-field-tips {
  color: #FF834E;
}

.login-pop-up-main-input-item-button,
.login-pop-up-main-input-item-button-wait {
  color: #FF834E;
  background: #F9FAFC;
  border-left: 2px solid rgba(192,204,218,0.44);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.login-pop-up-main-input-item-button-wait {
  color: #999;
}

.login-pop-up-main-login-button {
  background: linear-gradient(90deg, #F09336, #EC602D);
  border-radius: 33px;
}

.login-pop-up-main-auto-regist-tips {
  color: #999;
}

.login-pop-up-main-agree-agreement-tips {
  color: #999;
}

.login-pop-up-main-agree-agreement-tips button {
  color: #FF834E;
}

@media (min-width: 768px) {
  .login-pop-up {
    left: calc((100vw - 439px) / 2);
    top: calc((100vh - 416.667px) / 2);
    width: 439px;
    height: 416.667px;
  }

  .login-pop-up-main-input-item-button {
    color: #999999;
  }

  .login-pop-up-main-login-button {
    background: #FF834E;
  }

  .login-pop-up-main-auto-regist-tips {
    color: #333;
  }
}
</style>