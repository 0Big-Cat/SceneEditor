<script setup>
// 地面模块
import { ground } from '../../../public/three/mainScene'
import { groundCounterStore } from '@/stores'

const grounddata = groundCounterStore()
</script>

<template>
  <div id="groundmodule">
    <div>
      <el-checkbox v-model="grounddata.groundvalue" label="网格地面" size="large"
        @change="ground(grounddata.groundvalue)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#groundmodule {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
</style>