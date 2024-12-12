<script setup>
// 右侧面板主体
import { removeOutline } from '../../../public/three/mainScene'
import { uploadCounterStore } from '@/stores'

// 面板显示隐藏变量
let data = uploadCounterStore()

function changeper() {
  data.panelValue = false
  removeOutline(data.currentOutline)
}

</script>

<template>
  <transition name="right">
    <div v-if="data.panelValue" id="rightmainpanel">
      <div>子网格名称:</div>
      <div>
        <span>{{ data.modelchildName }}</span>
      </div>
      <div class="iconfont icon-shouqi-" @click="changeper"></div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
#rightmainpanel {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: vw(250px);
  height: 100%;
  z-index: 1;
  background-color: #0d0d0d;
  color: #fff;

  &>div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: vw(230px);
    height: vh(115px);
    border: 1px solid #3d3d3d;

    span {
      width: 100%;
      text-align: center;
      word-wrap: break-word;
    }

  }

  &>div:nth-of-type(3) {
    position: absolute;
    top: 50%;
    left: -12%;
    transform: translateY(-50%) rotate(180deg);
    // transform: rotate(180deg);
    width: vw(30px);
    height: vh(60px);
    line-height: vh(60px);
    border-radius: 10px;
    background-color: #0d0d0d;
    color: #0ab0b7;
    text-align: center;
    font-size: rem(24px);
    cursor: pointer;
  }
}

// 组件动画
.right-enter-active,
.right-leave-active {
  /* 只保留平移效果 */
  transition: transform 0.5s ease;
}

.right-enter-from,
.right-leave-to {
  /* 初始位置设定为左侧 100% */
  transform: translateX(100%);
}
</style>