<template>
  <text class="custom_tag" :class="`${color}_btn border_${number}_radius`">{{tag}}</text>
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
    default: 60
  },
  color:{
    type: String,
    default: ''
  }
})
</script>
