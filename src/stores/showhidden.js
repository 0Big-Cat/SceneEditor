import { ref } from 'vue'
import { defineStore } from 'pinia'

// 显示隐藏模型模块
export const showhiddenCounterStore = defineStore('showhidden', () => {
  const showhiddenmodel = ref(true)

  return {
    showhiddenmodel

  }
})