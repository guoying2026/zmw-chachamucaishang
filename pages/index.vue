<script setup lang="ts">
// 导入登录弹窗组件
import LoginPopup from '~/components/LoginPopup.vue'

// 导入搜索下拉框组件
import SearchTips from '~/components/SearchTips.vue'

// 导入搜索输入历史记录存储
import { useSearchInputHistoryStore } from '~/pinia/searchInputHistory'

import { useSearchResultStore } from "~/pinia/searchResultStore"

import { useRankListStore } from "~/pinia/rankListStore"

const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

const isMobile = ref<boolean>(false)

// 实例化搜索输入历史记录存储
const searchInputHistoryStore = useSearchInputHistoryStore()

// 搜索框输入内容
const searchInputText = ref<string>('')

// 搜索输入框对象
const searchTextRef = ref()

// 是否显示登录弹窗
const isShowLogin = ref<boolean>(false)

/**
 * “查一下”按钮的点击处理事件
 */
function searchButtonHandle() {
  // 在用户未输入任何文字点击“查一下”时，默认视为搜索“木材”结果
  if (searchInputText.value.trim() === '') searchInputText.value = '木材';
  searchInputHistoryStore.add(searchInputText.value.trim());
  gotoSearch();
}

/**
 * 清除搜索输入框的输入内容，并且使输入框获取焦点
 */
function clearSearchInputText() {
  searchInputText.value = '';
  searchTextRef.value.focus();
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
  useSearchResultStore().clearAll()
  useRankListStore().clearAll()
  // TODO 调用搜索api
  if (searchInputText.value.trim() === '') searchInputText.value = '木材'
  router.push('/searchResult?search=' + searchInputText.value);
}

function searchBoxClickHandle() {
  router.push('/search');
}

useHead({
  title: '查查木材商',
})

nuxtApp.hook('page:finish', () => {
  isMobile.value = window.screen.width <= 767
})
</script>

<template>
  <div class="flex flex-col items-center w-full min-h-screen bg-black text-white bg-cover main">
    <!-- 顶部标题 -->
    <h1 class="text-5xl md:text-6xl 2xl:text-8xl text-center font-extrabold tracking-widest top-title">查查木材商</h1>
    <!-- 顶部副标题 -->
    <p class="text-sm sm:text-base md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl text-center font-medium tracking-widest m-4 mb-8 mx-auto whitespace-nowrap top-subtitle">助力检索木材交易隐患，降低木材交易风险</p>
    <!-- 搜索框 -->
    <div @click.stop="isMobile?searchBoxClickHandle():''" class="relative inline-flex justify-center w-full md:w-96 2xl:w-1/3 text-base search-box">
      <input :disabled="isMobile" class="w-4/5 h-14 p-4 px-2 md:pl-10 pr-5 text-sm md:text-base xl:text-xl bg-white text-black search-text" type="search" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" v-model="searchInputText" @keyup.enter="searchButtonHandle" />
      <!-- 搜索图标 -->
      <svg class="absolute left-3 hidden md:inline-block w-5 h-14 search-icon" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
      <!-- 叉叉图标 -->
      <svg v-if="searchInputText.length > 0" @click.stop="clearSearchInputText" class="absolute hidden w-5 h-14 clear-icon" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      <ClientOnly>
        <SearchTips @gotoLogin="gotoLogin" @gotoSearch="searchInputHistoryListItemClickHandle" v-bind:searchValue="searchInputText" top="top-14" width="w-4/5" zIndex="z-10" />
      </ClientOnly>
      <button class="w-1/5 h-14 search-button" @click.stop="isMobile?searchBoxClickHandle():searchButtonHandle()">查一下</button>
    </div>
    <!-- pc端底部导航栏 -->
    <div class="hidden md:inline-flex justify-between w-11/12 lg:w-4/5 xl:w-2/3 mt-14 p-4 bottom-bg bottom-bg-pc">
      <!-- 信用排行榜 -->
      <NuxtLink class="inline-flex flex-col items-center justify-center w-1/5" to="/rankList">
        <img class="w-full h-full object-contain" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagebc0fc650b7b2855011cd4f677ff84d18.png" />
      </NuxtLink>
      <!-- 问答 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image78d4ecfb51b36699a32eab989bf5d4b3.png" />
        <div class="relative inline-flex flex-col items-center justify-center w-full h-14">
          <p class="absolute opacity-100 h-10 text-center text-base xl:text-xl 2xl:text-2xl mt-2">问答</p>
          <p class="absolute opacity-0 h-10 text-center text-xs xl:text-lg 2xl:text-xl mt-2 select-none">提出问题，了解商家详情</p>
        </div>
      </div>
      <!-- 评论 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5206a70a10664e3094ca56f7b5daa4d0.png" />
        <div class="relative inline-flex flex-col items-center justify-center w-full h-14">
          <p class="absolute opacity-100 h-10 text-center text-base xl:text-xl 2xl:text-2xl mt-2">评论</p>
          <p class="absolute opacity-0 h-10 text-center text-xs xl:text-lg 2xl:text-xl mt-2 select-none">评论商家，浏览商家口碑</p>
        </div>
      </div>
      <!-- 投诉 -->
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image3db75212dbc6abcdcda9d72349d98b1e.png" />
        <div class="relative inline-flex flex-col items-center justify-center w-full h-14">
          <p class="absolute opacity-100 h-10 text-center text-base xl:text-xl 2xl:text-2xl mt-2">投诉</p>
          <p class="absolute opacity-0 h-10 text-center text-xs xl:text-lg 2xl:text-xl mt-2 select-none">投诉商家，警示踩雷踩坑</p>
        </div>
      </div>
    </div>
    <!-- 移动端底部导航栏 -->
    <div class="inline-block md:hidden w-full mt-14 p-4 bottom-bg">
      <!-- 信用排行榜 -->
      <NuxtLink class="flex justify-between items-center rank-list-cover" to="/rankList"></NuxtLink>
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
  background-position-x: center;
  background-position-y: top;
  padding-left: calc((100% - 91.666667%) / 2);
  padding-right: calc((100% - 91.666667%) / 2);
}

@media (min-width: 768px) {
  .main {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image3b38dbd45823b2c0e8409d9eac58307c.png");
  }
}

.top-title {
  letter-spacing: 0.1em;
  margin-top: calc(100vw / 750 * 285);
}

.search-text {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: all 0s 150ms;
}

.search-text::placeholder {
  color: #999;
}

.search-text::-webkit-search-cancel-button {
  display: none;
}

.search-icon {
  color: rgb(153,153,153);
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

.clear-icon {
  right: calc(100vw / 750 * 138);
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover,
.search-tips-area.expanded {
  max-height: 100vh;
}

.search-text:focus-visible ~ .search-button,
.search-text:focus-visible,
.search-tips-area:hover ~ .search-button,
.search-tips-area:hover ~ .search-text,
.search-tips-area.expanded ~ .search-button,
.search-tips-area.expanded ~ .search-text  {
  z-index: 11;
}

.search-text:focus-visible ~ svg,
.search-tips-area:hover ~ svg,
.search-tips-area.expanded ~ svg {
  z-index: 12;
}

.bottom-bg {
  background: rgb(21, 21, 29);
  border-radius: 10px;
}

.bottom-bg-pc {
  width: calc(100vw / 1920 * 1256);
  height: calc(100vw / 1920 * 293);
  margin-top: calc(100vw / 1920 * 140);
}

.bottom-bg-pc > div:not(:last-of-type) {
  position: relative;
}

.bottom-bg-pc > div:not(:last-of-type)::after {
  content: '';
  position: absolute;
  right: -1em;
  display: inline-block;
  width: 0px;
  height: 100%;
  border-right: 2px solid #2E2E3B;
}

.bottom-bg-pc > a {
  width: calc(100vw / 1920 * 331);
  transition: all 0.5s;
}

.bottom-bg-pc > a:hover {
  transform: scale(1.05);
}

.bottom-bg-pc > a::after:has(:hover) {
  transform: scale(1);
}

.bottom-bg-pc > div p {
  transition: all 0.5s;
}

.bottom-bg-pc > div:hover p:first-of-type {
  opacity: 0;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.bottom-bg-pc > div:hover p:last-of-type {
  opacity: 1;
  user-select: auto;
  -ms-user-select: auto;
  -moz-user-select: auto;
  -webkit-user-select: auto;
}

.bottom-bg-pc > div img {
  width: calc(100vw / 1920 * 67);
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
  width: 2.5rem;
}

@media (max-width: 769px) {
  .help-list p {
    font-size: 0.8rem;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .top-title {
    margin-top: calc(100vw / 1920 * 195);
    font-size: calc(100vw / 1920 * 88);
  }
  .top-subtitle {
    margin-top: calc(100vw / 1920 * 36);
    margin-bottom: calc(100vw / 1920 * 52);
    font-size: calc(100vw / 1920 * 34);
  }
  .search-box {
    min-width: calc(211px + (100vw / 1920 * 96));
    width: calc(100vw / 1920 * 584);
    height: calc(100vw / 1920 * 60);
    font-size: calc(100vw / 1920 * 20);
  }
  .search-text {
    min-width: 210px;
    width: calc(100vw / 1920 * 488);
    height: calc(100vw / 1920 * 60);
    padding: 0 calc(100vw / 1920 * 35);
    font-size: calc(100vw / 1920 * 20);
  }
  .search-icon,
  .clear-icon {
    width: calc(100vw / 1920 * 20);
    height: calc(100vw / 1920 * 60);
  }
  .search-icon {
    left: calc(100vw / 1920 * 14);
  }
  .clear-icon {
    right: calc(100vw / 1920 * 110);
  }
  .search-button {
    width: calc(100vw / 1920 * 96);
    height: calc(100vw / 1920 * 60);
    font-size: calc(100vw / 1920 * 20);
  }
  .bottom-bg-pc > div p {
    font-size: calc(100vw / 1920 * 20);
  }
}
</style>