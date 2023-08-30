<template>
  <text class="custom_tag" :class="`${color}_btn border_${number}_radius`">
    {{tag}}
    <span class="triangle-down" :class="`${color}`" v-if="more*1 === 1"></span>
    <span class="triangle-up" :class="`${color}`" v-if="more*1 === 2"></span>
  </text>
</template>
<script setup lang="ts">
import '~/assets/css/tag.css'
const props = defineProps({
  tag:{
    type: String,
    default: ''
  },
  number:{
    type: [Number,String],
    default: 10
  },
  color:{
    type: String,
    default: ''
  },
  more:{
    type: [Number,String],
    default: 0,
  }
})
</script>
