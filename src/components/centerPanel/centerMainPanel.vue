<script setup>
// 中心模块

// 引入文件上传组件
import uploadmodule from '../moduleSet/uploadModule/uploadModule.vue'
</script>

<template>
  <div id="centermainpanel">
    <uploadmodule></uploadmodule>
  </div>
</template>

<style lang="scss" scoped>
#centermainpanel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>