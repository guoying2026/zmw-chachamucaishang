<script setup lang="ts">
import Header from "~/components/Header.vue";

// import TheFooter from "~~/components/layout/TheFooter.vue";

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
      <!-- <TheFooter/> -->
  </div >
</template>