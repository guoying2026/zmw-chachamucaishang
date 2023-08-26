<template>
  <div class="footer">
    <ClientOnly>
      <div class="hidden md:inline-flex flex-wrap flex-col md:flex-row justify-evenly w-full">
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-3/12">
          <h1>关于我们</h1>
          <ul class="list-none grid grid-cols-3 w-full text-center whitespace-nowrap">
            <li>用户帮助</li>
            <li>更新说明</li>
            <li>隐私政策</li>
            <li>用户协议</li>
            <li>问题反馈</li>
            <li>品类标签</li>
            <li>名词百科</li>
          </ul>
        </div>
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-3/12">
          <h1>联系我们</h1>
          <ul class="list-none inline-flex flex-col text-center md:text-left">
            <li>工作时间：周一至周六9:00-18:00</li>
            <li>邮箱：service@zhenmuwang.com</li>
            <li>电话：0754-87120926</li>
            <li>地址：广东省汕头市龙湖区金霞街道科技西路杰思信息大厦</li>
          </ul>
        </div>
        <div class="inline-flex flex-col items-center md:items-start w-full md:w-3/12">
          <img />
          <h1>查查木材商小程序</h1>
        </div>
      </div>
    </ClientOnly>
    <ClientOnly>
      <div class="hidden md:inline-flex flex-row items-center w-full">
        <ul class="list-none grid grid-cols-3 md:grid-cols-7 w-full text-center">
          <li>我们的服务</li>
          <li>企业查询服务</li>
          <li>木材信用分</li>
          <li>信用分排行榜</li>
          <li>处罚公示</li>
          <li>失信记录</li>
          <li>木材商黑名单</li>
        </ul>
      </div>
    </ClientOnly>
    <ClientOnly>
      <ul class="list-none inline-flex flex-col w-full text-center text-xs">
        <li class="text-left md:text-center">数据来源：
          <NuxtLink>全国企业信用信息公示系统</NuxtLink>
          <span class="hidden md:inline">&nbsp;&nbsp;&nbsp;</span>
          <span class="inline md:hidden">&nbsp;|&nbsp;</span>
          <NuxtLink>中国裁判文书网</NuxtLink>
          <span class="hidden md:inline">&nbsp;&nbsp;&nbsp;</span>
          <span class="inline md:hidden">&nbsp;|&nbsp;</span>
          <NuxtLink>中国执行信息公开网</NuxtLink>
          <span class="hidden md:inline">&nbsp;&nbsp;&nbsp;</span>
          <span class="inline md:hidden">&nbsp;|&nbsp;</span>
          <NuxtLink>国家知识产权局</NuxtLink>
          <span class="hidden md:inline">&nbsp;&nbsp;&nbsp;</span>
          <span class="inline md:hidden">&nbsp;|&nbsp;</span>
          <NuxtLink>国家版权局</NuxtLink>
        </li>
        <li class="list-item md:hidden text-base">
          <NuxtLink>关于我们</NuxtLink>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <NuxtLink>联系我们</NuxtLink>
        </li>
        <li>Copyright &copy;2013-2023 ZHENMUWANG.COM All Right Reserved</li>
        <li>版权所有：汕头市宣麦有道供应链有限公司</li>
        <li>粤ICP备18079030号&nbsp;&nbsp;&nbsp;粤公网安备44051102000498号</li>
      </ul>
    </ClientOnly>
  </div>
</template>

<style scoped>
.footer {
  background-color: rgb(10,10,10);
  color: rgb(250,250,250);
  padding-left: calc((100% - 91.666667%) / 2);
    padding-right: calc((100% - 91.666667%) / 2);
}
</style>