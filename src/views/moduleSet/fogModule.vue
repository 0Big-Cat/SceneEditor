<script setup>
// 雾霾模块

import { ref } from 'vue'
import { linearfog, indexfogexp2 } from '../../../public/three/mainScene'

// 这两个还是写到store里面吧，让pinia全局管理
const fogvalue = ref(false)
const fogexp2value = ref(false)
</script>

<template>
  <div id="fogmodel">
    <el-checkbox v-model="fogvalue" label="线性雾" size="large" @change="linearfog(fogvalue)" />

    <el-checkbox v-model="fogexp2value" label="指数雾" size="large" @change="indexfogexp2(fogexp2value)" />
  </div>
</template>

<style lang="scss" scoped>
#fogmodel {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
</style>