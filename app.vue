<script setup lang="ts">
import './assets/css/global.css'

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
})

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  title: '查查木材商',
  htmlAttrs: {
    lang: 'zh-CN'
  },
})
useSeoMeta({
  description: '查查木材商',
  ogTitle: '查查木材商',
  ogDescription: '查查木材商',
  ogImage: '/favicon.ico',
  ogUrl: 'https://pf.zhenmuwang.com/',
  twitterTitle: '查查木材商',
  twitterDescription: '查查木材商',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary',
})
</script>

<template>
  <NuxtLayout>
    <div class="bg-black text-white">
      <NuxtPage />
    </div>

  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}

.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>
