<script setup lang="ts">
// 导入搜索输入历史记录存储
import { useSearchInputHistoryStore } from '~/pinia/searchInputHistory'

// 导入搜索历史记录存储
import { useSearchHistoryStore } from '~/pinia/searchHistory'

const nuxtApp = useNuxtApp()

const props = defineProps<{
  searchValue?: string | undefined,
  top?: string | undefined,
  width?: string | undefined,
  zIndex?: string | undefined,
}>()

const emit = defineEmits([
  'gotoLogin',
  'gotoSearch',
])

// 实例化搜索输入历史记录存储
const searchInputHistoryStore = useSearchInputHistoryStore()

// 实例化搜索历史记录存储
const searchHistoryStore = useSearchHistoryStore()

// 是否显示搜索输入历史记录的删除按钮
const isShowSearchInputHistoryListDelete = ref<boolean>(false)

// 是否显示搜索历史记录的删除按钮
const isShowSearchHistoryListDelete = ref<boolean>(false)

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
    name = props.searchValue ? props.searchValue : ''
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
  let box = document.querySelector('.generate-search-input-word-list,.search-input-history-list');
  if (!box) return;
  // 这里要防止一直添加事件，否则横向滚动距离会越滑动越长
  if (isAddScrollGenerateSearchInputWordBoxEvent.value) return;
  box.addEventListener('wheel', (e: Event) => {
    let wheelEvent = e as WheelEvent;
    wheelEvent.preventDefault();
    if (!box) return;
    isAddScrollGenerateSearchInputWordBoxEvent.value = true;
    box.scrollLeft += wheelEvent.deltaX + (wheelEvent.deltaY / document.body.offsetHeight * box.clientWidth);
  }, { passive: false });
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

function dealSearchTipsAreaExpanded() {
  const searchTipsArea = document.querySelector('.search-tips-area')
  const searchTipsAreaCover = document.querySelector('.search-tips-area-cover')

  document.querySelector('.search-text')?.addEventListener('click', e => {
    searchTipsArea?.classList.add('expanded')
    searchTipsAreaCover?.classList.add('expanded')
    e.stopPropagation()
  })

  document.addEventListener('click', function () {
    searchTipsArea?.classList.remove('expanded')
    searchTipsAreaCover?.classList.remove('expanded')
  })
}

watch(() => props.searchValue, (newProps) => {
  scrollGenerateSearchInputWordBox()
  regenerateWhatYouWantSearchList(newProps, 1, 0)
})

nuxtApp.hook("page:finish", () => {
  regenerateWhatYouWantSearchList();
  if(window.screen.width < 768) {
    dealSearchTipsAreaExpanded();
  }
  scrollGenerateSearchInputWordBox();
})
</script>

<template>
  <!-- 输入框下方的弹出框 -->
  <div :class="'fixed left-0 top-0 w-screen h-0 ' + (props.zIndex && typeof props.zIndex == 'string' && props.zIndex.trim().length > 0 ? props.zIndex : 'z-0') + ' search-tips-area-cover'"></div>
  <div @click.stop="false" :class="'absolute ' + (props.top && typeof props.top == 'string' && props.top.trim().length > 0 ? props.top + ' ' : '') + 'left-0 inline-flex ' + (props.width && typeof props.width == 'string' && props.width.trim().length > 0 ? props.width + ' ' : '') + ' max-h-0 overflow-hidden bg-white text-black transition-all search-tips-area'" :style="(props.zIndex && typeof props.zIndex == 'string' && props.zIndex.trim().length > 0 ? 'z-index:' + (Number(props.zIndex.trim().replace('z-','')) + 1) + ';' : '')">
    <!-- 未登录、未输入任何搜索内容、没有搜索历史记录 -->
    <div v-if="props.searchValue?.trim() === '' && searchInputHistoryStore.getList().length === 0" class="inline-flex flex-col justify-center items-center w-full h-full px-10 py-4">
      <img class="w-10" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5f4433e629ac9ea8ac48a070caadacad.png" />
      <p class="text-xs whitespace-nowrap mt-1 goto-login-and-get-detail-search-result-tips">立即登录获取更精准的关键词匹配结果</p>
      <button @click.stop="$emit('gotoLogin')" class="text-sm px-3 py-1 text-white mt-4 goto-login-button">登录试试</button>
    </div>

    <!-- 未输入任何搜索内容、有搜索历史记录 -->
    <div v-if="props.searchValue?.trim() === '' && searchInputHistoryStore.getList().length > 0" class="inline-flex flex-col w-full h-full px-2 py-1">
      <!-- 输入历史记录 -->
      <div class="inline-flex flex-row items-center justify-between w-full search-input-history-box">
        <ul :class="'inline-flex flex-row text-xs list-none pb-1 pt-1 overflow-x-scroll search-input-history-list'">
          <li @click.stop="isShowSearchInputHistoryListDelete?'':$emit('gotoSearch',item)" class="relative inline-flex justify-center items-center px-4 py-0.5 ml-4 first-of-type:ml-0 whitespace-nowrap search-input-history-list-item" v-for="item in searchInputHistoryStore.getList()">
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
    <div v-if="props.searchValue?.trim() !== ''" class="inline-flex flex-col w-full h-full px-2 py-1 pb-2">
      <!-- 猜你想搜 -->
      <div class="inline-flex flex-row items-center justify-between w-full search-input-history-box">
        <h1 class="text-xs pr-2 mb-2 whitespace-nowrap guess-what-you-want-to-search-tips">猜你想搜</h1>
        <ul class="inline-flex flex-row text-xs list-none pb-1 overflow-x-scroll search-input-history-list generate-search-input-word-list">
          <li @click.stop="$emit('gotoSearch',item)" class="relative inline-flex justify-center items-center px-4 py-0.5 ml-4 first-of-type:ml-0 whitespace-nowrap search-input-history-list-item" v-for="item in whatYouWantSearchList">{{ item }}</li>
        </ul>
        <button @click.stop="regenerateWhatYouWantSearchList()" class="inline-flex flex-row justify-center items-center w-4 pl-1 mb-2">
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
        <button @click.stop="$emit('gotoLogin')" class="goto-login-button1">立即登录</button>
        <span>获取更精准的关键词匹配结果</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.search-text:focus-visible ~ .search-tips-area-cover,
.search-tips-area-cover.expanded {
  height: 100vh;
}
</style>