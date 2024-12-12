import { ref } from 'vue'
import { defineStore } from 'pinia'

// 模型上传模块
export const uploadCounterStore = defineStore('upload', () => {
  // 模型相关数据
  const uploadvalue = ref(
    [
      {
        name: '',
        x: 0,
        y: 0,
        z: 0,
        s: 1,
        showhidden: true
      }
    ]
  )

  // 隐藏显示右侧面板
  const panelValue = ref(false)

  // 子网格名称
  const modelchildName = ref('')

  // 显示or取消子网格描边
  const currentOutline = ref(null)

  return {
    uploadvalue,
    panelValue,
    modelchildName,
    currentOutline
  }
})