import { ref } from 'vue'
import { defineStore } from 'pinia'

// 天空球模块
export const skyCounterStore = defineStore('sky', () => {
  // 是否显示/隐藏
  const skyvalue = ref(true)

  // 默认天空球
  const skyhdrurl = ref('textures/hdrs/1.hdr')

  // 本地HDR资源路径合集
  const skyimgs = ref([
    {
      id: 1101,
      url: 'textures/hdrs/1.jpg',
      hdrurl: 'textures/hdrs/1.hdr'
    },
    {
      id: 1102,
      url: 'textures/hdrs/2.jpg',
      hdrurl: 'textures/hdrs/2.hdr'
    },
    {
      id: 1103,
      url: 'textures/hdrs/3.jpg',
      hdrurl: 'textures/hdrs/3.hdr'
    },
    {
      id: 1104,
      url: 'textures/hdrs/4.jpg',
      hdrurl: 'textures/hdrs/4.hdr'
    },
    {
      id: 1105,
      url: 'textures/hdrs/5.jpg',
      hdrurl: 'textures/hdrs/5.hdr'
    },
    {
      id: 1106,
      url: 'textures/hdrs/6.jpg',
      hdrurl: 'textures/hdrs/6.hdr'
    },
    {
      id: 1107,
      url: 'textures/hdrs/7.jpg',
      hdrurl: 'textures/hdrs/7.hdr'
    },
    {
      id: 1108,
      url: 'textures/hdrs/8.jpg',
      hdrurl: 'textures/hdrs/8.hdr'
    },
    {
      id: 1109,
      url: 'textures/hdrs/9.jpg',
      hdrurl: 'textures/hdrs/9.hdr'
    }
  ])

  // 获取素材的映射（动态加载）
  const getSkyhdrById = (id) => {
    const sky = skyimgs.value.find(item => item.id === id)
    return sky ? sky.hdrurl : null
  }

  return {
    skyvalue,
    skyhdrurl,
    skyimgs,
    getSkyhdrById
  }
})

// 地面模块
export const groundCounterStore = defineStore('ground', () => {
  // 是否显示/隐藏
  const groundvalue = ref(false)

  return {
    groundvalue
  }
})

// 雾模块
export const fogCounterStore = defineStore('fog', () => {
  const fogvalue = ref(false)
  const fogexp2value = ref(false)

  return {
    fogvalue,
    fogexp2value
  }
})