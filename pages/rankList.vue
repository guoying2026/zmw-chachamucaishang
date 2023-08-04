<script setup lang="ts">
 const route = useRoute()

 const headerWidth = ref<string>('100vw');
</script>

<template>
  <div class="inline-block w-full bg-no-repeat bg-cover header" :style="'--real-width:'+headerWidth+';'"></div>
  <div class="inline-block w-full list" :style="'--real-width:'+headerWidth+';'">
    <div class="w-11/12 mx-auto bg-no-repeat bg-cover item" :style="'--real-width:'+headerWidth+';'"></div>
    <div class="w-11/12 mx-auto bg-no-repeat bg-cover item" :style="'--real-width:'+headerWidth+';'"></div>
    <div class="w-11/12 mx-auto bg-no-repeat bg-cover item" :style="'--real-width:'+headerWidth+';'"></div>
    <div class="w-11/12 mx-auto bg-no-repeat bg-cover item" :style="'--real-width:'+headerWidth+';'"></div>
  </div>
</template>

<style setup>
.header {
  height: calc(var(--real-width) * 742 / 750);
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageadd6a50e85826b45099ac8cf7dce84f4.png");
}

.list {
  min-height: calc(100vh - (var(--real-width) * 742 / 750));
  background: rgb(1,1,2);
}

.item {
  height: calc((var(--real-width) / 12 * 11) * 160 / 1258);
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

@media (min-width: 768px) {
  .header {
    height: calc(var(--real-width) * 1026 / 1920);
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image246a9620b6db97ac8874967dcd8fbe92.png");
  }

  .list {
    min-height: calc(100vh - (var(--real-width) * 1026 / 1920));
  }

  .item {
    height: calc((var(--real-width) / 12 * 11) * 190 / 710);
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
}
</style>