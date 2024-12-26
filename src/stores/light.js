import { ref } from 'vue'
import { defineStore } from 'pinia'

// 灯光模块
export const lightCounterStore = defineStore('light', () => {
  // 右侧灯光面板
  const lightpanel = ref({
    // lightshow: false
    rightpanel: false
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
      lightlabel: '点光源', // 右侧面板的展示文字
      lightname: 'pointlight', // 光源名称
      lightcolor: '#ffffff', // 光源颜色
      lightstrength: 1, // 光源强度
      lightdistance: 0, // 光照范围
      lightadd: [], // 存储新增光源
      x: 0, // position坐标
      y: 0,
      Z: 0,
      assistnear: 0.1, // 视椎体进截面
      assistfar: 500, // 视椎体元界面
      assistzoom: 1, // 缩放
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      color: true, // 控制颜色配置项的显示
      intensity: true, // 控制光源强度配置项的显示
      distance: true, // 用于显示光源范围调节
      lightxyz: true, // 用于显示坐标
      unflod: true, // 控制操作面板的显示
      lightassist: false // 控制相机阴影辅助器显示
    },
    {
      lightlabel: '平行光', // 右侧面板的展示文字
      lightname: 'directionallight', // 光源名称
      lightcolor: '#ffffff', // 光源颜色
      lightstrength: 1, // 光源强度
      lightadd: [], // 存储新增光源
      x: 0, // position坐标
      y: 0,
      Z: 0,
      tarx: 0, // target坐标
      tary: 0,
      tarz: 0,
      assistwidth: 10, // 阴影相机辅助器宽度
      assistheight: 10, // 阴影相机辅助器高度
      assistnear: 0.1, // 视椎体进截面
      assistfar: 500, // 视椎体元界面
      assistzoom: 1, // 缩放
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      color: true, // 控制颜色配置项的显示
      intensity: true, // 控制光源强度配置项的显示
      lightxyz: true, // 显示坐标
      lighttarget: true, // 显示光源目标
      unflod: true, // 控制操作面板的显示
      lightassist: false, // 控制相机阴影辅助器显示
      assistwandh: true // 控制宽高配置项的显示

    },
    {
      lightlabel: '聚光灯', // 右侧面板的展示文字
      lightname: 'spotlight', // 光源名称
      lightcolor: '#ffffff', // 光源颜色
      lightstrength: 50, // 光源强度
      lightdistance: 0, // 光照范围
      lightadd: [], // 存储新增光源
      x: 0, // position坐标
      y: 0,
      Z: 0,
      tarx: 0, // target坐标
      tary: 0,
      tarz: 0,
      llightangle: 60, // 光照范围的角度
      lightpenumbra: 0, // 聚光追半影衰减百分比
      lightdecay: 2, // 沿着光照的衰减量
      assistnear: 0.1, // 视椎体进截面
      assistfar: 500, // 视椎体元界面
      assistzoom: 1, // 缩放
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      color: true, // 控制颜色配置项的显示
      intensity: true, // 控制光源强度配置项的显示
      distance: true, // 显示光源范围调节
      lightxyz: true, // 用于显示坐标
      lighttarget: true, // 用于显示光源目标
      unflod: true, // 控制操作面板的显示
      angle: true, // 控制光照范围角度
      decay: true, //控制光照的衰减量显示
      penumbra: true, // 显示聚光追半影衰减百分比
      lightassist: false // 控制相机阴影辅助器显示、隐藏
    },
    {
      lightlabel: '半球光',
      lightname: 'hemispherelight',
      lightcolor: '#ffffff',
      lightstrength: 1,
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      color: true, // 控制颜色配置项的显示
      intensity: true, // 控制光源强度配置项的显示
      unflod: true // 控制操作面板的显示
    },
    {
      lightlabel: '环境光',
      lightname: 'ambientlight',
      lightcolor: '#ffffff',
      lightstrength: 1,
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      color: true, // 控制颜色配置项的显示
      intensity: true, // 控制光源强度配置项的显示
      unflod: true // 控制操作面板的显示
    },
    {
      lightlabel: '矩形区域光',
      lightname: 'rectanglelight',
      lightcolor: '#ffffff',
      lightstrength: 1,
      lightwidth: 10,
      lightheight: 5,
      lightadd: [],
      tarx: -90,
      tary: 0,
      tarz: 0,
      x: 0,
      y: 5,
      z: 0,
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      color: true, // 控制颜色配置项的显示
      intensity: true, // 控制光源强度配置项的显示
      unflod: true, // 控制操作面板的显示与隐藏
      lightxyz: true, // 显示坐标
      lighttarget: true // 显示光源目标
    }, {
      lightlabel: '阴影接收地面',
      lightname: 'shadow',
      planewidth: 100, // 接收阴影的地面宽高
      planeheight: 100,
      name: true, // 控制右侧面板名称的显示
      lightshow: false, // 控制选中按钮
      planewh: true, // 控制宽高配置项的显示
      unflod: true // 控制操作面板的显示

    }
  ])

  return {
    lightpanel,
    lightSet
  }
})
