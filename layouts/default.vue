<script setup lang="ts">
import Header from "~/components/Header.vue";

import Footer from "~/components/Footer.vue";

const route = useRoute()

const unShowHeaderRouteName = [
  "index",
  "search",
];

</script>

<template>
  <div>
    <Header v-if="!unShowHeaderRouteName.includes(route.name as string)" />
      <slot/>
      <Footer/>
  </div >
</template>