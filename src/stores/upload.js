import { ref } from 'vue'
import { defineStore } from 'pinia'

// 模型上传模块
export const uploadCounterStore = defineStore('upload', () => {
  // 模型相关数据
  const uploadvalue = ref(
    [
      // {
      //   name: '',
      //   x: 0,
      //   y: 0,
      //   z: 0,
      //   s: 1,
      //   showhidden: true
      // }
    ]
  )

  // 左侧滑块
  const panelValue = ref(false)

  // 控制右侧面板的显示
  const rightmodelpanel = ref(false)

  // 子网格名称
  const modelchildName = ref('')

  // 记录描边的Mesh（即被点击的物体，为transformcontrols提供拖拽目标）
  const currentOutline = ref(null)

  // 存储模型所有子网格名称
  // const allChildName = ref([])

  // 所有Object3D对象
  const allObject3DName = ref([])

  // 所有Mesh对象
  const allMeshName = ref([])

  // 是否获取所有子网格
  const checkedValue = ref(false)

  // TransformControls控制器的显示
  const transformctrl = ref(false)

  const activeParentIndex = ref(null) // 父级的索引
  const activeChildIndices = ref({}) // 用于存储每个父级的子级索引

  // 选择transform的功能：移动、旋转、缩放
  const transformstatevalue = ref('')

  return {
    uploadvalue,
    panelValue,
    modelchildName,
    currentOutline,
    // allChildName,
    checkedValue,
    rightmodelpanel,
    allObject3DName,
    allMeshName,
    transformctrl,
    activeParentIndex,
    activeChildIndices,
    transformstatevalue
  }
})