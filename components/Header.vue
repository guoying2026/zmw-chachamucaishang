<script setup lang="ts">
import LoginPopup from "~/components/LoginPopup.vue";

const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

// 搜索框输入内容
const searchInputText = ref<string>('')

const isSearchInputFocusing = ref<boolean>(false)

// 搜索输入框对象
const searchTextRef = ref()

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
  <div class="fixed inline-flex flex-row justify-center items-center w-full bg-black py-2 z-30 header">
    <!-- 查查木材商图标 -->
    <NuxtLink to="/">
      <img class="block md:hidden h-6" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageee2c089b91ece3372b37b7ea820936fe.png" />
      <img class="hidden md:block h-8" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagef6dd0552bbc692e03c05de8bd0b26610.png" />
    </NuxtLink>
    <!-- 搜索框 -->
    <div class="relative inline-flex md:justify-evenly items-center ml-2 md:p-1 md:ml-10 md:border md:border-solid md:rounded-lg search-box search-input">
      <input class="w-full md:w-80 px-5 py-1 md:px-0 md:py-0 md:pr-6 text-xs md:text-sm md:bg-transparent text-inherit md:text-white rounded-2xl md:rounded" type="text" placeholder="请输入企业名、人名等关键词查询" ref="searchTextRef" v-model="searchInputText" @keyup.enter="searchButtonHandle" />
      <svg class="absolute md:hidden left-1 inline-block w-4 h-4 search-icon" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
      <svg v-if="searchInputText.length > 0" @click.stop="clearSearchInputText" class="absolute right-1 md:right-16 w-4 h-4 cursor-pointer" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      <button @click.stop="searchButtonHandle" class="hidden md:inline-block text-sm px-2 py-1 rounded search-button">查一下</button>
    </div>
    <button @click="openLoginPopup" :class="(isSearchInputFocusing ? 'hidden md:inline-block' : 'inline-block') + ' text-sm md:text-base font-medium px-1 py-0.5 ml-2 md:ml-10 border border-solid rounded goto-login-button'">登录/注册</button>
    <button @click="searchInputBlurHandle" :class="(isSearchInputFocusing ? 'inline-block md:hidden' : 'hidden') + ' text-sm md:text-base font-medium ml-2 md:ml-4 goto-login-button'">取消</button>
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

.white_space {
  display: inline-block;
  width: 100vw;
  height: 2.14rem;
}
</style>