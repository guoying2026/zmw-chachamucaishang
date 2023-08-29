<template>
  <div
      class="floating-icon"
      :style="{top: `${y}px`, left: `${x}px`}"
      @mousedown.prevent="startMoving"
      @mouseup.prevent="stopMoving"
  >
    <slot name="hoverButton"></slot>
  </div>
</template>
<style scoped>
.floating-icon {
  position: fixed;
  right: 20px;
  bottom: 100px;  /* 距离底部50px */
  width: 65px;   /* 设置图标宽度 */
  height: 65px;  /* 设置图标高度 */
  cursor: grab;
}

</style>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(window.innerWidth - 65 - 20); // 初始x坐标
const y = ref(window.innerHeight - 65 - 100); // 初始y坐标
let isMoving = false;

const moveIcon = (e: { clientX: number; clientY: number; }) => {
  if (!isMoving) return;
  x.value = e.clientX - 15; // 减去半个图标的宽度，使鼠标位于图标中心
  y.value = e.clientY - 15; // 减去半个图标的高度
};

const startMoving = () => {
  isMoving = true;
  document.addEventListener('mousemove', moveIcon);
};

const stopMoving = () => {
  isMoving = false;
  document.removeEventListener('mousemove', moveIcon);
};

onUnmounted(() => {
  document.removeEventListener('mousemove', moveIcon);
});
</script>
