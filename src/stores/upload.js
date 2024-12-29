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

  // 左侧滑块
  const panelValue = ref(false)

  // 控制右侧面板的显示
  const rightmodelpanel = ref(false)

  // 子网格名称
  const modelchildName = ref('')

  // 显示or取消子网格描边
  const currentOutline = ref(null)

  // 存储模型所有子网格名称
  const allChildName = ref([])

  // 是否获取所有子网格
  const checkedValue = ref(false)

  return {
    uploadvalue,
    panelValue,
    modelchildName,
    currentOutline,
    allChildName,
    checkedValue,
    rightmodelpanel
  }
})