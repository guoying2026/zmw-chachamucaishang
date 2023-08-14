<script setup lang="ts">
import LoginPopup from "~/components/LoginPopup.vue";

// 导入搜索输入历史记录存储
import { useSearchInputHistoryStore } from '~/pinia/searchInputHistory'

// 导入搜索历史记录存储
import { useSearchHistoryStore } from '~/pinia/searchHistory'

const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

// 实例化搜索输入历史记录存储
const searchInputHistoryStore = useSearchInputHistoryStore()

// 实例化搜索历史记录存储
const searchHistoryStore = useSearchHistoryStore()

// 搜索框输入内容
const searchInputText = ref<string>('')

// 是否显示搜索输入历史记录的删除按钮
const isShowSearchInputHistoryListDelete = ref<boolean>(false)

// 是否显示搜索历史记录的删除按钮
const isShowSearchHistoryListDelete = ref<boolean>(false)

const isSearchInputFocusing = ref<boolean>(false)

// 搜索输入框对象
const searchTextRef = ref()

const isAddScrollGenerateSearchInputWordBoxEvent = ref<boolean>(false)

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
 * 使搜索框的“猜你想搜”的区域在滚轮上下滑动时，对应区域能够左右滑动
 */
function scrollGenerateSearchInputWordBox() {
  let box = document.querySelector('.generate-search-input-word-list,.search-input-history-list');
  if (!box) return;
  // 这里要防止一直添加事件，否则横向滚动距离会越滑动越长
  if (isAddScrollGenerateSearchInputWordBoxEvent.value) return;
  box.addEventListener('wheel', (e: Event) => {
    let wheelEvent = e as WheelEvent;
    wheelEvent.preventDefault();
    if (!box) return;
    isAddScrollGenerateSearchInputWordBoxEvent.value = true;
    box.scrollLeft += wheelEvent.deltaX + (wheelEvent.deltaY / document.body.offsetHeight * box.clientWidth / 2);
  });
}

/**
 * 显示搜索输入历史记录的删除按钮
 */
 function showSearchInputHistoryListDelete() {
  isShowSearchInputHistoryListDelete.value = true;
}

/**
 * 隐藏搜索输入历史记录的删除按钮
 */
function hideSearchInputHistoryListDelete() {
  isShowSearchInputHistoryListDelete.value = false;
}

/**
 * 删除所有的搜索输入历史记录
 */
function clearAllSearchInputHistory() {
  searchInputHistoryStore.clearAll();
  hideSearchInputHistoryListDelete();
}

/**
 * 删除指定的搜索输入历史记录
 * @param {string} item 
 */
function clearSearchInputHistoryItem(item: string) {
  searchInputHistoryStore.remove(item);
  if (searchInputHistoryStore.getList().length === 0) {
    hideSearchInputHistoryListDelete();
  }
}

/**
 * 显示搜索历史记录的删除按钮
 */
function showSearchHistoryListDelete() {
  isShowSearchHistoryListDelete.value = true;
}

/**
 * 隐藏搜索历史记录的删除按钮
 */
function hideSearchHistoryListDelete() {
  isShowSearchHistoryListDelete.value = false;
}

/**
 * 清除所有的搜索历史记录
 */
function clearAllSearchHistory() {
  searchHistoryStore.clearAll();
  hideSearchHistoryListDelete();
}

/**
 * 删除指定的搜索历史记录
 * @param {number} id 
 */
function clearSearchHistoryItem(id: number) {
  searchHistoryStore.remove(id);
  if (searchHistoryStore.getList().length === 0) {
    hideSearchHistoryListDelete();
  }
}

/**
 * 搜索输入历史记录项的点击处理事件
 */
function searchInputHistoryListItemClickHandle(str: string) {
  if (str.trim() === '') return;
  searchInputText.value = str;
  searchButtonHandle();
}

function dealSearchTipsAreaExpanded() {
  const searchTipsArea = document.querySelector('.search-tips-area')

  document.querySelector('.search-text')?.addEventListener('click', e => {
    searchTipsArea?.classList.add('expanded')
    e.stopPropagation()
  })

  document.addEventListener('click', function () {
    searchTipsArea?.classList.remove('expanded')
  })
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
  if(window.screen.width < 768) {
    dealSearchTipsAreaExpanded();
  }
  scrollGenerateSearchInputWordBox();
  searchInputFocusAndBlurHandle();
  window.onresize = () => {
    searchInputFocusAndBlurHandle();
  };
})
</script>

<template>
  <div class="fixed inline-flex flex-row justify-center items-center w-full bg-black py-2 z-30 header">
    <!-- 查查木材商图标 -->
    <NuxtLink to="/">
      <img class="block md:hidden h-6" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageee2c089b91ece3372b37b7ea820936fe.png" />
      <img class="hidden md:block h-8" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagef6dd0552bbc692e03c05de8bd0b26610.png" />
    </NuxtLink>
    <!-- 搜索框 -->
    <div class="relative inline-flex md:justify-evenly items-center w-full md:w-auto ml-2 md:p-1 md:ml-10 md:border md:border-solid md:rounded-lg search-box search-input">
      <input class="w-full md:w-80 px-5 py-1 md:px-0 md:py-0 md:pr-6 text-xs md:text-sm md:bg-transparent text-inherit md:text-white rounded-2xl md:rounded search-text" type="text" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" v-model="searchInputText" @focus="scrollGenerateSearchInputWordBox" @change="scrollGenerateSearchInputWordBox" @keyup="scrollGenerateSearchInputWordBox" @keyup.enter="searchButtonHandle" />
      <svg class="absolute md:hidden left-1 inline-block w-4 h-4 search-icon" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
      <svg v-if="searchInputText.length > 0" @click.stop="clearSearchInputText" class="absolute right-1 md:right-16 w-4 h-4 cursor-pointer" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      <button @click.stop="searchButtonHandle" class="hidden md:inline-block text-sm px-2 py-1 rounded search-button">查一下</button>
      <!-- 输入框下方的弹出框 -->
      <div @click.stop="false" class="absolute top-6 md:top-9 left-0 inline-flex w-full md:w-80 max-h-0 overflow-hidden bg-white text-black transition-all search-tips-area">
        <!-- 未登录、未输入任何搜索内容、没有搜索历史记录 -->
        <div v-if="searchInputText.trim() === '' && searchInputHistoryStore.getList().length === 0" class="inline-flex flex-col justify-center items-center w-full h-full px-10 py-4">
          <img class="w-10" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5f4433e629ac9ea8ac48a070caadacad.png" />
          <p class="text-xs whitespace-nowrap mt-1 goto-login-and-get-detail-search-result-tips">立即登录获取更精准的关键词匹配结果</p>
          <button @click.stop="openLoginPopup" class="text-sm px-3 py-1 text-white mt-4 goto-login-button">登录试试</button>
        </div>
        <!-- 未输入任何搜索内容、有搜索历史记录 -->
        <div v-if="searchInputText.trim() === '' && searchInputHistoryStore.getList().length > 0" class="inline-flex flex-col w-full h-full px-2 py-1">
          <!-- 输入历史记录 -->
          <div class="inline-flex flex-row items-center justify-between w-full mt-2 search-input-history-box">
            <ul class="inline-flex flex-row text-xs list-none pb-1 overflow-x-scroll search-input-history-list">
              <li @click.stop="isShowSearchInputHistoryListDelete?'':searchInputHistoryListItemClickHandle(item)" class="relative inline-flex justify-center items-center px-4 py-0.5 ml-4 first-of-type:ml-0 whitespace-nowrap search-input-history-list-item" v-for="item in searchInputHistoryStore.getList()">
                <span>{{ item }}</span>
                <button v-if="isShowSearchInputHistoryListDelete" @click.stop="clearSearchInputHistoryItem(item)" class="absolute top-0 right-0 w-3 h-3 p-0.5 clear-search-input-history-item-button">
                  <svg class="w-2 h-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"/></svg>
                </button>
              </li>
            </ul>
            <template v-if="isShowSearchInputHistoryListDelete">
              <div class="inline-flex mb-2">
                <button @click.stop="clearAllSearchInputHistory" class="text-sm whitespace-nowrap pl-1 clear-all-search-input-history-button">删除全部</button>
                <button @click.stop="hideSearchInputHistoryListDelete" class="text-sm whitespace-nowrap pl-1 finish-clear-search-input-history-button">完成</button>
              </div>
            </template>
            <template v-else>
              <button @click.stop="showSearchInputHistoryListDelete" class="inline-flex flex-row justify-center items-center w-4 h-4 pl-1 mb-2">
                <svg class="w-4 clear-search-input-history-button-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"/></svg>
              </button>
            </template>
          </div>
          <!-- 搜索历史记录 -->
          <div v-if="searchHistoryStore.getList().length > 0" class="inline-flex flex-col p-2 mt-2 search-history-box">
            <h1 class="text-sm pb-2 search-history-box-title">历史记录</h1>
            <ul class="inline-flex flex-col list-none overflow-y-scroll search-history-list">
              <li class="relative inline-flex flex-row items-center mt-4 first-of-type:mt-0" v-for="item in searchHistoryStore.getList()">
                <img class="w-8 h-8 object-cover search-history-list-item-logo" :src="item.logo" />
                <span class="text-sm pl-1 search-history-list-item-name">{{ item.name }}</span>
                <button v-if="isShowSearchHistoryListDelete" @click.stop="clearSearchHistoryItem(item.id)" class="absolute right-0 w-3 h-3 p-0.5 clear-search-history-item-button">
                  <svg class="w-2 h-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"/></svg>
                </button>
              </li>
            </ul>
          </div>
          <template v-if="searchHistoryStore.getList().length > 0">
            <template v-if="isShowSearchHistoryListDelete">
              <div class="inline-flex flex-row justify-start items-center">
                <button @click.stop="clearAllSearchHistory" class="text-sm whitespace-nowrap pl-0 clear-all-search-history-button">删除全部</button>
                <button @click.stop="hideSearchHistoryListDelete" class="text-sm whitespace-nowrap pl-1 finish-clear-search-history-button">完成</button>
              </div>
            </template>
            <template v-else>
              <button @click.stop="showSearchHistoryListDelete" class="inline-flex flex-row justify-center items-center w-20">
                <svg class="w-4 clear-search-history-button-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"/></svg>
                <span class="text-sm clear-search-history-button-text">删除历史</span>
              </button>
            </template>
          </template>
        </div>
        <!-- 已输入任何搜索内容 -->
        <div v-if="searchInputText.trim() !== ''" class="inline-flex flex-col w-full h-full px-2 py-1 pb-2">
          <!-- 猜你想搜 -->
          <div class="inline-flex flex-row items-center justify-between w-full mt-1 search-input-history-box">
            <h1 class="text-xs pr-2 mb-2 whitespace-nowrap guess-what-you-want-to-search-tips">猜你想搜</h1>
            <ul class="inline-flex flex-row text-xs list-none pb-1 overflow-x-scroll search-input-history-list generate-search-input-word-list">
              <li @click.stop="searchInputHistoryListItemClickHandle('建筑木材')" class="relative inline-flex justify-center items-center px-4 py-0.5 ml-4 first-of-type:ml-0 whitespace-nowrap search-input-history-list-item" v-for="n in 5">建筑木材</li>
            </ul>
            <button class="inline-flex flex-row justify-center items-center w-4 pl-1 mb-2">
              <svg class="w-4 regenerate-search-input-word-button-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23q-2.8 0-5.15-1.275T3 18.325V21H1v-6h6v2H4.525q1.2 1.8 3.163 2.9T12 21q1.875 0 3.513-.713t2.85-1.924q1.212-1.213 1.925-2.85T21 12h2q0 2.275-.863 4.275t-2.362 3.5q-1.5 1.5-3.5 2.363T12 23ZM1 12q0-2.275.863-4.275t2.362-3.5q1.5-1.5 3.5-2.362T12 1q2.8 0 5.15 1.275t3.85 3.4V3h2v6h-6V7h2.475q-1.2-1.8-3.163-2.9T12 3q-1.875 0-3.513.713t-2.85 1.924Q4.426 6.85 3.714 8.488T3 12H1Z"/></svg>
            </button>
          </div>
          <!-- 相关企业 -->
          <div class="inline-flex flex-col p-2 related-enterprises-box">
            <h1 class="text-sm pb-2 related-enterprises-box-title">相关企业</h1>
            <ul class="inline-flex flex-col list-none overflow-y-scroll related-enterprises-list">
              <li class="relative inline-flex flex-row items-center mt-4 first-of-type:mt-0" v-for="n in 5">
                <img class="w-8 h-8 object-cover related-enterprises-list-item-logo" src="" alt="" />
                <span class="text-sm pl-1 related-enterprises-list-item-name">杭州木材有限公司</span>
              </li>
            </ul>
          </div>
          <!-- 登录提示 -->
          <div class="text-xs text-center mt-1">
            <button @click.stop="openLoginPopup" class="goto-login-button1">立即登录</button>
            <span>获取更精准的关键词匹配结果</span>
          </div>
        </div>
      </div>
    </div>
    <button @click="openLoginPopup" :class="(isSearchInputFocusing ? 'hidden md:inline-block' : 'inline-block') + ' text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 mx-1 md:ml-10 border border-solid rounded goto-login-button'">登录/注册</button>
    <button @click="searchInputBlurHandle" :class="(isSearchInputFocusing ? 'inline-block md:hidden' : 'hidden') + ' text-sm md:text-base font-medium whitespace-nowrap px-1 py-0.5 ml-2 md:ml-10 border border-dashed goto-login-button border-transparent'">取消</button>
  </div>
  <div class="header_white_space"></div>
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

.search-clear-icon{
  color: RGBA(78, 87, 97, 1);
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

.search-history-box {
  max-height: 25vh;
}

.related-enterprises-box {
  max-height: 30vh;
}

.search-history-box,
.related-enterprises-box {
  background: rgb(246,246,254);
}

.clear-search-input-history-button-icon,
.clear-search-history-button-icon {
  color: rgb(160,160,160);
}

.clear-all-search-input-history-button,
.clear-all-search-history-button {
  color: rgb(255,43,60);
}

.finish-clear-search-input-history-button,
.finish-clear-search-history-button {
  color: rgb(255,150,26);
}

.search-history-list {
  max-height: 25vh;
}

.related-enterprises-list {
  max-height: 30vh;
}

::-webkit-scrollbar {
  height: .5rem;
  width: .25rem;
}

::-webkit-scrollbar:horizontal {
  height: .25rem;
  width: .5rem;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  --tw-border-opacity: 1;
  background-color: rgba(0,0,0,0.2);
  border-radius: 9999px;
  border-width: 1px;
}

::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(0,0,0,0.4);
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(0,0,0,.9);
}

.search-tips-area .search-input-history-box ::-webkit-scrollbar-thumb,
.search-tips-area .search-history-box ::-webkit-scrollbar-thumb,
.search-tips-area .related-enterprises-box ::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.search-tips-area .search-input-history-box:hover ::-webkit-scrollbar-thumb,
.search-tips-area .search-history-box:hover ::-webkit-scrollbar-thumb,
.search-tips-area .related-enterprises-box:hover ::-webkit-scrollbar-thumb {
  visibility: visible;
}

.clear-search-input-history-item-button {
  background: rgb(215,215,215);
  border-radius: 2px;
}

.clear-search-input-history-item-button svg {
  color: rgb(89,89,89);
}

.search-history-box-title,
.related-enterprises-box-title,
.search-input-history-list-item,
.clear-search-history-button-text,
.guess-what-you-want-to-search-tips,
.regenerate-search-input-word-button-icon {
  color: rgb(153,153,153);
}

.search-input-history-list-item {
  background: rgb(238,238,238);
  cursor: pointer;
}

.search-history-list-item-logo,
.related-enterprises-list-item-logo {
  border-radius: 5px;
}

.search-history-list-item-name,
.related-enterprises-list-item-name {
  color: rgb(51,51,51);
}

.clear-search-history-item-button {
  top: 0.625rem;
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

.search-text:hover ~ .clear-icon {
  z-index: 999;
}

.search-text:focus-visible ~ .clear-icon,
.search-text:hover ~ .clear-icon,
.clear-icon:hover {
  display: inline-block;
}

.clear-icon {
  right: calc(100vw / 750 * 138);
}

@media (min-width: 768px) {
  .clear-icon {
    left: 74%;
    right: unset;
  }
}

.search-tips-area {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover,
.search-tips-area.expanded {
  max-height: 100vh;
}

.goto-login-button1 {
  color: rgb(143,75,29);
}

.white_space {
  display: inline-block;
  width: 100vw;
  height: 2.14rem;
}
</style>