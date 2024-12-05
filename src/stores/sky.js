import { ref } from 'vue'
import { defineStore } from 'pinia'

// 天空球模块
export const skyCounterStore = defineStore('sky', () => {
  // 是否显示/隐藏
  const skyvalue = ref(false)

  // 默认天空球
  const skyhdrurl = ref('public/textures/hdrs/1.hdr')

  // 本地HDR资源路径合集
  const skyimgs = ref([
    {
      id: 1101,
      url: 'public/textures/hdrs/1.jpg',
      hdrurl: 'public/textures/hdrs/1.hdr'
    },
    {
      id: 1102,
      url: 'public/textures/hdrs/2.jpg',
      hdrurl: 'public/textures/hdrs/2.hdr'
    },
    {
      id: 1103,
      url: 'public/textures/hdrs/3.jpg',
      hdrurl: 'public/textures/hdrs/3.hdr'
    },
    {
      id: 1104,
      url: 'public/textures/hdrs/4.jpg',
      hdrurl: 'public/textures/hdrs/4.hdr'
    },
    {
      id: 1105,
      url: 'public/textures/hdrs/5.jpg',
      hdrurl: 'public/textures/hdrs/5.hdr'
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