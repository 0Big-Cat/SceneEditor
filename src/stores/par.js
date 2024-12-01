import { ref } from 'vue'
import { defineStore } from 'pinia'

// 详细操作展示模块
export const particularsCounterStore = defineStore('particulars', () => {
  // 是否显示/隐藏详细操作模块
  const parvalue = ref(false)

  return {
    parvalue

  }
})