<script setup lang="ts">
const route = useRoute()

const router = useRouter()

const nuxtApp = useNuxtApp()

const aboutUsList = ref<{name:string,url:string}[]>([
  {
    name: '用户帮助',
    url: '',
  },
  {
    name: '更新说明',
    url: '',
  },
  {
    name: '隐私政策',
    url: '',
  },
  {
    name: '用户协议',
    url: '',
  },
  {
    name: '问题反馈',
    url: '',
  },
  {
    name: '品类标签',
    url: '',
  },
  {
    name: '名词百科',
    url: '',
  },
])

const contactUsList = ref<string[]>([
  '工作时间：周一至周六9:00-18:00',
  '邮箱：service@zhenmuwang.com',
  '电话：0754-87120926',
  '地址：广东省汕头市龙湖区金霞街道科技西路杰思信息大厦',
])

const ourServiceList = ref<{name:string,url:string}[]>([
  {
    name: '我们的服务',
    url: '',
  },
  {
    name: '企业查询服务',
    url: '',
  },
  {
    name: '木材信用分',
    url: '',
  },
  {
    name: '信用分排行榜',
    url: '',
  },
  {
    name: '处罚公示',
    url: '',
  },
  {
    name: '失信记录',
    url: '',
  },
  {
    name: '木材商黑名单',
    url: '',
  },
])

const dataSourceList = ref<{name:string,url:string}[]>([
  {
    name: '全国企业信用信息公示系统',
    url: ''
  },
  {
    name: '中国裁判文书网',
    url: ''
  },
  {
    name: '中国执行信息公开网',
    url: ''
  },
  {
    name: '国家知识产权局',
    url: ''
  },
  {
    name: '国家版权局',
    url: ''
  },
])

const copyRightStartYear = ref<number>(2013)

const copyRightEndYear = ref<number>((new Date()).getFullYear())
</script>

<template>
  <div class="footer">
    <ClientOnly>
      <div class="hidden md:inline-flex flex-wrap flex-col md:flex-row justify-between lg:justify-evenly w-full top">
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-3/12 min-w-fit about-us">
          <h1 class="title">关于我们</h1>
          <ul class="list-none grid grid-cols-3 gap-x-5 gap-y-4 w-full text-left whitespace-nowrap">
            <li class="min-w-min" v-for="item in aboutUsList">
              <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-5/12 min-w-min contact-us">
          <h1 class="title">联系我们</h1>
          <ul class="list-none inline-flex flex-col text-center md:text-left whitespace-nowrap">
            <li v-for="item in contactUsList">{{ item }}</li>
          </ul>
        </div>
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-2/12 miniapp-code">
          <h1 class="title">&nbsp;</h1>
          <div class="inline-flex flex-col items-center">
            <svg class="w-full h-full rounded-xl" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" width="888" height="888" viewBox="0 0 888 888">
              <rect width="888" height="888" fill="#ffffff" x="0" y="0"></rect>
              <g fill="#000000">
              <g transform="translate(240,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,48) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,72) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,96) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,120) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,144) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,168) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,192) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,216) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,240) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(168,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,264) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,288) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,312) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,336) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(168,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,360) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(168,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,384) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,408) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,432) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(168,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,456) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,480) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,504) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(168,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,528) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(72,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,552) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(216,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,576) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(120,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(144,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,600) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(96,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(192,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,624) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,648) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,672) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,696) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(360,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,720) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(288,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(432,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(720,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(816,744) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(240,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(408,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(744,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,768) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(264,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(384,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(456,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(480,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(528,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(648,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(696,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(768,792) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(312,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(336,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(504,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(552,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(576,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(600,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(624,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(672,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(792,816) scale(4.12)"><rect width="6" height="6"></rect></g>
              <g transform="translate(48,48)"><g transform="scale(12)"><path d="M0,0v14h14V0H0z M12,12H2V2h10V12z"></path></g></g>
              <g transform="translate(672,48)"><g transform="scale(12)"><path d="M0,0v14h14V0H0z M12,12H2V2h10V12z"></path></g></g>
              <g transform="translate(48,672)"><g transform="scale(12)"><path d="M0,0v14h14V0H0z M12,12H2V2h10V12z"></path></g></g>
              <g transform="translate(96,96)"><g transform="scale(12)"><rect width="6" height="6"></rect></g></g>
              <g transform="translate(720,96)"><g transform="scale(12)"><rect width="6" height="6"></rect></g></g>
              <g transform="translate(96,720)"><g transform="scale(12)"><rect width="6" height="6"></rect></g></g>
              </g>
            </svg>
            <h1 class="whitespace-nowrap">查查木材商移动端</h1>
          </div>
        </div>
      </div>
    </ClientOnly>
    <ClientOnly>
      <div class="hidden md:inline-flex flex-row items-center w-full our-services">
        <ul class="list-none inline-flex flex-row flex-nowrap justify-evenly items-center w-full text-center text-base lg:text-lg 2xl:text-xl">
          <li v-for="item in ourServiceList">
            <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </ClientOnly>
    <ClientOnly>
      <ul class="list-none inline-flex flex-col w-full text-center text-xs bottom">
        <li class="text-left md:text-center">数据来源：
          <template v-for="(item, index) in dataSourceList">
            <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
            <template v-if="index < dataSourceList.length - 1">
              <span class="hidden md:inline">&nbsp;&nbsp;&nbsp;</span>
              <span class="inline md:hidden">&nbsp;|&nbsp;</span>
            </template>
          </template>
        </li>
        <li class="list-item md:hidden text-base">
          <NuxtLink>关于我们</NuxtLink>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <NuxtLink>联系我们</NuxtLink>
        </li>
        <li>Copyright &copy;{{ copyRightStartYear }}-{{ copyRightEndYear }} ZHENMUWANG.COM All Right Reserved</li>
        <li>汕头市宜麦有道供应链有限公司 版权所有</li>
        <li>
          <NuxtLink to="https://beian.miit.gov.cn/">粤ICP备18079030号</NuxtLink>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <NuxtLink to="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44051102000498">粤公网安备44051102000498号</NuxtLink>
        </li>
      </ul>
    </ClientOnly>
  </div>
</template>

<style scoped>
.footer {
  background-color: rgb(10,10,10);
  color: rgb(250,250,250);
  word-break: break-all;
  word-wrap: break-word;
}

.footer > * {
  padding-left: calc(100vw / 1920* 255);
  padding-right: calc(100vw / 1920* 255);
}

.footer .top {
  min-height: calc(100vw / 1920 * 220);
  padding-top: calc(100vw / 1920 * 10);
  padding-bottom: calc(100vw / 1920 * 10);
  background-image: url('https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image9916be26b541e055442ecad56a65d7cd.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.footer .top .title {
  margin-bottom: calc(100vw / 1920 * 10);
  font-size: calc(100vw / 1920 * 21);
}

.footer .top *:not(.title) {
  font-size: calc(100vw / 1920 * 5);
}

.footer .top .about-us ul {
  column-gap: calc(100vw / 1920 * 20);
  row-gap: calc(100vw / 1920 * 16);
}

.footer .top .contact-us ul li {
  margin-bottom: calc(100vw / 1920 * 16);
}

.footer .top .miniapp-code img {
  width: calc(100vw / 1920 * 100);
  height: calc(100vw / 1920 * 100);
  min-width: 100px;
  min-height: 100px;
}

.footer .top .miniapp-code  h1:not(.title) {
  margin-top: calc(100vw / 1920 * 10);
}

.footer .our-services {
  margin-top: calc(100vw / 1920 * 10);
  margin-bottom: calc(100vw / 1920 * 10);
  padding-left: calc(100vw / 1920* 95);
  padding-right: calc(100vw / 1920* 95);
  font-size: calc(100vw / 1920 * 26);
}

.footer .bottom {
  padding-bottom: calc(100vw / 1920 * 40);
}

.footer .bottom li:not(:last-of-type) {
  margin-bottom: calc(100vw / 1920 * 10);
}

@media (max-width: 767px) {
  .footer .bottom {
    padding-top: calc(100vw / 1920 * 80);
    padding-bottom: calc(100vw / 1920 * 100);
    background-image: url('https://zhenmuwang.oss-cn-beijing.aliyuncs.com/zmw_group_image2ee34a6bf2074206c496a0d58c2f5668.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .footer .bottom li:not(:last-of-type) {
    margin-bottom: calc(100vw / 1920 * 20);
  }

  .footer .bottom li:nth-of-type(2) {
    margin-top: calc(100vw / 1920 * 40);
    margin-bottom: calc(100vw / 1920 * 40);
  }
}

@media (min-width: 768px) {
  .footer .top .miniapp-code {
    width: calc(100vw / 1920 * 100);
    min-width: 100px;
  }
}

@media (max-width: 1023px) {
  .footer > * {
    padding-left: calc(100vw / 1920* 40);
    padding-right: calc(100vw / 1920* 40);
  }
  .footer .our-services {
    padding-left: calc(100vw / 1920* 15);
    padding-right: calc(100vw / 1920* 15);
  }
}
@media (min-width: 1024px) {
  .footer .our-services {
    padding-left: calc(100vw / 1920* 250);
    padding-right: calc(100vw / 1920* 250);
  }
}
@media (min-width: 1280px) {
  .footer .our-services {
    padding-left: calc(100vw / 1920* 345);
    padding-right: calc(100vw / 1920* 345);
  }
}
</style>