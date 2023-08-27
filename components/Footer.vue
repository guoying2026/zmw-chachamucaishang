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

const miniappCodeUrl = ''

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
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-3/12 min-w-min contact-us">
          <h1 class="title">联系我们</h1>
          <ul class="list-none inline-flex flex-col text-center md:text-left">
            <li v-for="item in contactUsList">{{ item }}</li>
          </ul>
        </div>
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-3/12 miniapp-code">
          <h1 class="title">&nbsp;</h1>
          <div class="inline-flex flex-col items-center">
            <img class="bg-white rounded-3xl object-contain" :src="miniappCodeUrl" />
            <h1>查查木材商小程序</h1>
          </div>
        </div>
      </div>
    </ClientOnly>
    <ClientOnly>
      <div class="hidden md:inline-flex flex-row items-center w-full our-services">
        <ul class="list-none grid grid-cols-3 md:grid-cols-7 w-full text-center">
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
  padding-left: calc(100vw / 1920* 280);
  padding-right: calc(100vw / 1920* 280);
}

.footer .top {
  padding-top: calc(100vw / 1920 * 40);
  padding-bottom: calc(100vw / 1920 * 40);
  background-image: url('http://zhenmuwang.oss-cn-beijing.aliyuncs.com/pc_img/foot_back.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.footer .top .title {
  margin-bottom: calc(100vw / 1920 * 40);
  font-size: calc(100vw / 1920 * 30);
}

.footer .top *:not(.title) {
  font-size: calc(100vw / 1920 * 16);
}

.footer .top .about-us ul {
  column-gap: calc(100vw / 1920 * 20);
  row-gap: calc(100vw / 1920 * 16);
}

.footer .top .contact-us ul li {
  margin-bottom: calc(100vw / 1920 * 16);
}

.footer .top .miniapp-code img {
  width: calc(100vw / 1920 * 140);
  height: calc(100vw / 1920 * 140);
  min-width: 140px;
  min-height: 140px;
}

.footer .top .miniapp-code  h1:not(.title) {
  margin-top: calc(100vw / 1920 * 10);
}

.footer .our-services {
  margin-top: calc(100vw / 1920 * 40);
  margin-bottom: calc(100vw / 1920 * 40);
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
    background-image: url('http://zhenmuwang.oss-cn-beijing.aliyuncs.com/pc_img/foot_back.png');
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
    width: calc(100vw / 1920 * 140);
    min-width: 140px;
  }
}

@media (max-width: 1023px) {
  .footer > * {
    padding-left: calc(100vw / 1920* 40);
    padding-right: calc(100vw / 1920* 40);
  }
}
</style>