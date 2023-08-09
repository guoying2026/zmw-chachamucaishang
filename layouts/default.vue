<script setup lang="ts">
import Header from "~/components/Header.vue";

import LoginPopup from "~/components/LoginPopup.vue";

// import TheFooter from "~~/components/layout/TheFooter.vue";

const route = useRoute()

const unShowHeaderRouteName = ["index", "search", "searchResult"];

const isShowLogin = ref<boolean>(false)

function openLoginPopup() {
  isShowLogin.value = true;
}

function hideLoginPopup() {
  isShowLogin.value = false
}

</script>

<template>
  <div>
    <Header v-if="!unShowHeaderRouteName.includes(route.name as string)" @openLoginPopup="openLoginPopup" />
      <slot/>
      <!-- 登录弹窗 -->
      <LoginPopup v-if="isShowLogin" @close="hideLoginPopup" />
      <!-- <TheFooter/> -->
  </div >
</template>