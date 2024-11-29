import { ref } from 'vue'
import { defineStore } from 'pinia'

// 相机位置+旋转中心位置模块
export const pointCounterStore = defineStore('pointStore', () => {
  // 相机位置
  const camerapoint = ref('')

  // 旋转中心位置
  const controlspoint = ref('')

  return {
    camerapoint,
    controlspoint
  }
})