<template>
  <client-only>
    <!-- 圆形表示半径为50公里的范围 -->
    <baidu-map ref="mapRef" class="map" :mapStyle="mapStyle" :center="center" :zoom="zoom" @ready="ready" :scroll-wheel-zoom="false" min-zoom="3" max-zoom="20">
<!--      radius的单位是m，半径为15km的商家-->
      <bm-circle :center="center" :radius="15000" :fill-color="'#D1E8F9'" :stroke-color="'#6FC3F8'" :stroke-opacity="0" strokeWeight="1" strokeStyle="solid" :fill-opacity="0.2" v-if="isNearBy">
      </bm-circle>
      <bm-marker :position="center" :icon="customIcon">
        <bm-label :content="address" :label-style="{color: 'black',fontSize:'14px',border:'none'}" :offset="{width: -150, height: 40}"/>
      </bm-marker>
    </baidu-map>
  </client-only>
</template>
<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
<script setup lang="ts">
import {BaiduMap} from "vue-baidu-map-3x";
import {ref} from "vue";

const mapStyle = ref({
  styleJson: [
    // {
    //   "featureType": "land",
    //   "elementType": "geometry",
    //   "stylers": {
    //     "visibility": "on",
    //     "color": "#091220ff"
    //   }
    // }, {
    //   "featureType": "water",
    //   "elementType": "geometry",
    //   "stylers": {
    //     "visibility": "on",
    //     "color": "#113549ff"
    //   }
    // },
    {
      "stylers":{
        "border-radius": "10px"
      }
    },
  ]
});
const props = defineProps({
  lng: {
    type: Number,
    default: 0,
  },
  lat: {
    type: Number,
    default: 0,
  },
  address:{
    type: String,
    default: '',
  },
  isNearBy:{
    type: Boolean,
    default: false,
  }
});
const center = ref({lng: props.lng, lat: props.lat});
const zoom = ref(12);
//地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例。
// 百度地图组件是异步加载，请不要尝试在组件的生命周期中访问 BMap 核心类和 map 实例，
// 如有需要，请在所需组件的 ready 事件回调函数的参数中获取。
//商家地址
let bMap: { Point: new (arg0: number, arg1: number) => any; };
let mapInstance: {
  centerAndZoom: (arg0: any, arg1: number) => void;
};
const mapRef = ref<HTMLMapElement |null>(null);
const ready = ({ BMap , map }: { BMap: any, map: any })=>{
  bMap = BMap;
  mapInstance = map;
  // 对地图进行自定义操作// {lng: 118.906004, lat: 33.962873}
  center.value.lng = props.lng;
  center.value.lat = props.lat;
  zoom.value = 12;
  // console.log('mapRef');
  // console.log(mapRef);
  // if (mapRef.value) {
  //   const mapDiv = mapRef.value.querySelector('div:first-child') as HTMLElement;
  //   console.log(mapDiv);
  //   if (mapDiv) {
  //     mapDiv.style.borderRadius = '10px';
  //   }
  // }
}
const customIcon = {
  url: 'https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_71edf3c7-3390-4163-bb3f-9d06b7afd43f.png',  // 修改为你的图标路径
  size: {width: 60, height: 60},    // 修改为你想要的大小
  // ... 可以设置其他图标属性，如offset、anchor等
};
</script>
