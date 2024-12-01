<script setup>
// 相机位置+旋转中心位置模块
// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore } from '@/stores'

const point = pointCounterStore()

// 复制相机坐标函数
function copycamerapoint() {
  // 格式化相机坐标为字符串
  const cameraString = `${point.camerapoint.x},${point.camerapoint.y},${point.camerapoint.z}`
  // 使用 Clipboard API 将相机坐标复制到剪贴板
  navigator.clipboard.writeText(cameraString).then(() => {
    console.log('相机坐标已复制到剪贴板！')
  }).catch((error) => {
    console.error('复制失败:', error)
  })
}

// 复制旋转中心坐标函数
function copycontrolspoint() {
  // 格式化旋转中心坐标为字符串
  const controlsString = `${point.controlspoint.x},${point.controlspoint.y},${point.controlspoint.z}`
  // 使用 Clipboard API 将旋转中心坐标复制到剪贴板
  navigator.clipboard.writeText(controlsString).then(() => {
    console.log('旋转中心坐标已复制到剪贴板！')
  }).catch((error) => {
    console.error('复制失败:', error)
  })
}
</script>

<template>
  <div id="pointmodule">
    <h4>相机坐标:</h4>
    x:<input type="text" v-model="point.camerapoint.x">
    y:<input type="text" v-model="point.camerapoint.y">
    z:<input type="text" v-model="point.camerapoint.z">
    <button @click="copycamerapoint">复制</button>
    <h4>旋转中心坐标:</h4>
    x:<input type="text" v-model="point.controlspoint.x">
    y:<input type="text" v-model="point.controlspoint.y">
    z:<input type="text" v-model="point.controlspoint.z">
    <button @click="copycontrolspoint">复制</button>
  </div>
</template>

<style lang="scss" scoped>
#pointmodule {
  position: absolute;
}
</style>