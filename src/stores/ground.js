import { ref } from 'vue'
import { defineStore } from 'pinia'

// 天空球模块
export const groundCounterStore = defineStore('ground', () => {
  // 是否显示/隐藏
  const groundvalue = ref(false)

  return {
    groundvalue
  }
})