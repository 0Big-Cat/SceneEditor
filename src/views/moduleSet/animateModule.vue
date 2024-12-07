<script setup>
// 动画模块

import { playAnimation, pauseAnimation, normalPlayAnimation, animatecishu } from '../../../public/three/mainScene'
import { animateCounterStore } from '@/stores'

// 这两个还是写到store里面吧，让pinia全局管理

const { animatevalue } = animateCounterStore()
const schedule = animateCounterStore()
const loop = animateCounterStore()

console.log(animatevalue)

</script>

<template>
  <div id="animatemodule">
    <!-- 遍历 animatevalue 外层 -->
    <ul v-for="(itemex, indexex) in animatevalue" :key="indexex">
      <h4>模型名称:{{ itemex.modelName }}</h4>
      <!-- 遍历 animateData 子属性 -->
      <li v-for="animation in itemex.animateData" :key="animation.uuid">
        <h4>动画名称: {{ animation.name }}</h4>

        <!-- 播放/停止 -->
        <el-checkbox v-model="animation.startandstop" :label="animation.startandstop ? '播放' : '停止'" size="large"
          @change="playAnimation(animation.uuid, animation.startandstop, animatevalue[indexex].serialnumber)" />

        <!-- 暂停/恢复 -->
        <el-checkbox v-model="animation.pauserecovery" :label="animation.pauserecovery ? '恢复' : '暂停'" size="large"
          @change="pauseAnimation(animation.uuid, animation.pauserecovery, animatevalue[indexex].serialnumber)" />

        <!-- 正放/倒放 -->
        <el-checkbox v-model="animation.positivenegative" :label="animation.positivenegative ? '正放' : '倒放'" size="large"
          @change="normalPlayAnimation(animation.uuid, animation.positivenegative, animatevalue[indexex].serialnumber)" />

        <!-- 动画运行时间 -->
        <div>
          <span>动画进度:</span>
          <span>{{ schedule.animateschedule.toFixed(2) }}%</span>
        </div>

        <div>
          <span>播放次数:</span>
          <!-- 问题：loop.animateloop 会所有动画共享，还是得加到哪个对象里面去 -->
          <el-input-number v-model="loop.animateloop" size="small"
            @change="animatecishu(animation.uuid, loop.animateloop, animatevalue[indexex].serialnumber)" />
        </div>

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

  h4 {
    font-size: rem(16px);
    font-weight: 400;
    overflow: hidden;
    /* 超出隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /* 强制不换行 */
  }
}
</style>