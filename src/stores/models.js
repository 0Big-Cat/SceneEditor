import { ref } from 'vue'
import { defineStore } from 'pinia'

export const modelsCounterStore = defineStore('counter', () => {
  const modelUrl = ref('')

  return { modelUrl }
})
