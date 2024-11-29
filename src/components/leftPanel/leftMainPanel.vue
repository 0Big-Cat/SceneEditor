<script setup>
// 左侧面板主体
import { ref, onMounted } from 'vue'
// 引入文件上传组件
import uploadmodule from '../moduleSet/uploadModule.vue'
// 相机位置+旋转中心位置模块
import pointModule from '../moduleSet/pointModule.vue'

// 面板显示隐藏变量
let panelValue = ref(false)

onMounted(() => {
  // 挂载完成显示左侧面板
  panelValue.value = true
})
</script>

<template>
  <!-- <transition name="left"> -->
  <!-- v-if="panelValue" -->
  <div id="leftmainpanel">
    <uploadmodule></uploadmodule>
    <pointModule></pointModule>
  </div>
  <!-- </transition> -->
</template>

<style lang="scss" scoped>
#leftmainpanel {
  position: absolute;
  top: 0;
  left: 0;
  width: vw(400px);
  height: 100%;
  z-index: 1;
  background-color: skyblue;
  opacity: 0.5;
}

// // 组件动画
// .left-enter-active,
// .left-leave-active {
//   transition: opacity 1s, transform 1s;
// }

// .left-enter-from {
//   opacity: 0;
//   transform: translateX(-100px);
// }

// .left-leave-to {
//   opacity: 0;
//   transform: translateX(-100px);
// }</style>