// pinia 抽出，单独创建index文件进行独立维护（暂时未做持久化处理）
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 统一导出
export * from '@/stores/camerapoint.js'
export * from '@/stores/par.js'
export * from '@/stores/upload.js'
export * from '@/stores/loading.js'
export * from '@/stores/showhidden.js'
export * from '@/stores/light.js'
export * from '@/stores/environmentmodel.js'
export * from '@/stores/animate.js'
export * from '@/stores/point.js'