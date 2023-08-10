<script setup lang="ts">
import { AreaListItem } from '~/types/areaListItem'

import { SearchResultListItem } from '~/types/searchResultListItem'

const route = useRoute()

const nuxtApp = useNuxtApp()

useHead({
  title: '搜索结果',
})

const areaList = ref<AreaListItem[]>([{
  code: 0,
  name: '全国',
  childs: [{
    code: 0,
    name: '全国',
    childs: [],
  }],
},{
  code: 44,
  name: '广东省',
  childs: [{
    code: 44,
    name: '广东省全省',
    childs: [],
  },{
    code: 4401,
    name: '广州市',
    childs: [],
  },{
    code: 4402,
    name: '深圳市',
    childs: [],
  },{
    code: 4403,
    name: '珠海市',
    childs: [],
  },{
    code: 4405,
    name: '汕头市',
    childs: [],
  }],
}]);

fetch('/area.json').then(res => res.json()).then(res => {
  /* // 处理直辖市，把地级市级的“市辖区”删除，把区县级移到地级市级
  res = res.map(item => {
    if ([11, 12, 31, 50].includes(Number(item.code))) {
      item.childs = item.childs[0].childs;
      return item;
    }
    item.childs = item.childs.map(subitem => {
      subitem.childs = [];
      return subitem;
    });
    return item;
  }); */
  // 添加“全(省/市/自治区)”
  res = res.map((item: AreaListItem) => {
    let end = '';
    if (item.name.includes('自治区')) {
      end = '全自治区';
    } else if (item.name.includes('市')) {
      end = '全市';
    } else {
      end = '全省';
    }
    item.childs.unshift({
      code: item.code,
      name: item.name + end,
      childs: [],
    });
    return item;
  });
  // 添加“全国”
  res.unshift({
    code: 0,
    name: '全国',
    childs: [{
      code: 0,
      name: '全国',
      childs: [],
    }],
  });
  console.log(res);
  areaList.value = res;
});

const isShowAreaSelect = ref<boolean>(false)

const areaFirstSelectedIndex = ref<number>(0)

const areaSecondSelectedIndex = ref<number>(0)

const isLeaveMeClosestDistance = ref<boolean>(false)

const geoLocationId = ref<number>(-1)

const totalCountOfSearchResult = ref<number>(183949)

const searchResultList = ref<SearchResultListItem[]>([
  {
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: ['13800138000', '15018375194', '17796224896', '17819180351'],
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
  }
])

const isShowPhonePopup = ref<boolean>(false)

const showPhoneIndex = ref<number>(-1)

const isShowMoreProvinceSelect = ref<boolean>(false)

const isCanMultiSelectProvince = ref<boolean>(false)

function showAreaSelect() {
  isShowAreaSelect.value = true;
}

function hideAreaSelect() {
  isShowAreaSelect.value = false;
}

function changeAreaFirstSelectedIndex(index: number) {
  areaFirstSelectedIndex.value = index;
  isLeaveMeClosestDistance.value = false;
  areaSecondSelectedIndex.value = 0;
}

function changeAreaSecondSelectedIndex(index: number) {
  areaSecondSelectedIndex.value = index;
  isLeaveMeClosestDistance.value = false;
  hideAreaSelect();
}

function encryptPhone(phone: string | number | string[]) {
  if (typeof phone === 'object' && phone instanceof Array) {
    phone = phone[0];
  }
  if (typeof phone === 'number') {
    phone = phone.toString();
  }
  phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1********');
  return phone;
}

function showPhonePopup() {
  isShowPhonePopup.value = true
}

function hidePhonePopup() {
  isShowPhonePopup.value = false
}

function showAllPhone(index: number) {
  showPhoneIndex.value = index;
  showPhonePopup();
}

function changeToLeaveMeClosestDistance() {
  getGeoPosition();
}
function getGeoPosition() {
  geoLocationId.value = navigator.geolocation.watchPosition(success, (err) => {
    console.log(err);
    if (err.code === 1) {
      console.log('您拒绝了该网站获取地理位置的权限');
    } else if (err.code === 2) {
      console.log('位置服务不可用');
    } else if (err.code === 3) {
      console.log('获取地理位置超时');
    }
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
  function success (pos: GeolocationPosition) {
    var crd = pos.coords;
    console.log(crd);
    isLeaveMeClosestDistance.value = true;
  }
  navigator.geolocation.getCurrentPosition(success)
  navigator.geolocation.clearWatch(geoLocationId.value);
  geoLocationId.value = -1;
}
</script>

<template>
  <!-- 移动端筛选 -->
  <div class="fixed md:hidden w-full">
    <!-- 顶部的筛选和排序 -->
    <div class="relative w-full inline-flex flex-row justify-evenly bg-black py-2 z-10">
      <div @click="isShowAreaSelect?hideAreaSelect():showAreaSelect()" class="inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer">
        <span :class="isLeaveMeClosestDistance?'':'font-orange'">{{ areaList[areaFirstSelectedIndex].childs[areaSecondSelectedIndex].name }}</span>
        <svg v-if="isShowAreaSelect" :class="'w-2 h-2 ml-1'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2"/></svg>
        <svg v-else :class="'w-2 h-2 ml-1'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 3h22L12 22"/></svg>
      </div>
      <div @click="changeToLeaveMeClosestDistance" :class="'inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer' + (isLeaveMeClosestDistance ? ' font-orange' : '')">离我最近</div>
    </div>
    <!-- 区域筛选弹出框 -->
    <div @click="hideAreaSelect" :class="'absolute top-0 left-0 inline-block w-screen ' + (isShowAreaSelect ? 'h-screen' : 'h-0') + ' z-0 transition-all area-select-box-cover'"></div>
    <div :class="'relative w-full md:w-1/2 ' + (isShowAreaSelect ? 'max-h-screen' : 'max-h-0') + ' inline-flex flex-row justify-start items-start text-sm font-normal pr-0.5 overflow-hidden z-10 rounded-bl rounded-br transition-all area-select-box'">
      <div class="inline-flex flex-col justify-start items-center w-5/12 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList" @click="changeAreaFirstSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full p-2 whitespace-nowrap cursor-pointer' + (index === areaFirstSelectedIndex ? ' selected' : '') + (index === areaFirstSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
      <div class="inline-flex flex-col justify-start items-center w-7/12 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList[areaFirstSelectedIndex].childs" @click="changeAreaSecondSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full p-2 whitespace-nowrap cursor-pointer' + (index === areaSecondSelectedIndex ? ' selected' : '') + (index === areaSecondSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
    </div>
  </div>
  <!-- pc端筛选 -->
  <div class="hidden md:flex flex-col w-full lg:w-11/12 lg:mx-auto py-4 rounded-xl select-box-pc">
    <div class="px-4 text-lg">筛选条件</div>
    <div :class="'inline-flex flex-row justify-start items-start w-full ' + (isShowMoreProvinceSelect ? 'max-h-full' : 'max-h-5') + ' px-4 text-sm overflow-hidden transition-all'">
      <div class="inline-flex whitespace-nowrap select-item-title">省份地区</div>
      <div v-if="isCanMultiSelectProvince"></div>
      <div v-else class="inline-flex flex-row flex-wrap ml-4">
        <template v-for="(item, index) in areaList">
          <div v-if="index > 0" class="mr-4 last-of-type:mr-0 whitespace-nowrap cursor-pointer">{{ item.name }}</div>
        </template>
      </div>
      <div @click.stop="isShowMoreProvinceSelect = !isShowMoreProvinceSelect" class="inline-flex flex-row items-center whitespace-nowrap ml-4 cursor-pointer select-item-title-expand-more-button">
        更多
        <svg v-if="isShowMoreProvinceSelect" class="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.594l-.72.687l-12.5 12.5l1.44 1.44L16 9.437l11.78 11.78l1.44-1.437l-12.5-12.5l-.72-.686z"/></svg>
        <svg v-else class="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m4.22 10.78l-1.44 1.44l12.5 12.5l.72.686l.72-.687l12.5-12.5l-1.44-1.44L16 22.564L4.22 10.78z"/></svg>
      </div>
      <div @click.stop="isCanMultiSelectProvince = !isCanMultiSelectProvince" :class="'inline-flex flex-row items-center whitespace-nowrap ml-4 cursor-pointer ' + (isCanMultiSelectProvince ? 'to-cancel-multi-select-province' : 'font-orange')">
        <template v-if="isCanMultiSelectProvince">取消多选</template>
        <template v-else>
          多选
          <svg class="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path stroke-width="2" stroke="currentColor" id="svg_1" d="m16.76341,5.40201 v-3 h-15 v15 h3.2 v-11.3 h10z" /><rect stroke-width="2" stroke="currentColor" fill="transparent" id="svg_2" height="14.71381" width="15" y="6" x="5.5329"/><line stroke-width="2" stroke="currentColor" id="svg_3" y2="18.99872" x2="12.14711" y1="14.02504" x1="7.31839"/><path stroke-width="2" stroke="currentColor" id="svg_4" d="m19.20346,8.98684l-7.51799,10.2157"/></g></svg>
        </template>
      </div>
    </div>
    <div class="inline-flex flex-row justify-start items-start w-full px-4 text-sm">
      <div class="inline-flex whitespace-nowrap select-item-title">商家距离</div>
      <div class="inline-flex flex-row flex-wrap ml-4">
        <div class="mr-4 whitespace-nowrap cursor-pointer">全部</div>
        <div class="mr-0 whitespace-nowrap cursor-pointer">离我最近</div>
      </div>
    </div>
  </div>
  <div class="inline-block md:block w-full lg:w-11/12 min-h-screen mt-1 md:mt-0 lg:mx-auto text-sm">
    <div class="px-4 py-2 mt-10 md:mt-0 search_find_num_tips">为你找到了<span class="mx-1 font-orange">{{ totalCountOfSearchResult }}</span>条相关结果</div>
    <!-- 搜索结果列表 -->
    <div class="inline-flex flex-col w-full">
      <!-- 搜索结果项 -->
      <NuxtLink to="detail" class="inline-flex flex-col py-4 mt-4 first-of-type:mt-0 rounded-xl first-of-type:rounded-t-none md:first-of-type:rounded-t-xl search-list-item" v-for="(item, index) in searchResultList">
        <!-- 搜索结果项 - 第一行 -->
        <div class="inline-flex flex-row px-4">
          <img class="w-8 h-8 md:w-24 md:h-24 rounded-md" :src="item.company_img" />
          <div class="inline-flex flex-row items-center h-full pl-2">
            <span class="md:text-2xl md:font-bold">{{ item.company_name }}</span>
            <span class="inline-block w-max h-max px-1 ml-2 text-xs border border-solid rounded zaiye">{{ item.operation_state }}</span>
          </div>
        </div>
        <!-- 搜索结果项 - 第二行 -->
        <div class="inline-flex md:hidden flex-row justify-evenly text-xs px-4 mt-2">
          <div class="inline-flex flex-col items-center">
            <span>法定代表人</span>
            <span class="mt-1">{{ item.corporation }}</span>
          </div>
          <div class="inline-flex flex-col items-center">
            <span>成立日期</span>
            <span class="mt-1">{{ item.foundation_date }}</span>
          </div>
          <div class="inline-flex flex-col items-center">
            <span>电话</span>
            <div class="inline-flex flex-row items-center mt-1">
              <span>{{ encryptPhone(item.contact_phone) }}</span>
              <button v-if="typeof item.contact_phone === 'object' && item.contact_phone instanceof Array && item.contact_phone.length > 1" @click.stop.prevent="showAllPhone(index)" class="ml-1 font-orange">更多</button>
            </div>
          </div>
        </div>
        <div class="hidden md:inline-flex">
          <div>
            <span>法定代表人:</span>
            <span>{{ item.corporation }}</span>
          </div>
          <div>
            <span>成立日期:</span>
            <span>{{ item.foundation_date }}</span>
          </div>
          <div>
            <span>邮箱:</span>
            <span>{{ item.email }}</span>
          </div>
        </div>
        <div class="hidden md:inline-flex">
          <div>
            <span>电话:</span>
            <div>
              <span>{{ encryptPhone(item.contact_phone) }}</span>
              <button v-if="typeof item.contact_phone === 'object' && item.contact_phone instanceof Array && item.contact_phone.length > 1" @click.stop.prevent="showAllPhone(index)" class="ml-1 font-orange">更多</button>
            </div>
          </div>
          <div>
            <span>社会统一信用代码:</span>
            <span>{{ item.credit_code }}</span>
          </div>
        </div>
        <!-- 搜索结果项 - 第三行 -->
        <div class="inline-flex w-full text-xs px-4 pt-4 mt-4 whitespace-nowrap overflow-hidden border-solid">地址：<span class="inline-block w-full text-xs text-white whitespace-nowrap text-ellipsis overflow-hidden">{{ item.address }}</span></div>
        <!-- 搜索结果项 - 第四行 -->
        <div class="inline-flex w-full text-xs px-4 pt-4 mt-4 whitespace-nowrap overflow-hidden border-solid">经营范围：<span class="inline-block w-full text-xs text-white whitespace-nowrap text-ellipsis overflow-hidden">{{ item.business_scope }}</span></div>
      </NuxtLink>
    </div>
  </div>
  <!-- 电话号码展示弹窗 -->
  <div @click.stop="hidePhonePopup" :class="'fixed ' + (isShowPhonePopup ? 'left-0 top-0' : 'left-1/2 top-1/2') + ' inline-flex justify-center items-center ' + (isShowPhonePopup ? 'w-full h-full' : 'w-0 h-0') + ' bg-black bg-opacity-50 transition-all'">
    <div @click.stop="false" :class="'inline-flex flex-col w-3/4 md:w-1/2 lg:w-1/3 ' + (isShowPhonePopup ? 'max-h-screen' : 'max-h-0') + ' min-h-max px-2 ' + (isShowPhonePopup ? 'py-4' : 'py-0') + ' bg-white text-black rounded-xl overflow-hidden shadow transition-all'">
      <div class="relative inline-flex justify-center items-center text-xl font-bold">
        <div>电话号码</div>
        <svg @click.stop="hidePhonePopup" class="absolute right-0 top-0 w-5 h-5" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      </div>
      <div class="inline-flex flex-col items-center h-full mt-2">
        <div class="inline-flex justify-center w-full h-full py-4 border-t border-solid last-of-type:border-b" v-for="item in searchResultList[showPhoneIndex]?.contact_phone">{{ encryptPhone(item) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.area-select-box-cover {
  background-color: rgba(0,0,0,0.5);
}

.area-select-box {
  height: 50vh;
  background-color: rgb(30,30,30);
  box-shadow: 0px 20px 20px 0px #151515;
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

.area-select-box ::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.area-select-box:hover ::-webkit-scrollbar-thumb {
  visibility: visible;
}

.area-select-box > div {
  overflow-y: overlay;
}

.area-select-box > div:first-of-type {
  background: rgb(23,23,23);
}

.area-select-box > div:first-of-type div.selected {
  background: rgb(30,30,30);
}

.area-select-box > div:last-of-type {
  background: rgb(30,30,30);
}

.area-select-box > div:last-of-type div.selected {
  
}

.search_find_num_tips {
  color: rgb(153,153,153);
}

@media (max-width: 767px) {
  .search_find_num_tips {
    background-color: rgb(18,18,19);
  }
}

.search-list-item {
  background-color: rgb(27,27,27);
}

.zaiye {
  color: rgb(31,167,101);
  border-color: rgb(31,167,101);
}

.select-box-pc {
  background-color: rgb(45,45,45);
}

.select-item-title,
.select-item-title-expand-more-button,
.to-cancel-multi-select-province,
.search-list-item > div:nth-of-type(2) > div > span:nth-of-type(1),
.search-list-item > div:nth-of-type(3),
.search-list-item > div:nth-of-type(4) {
  color: rgb(151,151,151);
}

.search-list-item > div:nth-of-type(3),
.search-list-item > div:nth-of-type(4) {
  border-top-width: 1px;
  border-color: rgb(39,39,39);
}

.font-orange {
  color: rgb(253,148,53);
}

@media (min-width: 768px) {
  .area-select-box {
    margin-left: 25%;
  }
}
</style>