import { ref } from 'vue'
import { defineStore } from 'pinia'

// 灯光模块
export const lightCounterStore = defineStore('light', () => {
  // 右侧灯光面板
  const lightpanel = ref({
    lightshow: false
  })

  // 灯光合集，存储光源的基本信息
  const lightSet = ref([
    {
      lightlabel: '阴影相机辅助器',
      lightname: 'assistcamera',
      lightshow: false
    },
    {
      lightlabel: '光源辅助器',
      lightname: 'assistdevice',
      lightshow: false
    },
    {
      lightlabel: '点光源',
      lightname: 'pointlight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      lightdistance: 0,
      distance: true, // 用于显示光源范围调节
      lightadd: [], // 存储新增光源
      lightshodow: false,
      lightxyz: true, // 用于显示坐标
      x: 0,
      y: 0,
      Z: 0
    },
    {
      lightlabel: '平行光',
      lightname: 'directionallight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      lightadd: [],
      lightshodow: false,
      lightxyz: true, // 用于显示坐标
      x: 0,
      y: 0,
      Z: 0
    },
    {
      lightlabel: '聚光灯',
      lightname: 'spotlight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 50,
      lightdistance: 0,
      distance: true, // 用于显示光源范围调节
      lightadd: [],
      lightshodow: false,
      lightxyz: true, // 用于显示坐标
      x: 0,
      y: 0,
      Z: 0
    },
    {
      lightlabel: '半球光',
      lightname: 'hemispherelight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      lightdistance: 0
    },
    {
      lightlabel: '环境光',
      lightname: 'ambientlight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      lightdistance: 0
    },
    {
      lightlabel: '矩形区域光',
      lightname: 'zonelight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1
    }, {
      lightlabel: '阴影',
      lightname: 'shadow',
      lightshow: false
    }
  ])

  return {
    lightpanel,
    lightSet
  }
})
