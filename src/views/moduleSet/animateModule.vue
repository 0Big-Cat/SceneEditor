<script setup>
// 动画模块

import { ref } from 'vue'
import { playAnimation, pauseAnimation, normalPlayAnimation } from '../../../public/three/mainScene'
import { animateCounterStore } from '@/stores'

// 这两个还是写到store里面吧，让pinia全局管理
// const animatevalue = ref(false)
const { animatevalue } = animateCounterStore()

// console.log(animatevalue)


// const animateShow = animateCounterStore()

// 用于存储每个动画的独立状态
const animationStates = ref([])

// 初始化独立状态（基于 animatevalue）
const initializeStates = () => {
  animationStates.value = animatevalue.map(item => {
    return item.animateData.map(() => ({
      startandstop: item.startandstop,
      pauserecovery: item.pauserecovery,
      positivenegative: item.positivenegative
    }))
  })
}

// 初始化
initializeStates()

</script>

<template>
  <div id="animatemodule">
    <!-- 遍历 animatevalue 外层 -->
    <ul v-for="(itemex, indexex) in animatevalue" :key="indexex">
      <!-- 遍历 animateData 子属性 -->
      <li v-for="(animation, index) in itemex.animateData" :key="animation.uuid">
        <h4>动画名称: {{ animation.name }}</h4>

        <!-- 播放/停止 -->
        <el-checkbox v-model="animationStates[indexex][index].startandstop"
          :label="animationStates[indexex][index].startandstop ? '停止' : '播放'" size="large"
          @change="playAnimation(index, animationStates[indexex][index].startandstop)" />

        <!-- 暂停/恢复 -->
        <el-checkbox v-model="animationStates[indexex][index].pauserecovery"
          :label="animationStates[indexex][index].pauserecovery ? '恢复' : '暂停'" size="large"
          @change="pauseAnimation(index, animationStates[indexex][index].pauserecovery)" />

        <!-- 正放/倒放 -->
        <el-checkbox v-model="animationStates[indexex][index].positivenegative"
          :label="animationStates[indexex][index].positivenegative ? '正放' : '倒放'" size="large"
          @change="normalPlayAnimation(index, animationStates[indexex][index].positivenegative)" />
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
#animatemodule {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
</style>