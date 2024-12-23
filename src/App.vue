<script setup>
import { onMounted } from 'vue'
import { initThreeScene, ambientLightFun, ground } from '../public/three/mainScene'
import leftMainPanel from './components/leftPanel/leftMainPanel.vue'
import rightMainPanel from './components/rightPanel/rightMainPanel.vue'
import centerMainPanel from './components/centerPanel/centerMainPanel.vue'
import rightLightPanel from './components/rightPanel/rightLightPanel.vue'
import '../public/three/mainScene.js'
onMounted(() => {
  initThreeScene()
  ambientLightFun()
  // skyballHDR(true)
  ground(true, 100, 25)
})
</script>

<template>
  <leftMainPanel></leftMainPanel>
  <centerMainPanel></centerMainPanel>
  <rightMainPanel></rightMainPanel>
  <rightLightPanel></rightLightPanel>
</template>

<style scoped></style>