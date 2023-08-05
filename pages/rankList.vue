<script setup lang="ts">
const route = useRoute()

useHead({
  title: '信用排行榜',
})

const headerWidth = ref<string>('100vw');

const currentPage = ref<number>(1);

const paginationSize = ref<number>(5);

const totalPages = ref<number>(9);

const inputPage = ref<number>(currentPage.value);

function jumpToPrevPage() {
  if (currentPage.value - 1 > 0) {
    currentPage.value = currentPage.value - 1;
  } else {
    currentPage.value = 1;
  }
}

function jumpToNextPage() {
  if (currentPage.value + 1 <= totalPages.value) {
    currentPage.value = currentPage.value + 1;
  } else {
    currentPage.value = totalPages.value;
  }
}

function jumpToPage(page: number) {
  if (page < 1) page = 1
  if (page > totalPages.value) page = totalPages.value
  currentPage.value = page;
}

function jumpToInputPage() {
  jumpToPage(Number(inputPage.value));
}
</script>

<template>
  <div class="inline-block w-full bg-no-repeat bg-cover header" :style="'--real-width:'+headerWidth+';'"></div>
  <div class="relative inline-block w-full list" :style="'--real-width:'+headerWidth+';'">
    <div class="relative w-11/12 mx-auto bg-no-repeat bg-cover first-of-type:mt-0 item" :style="'--real-width:'+headerWidth+';'" v-for="n in 5">
      <div class="absolute inline-block bg-contain bg-no-repeat medal">
        <div class="absolute inline-flex justify-center items-center w-full h-full text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold score">100</div>
        <div class="absolute inline-flex justify-center items-end w-full h-full text-xs sm:text-xs md:text-xs lg:text-base xl:text-xl 2xl:text-2xl font-bold rank_num">N0.{{ n }}</div>
      </div>
      <div class="absolute text-xs md:text-base item-title">江苏木里文化投资有限公司</div>
      <div class="absolute inline-flex flex-row justify-between items-center text-xs whitespace-nowrap pr-4 item-sec_line">
        <div class="relative">法人:王国栋</div>
        <div class="inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative">山东临沂</div>
        <div class="hidden md:inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative hidden md:inline-block">评论:7</div>
        <div class="hidden md:inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative hidden md:inline-block">问答:5</div>
        <div class="hidden md:inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative hidden md:inline-block">投诉:2</div>
      </div>
      <div class="absolute inline-flex items-center text-xs item-third_line">经营范围: 脚墩、托盘、胶合板...</div>
    </div>
  </div>
  <div class="relative hidden md:inline-flex justify-center items-center w-full text-xs my-5 pagination" :style="'--real-width:'+headerWidth+';'">
    <div class="inline-flex justify-center items-center mr-5 page-button" v-if="currentPage > 1" @click="jumpToPrevPage">上一页</div>
    <template v-if="totalPages <= paginationSize">
      <template v-for="i in totalPages">
        <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
    </template>
    <template v-else-if="currentPage <= paginationSize - 2 && totalPages >= paginationSize + 2">
      <template v-for=" i in paginationSize - 1">
        <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === totalPages ? ' selected' : '')" @click="jumpToPage(totalPages)">{{ totalPages }}</div>
    </template>
    <template v-else-if="currentPage <= paginationSize - 2 && totalPages < paginationSize + 2">
      <template v-for=" i in paginationSize - 1">
        <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === totalPages ? ' selected' : '')" @click="jumpToPage(totalPages)">{{ totalPages }}</div>
    </template>
    <template v-else-if="currentPage >= totalPages - paginationSize + 3">
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === 1 ? ' selected' : '')" @click="jumpToPage(1)">1</div>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <template v-for="i in totalPages">
        <div v-if="i >= totalPages - paginationSize + 2" :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
    </template>
    <template v-else>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === 1 ? ' selected' : '')" @click="jumpToPage(1)">1</div>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <template v-for="i in currentPage + 1">
        <div v-if="i >= currentPage - 1" :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === totalPages ? ' selected' : '')" @click="jumpToPage(totalPages)">{{ totalPages }}</div>
    </template>
    <div class="inline-flex justify-center items-center mr-5 jump-to">
      <span>跳到</span>
      <input class="w-16 mx-2 text-center" type="text" v-model="inputPage" @keyup.enter="jumpToInputPage" />
      <button @click="jumpToInputPage">确定</button>
    </div>
    <div class="inline-flex justify-center items-center mr-5 page-button" v-if="currentPage < totalPages" @click="jumpToNextPage">下一页</div>
  </div>
</template>

<style setup>
.header {
  height: calc(var(--real-width) * 742 / 750);
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageadd6a50e85826b45099ac8cf7dce84f4.png");
}

.list {
  top: calc((var(--real-width) * 742 / 750) * -0.25);
  min-height: calc(100vh - (var(--real-width) * 742 / 750));
  margin-bottom: calc((var(--real-width) * 742 / 750) * -0.25);
}

.item {
  height: calc((var(--real-width) / 12 * 11) * 190 / 710);
  margin-top: calc(var(--real-width) / 750 * 20);
}

.item:nth-of-type(1) {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagec82262d52bac98b81b5dfcc6a57e1904.png");
}

.item:nth-of-type(2) {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image7d5e79ece2ffc2638ff497f2a882153e.png");
}

.item:nth-of-type(3) {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image8483a5499b3b62432924188925f62603.png");
}

.item {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagecf926b002ff9ded51090934e1e4f3834.png");
}

.item:nth-of-type(1) .medal {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image30bf583154265f2c16723b18eaed25e0.png");
}

.item:nth-of-type(2) .medal {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image676765f0aebdb93352f2762c7ac79b2d.png");
}

.item:nth-of-type(3) .medal {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image730371f66d0949790ab2797c7076e224.png");
}

.item .medal {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagedaadad28efd199a6bdd5f4c53db0c289.png");
}

.item .medal {
  left: calc((var(--real-width) / 12 * 11) / 710 * 27);
  top: calc(var(--real-width) / 12 * 11 / 710 * 43);
  width: calc(var(--real-width) / 12 * 11 / 710 * 146);
  height: calc(var(--real-width) / 12 * 11 / 710 * 103);
}

.item .medal .score {
  font-family: D-DIN;
}

.item:nth-of-type(1) .medal .rank_num {
  background: linear-gradient(0deg, #EDC452 0%, #FDF6B4 100%);
  -webkit-background-clip: text;
}

.item:nth-of-type(2) .medal .rank_num {
  background: linear-gradient(0deg, #AFBBE0 0%, #E0E6F8 100%);
  -webkit-background-clip: text;
}

.item:nth-of-type(3) .medal .rank_num {
  background: linear-gradient(0deg, #FFD4AD 0%, #FFF1E5 100%);
  -webkit-background-clip: text;
}

.item .medal .rank_num {
  background: linear-gradient(0deg, #AFBBE0 0%, #E0E6F8 100%);
  -webkit-background-clip: text;
}

.item .medal .rank_num {
  font-family: D-DIN;
  -webkit-text-fill-color: transparent;
}

.item-title {
  top: calc(((var(--real-width) / 12 * 11) * 190 / 710) / 19 * 3);
  left: calc((var(--real-width) / 12 * 11) / 710 * 234);
  font-family: Source Han Sans CN;
}

.item:nth-of-type(1) .item-title {
  color: #F0CF92;
}

.item:nth-of-type(2) .item-title {
  color: #CED5DB;
}

.item:nth-of-type(3) .item-title {
  color: #E3A061;
}

.item .item-title {
  color: #FFFFFF;
}

.item .item-sec_line,
.item .item-third_line {
  font-family: Source Han Sans CN;
}

.item .item-sec_line {
  top: calc(((var(--real-width) / 12 * 11) * 190 / 710) / 190 * 95);
  left: calc((var(--real-width) / 12 * 11) / 710 * 234);
  width: calc((var(--real-width) / 12 * 11) / 710 * 445);
}

.item .separator-wrap {
  width: 1px;
  height: 1rem;
  color: #fff;
  opacity: 0.1;
}

.item .item-third_line {
  top: calc(((var(--real-width) / 12 * 11) * 190 / 710) / 190 * 139);
  left: calc((var(--real-width) / 12 * 11) / 710 * 234);
  width: calc((var(--real-width) / 12 * 11) / 710 * 445);
}

.pagination .page-button {
  color: #999999;
  padding: 4.5px 10px 4.5px 9px;
  border: 1px solid #5B5A5C;
  border-radius: 2px;
}

.pagination .page-button.selected {
  color: #FFFFFF;
  background: #32323C;
  cursor: default;
}

.pagination .page-button:not(.selected) {
  cursor: pointer;
}

.pagination .jump-to,
.pagination .ellipsis {
  color: #999999;
}

.pagination .jump-to input {
  width: 4rem;
  background: transparent;
  padding: 4.5px 1px;
  border: 1px solid #5B5A5C;
  border-radius: 2px;
}

.pagination .jump-to input:focus-visible {
  outline: unset;
}

.pagination .jump-to button {
  font-family: Adobe Heiti Std;
  color: #FF9B40;
  padding: 4.5px 10px 4.5px 9px;
  border: 1px solid #5B5A5C;
  border-radius: 2px;
}

@media (min-width: 768px) {
  .header {
    height: calc(var(--real-width) * 1026 / 1920);
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image246a9620b6db97ac8874967dcd8fbe92.png");
  }

  .list {
    top: calc((var(--real-width) * 1026 / 1920) * -0.30);
    width: calc(var(--real-width) / 1920 * 1380);
    min-height: calc(100vh - (var(--real-width) * 1026 / 1920));
    background: #0F0F14;
    margin-left: calc((var(--real-width) - (var(--real-width) / 1920 * 1380)) / 2);
    margin-bottom: calc((var(--real-width) * 1026 / 1920) * -0.30);
    padding-top: calc(var(--real-width) / 1920 * 45);
    padding-bottom: calc(var(--real-width) / 1920 * 45);
  }

  .item {
    height: calc((var(--real-width) / 12 * 11) * 160 / 1258);
    margin-top: calc(var(--real-width) / 1920 * 19);
  }

  .item:nth-of-type(1) {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image7cd1f3b6161a2e4fcb0ce7a93b124326.png");
  }

  .item:nth-of-type(2) {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageaa5e28c778becba8ebc34b1274127da3.png");
  }

  .item:nth-of-type(3) {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image4d01d698c0df2c77de87023ccfe7c242.png");
  }

  .item {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageb8c258179e015857eef693ef50a243ce.png");
  }

  .item .medal {
    left: calc((var(--real-width) / 12 * 11) / 1258 * 83);
    top: calc(var(--real-width) / 12 * 11 / 1258 * 29);
    width: calc(var(--real-width) / 12 * 11 / 1258 * 146);
    height: calc(var(--real-width) / 12 * 11 / 1258 * 103);
  }

  .item-title {
    top: calc(((var(--real-width) / 12 * 11) * 160 / 1258) / 160 * 30);
    left: calc((var(--real-width) / 12 * 11) / 1258 * 373);
    font-size: calc((var(--real-width) / 12 * 11) * 0.025);
  }

  .item .item-sec_line {
    top: calc(((var(--real-width) / 12 * 11) * 160 / 1258) / 160 * 90);
    left: calc((var(--real-width) / 12 * 11) / 1258 * 373);
    width: calc((var(--real-width) / 12 * 11) / 1258 * 530);
  }

  .item .item-third_line {
    top: calc(((var(--real-width) / 12 * 11) * 160 / 1258) / 160 * 121);
    left: calc((var(--real-width) / 12 * 11) / 1258 * 373);
  }
}

@media (min-width: 1024px) {
  .item-title {
    top: calc(((var(--real-width) / 12 * 11) * 160 / 1258) / 160 * 35);
  }
}

@media (min-width: 1280px) {
  .item-title {
    top: calc(((var(--real-width) / 12 * 11) * 160 / 1258) / 160 * 39);
  }
}
</style>