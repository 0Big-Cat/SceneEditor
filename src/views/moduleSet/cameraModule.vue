<script setup>
// 相机位置+旋转中心位置模块
import { ElMessage } from 'element-plus'

// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore } from '@/stores'
import { cameraPoint, controlsPoint } from '../../../public/three/mainScene'

const point = pointCounterStore()

// 复制相机坐标函数
const copycamerapoint = () => {

  // 格式化相机坐标为字符串
  const cameraString = `${point.camerapoint.x},${point.camerapoint.y},${point.camerapoint.z}`
  // 使用 Clipboard API 将相机坐标复制到剪贴板
  navigator.clipboard.writeText(cameraString).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }).catch(() => {
    ElMessage({
      message: '复制失败',
      type: 'warning'
    })
  })
}

// 复制旋转中心坐标函数
const copycontrolspoint = () => {
  // 格式化旋转中心坐标为字符串
  const controlsString = `${point.controlspoint.x},${point.controlspoint.y},${point.controlspoint.z}`
  // 使用 Clipboard API 将旋转中心坐标复制到剪贴板
  navigator.clipboard.writeText(controlsString).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }).catch(() => {
    ElMessage({
      message: '复制失败',
      type: 'warning'
    })
  })
}

// 还原相机坐标
const camerapoint = () => {
  cameraPoint()
}

// 还原旋转中心坐标
const controlspoint = () => {
  controlsPoint()
}
</script>

<template>
  <div id="pointmodule">
    <h4>相机坐标:</h4>
    <div><span>x:</span><input type="text" v-model="point.camerapoint.x"></div>
    <div><span>y:</span><input type="text" v-model="point.camerapoint.y"></div>
    <div><span>z:</span><input type="text" v-model="point.camerapoint.z"></div>
    <div>
      <button @click="copycamerapoint">复制坐标</button>
      <button @click="camerapoint">还原坐标</button>
    </div>

    <h4>旋转中心坐标:</h4>
    <div><span>x:</span><input type="text" v-model="point.controlspoint.x"></div>
    <div><span>y:</span><input type="text" v-model="point.controlspoint.y"></div>
    <div><span>z:</span><input type="text" v-model="point.controlspoint.z"></div>
    <div>
      <button @click="copycontrolspoint">复制坐标</button>
      <button @click="controlspoint">还原坐标</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#pointmodule {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: rem(16px);

  h4 {
    font-weight: 400;
    margin: vh(17px) 0;
  }

  div {
    margin-bottom: vh(17px);
  }

  span {
    margin-right: vw(5px);
  }

  input {
    width: vw(100px);
  }

  button {
    margin-bottom: vh(37px);
    margin-right: vw(5px);
    width: vw(65px);
    height: vh(32px);
    line-height: vh(32px);
    color: #fff;
    border: 1px solid skyblue;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>