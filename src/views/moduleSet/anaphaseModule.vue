<script setup>
// 后期模块

import { ref } from 'vue'
import { anaphaseBloom } from '../../../public/three/mainScene'

const anaphasevalue = ref(false)

</script>

<template>
  <div id="anaphasemodule">
    <el-checkbox v-model="anaphasevalue" label="辉光" size="large" @change="anaphaseBloom(anaphasevalue)" />

    <!-- <el-checkbox v-model="fogvalue" label="景深" size="large" @change="linearfog(fogvalue)" /> -->

    <!-- <el-checkbox v-model="fogvalue" label="颗粒" size="large" @change="linearfog(fogvalue)" /> -->
  </div>
</template>

<style lang="scss" scoped>
#anaphasemodule {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
</style>