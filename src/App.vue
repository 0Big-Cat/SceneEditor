<script setup>
import { onMounted } from 'vue'
import { initThreeScene, ambientLightFun, skyballHDR } from '../public/three/mainScene'
import leftMainPanel from './components/leftPanel/leftMainPanel.vue'
// import rightMainPanel from './components/rightPanel/rightMainPanel.vue'
import centerMainPanel from './components/centerPanel/centerMainPanel.vue'
import '../public/three/mainScene.js'
onMounted(() => {
  initThreeScene()
  ambientLightFun()
  skyballHDR(true)
})
</script>

<template>
  <leftMainPanel></leftMainPanel>
  <centerMainPanel></centerMainPanel>
  <!-- <rightMainPanel></rightMainPanel> -->
</template>

<style scoped></style>