<script setup>
// 中心模块

import { loadingCounterStore } from '@/stores'

const loadval = loadingCounterStore()
</script>

<template>
  <div v-if="loadval.loadingshow" id="centermainpanel">
    <div class="progress">
      <div class="progress-value" :style="{ width: loadval.loadingvalue + '%' }">
        <span class="progress-text">{{ loadval.loadingvalue }}%</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#centermainpanel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  .progress {
    background: rgba(255, 255, 255, 0.1);
    justify-content: flex-start;
    border-radius: 100px;
    align-items: center;
    position: relative;
    padding: 0 5px;
    display: flex;
    height: 40px;
    width: 500px;
  }

  .progress-value {
    box-shadow: 0 10px 40px -10px #fff;
    border-radius: 100px;
    background: #0ab0b7;
    height: 30px;
    transition: width 0.3s ease;
    /* 添加过渡效果 */
    position: relative;
    /* 使文本相对定位 */
    display: flex;
    /* 使用 flexbox 使文本居中 */
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
  }

  .progress-text {
    position: absolute;
    /* 绝对定位 */
    color: #fff;
    /* 文本颜色 */
    font-weight: bold;
    /* 加粗文本 */
    transition: left 0.3s ease;
    /* 添加过渡效果 */
  }
}
</style>
