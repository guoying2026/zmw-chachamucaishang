<script setup lang="ts">
import LoginPopup from "~/components/LoginPopup.vue"

// 导入搜索框组件
import HeaderSearch from '~/components/HeaderSearch.vue'

// 导入用户信息存储
import { useUserInfoStore } from "~/pinia/userInfo"
import { useSearchResultStore } from "~/pinia/searchResultStore"
import { useRankListStore } from "~/pinia/rankListStore"

const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

// 搜索框输入内容
const searchInputText = ref<string>('')

if (route.query.hasOwnProperty('search') && typeof route.query.search == 'string' && route.query.search.trim().length > 0) {
  searchInputText.value = route.query.search.trim()
}

const isSearchInputFocusing = ref<boolean>(false)

// 搜索框对象
const pcHeaderSearch = ref()

const userInfoStore = useUserInfoStore()

const isShowUserInfoPopup = ref<boolean>(false)

function searchBoxClickHandle() {
  router.push('/search');
}

/**
 * “查一下”按钮的点击处理事件
 */
function searchButtonHandle() {
  useSearchResultStore().clearAll()
  useRankListStore().clearAll()
  pcHeaderSearch.value.blur()
  if (searchInputText.value.trim() === '') searchInputText.value = '木材'
  if (route.path == '/searchResult' && route.query.search == searchInputText.value) {
    refreshNuxtData('searchResultList')
    return;
  }
  if (route.path == '/searchResult' && route.query.search == searchInputText.value) {
    refreshNuxtData('searchResultList')
    return;
  }
  router.push({
    path: '/searchResult',
    query: {
      search: searchInputText.value,
    },
  })
}

/**
 * 清楚搜索输入框的输入内容，并且使输入框获取焦点
 */
function clearSearchInputText() {
  searchInputText.value = '';
}

function searchValueChangeHandle(val: string) {
  if (searchInputText.value == val) return;
  searchInputText.value = val
}

function searchInputBlurHandle() {
  pcHeaderSearch.value.blur()
}

function searchInputFocusAndBlurHandle(isFocus: boolean) {
  isSearchInputFocusing.value = isFocus
}

const loginPopupRef = ref()

function openLoginPopup() {
  loginPopupRef.value.open()
}

/**
 * 搜索输入历史记录项的点击处理事件
 */
function searchInputHistoryListItemClickHandle(str: string) {
  if (str.trim() === '') return;
  searchInputText.value = str;
  searchButtonHandle();
}

function searchHistoryListItemClickHandle(id: number | string) {
  router.push('/detail?id=' + id)
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
  userInfoStore.logout()
  isShowUserInfoPopup.value = false
}

function changeHeaderWhiteSpaceStyleHandle() {
  let headerEl = document.querySelector('.header');
  let headerWhiteSpaceEl = document.querySelector('.header_white_space');
  if (headerEl && headerWhiteSpaceEl) {
    headerWhiteSpaceEl.setAttribute('style', 'height: ' + getComputedStyle(headerEl).height + ';');
  }
}

function searchTipsAreaHoverHandle() {
  let searchTipsArea = document.querySelectorAll('.search-tips-area')
  let searchText = document.querySelectorAll('.search-text')
  let searchBox = document.querySelectorAll('.search-box')
  if (searchTipsArea && searchTipsArea.length > 0) {
    searchTipsArea.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (searchText && searchText.length > 0) searchText.forEach(item1 => {
          item1.classList.add('hover')
        })
        if (searchBox) searchBox.forEach(item1 => {
          item1.classList.add('hover')
        })
      })
    })
    searchTipsArea.forEach(item => {
      item.addEventListener('mouseleave', () => {
        if (searchText && searchText.length > 0) searchText.forEach(item1 => {
          item1.classList.remove('hover')
        })
      })
    })
  }
  if (searchText && searchText.length > 0) {
    searchText.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (item != document.activeElement) searchBox.forEach(item1 => {
          item1.classList.remove('hover')
        })
      })
    })
    searchText.forEach(item => {
      item.addEventListener('focus', () => {
        if (searchBox && searchBox.length > 0) searchBox.forEach(item1 => {
          item1.classList.add('hover')
        })
      })
    })
  }
  if (searchBox && searchBox.length > 0) {
    searchBox.forEach(item => {
      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover')
      })
    })
  }
}

onMounted(() => {
  changeHeaderWhiteSpaceStyleHandle();
  searchTipsAreaHoverHandle();
  window.addEventListener('resize', () => {
    changeHeaderWhiteSpaceStyleHandle();
  });
})

nuxtApp.hook('page:finish', () => {
  changeHeaderWhiteSpaceStyleHandle();
  searchTipsAreaHoverHandle();
  window.addEventListener('resize', () => {
    changeHeaderWhiteSpaceStyleHandle();
  });
})
</script>

<template>
  <ClientOnly>
  <div class="fixed inline-flex flex-row justify-start md:justify-center items-center w-full h-14 xl:h-20 bg-black pb-2 md:pt-1 md:pb-1 z-30 header">
    <div class="inline-flex flex-row justify-start md:justify-between items-center w-full h-14 xl:h-20 bg-black z-30">
      <!-- 查查木材商图标 -->
      <NuxtLink to="/" class="">
        <img class="block md:hidden h-6 object-contain header-logo" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageee2c089b91ece3372b37b7ea820936fe.png" style="min-width: 1.5rem;min-height: 1.5rem;" />
        <img class="hidden md:block h-8 xl:h-14 object-contain header-logo" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagef6dd0552bbc692e03c05de8bd0b26610.png" />
      </NuxtLink>
      <!-- 搜索框 -->
      <div class="relative inline-flex md:hidden md:justify-evenly items-center w-full xl:h-14 md:w-auto ml-2 md:p-1 md:ml-10 md:border md:border-solid md:rounded-lg transition-all search-box search-input">
        <HeaderSearch v-bind:searchValue="searchInputText" @gotoSearchPage="searchBoxClickHandle" @gotoLogin="openLoginPopup" @searchInputHistoryListItemClickHandle="searchInputHistoryListItemClickHandle" @searchHistoryListItemClickHandle="searchHistoryListItemClickHandle" @clearSearchValue="clearSearchInputText" @searchValueChange="searchValueChangeHandle" @searchInputFocusChange="searchInputFocusAndBlurHandle" />
      </div>
      <div class="relative hidden md:inline-flex md:justify-evenly items-center w-full xl:h-14 md:w-auto ml-2 md:p-1 md:ml-10 md:border md:border-solid md:rounded-lg transition-all search-box search-input">
        <HeaderSearch ref="pcHeaderSearch" v-bind:searchValue="searchInputText" @gotoSearch="searchButtonHandle" @gotoLogin="openLoginPopup" @searchInputHistoryListItemClickHandle="searchInputHistoryListItemClickHandle" @searchHistoryListItemClickHandle="searchHistoryListItemClickHandle" @clearSearchValue="clearSearchInputText" @searchValueChange="searchValueChangeHandle" @searchInputFocusChange="searchInputFocusAndBlurHandle" />
      </div>
      <div v-if="userInfoStore.isLoggedIn()" @click.stop="isShowUserInfoPopup = !isShowUserInfoPopup" :class="'' + (isSearchInputFocusing ? 'hidden md:inline-block' : 'inline-block') + ' w-9 md:w-auto xl:w-16 text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 mx-1 md:ml-6 md:mr-5 lg:ml-10 lg:mr-1 xl:ml-4 rounded cursor-pointer'">
        <img class="h-6 md:h-8 xl:h-14 object-contain user-header" :src="userInfoStore.getAvatar()"/>
      </div>
      <ClientOnly v-else>
        <button @click="openLoginPopup" :class="'' + (isSearchInputFocusing ? 'hidden md:inline-block' : 'inline-block') + ' text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 mx-1 md:ml-6 md:mr-5 lg:ml-10 lg:mr-1 my-1 border border-solid rounded transition-all goto-login-button'">登录/注册</button>
      </ClientOnly>
      <button @click="searchInputBlurHandle" :class="'' + (isSearchInputFocusing ? 'inline-block md:hidden' : 'hidden') + ' h-8 text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 ml-2 md:ml-6 md:mr-5 lg:ml-10 lg:mr-1 border border-dashed goto-login-button border-transparent transition-all'">取消</button>
    </div>
  </div>
  <!-- 用户登录之后 点击头像弹出的信息框 -->
  <div @click.stop="isShowUserInfoPopup = false" :class="'fixed top-0 left-0 inline-block w-screen ' + (isShowUserInfoPopup ? 'h-screen' : 'h-0') + ' z-30 overflow-hidden transition-all'">
    <!-- 移动端 -->
    <div @click.stop="false" :class="'absolute top-14 inline-flex md:hidden flex-row justify-between items-center w-full ' + (isShowUserInfoPopup ? 'h-14' : 'h-0') + ' text-white text-sm px-2 overflow-hidden transition-all select-none'" style="background-color: rgb(29,29,29);">
      <div>账号:{{ encryptPhone(userInfoStore.getPhone()) }}</div>
      <div @click.stop.prevent="logout" class="inline-flex flex-row items-center">
        <svg class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M10 2.29v2.124c.566.247 1.086.6 1.536 1.05C12.48 6.408 13 7.664 13 9s-.52 2.591-1.464 3.536C10.592 13.48 9.336 14 8 14s-2.591-.52-3.536-1.464C3.52 11.592 3 10.336 3 9s.52-2.591 1.464-3.536c.45-.45.97-.803 1.536-1.05V2.29a7 7 0 1 0 4 0zM7 0h2v8H7z"/></svg>
        <span>退出账号</span>
      </div>
    </div>
    <!-- PC端 -->
    <div @click.stop="false" :class="'absolute top-14 xl:top-28 hidden md:inline-flex flex-col w-80 ' + (isShowUserInfoPopup ? ' h-40' : 'h-0') + ' text-balck text-sm bg-white overflow-hidden rounded-lg z-40 transition-all select-none pc-userinfo-popup'">
      <div class="relative inline-flex flex-row justify-start items-center h-2/3 px-2 bg-contain bg-no-repeat bg-left-top text-white" style="background-image: url('https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image89118683d5ee913bc2614edd9f196d26.png');">
        <img class="relative bottom-1.5 w-14 mr-2" :src="userInfoStore.getAvatar()"/>
        <span class="relative bottom-1.5">{{ encryptPhone(userInfoStore.getPhone()) }}</span>
      </div>
      <div class="relative bottom-1 inline-flex flex-row justify-between items-center h-1/3 px-2">
        <span class="cursor-default" style="color: rgb(163,163,163);">账号管理</span>
        <div @click.stop.prevent="logout" class="inline-flex flex-row items-center cursor-pointer">
          <svg class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M10 2.29v2.124c.566.247 1.086.6 1.536 1.05C12.48 6.408 13 7.664 13 9s-.52 2.591-1.464 3.536C10.592 13.48 9.336 14 8 14s-2.591-.52-3.536-1.464C3.52 11.592 3 10.336 3 9s.52-2.591 1.464-3.536c.45-.45.97-.803 1.536-1.05V2.29a7 7 0 1 0 4 0zM7 0h2v8H7z"/></svg>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
  <div class="h-14 xl:h-20 header_white_space"></div>
  </ClientOnly>
  <!-- 登录弹窗 -->
  <LoginPopup ref="loginPopupRef" />
</template>

<style scoped>
*:focus-visible {
  outline: unset;
}

.header .search-text:disabled {
  background-color: field;
}

@media (min-width: 768px) {
  .header > div {
    width: 100%;
  }
  .header .search-box {
    width: 100%;
  }
  .header .search-box.hover {
    border-bottom-left-radius: 0px;
  }
  .header .search-text {
    width: calc(100% - 4rem);
  }
}

@media (min-width: 1024px) {
  .header,
  .header_white_space {
    height: calc(100vw / 1920 * 112);
  }
  .header > div {
    width: calc(100vw / 1920 * 1084);
    height: calc(100vw / 1920 * 112);
  }
  .header .header-logo {
    width: calc(100vw / 1920 * 246);
    height: calc(100vw / 1920 * 48);
  }
  .header .search-box {
    width: calc(100vw / 1920 * 599);
    height: calc(100vw / 1920 * 50);
  }
  .header .search-text {
    width: calc(100% - 4rem);
    font-size: max(12px, calc(100vw / 1920 * 20));
    line-height: calc(100vw / 1920 * 20);
  }
  .header .search-button {
    height: calc(100vw / 1920 * 42);
    font-size: max(12px, calc(100vw / 1920 * 20));
    line-height: calc(100vw / 1920 * 20);
    padding-top: 0;
    padding-bottom: 0;
  }
  .header .user-header {
    width: calc(100vw / 1920 * 52);
    height: calc(100vw / 1920 * 52);
  }

  .goto-login-button {
    font-size: max(12px, calc(100vw / 1920 * 20));
    line-height: calc(100vw / 1920 * 20);
    padding: calc(100vw / 1920 * 10);
  }
}

@media (max-width: 767px) {
  .search-box {
    width: calc(100% - 5.5rem);
  }
}

@media (min-width: 768px) {
  .search-input {
    border-color: rgba(87, 105, 126, 0.56);
  }

  .search-input:hover {
    border-color: #5D5241;
  }

  .search-input::placeholder {
    color: rgba(44, 52, 61, 1);
  }
}

.search-button {
  color: #fff;
  background-color: rgba(255, 131, 78, 1);
}

:where(.search-button):hover {
  background-color: #a64319;
}

.goto-login-button {
  color: rgba(255, 155, 64, 1);
}

.goto-login-button:hover {
  color: #ffb470;
}

.goto-login-button.border-solid {
  border-color: rgba(255, 155, 64, 1);
}

.goto-login-button.border-solid:hover {
  border-color: #ffb470;
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover,
.search-tips-area.expanded {
  max-height: 100vh;
}

.search-text {
  transition: all 0s 150ms;
}

.search-text::-webkit-search-cancel-button {
  display: none;
}

.search-icon,
.clear-icon {
  color: rgb(153,153,153);
}

:where(.search-icon,
.clear-icon):hover {
  color: #cccccc;
}

*:focus-visible {
  outline: unset;
}

.search-text:focus-visible,
.search-text.hover {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  transition: all 0s 0ms;
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover,
.search-tips-area.expanded {
  max-height: 100vh;
}

.pc-userinfo-popup {
  right: 0;
}

@media (min-width: 1024px) {
  .pc-userinfo-popup {
    right: calc(100vw / 8 * 1);
    top: calc(100vw / 1920 * 112);
  }
}

</style>