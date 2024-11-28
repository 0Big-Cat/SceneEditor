<script setup>
import { onMounted } from 'vue'
import { initThreeScene } from '../public/three/mainScene'
import leftMainPanel from './components/leftPanel/leftMainPanel.vue'
import rightMainPanel from './components/rightPanel/rightMainPanel.vue'
import centerMainPanel from './components/centerPanel/centerMainPanel.vue'

onMounted(() => {
  initThreeScene()
})
</script>

<template>
  <leftMainPanel></leftMainPanel>
  <centerMainPanel></centerMainPanel>
  <rightMainPanel></rightMainPanel>
</template>

<style scoped></style>