<script setup lang="ts">
const route = useRoute()

useHead({
  title: '查查木材商',
})

setPageLayout('mobile-only')

const nuxtApp = useNuxtApp()

function makeViewVerticalCenter() {
  // 如果为pc端，则计算页面内容高度和屏幕高度，使页面内容垂直居中
  if (window.screen.width < 768) return;
  let screenHeight = window.screen.height;
  let leng = document.querySelector('.main')?.children.length;
  let elTotalHeight = 0;
  if (!leng || typeof leng !== 'number' || leng === 0) return;
  let i = -1;
  while (++i < leng) {
    console.log(i, document.querySelector('.main')?.children[i]);
    let computedStyle = window.getComputedStyle(document.querySelector('.main')?.children[i]??new Element());
    let elHeight = document.querySelector('.main')?.children[i].clientHeight??0;
    if (computedStyle) {
      if (i > 0) elTotalHeight += Number(computedStyle['marginTop'].replaceAll('px', ''));
      if (i + 1 !== leng) elTotalHeight += Number(computedStyle['marginBottom'].replaceAll('px', ''));
    }
    elTotalHeight += elHeight;
    // i++;
  }
  if (elTotalHeight > screenHeight) return;
  document.querySelector('.top-title')?.setAttribute('style', 'margin-top: ' + ((screenHeight - elTotalHeight) / 2) + 'px;');
}

nuxtApp.hook("page:finish", () => {
  makeViewVerticalCenter();
  window.onresize = () => {
    makeViewVerticalCenter();
  };
})
</script>

<template>
  <div class="flex flex-col items-center w-11/12 min-h-screen m-auto bg-black text-white main">
    <h1 class="text-5xl md:text-6xl text-center font-extrabold tracking-widest top-title">查查木材商</h1>
    <p class="text-sm sm:text-base md:text-xl text-center font-medium tracking-widest m-8 mx-auto whitespace-nowrap">助力检索木材交易隐患，降低木材交易风险</p>
    <div class="relative inline-flex justify-center w-full md:w-96 text-base">
      <input class="w-4/5 h-14 p-4 px-2 md:pl-10 text-black search-text" type="text" placeholder="请输入企业名、人名等关键词查询" />
      <div class="absolute left-3 hidden md:inline-block w-5 h-14 bg-contain bg-no-repeat bg-center search-icon"></div>
      <div class="absolute top-14 left-0 inline-flex w-4/5 max-h-0 overflow-hidden bg-white text-black transition-all search-tips-area">
        <div class="inline-flex flex-col justify-center items-center w-full h-full p-10 has-no-login-and-empty-search">
          <p class="text-xs whitespace-nowrap">立即登录获取更精准的关键词匹配结果</p>
          <button class="px-5 py-2 text-white goto-login-button">登录试试</button>
        </div>
      </div>
      <button class="w-1/5 h-14 search-button">查一下</button>
    </div>
    <div class="hidden md:inline-flex justify-between w-11/12 lg:w-4/5 xl:w-2/3 mt-14 p-4 bottom-bg bottom-bg-pc">
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-full h-full object-contain" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagebc0fc650b7b2855011cd4f677ff84d18.png" />
      </div>
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image78d4ecfb51b36699a32eab989bf5d4b3.png" />
        <p class="h-10 text-center text-base mt-2">问答</p>
      </div>
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5206a70a10664e3094ca56f7b5daa4d0.png" />
        <p class="h-10 text-center text-xs mt-2">提出您的问题，了解关于商家的问题及解答</p>
      </div>
      <div class="inline-flex flex-col items-center justify-center w-1/5">
        <img class="w-10 xl:w-12 2xl:w-14" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image3db75212dbc6abcdcda9d72349d98b1e.png" />
        <p class="h-10 text-center text-base mt-2">投诉</p>
      </div>
    </div>
    <div class="inline-block md:hidden w-full mt-14 p-4 bottom-bg">
      <div class="flex justify-between items-center rank-list-cover"></div>
      <div class="flex flex-col mt-5 bg-black py-4 help-box">
        <h1 class="text-center font-bold space tracking-widest help-eliminate-hidden-danger">三大功能助力消除隐患</h1>
        <div class="flex justify-between mt-6 help-list">
          <div>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image78d4ecfb51b36699a32eab989bf5d4b3.png" />
            <p>问答</p>
          </div>
          <div>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image5206a70a10664e3094ca56f7b5daa4d0.png" />
            <p>评论</p>
          </div>
          <div>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image3db75212dbc6abcdcda9d72349d98b1e.png" />
            <p>投诉</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style setup>
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
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image6e46e4258d5997b8e7fd28cccf599a63.png");
}

.goto-login-button {
  background: rgb(134, 79, 40);
  border-radius: 5px;
}

.search-button {
  background: rgb(134, 79, 40);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.search-button:focus-visible,
.search-text:focus-visible {
  outline: unset;
}

.search-text:focus-visible,
.search-text:has(~ .search-tips-area:hover) {
  border-bottom-left-radius: 0px;
  transition: all 0s 0ms;
}

.search-tips-area {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
}

.search-text:focus-visible ~ .search-tips-area,
.search-tips-area:hover {
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