import { ref } from 'vue'
import { defineStore } from 'pinia'

// 点位模块
export const pointlabelCounterStore = defineStore('pointlabel', () => {
  // 是否开启点位标注
  const pointlabel = ref(false)
  // 是否开启路径标注
  const pathlabel = ref(false)
  // 是否展开右侧面板
  const rightpanel = ref(false)

  // 点位坐标
  const pointcoordinate = ref({
    x: 0,
    y: 0,
    z: 0
  })

  return {
    pointlabel,
    pathlabel,
    rightpanel,
    pointcoordinate
  }
})