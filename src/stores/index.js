// pinia 抽出，单独创建index文件进行独立维护（暂时未做持久化处理）
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

export * from '@/stores/models.js'