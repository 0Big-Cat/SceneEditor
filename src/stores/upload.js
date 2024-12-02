import { ref } from 'vue'
import { defineStore } from 'pinia'

// 模型上传模块
export const uploadCounterStore = defineStore('upload', () => {
  const uploadvalue = ref(
    [
      {
        name: '',
        x: 0,
        y: 0,
        z: 0,
        s: 1
      }
    ]
  )

  return {
    uploadvalue

  }
})