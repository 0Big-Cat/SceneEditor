import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  assistDeviceFun,
  lightPointFun,
  directionalLightFun,
  spotLightFun,
  hemisphereLightFun,
  ambientLightFun
} from '../../public/three/mainScene'

// 灯光模块
export const lightCounterStore = defineStore('light', () => {

  // 灯光合集，存储光源的基本信息
  const lightSet = ref([
    {
      lightlabel: '辅助器',
      lightname: 'assistdevice',
      lightshow: false
    },
    {
      lightlabel: '点光源',
      lightname: 'pointlight',
      lightshow: false,
      lightcolor: '#fff',
      lightstrength: 1,
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
      lightcolor: '#fff',
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
      lightcolor: '#fff',
      lightstrength: 50,
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
      lightcolor: '#fff',
      lightstrength: 1
    },
    {
      lightlabel: '环境光',
      lightname: 'ambientlight',
      lightshow: true,
      lightcolor: '#fff',
      lightstrength: 1
    }
  ])

  // 光源类型选择函数
  const toggleLight = (lightname) => {
    // 根据不同的光源类型，调用对应的函数
    switch (lightname) {
      case 'assistdevice':
        assistDeviceFun()
        break
      case 'pointlight':
        lightPointFun()
        break
      case 'directionallight':
        directionalLightFun()
        break
      case 'spotlight':
        spotLightFun()
        break
      case 'hemispherelight':
        hemisphereLightFun()
        break
      case 'ambientlight':
        ambientLightFun()
        break
      default:
        break
    }
  }

  return {
    lightSet,
    toggleLight
  }
})
