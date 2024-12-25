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
      Z: 0,
      unflod: true, // 用于控制操作面板的显示与隐藏
      lightassist: false, // 用于控制相机阴影辅助器显示、隐藏
      // assistwidth: 10,
      // assistheight: 10,
      assistnear: 0.1,
      assistfar: 500,
      assistzoom: 1
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
      Z: 0,
      lighttarget: true, // 用于显示光源目标
      tarx: 0,
      tary: 0,
      tarz: 0,
      unflod: true, // 用于控制操作面板的显示与隐藏
      lightassist: false, // 用于控制相机阴影辅助器显示、隐藏
      assistwandh: true, // 用于控制宽高配置项的显示与否
      assistwidth: 10,
      assistheight: 10,
      assistnear: 0.1,
      assistfar: 500,
      assistzoom: 1
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
      Z: 0,
      lighttarget: true, // 用于显示光源目标
      tarx: 0,
      tary: 0,
      tarz: 0,
      unflod: true, // 用于控制操作面板的显示与隐藏
      llightangle: 60, // 光照范围的角度
      lightpenumbra: 0, // 聚光追半影衰减百分比
      penumbra: true, // 用于显示聚光追半影衰减百分比
      lightdecay: 2, // 沿着光照的衰减量
      lightassist: false, // 用于控制相机阴影辅助器显示、隐藏
      // assistwidth: 10,
      // assistheight: 10,
      assistnear: 0.1,
      assistfar: 500,
      assistzoom: 1
    },
    {
      lightlabel: '半球光',
      lightname: 'hemispherelight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      unflod: true // 用于控制操作面板的显示与隐藏
    },
    {
      lightlabel: '环境光',
      lightname: 'ambientlight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      unflod: true // 用于控制操作面板的显示与隐藏
    },
    {
      lightlabel: '矩形区域光',
      lightname: 'rectanglelight',
      lightshow: false,
      lightcolor: '#ffffff',
      lightstrength: 1,
      lightwidth: 10,
      lightheight: 5,
      lightshodow: false,
      unflod: true, // 用于控制操作面板的显示与隐藏
      lightadd: [],
      lightxyz: true, // 用于显示坐标
      lighttarget: true, // 用于显示光源目标
      tarx: -90,
      tary: 0,
      tarz: 0,
      x: 0,
      y: 5,
      z: 0
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
