<script setup lang="ts">
 const route = useRoute()

 useHead({
  title: '信用排行榜',
 })

 const headerWidth = ref<string>('100vw');
</script>

<template>
  <div class="inline-block w-full bg-no-repeat bg-cover header" :style="'--real-width:'+headerWidth+';'"></div>
  <div class="relative inline-block w-full list" :style="'--real-width:'+headerWidth+';'">
    <div class="relative w-11/12 mx-auto bg-no-repeat bg-cover first-of-type:mt-0 item" :style="'--real-width:'+headerWidth+';'" v-for="n in 5">
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
</template>

<style setup>
.header {
  height: calc(var(--real-width) * 742 / 750);
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_imageadd6a50e85826b45099ac8cf7dce84f4.png");
}

.list {
  top: calc((var(--real-width) * 742 / 750) * -0.25);
  min-height: calc(100vh - (var(--real-width) * 742 / 750));
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

.item-title {
  top: calc(((var(--real-width) / 12 * 11) * 190 / 710) / 19 * 3);
  left: calc((var(--real-width) / 12 * 11) / 710 * 234);
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
    top: calc(((var(--real-width) / 12 * 11) * 160 / 1258) / 160 * 40);
  }
}
</style>