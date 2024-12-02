<script setup>
// 每个功能的详细操作页面
import { particularsCounterStore } from '@/stores'

const pares = particularsCounterStore()

function changeper() {
  pares.parvalue = false
}
</script>

<template>
  <transition name="particulars">
    <div v-if="pares.parvalue" id="particularspanel">
      <!-- :include="['组件名','组件名']，不设置就会全部缓存 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="packupbtn" @click="changeper"></div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
#particularspanel {
  position: absolute;
  top: 0;
  left: vw(130px);
  width: vw(200px);
  height: 100%;
  z-index: 1;
  background-color: #0d0d0d;

  .packupbtn {
    position: relative;
    top: 50%;
    right: -100%;
    transform: translate(0, -50%);
    width: vw(30px);
    height: vh(100px);
    background-color: #0d0d0d;
  }
}

// 组件动画
.particulars-enter-active,
.particulars-leave-active {
  transition: transform 0.5s ease;
  /* 只保留平移效果 */
}

.particulars-enter-from,
.particulars-leave-to {
  transform: translateX(-100%);
  /* 初始位置设定为左侧 100% */
}
</style>