<script setup>
// 动画模块

import { playAnimation, pauseAnimation, normalPlayAnimation, animatecishu } from '../../../public/three/mainScene'
import { animateCounterStore } from '@/stores'

const { animatevalue } = animateCounterStore()

// console.log(animatevalue)


</script>

<template>
  <div id="animatemodule">
    <!-- 遍历 animatevalue 外层 -->
    <ul v-for="(itemex, indexex) in animatevalue" :key="indexex">
      <h4>模型名称-{{ itemex.modelName }}</h4>
      <!-- 遍历 animateData 子属性 -->
      <li v-for="animation in itemex.animateData" :key="animation.uuid">
        <h4>动画名称-{{ animation.name }}</h4>

        <div>
          <!-- 播放/停止 -->
          <el-checkbox v-model="animation.startandstop" :label="animation.startandstop ? '播放' : '停止'" size="large"
            @change="playAnimation(animation.uuid, animation.startandstop, animatevalue[indexex].serialnumber)" />

          <!-- 暂停/恢复 -->
          <el-checkbox v-model="animation.pauserecovery" :label="animation.pauserecovery ? '恢复' : '暂停'" size="large"
            @change="pauseAnimation(animation.uuid, animation.pauserecovery, animatevalue[indexex].serialnumber)" />

          <!-- 正放/倒放 -->
          <el-checkbox v-model="animation.positivenegative" :label="animation.positivenegative ? '正放' : '倒放'"
            size="large"
            @change="normalPlayAnimation(animation.uuid, animation.positivenegative, animatevalue[indexex].serialnumber)" />
        </div>

        <!-- 动画进度 -->
        <div>
          <span>动画进度-</span>
          <span>{{ animation.progress.toFixed(0) }}%</span>
        </div>

        <div>
          <span>播放次数-</span>
          <el-input-number v-model="animation.animateloop" size="small" min="1"
            @change="animatecishu(animation.uuid, animation.animateloop, animatevalue[indexex].serialnumber)" />
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
  padding: 0 vw(20px);

  h4 {
    font-size: rem(14px);
    font-weight: 400;
    // color: #46484a;
    overflow: hidden;
    /* 超出隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /* 强制不换行 */
  }

  ul {
    margin-top: vh(17px);
    width: 100%;

    li {
      margin-bottom: vh(20px);
      padding-bottom: vh(5px);
      line-height: vh(40px);

      /* 设置透明的边框，确保只有下边框有渐变效果 */
      border-top: 1px solid transparent;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;

      /* 创建渐变的下边框 */
      background-image: linear-gradient(to right, #0ab0b7, #fff);
      background-position: bottom left;
      background-repeat: no-repeat;
      background-size: 100% 2px;

      span {
        font-size: rem(14px);
      }

      >div {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>