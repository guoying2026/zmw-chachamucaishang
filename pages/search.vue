<script setup lang="ts">
import { AreaListItem } from '~/types/areaListItem'

// 导入搜索输入历史记录存储
import { useSearchInputHistoryStore } from '~/pinia/searchInputHistory'

// 导入搜索历史记录存储
import { useSearchHistoryStore } from '~/pinia/searchHistory'

// 导入用户信息存储
import { useUserInfoStore } from "~/pinia/userInfo"

import { generateCompanyShortName } from '~/utils/generateCompanyShortName'

const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

const areaList = ref<AreaListItem[]>([])

const { data, pending, error, refresh } = await useFetch('/api/areaData')

if (data.value) {
  let areaData: AreaListItem[] = JSON.parse(JSON.stringify(data.value.result))
  areaList.value = areaData;
}

// 实例化搜索输入历史记录存储
const searchInputHistoryStore = useSearchInputHistoryStore()

// 实例化搜索历史记录存储
const searchHistoryStore = useSearchHistoryStore()

// 实例化用户信息存储
const userInfoStore = useUserInfoStore()

const searchTextRef = ref()

// 搜索框输入内容
const searchInputText = ref<string>('')

// 是否显示搜索输入历史记录的删除按钮
const isShowSearchInputHistoryListDelete = ref<boolean>(false)

// 是否显示搜索历史记录的删除按钮
const isShowSearchHistoryListDelete = ref<boolean>(false)

// 是否显示登录弹窗
const isShowLogin = ref<boolean>(false)

const isAddScrollGenerateSearchInputWordBoxEvent = ref<boolean>(false)

// 猜你想搜列表
const whatYouWantSearchList = ref<string[]>([])
const whatYouWantSearchPage = ref<number>(1)
const whatYouWantSearchTotalPage = ref<number>(1)
const whatYouWantSearchOffset = ref<number>(0)

/**
 * 重新生成“猜你想搜”列表数据
 */
function regenerateWhatYouWantSearchList(name?: string, page?: number, offset?: number) {
  if (!name || name == '') {
    name = searchInputText.value
  }
  if (!page || page == 0) {
    page = whatYouWantSearchPage.value < whatYouWantSearchTotalPage.value ? whatYouWantSearchPage.value + 1 : 1
  }
  if (!offset) {
    offset = whatYouWantSearchOffset.value
  }
  useFetch('/api/getWhatYouWantSearch', {
    query: {
      name: name,
      page: page,
      offset: offset,
    }
  })
  .then(res => new Promise(resolve => resolve(res.data.value)))
  .then(async res => {
    let res1 = res as {data: string[], offset: number, page: number, total_page: number}
    whatYouWantSearchList.value = res1.data
    whatYouWantSearchPage.value = res1.page
    whatYouWantSearchTotalPage.value = res1.total_page
    whatYouWantSearchOffset.value = res1.offset
  })
}

/**
 * 使搜索框的“猜你想搜”的区域在滚轮上下滑动时，对应区域能够左右滑动
 */
function scrollGenerateSearchInputWordBox() {
  let box = document.querySelector('.search-input-history-list');
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
  // 在用户未输入任何文字点击“查一下”时，默认视为搜索“木材”结果
  if (str.trim() === '') str = '木材';
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
  router.push('/searchResult')
}

function cancelButtonHandle() {
  router.back();
}

watch(() => searchInputText.value, (newProps) => {
  regenerateWhatYouWantSearchList(newProps, 1, 0)
})

useHead({
  title: '搜索',
})

nuxtApp.hook("page:finish", () => {
  regenerateWhatYouWantSearchList();
  scrollGenerateSearchInputWordBox();
  if (route.query.search) {
    searchInputText.value = route.query.search as string;
    gotoSearch();
  }
})
</script>

<template>
  <div class="inline-flex flex-col w-screen h-screen contain">
    <div class="fixed top-0 z-50 inline-flex flex-row justify-between items-center w-full px-2 pt-6 search-input-box">
      <input class="w-10/12 md:w-11/12 h-8 text-sm pl-6 pr-5 text-black search-input" type="text" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" v-model="searchInputText" @focus="scrollGenerateSearchInputWordBox" @change="scrollGenerateSearchInputWordBox" @keyup="scrollGenerateSearchInputWordBox" @keyup.enter="gotoSearch" />
      <!-- 搜索图标 -->
      <svg class="absolute left-4 top-6 inline-block w-4 h-8 search-icon" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
      <!-- 叉叉图标 -->
      <svg @click="clearSearchInputText" v-if="searchInputText.length > 0" class="absolute hidden w-4 h-8 clear-icon" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      <button @click="cancelButtonHandle" class="w-2/12 md:w-1/12 text-base font-normal cancel-button">取消</button>
    </div>
    <!-- 未登录、未输入任何搜索内容、没有搜索历史记录 -->
    <div v-if="!userInfoStore.isLoggedIn() && searchInputText.trim() === '' && searchInputHistoryStore.getList().length === 0" class="inline-flex flex-col justify-center items-center w-full h-auto px-10 py-4 mt-14 search-tips-area">
      <img class="w-10" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5f4433e629ac9ea8ac48a070caadacad.png" />
      <p class="text-xs whitespace-nowrap mt-1 goto-login-and-get-detail-search-result-tips">立即登录获取更精准的关键词匹配结果</p>
      <button @click="gotoLogin" class="text-sm px-3 py-1 text-white mt-4 goto-login-button">登录试试</button>
    </div>
    <!-- 未输入任何搜索内容、有搜索历史记录 -->
    <div v-if="searchInputText.trim() === '' && (searchInputHistoryStore.getList().length > 0 || searchHistoryStore.getList().length > 0)" class="inline-flex flex-col w-full h-auto px-2 py-1 mt-14 bg-black search-tips-area">
      <!-- 搜索历史 -->
      <div v-if="searchInputHistoryStore.getList().length > 0" class="inline-flex flex-col w-screen h-auto px-2 py-5 -ml-2 search-input-history">
        <div class="inline-flex flex-row justify-between items-center">
          <span class="text-sm font-normal search-input-history-title">搜索历史</span>
          <template v-if="isShowSearchInputHistoryListDelete">
            <div class="inline-flex">
              <button @click="clearAllSearchInputHistory" class="text-sm whitespace-nowrap pl-1 clear-all-search-input-history-button">删除全部</button>
              <button @click="hideSearchInputHistoryListDelete" class="text-sm whitespace-nowrap pl-1 finish-clear-search-input-history-button">完成</button>
            </div>
          </template>
          <template v-else>
            <button @click="showSearchInputHistoryListDelete" class="w-4 h-4 clear-search-input-history-item-button">
              <svg class="w-4 h-4 clear-search-input-history-button-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"/></svg>
            </button>
          </template>
        </div>
        <ul class="inline-flex flex-row list-none pb-1 mt-4 overflow-x-scroll overflow-y-hidden search-input-history-list">
          <li @click="isShowSearchInputHistoryListDelete?'':searchInputHistoryListItemClickHandle(item)" class="relative inline-flex justify-center items-center px-4 py-0.5 ml-4 first-of-type:ml-0 whitespace-nowrap search-input-history-list-item" v-for="(item, index) in searchInputHistoryStore.getList()" :key="index">
            <span>{{ item }}</span>
            <button v-if="isShowSearchInputHistoryListDelete" @click="clearSearchInputHistoryItem(item)" class="absolute top-0 right-0 w-3 h-3 p-0.5 clear-search-input-history-item-button">
              <svg class="w-2 h-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"/></svg>
            </button>
          </li>
        </ul>
      </div>
      <!-- 历史记录 -->
      <div v-if="searchHistoryStore.getList().length > 0" class="inline-flex flex-col w-screen h-auto px-2 py-5 -ml-2 mt-5 search-history">
        <div class="sticky top-14 inline-flex flex-row justify-between items-center z-10 search-history-header">
          <span class="text-sm font-normal search-input-history-title">历史记录</span>
          <template v-if="isShowSearchHistoryListDelete">
            <div class="inline-flex">
              <button @click="clearAllSearchHistory" class="text-sm whitespace-nowrap pl-1 clear-all-search-input-history-button">删除全部</button>
              <button @click="hideSearchHistoryListDelete" class="text-sm whitespace-nowrap pl-1 finish-clear-search-input-history-button">完成</button>
            </div>
          </template>
          <template v-else>
            <button @click="showSearchHistoryListDelete" class="w-4 h-4 clear-search-history-item-button">
              <svg class="w-4 h-4 clear-search-input-history-button-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"/></svg>
            </button>
          </template>
        </div>
        <ul class="inline-flex flex-col list-none overflow-y-scroll search-history-list">
          <li @click.stop="isShowSearchHistoryListDelete?'':searchInputHistoryListItemClickHandle(item.name)" :class="'relative inline-flex flex-row items-center mt-4' + (isShowSearchHistoryListDelete?'':' cursor-pointer')" v-for="item in searchHistoryStore.getList()">
            <img v-if="item.logo&&item.logo.length>0" class="w-8 h-8 object-cover search-history-list-item-logo" :src="item.logo" />
            <div v-else class="inline-flex justify-center items-center w-8 h-8 text-center rounded-md select-none whitespace-pre" style="background-color: #262626;">
              <span :class="'font-sans '+(Math.round(generateCompanyShortName(item.name, areaList).replace('\n','').length/2)==2?'text-xs':'text-xl')+' font-extrabold'" style="color: #999;">{{ generateCompanyShortName(item.name, areaList) }}</span>
            </div>
            <span class="text-sm pl-1 search-history-list-item-name">{{ item.name }}</span>
            <button v-if="isShowSearchHistoryListDelete" @click.stop="clearSearchHistoryItem(item.id)" class="absolute right-0 w-3 h-3 p-0.5 clear-search-history-item-button">
              <svg class="w-2 h-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"/></svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- 已输入任何搜索内容 或者 已登录但未(已登录、未输入任何搜索内容，并且没有搜索历史记录)输入任何搜索内容 -->
    <div v-if="searchInputText.trim() !== '' || (userInfoStore.isLoggedIn() && searchInputText.trim() == '' && searchInputHistoryStore.getList().length == 0 && searchHistoryStore.getList().length == 0)" class="inline-flex flex-col w-full h-auto px-2 py-1 mt-14 bg-black search-tips-area">
      <!-- 猜你想搜 -->
      <div class="inline-flex flex-col w-screen h-auto px-2 py-5 -ml-2 search-input-history">
        <div class="inline-flex flex-row justify-between items-center">
          <span class="text-sm font-normal search-input-history-title">猜你想搜</span>
          <button @click="regenerateWhatYouWantSearchList()" class="inline-flex flex-row justify-center items-center w-4 pl-1">
            <svg class="w-4 regenerate-search-input-word-button-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23q-2.8 0-5.15-1.275T3 18.325V21H1v-6h6v2H4.525q1.2 1.8 3.163 2.9T12 21q1.875 0 3.513-.713t2.85-1.924q1.212-1.213 1.925-2.85T21 12h2q0 2.275-.863 4.275t-2.362 3.5q-1.5 1.5-3.5 2.363T12 23ZM1 12q0-2.275.863-4.275t2.362-3.5q1.5-1.5 3.5-2.362T12 1q2.8 0 5.15 1.275t3.85 3.4V3h2v6h-6V7h2.475q-1.2-1.8-3.163-2.9T12 3q-1.875 0-3.513.713t-2.85 1.924Q4.426 6.85 3.714 8.488T3 12H1Z"/></svg>
          </button>
        </div>
        <ul class="inline-flex flex-row list-none pb-1 mt-4 overflow-x-scroll overflow-y-hidden search-input-history-list">
          <li @click="searchInputHistoryListItemClickHandle(item)" class="relative inline-flex justify-center items-center px-4 py-0 5 ml-4 first-of-type:ml-0 whitespace-nowrap search-input-history-list-item" v-for="item in whatYouWantSearchList"><span>{{ item }}</span></li>
        </ul>
      </div>
      <!-- 相关企业 -->
      <div v-if="searchInputText.trim() !== ''" class="inline-flex flex-col w-screen h-auto px-2 py-5 -ml-2 mt-5 related-enterprises">
        <div class="sticky top-14 inline-flex flex-row justify-between items-center z-10 related-enterprises-header">
          <span class="text-sm font-normal search-input-history-title">相关企业</span>
        </div>
        <ul class="inline-flex flex-col list-none overflow-y-scroll search-history-list">
          <li class="relative inline-flex flex-row items-center mt-4" v-for="n in 5">
            <img class="w-8 h-8 object-cover search-history-list-item-logo" src="" alt="" />
            <span class="text-sm pl-1 search-history-list-item-name">杭州木材有限公司</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 登录弹窗 -->
  <LoginPopup v-if="isShowLogin" @close="hideLoginPopup" />
</template>

<style scoped>
input:focus-visible {
  outline: unset;
}

.contain {
  background-color: #010101;
}

.search-input {
  border-radius: 1rem;
}

.clear-icon {
  right: calc(16.666667% + 0.55rem);
}

.search-input:hover ~ .clear-icon {
  z-index: 999;
}

.search-input:focus-visible ~ .clear-icon,
.search-input:hover ~ .clear-icon,
.clear-icon:hover {
  display: inline-block;
}

.cancel-button {
  font-family: Source Han Sans CN;
  color: #FF9B40;
}

.goto-login-and-get-detail-search-result-tips,
.search-input-history-title,
.clear-search-input-history-button-icon,
.regenerate-search-input-word-button-icon {
  font-family: Source Han Sans CN;
  color: #999;
}

.goto-login-button {
  background: #864E28;
  border-radius: 4px;
}

.search-input-box,
.search-input-history,
.search-history,
.search-history-header,
.related-enterprises,
.related-enterprises-header {
  background-color: #121212;
}

.search-input-history-list-item {
  font-family: Source Han Sans CN;
  background-color: #262626;
  color: #999;
  border-radius: 6px;
  cursor: pointer;
}

.search-input-history-list-item button {
  background-color: #676767;
  color: #262626;
  border-radius: 0px 6px 0px 6px;
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
  background-color: rgba(255,255,255,0.2);
  border-radius: 9999px;
  border-width: 1px;
}

::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(255,255,255,0.4);
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(255,255,255,.9);
}

.search-tips-area ::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.search-tips-area:hover ::-webkit-scrollbar-thumb {
  visibility: visible;
}

.clear-all-search-input-history-button {
  color: #FF4747;
}

.finish-clear-search-input-history-button {
  color: #FF9B40;
}

.clear-search-history-item-button {
  top: 0.625rem;
  color: #707070;
}

.search-history-list-item-logo {
  border-radius: 6px;
}

@media (min-width: 768px) {
  .clear-icon {
    right: calc(8.333333% + 0.65rem);
  }
}
</style>