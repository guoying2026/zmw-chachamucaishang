<script setup lang="ts">
import { RankingListItem } from '~/types/rankingListItem'

const route = useRoute()

useHead({
  title: '信用排行榜',
})

const headerWidth = ref<string>('100vw');

const currentPage = ref<number>(1);

const pageSize = ref<number>(20);

const paginationSize = ref<number>(5);

const totalPages = ref<number>(9);

const inputPage = ref<number>(currentPage.value);

const list = ref<RankingListItem[]>([
  {
    id: 1,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 2,
    credit_code: '',
    score: 100,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 3,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 4,
    credit_code: '',
    score: 100,
    company_name: '玉林市玉州区木材公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 5,
    credit_code: '',
    score: 100,
    company_name: '温州绿星木材贸易有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },
  {
    id: 1,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 2,
    credit_code: '',
    score: 100,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 3,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 4,
    credit_code: '',
    score: 100,
    company_name: '玉林市玉州区木材公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 5,
    credit_code: '',
    score: 100,
    company_name: '温州绿星木材贸易有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },
  {
    id: 1,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 2,
    credit_code: '',
    score: 100,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 3,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 4,
    credit_code: '',
    score: 100,
    company_name: '玉林市玉州区木材公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 5,
    credit_code: '',
    score: 100,
    company_name: '温州绿星木材贸易有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },
  {
    id: 1,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 2,
    credit_code: '',
    score: 100,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 3,
    credit_code: '',
    score: 100,
    company_name: '江苏木里文化投资有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 4,
    credit_code: '',
    score: 100,
    company_name: '玉林市玉州区木材公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  },{
    id: 5,
    credit_code: '',
    score: 100,
    company_name: '温州绿星木材贸易有限公司',
    corporation: '王国栋',
    address: '山东省临沂市费县探沂镇甘林村S229省道向西500米路南',
    comment_count: 5,
    ask_count: 4,
    complaint_count: 2,
    range: '脚墩、托盘、胶合板',
  }
]);

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

function changeRankNumToElClass(rankNum: number) {
  let list: string[] = [' first', ' second', ' third'];
  return list[rankNum - 1] ?? '';
}

function changeRankDigitsToElClass(rankNum: number) {
  if (rankNum >= 100 && rankNum <= 999) {
    return ' hundred';
  } else if (rankNum >= 1000 && rankNum <= 9999) {
    return ' thousand';
  } else if (rankNum >= 10000 && rankNum <= 99999) {
    return ' ten_thousand';
  } else if (rankNum >= 100000 && rankNum <= 999999) {
    return ' one_hundred_thousand';
  } else if (rankNum >= 1000000 && rankNum <= 9999999) {
    return ' one_hundred_thousand';
  }
  return '';
}
</script>

<template>
  <div class="inline-block w-full bg-no-repeat bg-cover header" :style="'--real-width:'+headerWidth+';'"></div>
  <div class="relative inline-block w-full list" :style="'--real-width:'+headerWidth+';'">
    <div :class="'relative w-11/12 mx-auto bg-no-repeat bg-cover first-of-type:mt-0 item'+changeRankNumToElClass(((currentPage - 1) * pageSize) + index + 1)" :style="'--real-width:'+headerWidth+';'" v-for="(item, index) in list">
      <div class="absolute inline-block bg-contain bg-no-repeat medal"></div>
      <div class="absolute inline-flex justify-center items-center text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold score">{{ item.score }}</div>
      <div :class="'absolute inline-flex justify-center items-center w-full h-full text-xs sm:text-xs md:text-xs lg:text-base xl:text-xl 2xl:text-2xl font-bold rank_num' + changeRankDigitsToElClass(((currentPage - 1) * pageSize) + index + 1)">N0.{{ ((currentPage - 1) * pageSize) + index + 1 }}</div>
      <div class="absolute text-xs md:text-base item-title">{{ item.company_name }}</div>
      <div class="absolute inline-flex flex-row justify-between items-center text-xs whitespace-nowrap pr-4 item-sec_line">
        <div class="relative">法人:{{ item.corporation }}</div>
        <div class="inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative">经营范围:{{ item.range }}</div>
        <div class="hidden md:inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative hidden md:inline-block">评论:{{ item.comment_count }}</div>
        <div class="hidden md:inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative hidden md:inline-block">问答:{{ item.ask_count }}</div>
        <div class="hidden md:inline-flex justify-center items-center separator-wrap">|</div>
        <div class="relative hidden md:inline-block">投诉:{{ item.complaint_count }}</div>
      </div>
      <div class="absolute inline-block text-xs item-third_line">地址:{{ item.address }}</div>
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

<style scoped>
.header {
  height: calc(var(--real-width) * 742 / 750);
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageadd6a50e85826b45099ac8cf7dce84f4.png");
}

.list {
  top: calc((var(--real-width) * 742 / 750) * -0.25);
  min-height: calc(100vh - (var(--real-width) * 742 / 750) + ((var(--real-width) * 742 / 750) * 0.25));
  margin-bottom: calc((var(--real-width) * 742 / 750) * -0.25);
}

.item {
  height: calc((var(--real-width) / 12 * 11) * 190 / 710);
  margin-top: calc(var(--real-width) / 750 * 20);
}

.item.first {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagec82262d52bac98b81b5dfcc6a57e1904.png");
}

.item.second {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image7d5e79ece2ffc2638ff497f2a882153e.png");
}

.item.third {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image8483a5499b3b62432924188925f62603.png");
}

.item {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imagecf926b002ff9ded51090934e1e4f3834.png");
}

.item.first .medal {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image30bf583154265f2c16723b18eaed25e0.png");
}

.item.second .medal {
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image676765f0aebdb93352f2762c7ac79b2d.png");
}

.item.third .medal {
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

.item .score {
  left: calc((var(--real-width) / 12 * 11) / 710 * 70.5);
  top: calc(var(--real-width) / 12 * 11 / 710 * 65);
  width: calc(var(--real-width) / 12 * 11 / 710 * 56);
  height: calc(var(--real-width) / 12 * 11 / 710 * 56);
  font-family: D-DIN;
}

.item.first .rank_num {
  background: linear-gradient(0deg, #EDC452 0%, #FDF6B4 100%);
  -webkit-background-clip: text;
}

.item.second .rank_num {
  background: linear-gradient(0deg, #AFBBE0 0%, #E0E6F8 100%);
  -webkit-background-clip: text;
}

.item.third .rank_num {
  background: linear-gradient(0deg, #FFD4AD 0%, #FFF1E5 100%);
  -webkit-background-clip: text;
}

.item .rank_num {
  background: linear-gradient(0deg, #AFBBE0 0%, #E0E6F8 100%);
  -webkit-background-clip: text;
}

.item .rank_num {
  left: calc((var(--real-width) / 12 * 11) / 710 * 66);
  top: calc(var(--real-width) / 12 * 11 / 710 * 117);
  width: calc(var(--real-width) / 12 * 11 / 710 * 69);
  height: calc(var(--real-width) / 12 * 11 / 710 * 28);
  font-family: D-DIN;
  -webkit-text-fill-color: transparent;
}

.item .rank_num.hundred {
  transform: scale(0.65) translateY(0.6rem);
}

.item .rank_num.thousand {
  transform: scale(0.55) translateY(0.85rem);
}

.item .rank_num.ten_thousand {
  transform: scale(0.45) translateY(1.2rem);
}

.item .rank_num.one_hundred_thousand,
.item .rank_num.million {
  transform: scale(0.35) translateY(1.9rem);
}

.item-title {
  top: calc(((var(--real-width) / 12 * 11) * 190 / 710) / 19 * 3);
  left: calc((var(--real-width) / 12 * 11) / 710 * 234);
  font-family: Source Han Sans CN;
}

.item.first .item-title {
  color: #F0CF92;
}

.item.second .item-title {
  color: #CED5DB;
}

.item.third .item-title {
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

.item .item-sec_line > div:nth-of-type(3) {
  max-width: calc(((var(--real-width) / 12 * 11) / 1258 * 530) / 1.2);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  width: calc((var(--real-width) / 12 * 11) / 710 * 300);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
    min-height: calc(100vh - (var(--real-width) * 1026 / 1920) + ((var(--real-width) * 1026 / 1920) * 0.30) - 66.333px);
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

  .item.first {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image7cd1f3b6161a2e4fcb0ce7a93b124326.png");
  }

  .item.second {
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageaa5e28c778becba8ebc34b1274127da3.png");
  }

  .item.third {
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

  .item .score {
    left: calc((var(--real-width) / 12 * 11) / 1258 * 128);
    top: calc(var(--real-width) / 12 * 11 / 1258 * 53);
    width: calc(var(--real-width) / 12 * 11 / 1258 * 55);
    height: calc(var(--real-width) / 12 * 11 / 1258 * 55);
  }

  .item .rank_num {
    left: calc((var(--real-width) / 12 * 11) / 1258 * 121);
    top: calc(var(--real-width) / 12 * 11 / 1258 * 102);
    width: calc(var(--real-width) / 12 * 11 / 1258 * 70);
    height: calc(var(--real-width) / 12 * 11 / 1258 * 28);
  }

  .item .rank_num.hundred {
    transform: scale(0.9) translateY(0.1rem);
  }

  .item .rank_num.thousand {
    transform: scale(0.7) translateY(0.6rem);
  }

  .item .rank_num.ten_thousand {
    transform: scale(0.6) translateY(0.8rem);
  }

  .item .rank_num.one_hundred_thousand,
  .item .rank_num.million {
    transform: scale(0.5) translateY(1.2rem);
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

  .item .item-sec_line > div:nth-of-type(3) {
    max-width: calc(((var(--real-width) / 12 * 11) / 1258 * 530) / 2);
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