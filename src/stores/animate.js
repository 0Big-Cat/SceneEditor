import { ref } from 'vue'
import { defineStore } from 'pinia'

// 动画模块
export const animateCounterStore = defineStore('animate', () => {

  // 模型中包含的动画合集
  const animatevalue = ref([])

  // 模型动画进度
  const animateschedule = ref('')

  // 控制动画播放次数
  const animateloop = ref(0)

  return {
    animatevalue,
    animateschedule,
    animateloop
  }
})