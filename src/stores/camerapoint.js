import { ref } from 'vue'
import { defineStore } from 'pinia'

// 相机位置+旋转中心位置模块
export const pointCounterStore = defineStore('pointStore', () => {
  // 相机位置
  const camerapoint = ref({
    x: 0, y: 0, z: 0
  })


  // 旋转中心位置
  const controlspoint = ref({
    x: 0, y: 0, z: 0
  })

  // 函数：更新相机位置
  const updateCameraPosition = (x, y, z) => {
    camerapoint.value.x = parseFloat(x.toFixed(5))
    camerapoint.value.y = parseFloat(y.toFixed(5))
    camerapoint.value.z = parseFloat(z.toFixed(5))
  }


  // 函数：更新旋转中心位置
  const updateControlPoint = (x, y, z) => {
    controlspoint.value.x = parseFloat(x.toFixed(5))
    controlspoint.value.y = parseFloat(y.toFixed(5))
    controlspoint.value.z = parseFloat(z.toFixed(5))
  }
  return {
    camerapoint,
    controlspoint,
    updateCameraPosition,
    updateControlPoint
  }
})