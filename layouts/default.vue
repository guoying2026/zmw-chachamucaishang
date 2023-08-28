<script setup lang="ts">
import { useSearchResultStore } from "~/pinia/searchResultStore"

import { useRankListStore } from "~/pinia/rankListStore"

import Header from "~/components/Header.vue";

import Footer from "~/components/Footer.vue";

const route = useRoute()

const rankListStore = useRankListStore()

const searchResultStore = useSearchResultStore()

if (rankListStore.getIsStore() && !rankListStore.getList()) {
  rankListStore.clearAll()
}

if (searchResultStore.getIsStore() && (!searchResultStore.getArea() || searchResultStore.getArea().length == 0 || !searchResultStore.getList())) {
  searchResultStore.clearAll()
}

const unShowHeaderRouteName = [
  "index",
  "search",
];

const unShowFooterRouteName = [
  "index",
  "search",
]

</script>

<template>
  <div>
    <Header v-if="!unShowHeaderRouteName.includes(route.name as string)" />
      <slot/>
      <Footer v-if="!unShowFooterRouteName.includes(route.name as string)" />
  </div >
</template>