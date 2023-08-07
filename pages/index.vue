<script setup lang="ts">
// 导入登录弹窗组件
import LoginPopup from '~/components/LoginPopup.vue'

// 导入搜索输入历史记录存储
import { useSearchInputHistoryStore } from '~/pinia/searchInputHistory'

// 导入搜索历史记录存储
import { useSearchHistoryStore } from '~/pinia/searchHistory'

const route = useRoute()

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

// 搜索输入框对象
const searchTextRef = ref()

// 是否显示登录弹窗
const isShowLogin = ref<boolean>(false)

const isAddScrollGenerateSearchInputWordBoxEvent = ref<boolean>(false)

/**
 * 使pc端的界面能够在屏幕上垂直居中
 */
function makeViewVerticalCenter() {
  // 如果为pc端，则计算页面内容高度和屏幕高度，使页面内容垂直居中
  if (window.screen.width < 768) return;
  let screenHeight = window.screen.height;
  let leng = document.querySelector('.main')?.children.length;
  let elTotalHeight = 0;
  if (!leng || typeof leng !== 'number' || leng === 0) return;
  let i = -1;
  while (++i < leng) {
    let computedStyle = window.getComputedStyle(document.querySelector('.main')?.children[i]??new Element());
    let elHeight = document.querySelector('.main')?.children[i].clientHeight??0;
    if (computedStyle) {
      if (i > 0) elTotalHeight += Number(computedStyle['marginTop'].replaceAll('px', ''));
      if (i + 1 !== leng) elTotalHeight += Number(computedStyle['marginBottom'].replaceAll('px', ''));
    }
    elTotalHeight += elHeight;
  }
  if (elTotalHeight > screenHeight) return;
  document.querySelector('.top-title')?.setAttribute('style', 'margin-top: ' + ((screenHeight - elTotalHeight) / 2) + 'px;');
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
 * “查一下”按钮的点击处理事件
 */
function searchButtonHandle() {
  if (searchInputText.value.trim() === '') return;
  searchInputHistoryStore.add(searchInputText.value.trim());
  gotoSearch();
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
 * 清除搜索输入框的输入内容，并且使输入框获取焦点
 */
function clearSearchInputText() {
  searchInputText.value = '';
  searchTextRef.value.focus();
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
  gotoSearch();
}

/**
 * 显示登录弹窗
 */
function showLoginPopup() {
  isShowLogin.value = true;
}

/**
 * 隐藏登录弹窗
 */
function hideLoginPopup() {
  isShowLogin.value = false;
}

/**
 * 前往登录，打开登录弹窗
 */
function gotoLogin() {
  showLoginPopup();
}

/**
 * 前往搜索，调用搜索api
 */
function gotoSearch() {
  // TODO 调用搜索api
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

useHead({
  title: '查查木材商',
})

setPageLayout('mobile-only')

nuxtApp.hook("page:finish", () => {
  if(window.screen.width < 768) {
    dealSearchTipsAreaExpanded();
  }
  makeViewVerticalCenter();
  scrollGenerateSearchInputWordBox();
  window.onresize = () => {
    makeViewVerticalCenter();
  };
})
</script>

<template>
  <div class="flex flex-col items-center w-11/12 min-h-screen m-auto bg-black text-white main">
    <!-- 顶部标题 -->
    <h1 class="text-5xl md:text-6xl 2xl:text-8xl text-center font-extrabold tracking-widest top-title">查查木材商</h1>
    <!-- 顶部副标题 -->
    <p class="text-sm sm:text-base md:text-xl 2xl:text-3xl text-center font-medium tracking-widest m-8 mx-auto whitespace-nowrap">助力检索木材交易隐患，降低木材交易风险</p>
    <!-- 搜索框 -->
    <div class="relative inline-flex justify-center w-full md:w-96 2xl:w-1/3 text-base">
      <input class="w-4/5 h-14 p-4 px-2 md:pl-10 pr-4 text-black search-text" type="text" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" v-model="searchInputText" @focus="scrollGenerateSearchInputWordBox" @change="scrollGenerateSearchInputWordBox" @keyup="scrollGenerateSearchInputWordBox" @keyup.enter="searchButtonHandle" />
      <!-- 搜索图标 -->
      <svg class="absolute left-3 hidden md:inline-block w-5 h-14 search-icon" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
      <!-- 叉叉图标 -->
      <svg v-if="searchInputText.length > 0" @click.stop="clearSearchInputText" class="absolute hidden w-5 h-14 clear-icon" style="left: 74%;color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      <!-- 输入框下方的弹出框 -->
      <div @click.stop="false" class="absolute top-14 left-0 inline-flex w-4/5 max-h-0 overflow-hidden bg-white text-black transition-all search-tips-area">
        <!-- 未登录、未输入任何搜索内容、没有搜索历史记录 -->
        <div v-if="searchInputText.trim() === '' && searchInputHistoryStore.getList().length === 0" class="inline-flex flex-col justify-center items-center w-full h-full px-10 py-4">
          <img class="w-10" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5f4433e629ac9ea8ac48a070caadacad.png" />
          <p class="text-xs whitespace-nowrap mt-1 goto-login-and-get-detail-search-result-tips">立即登录获取更精准的关键词匹配结果</p>
          <button @click.stop="gotoLogin" class="text-sm px-3 py-1 text-white mt-4 goto-login-button">登录试试</button>
        </div>
        <!-- 未输入任何搜索内容、有搜索历史记录 -->
        <div v-if="searchInputText.trim() === '' && searchInputHistoryStore.getList().length > 0" class="inline-flex flex-col w-full h-full px-2 py-1">
          <!-- 输入历史记录 -->
          <div class="inline-flex flex-row items-center justify-between w-full search-input-history-box">
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
          <div class="inline-flex flex-row items-center justify-between w-full search-input-history-box">
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
            <button @click.stop="gotoLogin" class="goto-login-button1">立即登录</button>
            <span>获取更精准的关键词匹配结果</span>
          </div>
        </div>
      </div>
      <button class="w-1/5 h-14 search-button" @click.stop="searchButtonHandle">查一下</button>
    </div>
    <!-- pc端底部导航栏 -->
    <div class="hidden md:inline-flex justify-between w-11/12 lg:w-4/5 xl:w-2/3 mt-14 p-4 bottom-bg bottom-bg-pc">
      <!-- 信用排行榜 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-full h-full object-contain" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagebc0fc650b7b2855011cd4f677ff84d18.png" />
      </div>
      <!-- 问答 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image78d4ecfb51b36699a32eab989bf5d4b3.png" />
        <p class="h-10 text-center text-base mt-2">问答</p>
      </div>
      <!-- 评论 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5206a70a10664e3094ca56f7b5daa4d0.png" />
        <p class="h-10 text-center text-xs mt-2">提出您的问题，了解关于商家的问题及解答</p>
      </div>
      <!-- 投诉 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image3db75212dbc6abcdcda9d72349d98b1e.png" />
        <p class="h-10 text-center text-base mt-2">投诉</p>
      </div>
    </div>
    <!-- 移动端底部导航栏 -->
    <div class="inline-block md:hidden w-full mt-14 p-4 bottom-bg">
      <!-- 信用排行榜 -->
      <div class="flex justify-between items-center rank-list-cover"></div>
      <div class="flex flex-col mt-5 bg-black py-4 help-box">
        <h1 class="text-center font-bold space tracking-widest help-eliminate-hidden-danger">三大功能助力消除隐患</h1>
        <div class="flex justify-between mt-6 help-list">
          <!-- 问答 -->
          <div>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image78d4ecfb51b36699a32eab989bf5d4b3.png" />
            <p>问答</p>
          </div>
          <!-- 评论 -->
          <div>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5206a70a10664e3094ca56f7b5daa4d0.png" />
            <p>评论</p>
          </div>
          <!-- 投诉 -->
          <div>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image3db75212dbc6abcdcda9d72349d98b1e.png" />
            <p>投诉</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 登录弹窗 -->
  <LoginPopup v-if="isShowLogin" @close="hideLoginPopup" />
</template>

<style scoped>
.main {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image2231863ac57fa007d544e99f9d395130.png");
  background-size: cover;
}

.top-title {
  letter-spacing: 0.1em;
  margin-top: 9rem;
}

.search-text {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: all 0s 150ms;
}

.search-icon {
  color: rgb(153,153,153);
}

.goto-login-and-get-detail-search-result-tips {
  color: rgb(153,153,153);
}

.goto-login-button {
  background: rgb(143, 75, 29);
  border-radius: 5px;
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

.goto-login-button1 {
  color: rgb(143,75,29);
}

.search-button {
  background: rgb(134, 79, 40);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

*:focus-visible {
  outline: unset;
}

.search-text:focus-visible,
.search-text:has(~ .search-tips-area:hover) {
  border-bottom-left-radius: 0px;
  transition: all 0s 0ms;
}

.search-text:has(~ .search-tips-area.expanded) {
  border-bottom-left-radius: 0px;
}

.search-text:hover ~ .clear-icon {
  z-index: 999;
}

.search-text:focus-visible ~ .clear-icon,
.search-text:hover ~ .clear-icon,
.clear-icon:hover {
  display: inline-block;
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

.goto-rank-list-button {
  border-radius: 2rem;
}

.bottom-bg {
  background: rgb(21, 21, 29);
  border-radius: 10px;
}

.bottom-bg-pc > div:not(:first-of-type,:last-of-type) {
  position: relative;
}

.bottom-bg-pc > div:not(:first-of-type,:last-of-type)::after {
  content: '';
  position: absolute;
  right: -1em;
  display: inline-block;
  width: 0px;
  height: 100%;
  border-right: 2px solid #2E2E3B;
}

.bottom-bg p {
  color: #9191B5;
}

.rank-list-cover {
  display: inline-block;
  width: calc((100vw / 12 * 11) - 2rem);
  /* w1,h1为原图宽度高度，w2,h2为div元素的宽度高度，根据 "w1 / h1 = w2 / h2" 得出 "h2 = w2 * h1 / w1" */
  height: calc(((100vw / 12 * 11) - 2rem) * 120 / 670);
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagecbb69d514835e9ff75024d11e4f58d42.png");
  background-size: cover;
}

.help-box {
  border-radius: 10px;
}

.help-eliminate-hidden-danger {
  position: relative;
}

.help-eliminate-hidden-danger::before {
  content: '';
  position: absolute;
  left: calc(((100vw / 12 * 11) - 2rem) * 0.125);
  bottom: -1.5rem;
  display: inline-block;
  width: calc(((100vw / 12 * 11) - 2rem) * 0.75);
  height: calc((((100vw / 12 * 11) - 2rem) * 0.75) * 45 / 473);
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image57cd74abfdf472c8e4acf06dddf853cb.png");
  background-size: contain;
}

.help-list {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.help-list img {
  width: 2rem;
}
</style>