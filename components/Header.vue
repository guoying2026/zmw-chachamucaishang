<script setup lang="ts">
import LoginPopup from "~/components/LoginPopup.vue"

// 导入搜索下拉框组件
import SearchTips from '~/components/SearchTips.vue'

import { UserInfo } from "types/userInfo"

// 导入用户信息存储
import { useUserInfoStore } from "~/pinia/userInfo"

const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

// 搜索框输入内容
const searchInputText = ref<string>('')

const isSearchInputFocusing = ref<boolean>(false)

// 搜索输入框对象
const searchTextRef = ref()

const userInfoStore = useUserInfoStore()

/* const userId = userInfoStore.getUserId()

const isLoggedin = ref<boolean>(userInfoStore && typeof userId == 'string' && userId.trim().length > 0)

const userInfo = ref<UserInfo | null>(userInfoStore.getUserInfo())

const userPhone = ref<string>(await encryptPhone(userInfoStore.getPhone())) */

const isShowUserInfoPopup = ref<boolean>(false)

/**
 * “查一下”按钮的点击处理事件
 */
function searchButtonHandle() {
  if (searchInputText.value.trim() === '') {
    router.push('/search');
    return;
  }
  router.push('/search?search=' + searchInputText.value);
}

/**
 * 清楚搜索输入框的输入内容，并且使输入框获取焦点
 */
function clearSearchInputText() {
  searchInputText.value = '';
  searchTextRef.value.focus();
}

function searchInputBlurHandle() {
  searchTextRef.value.blur();
}

function searchInputFocusAndBlurHandle() {
  if (searchTextRef.value) {
    searchTextRef.value.onfocus = () => {
      console.log('input focus');
      isSearchInputFocusing.value = true;
    };
    searchTextRef.value.onblur = () => {
      console.log('input blur');
      isSearchInputFocusing.value = false;
    };
  }
}

const isShowLogin = ref<boolean>(false)

function openLoginPopup() {
  isShowLogin.value = true;
}

function hideLoginPopup() {
  isShowLogin.value = false
}

/**
 * 搜索输入历史记录项的点击处理事件
 */
function searchInputHistoryListItemClickHandle(str: string) {
  if (str.trim() === '') return;
  searchInputText.value = str;
  searchButtonHandle();
}

function encryptPhone(phone: string | number | string[] | null | undefined) {
  if (!phone) {
    return ''
  }
  if (typeof phone === 'object' && phone instanceof Array) {
    phone = phone[0];
  }
  if (typeof phone === 'number') {
    phone = phone.toString();
  }
  phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1********');
  return phone;
}

function logout() {
  userInfoStore.removeUserId()
  isShowUserInfoPopup.value = false
}

onMounted(() => {
  let headerEl = document.querySelector('.header');
  let headerWhiteSpaceEl = document.querySelector('.header_white_space');
  if (headerEl && headerWhiteSpaceEl) {
    headerWhiteSpaceEl.setAttribute('style', 'height: ' + getComputedStyle(headerEl).height + ';');
  }
  searchInputFocusAndBlurHandle();
  window.onresize = () => {
    searchInputFocusAndBlurHandle();
  };
})

nuxtApp.hook('page:finish', () => {
  let headerEl = document.querySelector('.header');
  let headerWhiteSpaceEl = document.querySelector('.header_white_space');
  if (headerEl && headerWhiteSpaceEl) {
    headerWhiteSpaceEl.setAttribute('style', 'height: ' + getComputedStyle(headerEl).height + ';');
  }
  searchInputFocusAndBlurHandle();
  window.onresize = () => {
    searchInputFocusAndBlurHandle();
  };
})
</script>

<template>
  <ClientOnly>
  <div class="fixed inline-flex flex-row justify-center items-center w-full bg-black py-2 z-30 header">
    <!-- 查查木材商图标 -->
    <NuxtLink to="/">
      <img class="block md:hidden h-6" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageee2c089b91ece3372b37b7ea820936fe.png" />
      <img class="hidden md:block h-8" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagef6dd0552bbc692e03c05de8bd0b26610.png" />
    </NuxtLink>
    <!-- 搜索框 -->
    <div class="relative inline-flex md:justify-evenly items-center w-full md:w-auto ml-2 md:p-1 md:ml-10 md:border md:border-solid md:rounded-lg search-box search-input">
      <input class="w-full md:w-80 px-5 py-1 md:px-0 md:py-0 md:pr-6 text-xs md:text-sm md:bg-transparent text-inherit md:text-white rounded-2xl md:rounded search-text" type="text" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" v-model="searchInputText" @keyup.enter="searchButtonHandle" />
      <svg class="absolute md:hidden left-1 inline-block w-4 h-4 search-icon" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
      <svg v-if="searchInputText.length > 0" @click.stop="clearSearchInputText" class="absolute right-1 md:right-16 w-4 h-4 cursor-pointer" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      <button @click.stop="searchButtonHandle" class="hidden md:inline-block text-sm px-2 py-1 rounded search-button">查一下</button>
      <ClientOnly>
        <SearchTips @gotoLogin="openLoginPopup" @gotoSearch="searchInputHistoryListItemClickHandle" v-bind:searchValue="searchInputText" top="top-6 md:top-9" width="w-full md:w-80" />
      </ClientOnly>
    </div>
    <div v-if="userInfoStore.isLoggedIn()" @click.stop="isShowUserInfoPopup = !isShowUserInfoPopup" :class="(isSearchInputFocusing ? 'hidden md:inline-block' : 'inline-block') + ' text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 mx-1 md:ml-10 rounded cursor-pointer'">
      <img class="h-6 md:h-8" :src="userInfoStore.getAvatar()"/>
    </div>
    <ClientOnly v-else>
      <button @click="openLoginPopup" :class="(isSearchInputFocusing ? 'hidden md:inline-block' : 'inline-block') + ' text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 mx-1 md:ml-10 border border-solid rounded goto-login-button'">登录/注册</button>
    </ClientOnly>
    <button @click="searchInputBlurHandle" :class="(isSearchInputFocusing ? 'inline-block md:hidden' : 'hidden') + ' text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 ml-2 md:ml-10 border border-dashed goto-login-button border-transparent'">取消</button>
  </div>
  <!-- 用户登录之后 点击头像弹出的信息框 -->
  <div @click.stop="isShowUserInfoPopup = false" :class="'fixed top-0 left-0 inline-block w-screen ' + (isShowUserInfoPopup ? 'h-screen' : 'h-0') + ' z-20 overflow-hidden transition-all'">
    <!-- 移动端 -->
    <div @click.stop="false" :class="'absolute top-11 inline-flex md:hidden flex-row justify-between items-center w-full ' + (isShowUserInfoPopup ? 'h-14' : 'h-0') + ' text-white text-sm px-2 overflow-hidden transition-all'" style="background-color: rgb(29,29,29);">
      <div>账号:{{ encryptPhone(userInfoStore.getPhone()) }}</div>
      <div @click.stop.prevent="logout" class="inline-flex flex-row items-center">
        <svg class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M10 2.29v2.124c.566.247 1.086.6 1.536 1.05C12.48 6.408 13 7.664 13 9s-.52 2.591-1.464 3.536C10.592 13.48 9.336 14 8 14s-2.591-.52-3.536-1.464C3.52 11.592 3 10.336 3 9s.52-2.591 1.464-3.536c.45-.45.97-.803 1.536-1.05V2.29a7 7 0 1 0 4 0zM7 0h2v8H7z"/></svg>
        <span>退出账号</span>
      </div>
    </div>
    <!-- PC端 -->
    <div @click.stop="false" :class="'absolute top-14 hidden md:inline-flex flex-col w-80 ' + (isShowUserInfoPopup ? ' h-40' : 'h-0') + ' text-balck text-sm bg-white overflow-hidden rounded-lg z-40 transition-all pc-userinfo-popup'">
      <div class="inline-flex flex-row justify-start items-center h-2/3 px-2 bg-gray-500 text-white">
        <img class="w-14 mr-2" :src="userInfoStore.getAvatar()"/>
        <span>{{ encryptPhone(userInfoStore.getPhone()) }}</span>
      </div>
      <div class="inline-flex flex-row justify-between items-center h-1/3 px-2">
        <span style="color: rgb(163,163,163);">账号管理</span>
        <div @click.stop.prevent="logout" class="inline-flex flex-row items-center cursor-pointer">
          <svg class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M10 2.29v2.124c.566.247 1.086.6 1.536 1.05C12.48 6.408 13 7.664 13 9s-.52 2.591-1.464 3.536C10.592 13.48 9.336 14 8 14s-2.591-.52-3.536-1.464C3.52 11.592 3 10.336 3 9s.52-2.591 1.464-3.536c.45-.45.97-.803 1.536-1.05V2.29a7 7 0 1 0 4 0zM7 0h2v8H7z"/></svg>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
  <div class="header_white_space"></div>
  </ClientOnly>
  <!-- 登录弹窗 -->
  <LoginPopup v-if="isShowLogin" @close="hideLoginPopup" />
</template>

<style scoped>
*:focus-visible {
  outline: unset;
}

@media (max-width: 767px) {
  .search-box {
    width: calc(100% - 5.5rem);
  }
}

@media (min-width: 768px) {
  .search-input {
    border-color: RGBA(44, 52, 61, 1);
  }

  .search-input::placeholder {
    color: RGBA(44, 52, 61, 1);
  }
}

.search-button {
  color: #fff;
  background-color: RGBA(255, 131, 78, 1);
}

.goto-login-button {
  color: RGBA(255, 155, 64, 1);
}

.goto-login-button.border-solid {
  border-color: RGBA(255, 155, 64, 1);
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover,
.search-tips-area.expanded {
  max-height: 100vh;
}

.search-text {
  transition: all 0s 150ms;
}

.search-icon {
  color: rgb(153,153,153);
}

*:focus-visible {
  outline: unset;
}

.search-text:focus-visible,
.search-text:has(~ .search-tips-area:hover) {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  transition: all 0s 0ms;
}

.search-text:has(~ .search-tips-area.expanded) {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover,
.search-tips-area.expanded {
  max-height: 100vh;
}

.pc-userinfo-popup {
  right: 3rem;
}

@media (min-width: 1024px) {
  .pc-userinfo-popup {
    right: calc((100vw * 0.25) / 2);
  }
}

@media (min-width: 1440px) {
  .pc-userinfo-popup {
    right: calc((100vw * 0.75) / 3);
  }
}

@media (min-width: 2560px) {
  .pc-userinfo-popup {
    right: calc((100vw * 0.75) / 2.1);
  }
}

</style>