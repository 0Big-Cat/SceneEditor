import { ref } from 'vue'
import { defineStore } from 'pinia'

// 点位模块
export const pointlabelCounterStore = defineStore('pointlabel', () => {
  // 是否显示/隐藏详细操作模块
  const pointlabel = ref(false)

  // 点位坐标
  const pointcoordinate = ref({
    x: 0,
    y: 0,
    z: 0
  })

  return {
    pointlabel,
    pointcoordinate
  }
})