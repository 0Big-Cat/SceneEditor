import { ref } from 'vue'
import { defineStore } from 'pinia'

// 模型上传模块
export const loadingCounterStore = defineStore('loading', () => {
  const loadingvalue = ref(0)
  const loadingshow = ref(false)

  return {
    loadingvalue,
    loadingshow
  }
})