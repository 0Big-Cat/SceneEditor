<script setup>
// 右侧面板主体
import { ref, onMounted } from 'vue'

// 面板显示隐藏变量
let panelValue = ref(false)

onMounted(() => {
  // 挂载完成显示左侧面板
  panelValue.value = true
})

</script>

<template>
  <transition name="right">
    <div id="rightmainpanel" v-if="panelValue"></div>
  </transition>
</template>

<style lang="scss" scoped>
#rightmainpanel {
  position: absolute;
  top: 0;
  right: 0;
  width: vw(300px);
  height: 100%;
  z-index: 1;
  background-color: skyblue;
  opacity: 0.5;
}

// 组件动画
.right-enter-active,
.right-leave-active {
  transition: opacity 1s, transform 1s;
}

.right-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>