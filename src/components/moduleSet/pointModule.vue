<script setup>
// 相机位置+旋转中心位置模块

// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore } from '@/stores'

const point = pointCounterStore()


</script>

<template>
  <div id="pointmodule">
    <h4>相机坐标:</h4>
    <input type="text" id="camerapointX" v-model="point.camerapoint.x">
    <input type="text" id="camerapointY" v-model="point.camerapoint.y">
    <input type="text" id="camerapointZ" v-model="point.camerapoint.z">
    <h4>旋转中心坐标:</h4>
    <input type="text" id="controlspoint" v-model="point.controlspoint">
  </div>
</template>

<style lang="scss" scoped>
#pointmodule {
  input {
    display: block;
    width: 100%;

  }
}
</style>