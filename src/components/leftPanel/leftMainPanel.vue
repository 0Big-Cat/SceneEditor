<template>
  <div id="leftmainpanel">
    <div class="logobox"></div>
    <div class="routerbox">
      <router-link v-for="(item, index) in items" :key="index" @click="changeper" :to="item.url" class="routerlink">
        <label>
          <span class="iconfont" :class="item.icon"></span>{{ item.name }}
        </label>
      </router-link>
    </div>
  </div>
  <particularsPanel></particularsPanel>
</template>

<script setup>
// 引入详细操作组件
import particularsPanel from './particularsPanel.vue'
// 是否显示详细操作页面变量模块
import { particularsCounterStore } from '@/stores'

const pares = particularsCounterStore()

// action 是为了后期开发，若是需要点击不同的按钮做出不同的响应而预留的参数
const items = [
  { name: '模型', url: '/upload', icon: 'icon-model', action: 'model' },
  { name: '相机', url: '/camera', icon: 'icon-zhaoxiangji', action: 'camera' },
  { name: '灯光', url: '/light', icon: 'icon-dengguang', action: 'light' },
  { name: '场景', url: '/environmentmodel', icon: 'icon-tiankong', action: 'environmentmodel' },
  { name: '动画', url: '/nimate', icon: 'icon-donghua1', action: 'animation' },
  { name: '点位', url: '/point', icon: 'icon-web-icon-', action: 'waypoints' }
  // { name: '后期', url: '/anaphase', icon: 'icon-houqi', action: 'postProcessing' }
]

function changeper() {
  pares.parvalue = true
}
</script>

<style lang="scss" scoped>
#leftmainpanel {
  position: absolute;
  top: 0;
  left: 0;
  width: vw(130px);
  height: 100%;
  z-index: 2;
  background-color: #0d0d0d;
  color: #fff;
  border-right: 1px solid #3d3d3d;

  .logobox {
    position: relative;
    width: vw(130px);
    height: vh(55px);
    overflow: hidden;
    padding: 0 vw(13px);
  }

  .routerbox {
    display: flex;
    flex-direction: column;
    align-items: center;

    .routerlink {

      width: 85%;
      height: vh(40px);
      border: 1px solid #3d3d3d;
      margin-top: vh(20px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: rem(18px);
      transition: all 1s ease;

      label {
        cursor: pointer;

        .iconfont::before {
          margin-right: vw(12px);
        }
      }

      &:nth-child(1) span,
      &:nth-child(7) span {
        font-size: rem(16px);
      }

      &:nth-child(4) span {
        font-size: rem(20px);
      }

      &:nth-child(5) span,
      &:nth-child(6) span {
        font-size: rem(18px);
      }

    }

    .router-link-active {
      position: relative;
      color: #0ab0b7;
      border: 1px solid #0ab0b7;
    }

  }

}
</style>