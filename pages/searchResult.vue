<script setup lang="ts">
import { AreaListItem } from '~/types/areaListItem'

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

fetch('http://[::]:3000/area.json').then(res => res.json()).then(res => {
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
  res = res.map(item => {
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
  <div class="fixed w-full">
    <!-- 顶部的筛选和排序 -->
    <div class="w-full inline-flex flex-row justify-evenly py-2">
      <div @click="isShowAreaSelect?hideAreaSelect():showAreaSelect()" class="inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer">
        <span :class="isLeaveMeClosestDistance?'':'font-orange'">{{ areaList[areaFirstSelectedIndex].childs[areaSecondSelectedIndex].name }}</span>
        <svg v-if="isShowAreaSelect" :class="'w-2 h-2 ml-1'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2"/></svg>
        <svg v-else :class="'w-2 h-2 ml-1'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 3h22L12 22"/></svg>
      </div>
      <div @click="changeToLeaveMeClosestDistance" :class="'inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer' + (isLeaveMeClosestDistance ? ' font-orange' : '')">离我最近</div>
    </div>
    <!-- 区域筛选弹出框 -->
    <div :class="'w-full md:w-1/2 ' + (isShowAreaSelect ? 'max-h-screen' : 'max-h-0') + ' inline-flex flex-row justify-start items-start text-sm font-normal pr-0.5 overflow-hidden transition-all area-select-box'">
      <div class="inline-flex flex-col justify-start items-center w-1/3 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList" @click="changeAreaFirstSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full px-6 md:px-2 py-2 cursor-pointer' + (index === areaFirstSelectedIndex ? ' selected' : '') + (index === areaFirstSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
      <div class="inline-flex flex-col justify-start items-center w-2/3 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList[areaFirstSelectedIndex].childs" @click="changeAreaSecondSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full px-8 md:px-2 py-2 cursor-pointer' + (index === areaSecondSelectedIndex ? ' selected' : '') + (index === areaSecondSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
    </div>
  </div>
  <div class="inline-block w-full min-h-screen mt-10 text-sm">
    <div>为你找到了<span class="mx-1 font-orange">183949</span>条相关结果</div>
  </div>
</template>

<style scoped>
.area-select-box {
  height: 50vh;
  background-color: rgb(30,30,30);
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

.font-orange {
  color: rgb(253,148,53);
}

@media (min-width: 768px) {
  .area-select-box {
    margin-left: 25%;
  }
}
</style>