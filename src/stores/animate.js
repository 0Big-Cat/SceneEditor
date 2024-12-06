import { ref } from 'vue'
import { defineStore } from 'pinia'

// 动画模块
export const animateCounterStore = defineStore('animate', () => {

  // 模型中包含的动画合集
  // const animatevalue = ref([])
  const animatevalue = ref([])

  // 用于存储每个动画的独立状态
  const animationStates = ref([])

  // 初始化独立状态（基于 animatevalue）
  const initializeStates = () => {
    if (!animatevalue.value || animatevalue.value.length === 0) {
      console.error('animatevalue is empty or undefined')
      return
    }
    animationStates.value = animatevalue.value.map(item => {
      if (!item.animateData || item.animateData.length === 0) {
        console.error('animateData is empty or undefined for item:', item)
        return []
      }
      return item.animateData.map(() => ({
        startandstop: item.startandstop,
        pauserecovery: item.pauserecovery,
        positivenegative: item.positivenegative
      }))
    })
  }


  // 控制动画的播放与停止
  // const startandstop = (true)

  // 控制动画的暂停与恢复
  // const pauserecovery = (false)

  // 控制动画的正放与倒放
  // const positivenegative = (true)

  return {
    animatevalue,
    animationStates,
    initializeStates
    // startandstop,
    // pauserecovery,
    // positivenegative
  }
})