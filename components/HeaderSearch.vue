<script setup lang="ts">
import SearchTips from '~/components/SearchTips.vue'

const nuxtApp = useNuxtApp()

const route = useRoute()

const router = useRouter()

const props  = defineProps<{
  searchValue?: string | undefined,
}>()

const emit = defineEmits([
  'gotoSearch',
  'gotoSearchPage',
  'gotoLogin',
  'searchInputHistoryListItemClickHandle',
  'searchHistoryListItemClickHandle',
  'clearSearchValue',
  'searchValueChange',
  'searchInputFocusChange',
])

defineExpose({
  blur: () => searchTextRef.value.blur(),
})

// 搜索输入框对象
const searchTextRef = ref()

function searchInputHistoryListItemClickHandle(str: string) {
  emit('searchInputHistoryListItemClickHandle', str)
}

function searchHistoryListItemClickHandle(str: string) {
  emit('searchHistoryListItemClickHandle', str)
}

function searchValueChangeHandle(e: Event) {
  const event = e as InputEvent
  if (!event.currentTarget) return;
  const {
    value: val,
  } = <HTMLInputElement>event.currentTarget
  emit('searchValueChange', val)
}

function gotoSearchPage() {
  emit('gotoSearchPage')
}

function gotoSearch() {
  searchTextRef.value.blur()
  emit('gotoSearch')
}

function gotoLogin() {
  emit('gotoLogin')
}

function clearSearchValue() {
  searchTextRef.value.focus()
  emit('clearSearchValue')
}

function searchInputFocusAndBlurHandle() {
  if (searchTextRef.value) {
    searchTextRef.value.onfocus = () => {

      emit('searchInputFocusChange', true)
    };
    searchTextRef.value.onblur = () => {

      emit('searchInputFocusChange', false)
    };
  }
}

function changeSearchBoxStyleHandle() {
  let searchBoxEl = document.querySelectorAll('.search-box')
  let searchTextEl = document.querySelectorAll('.search-text')
  let clearIconEl = document.querySelectorAll('.search-box svg:nth-of-type(2)')
  let searchTipsAreaEl = document.querySelectorAll('.search-tips-area')
  if (searchTextEl && clearIconEl) {
    searchTextEl.forEach(item => {
      let searchTextStyle = getComputedStyle(item)
      clearIconEl.forEach(item1 => {
        let clearIconStyle = getComputedStyle(item1)
        searchBoxEl.forEach(item2 => {
          let searchBoxStyle = getComputedStyle(item2)
          item1.setAttribute('style', 'right: unset;left: calc((' + searchTextStyle.width + ' - ' + searchTextStyle.paddingRight + ') + ((' + searchTextStyle.paddingRight + ' - ' + clearIconStyle.width + ') / 2) + ' + searchBoxStyle.paddingLeft + ' + ' + searchBoxStyle.borderLeftWidth + ');')
        })
      })
    })
  }
  if (searchBoxEl && searchTextEl && searchTipsAreaEl) {
    searchBoxEl.forEach(item => {
      searchTextEl.forEach(item1 => {
        searchTipsAreaEl.forEach(item2 => {
          item2.setAttribute('style', 'width: calc(' + getComputedStyle(item1).width + ' + ' + getComputedStyle(item).paddingLeft + ' + ' + getComputedStyle(item).paddingRight + ');')
        })
      })
    })
  }
}

searchInputFocusAndBlurHandle()

onMounted(() => {
  searchInputFocusAndBlurHandle()
  window.addEventListener('resize', () => {
    if (window.screen.width >= 1024) {
      changeSearchBoxStyleHandle();
    }
  })
  if (window.screen.width >= 1024) {
    changeSearchBoxStyleHandle();
  }
})

nuxtApp.hook('page:finish', () => {
  searchInputFocusAndBlurHandle()
  window.addEventListener('resize', () => {
    if (window.screen.width >= 1024) {
      changeSearchBoxStyleHandle()
    }
  });
  if (window.screen.width >= 1024) {
    changeSearchBoxStyleHandle()
  }
})
</script>
<template>
  <div @click.stop="gotoSearchPage" class="block md:hidden w-full md:w-80 xl:h-10 px-6 py-1 md:px-0 md:py-0 md:pr-8 text-xs md:text-sm bg-white md:bg-transparent text-inherit md:text-white whitespace-nowrap overflow-hidden rounded-2xl md:rounded transition-all search-text" :style="'color: ' + (props.searchValue && props.searchValue.length > 0 ? '#000' : '#999') + ';'">{{ props.searchValue && props.searchValue.length > 0 ? props.searchValue : '请输入企业名、人名等关键词查询' }}</div>
  <input class="hidden md:inline-block w-full md:w-80 xl:h-10 px-5 py-1 md:px-0 md:py-0 md:pr-8 text-xs md:text-sm md:bg-transparent text-inherit md:text-white rounded-2xl md:rounded transition-all search-text" type="search" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" :value="props.searchValue" @keyup.enter="gotoSearch" @input="searchValueChangeHandle" />
  <svg class="absolute md:hidden left-1 inline-block w-4 h-4 transition-all search-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
  <svg v-if="props.searchValue&&props.searchValue.length > 0" @click.stop="clearSearchValue" class="absolute hidden md:block right-1 md:right-20 w-4 h-4 cursor-pointer transition-all clear-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
  <button @click.stop="gotoSearch" class="hidden md:inline-block xl:h-10 text-sm md:text-base px-2 py-1 whitespace-nowrap rounded transition-all search-button">查一下</button>
  <ClientOnly>
    <SearchTips @gotoLogin="gotoLogin" @gotoSearch="searchInputHistoryListItemClickHandle" @gotoDetail="searchHistoryListItemClickHandle" v-bind:searchValue="props.searchValue" top="top-6 md:top-10 xl:top-14" width="w-full md:w-80" zIndex="-z-10" class="in-header" />
  </ClientOnly>
</template>

<style scoped>
*:focus-visible {
  outline: unset;
}

.search-text:disabled {
  background-color: field;
}

.search-button {
  color: #fff;
  background-color: rgba(255, 131, 78, 1);
}

:where(.search-button):hover {
  background-color: #a64319;
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

@media (min-width: 768px) {
  .search-text {
    width: calc(100% - 4rem);
  }
}

@media (min-width: 1024px) {
  .search-text {
    width: calc(100% - 4rem);
    font-size: max(12px, calc(100vw / 1920 * 20));
    line-height: calc(100vw / 1920 * 20);
  }
  .search-button {
    width: calc(100vw / 1920 * 100);
    height: calc(100vw / 1920 * 42);
    font-size: max(12px, calc(100vw / 1920 * 20));
    line-height: calc(100vw / 1920 * 20);
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
