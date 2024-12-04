<script setup>
// 左侧面板主体
// import { ref, onMounted } from 'vue'
// 引入文件上传组件
// import uploadmodule from '../moduleSet/uploadModule.vue'
// 相机位置+旋转中心位置模块
// import pointModule from '../moduleSet/pointModule.vue'
// 引入详细操作组件
import particularsPanel from './particularsPanel.vue'
// 是否显示详细操作页面变量模块
import { particularsCounterStore } from '@/stores'

const pares = particularsCounterStore()

// 面板显示隐藏变量
// let panelValue = ref(false)

// action 是为了后期开发，若是需要点击不同的按钮做出不同的响应而预留的参数
const items = [
  { name: '模型', url: '/upload', icon: 'icon-model', action: 'model' },
  { name: '相机', url: '/camera', icon: 'icon-zhaoxiangji', action: 'camera' },
  { name: '灯光', url: '/light', icon: 'icon-dengguang', action: 'light' },
  { name: '天空', url: '/sky', icon: 'icon-tiankong', action: 'sky' },
  { name: '地面', url: '/ground', icon: 'icon-dimian', action: 'ground' },
  { name: '雾霾', url: '/fog', icon: 'icon-wu', action: 'fog' },
  { name: '后期', url: '/anaphase', icon: 'icon-houqi', action: 'postProcessing' },
  { name: '动画', url: '/nimate', icon: 'icon-donghua', action: 'animation' },
  { name: '点位', url: '/point', icon: 'icon-web-icon-', action: 'waypoints' }
]

// onMounted(() => {
//   // 挂载完成显示左侧面板
//   // panelValue.value = true
// })

function changeper() {
  pares.parvalue = true
}
</script>

<template>
  <!-- <transition name="left"> -->
  <!-- v-if="panelValue" -->
  <div id="leftmainpanel">
    <div class="logobox">logo</div>
    <ul>
      <!-- 模型的上传、删除
      相机坐标的获取、旋转中心的坐标获取
      各种灯光的添加、删除及其数值调整
      天空球的添加、删除
      地面的添加、删除
      雾霾的添加、删除
      后期开启及其设置
      检测导入模型的动画、是否播放动画
      在模型上获取点位，导出路线点位 -->
      <li v-for="(item, index) in items" :key="index">
        <router-link @click="changeper" :to="item.url">
          <label>
            <span class="iconfont" :class="item.icon"></span>{{ item.name }}
          </label>
        </router-link>
      </li>
    </ul>
  </div>

  <particularsPanel></particularsPanel>

  <!-- <uploadmodule></uploadmodule> -->
  <!-- <pointModule></pointModule> -->
  <!-- </transition> -->
</template>

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
    height: vh(55px);
    line-height: vh(55px);
    background-color: skyblue;
    text-align: center;
    font-size: rem(20px);
    font-weight: 700;
    border-right: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;

    .iconfont::before {
      margin-right: vw(8px);
    }

    li {
      width: 85%;
      height: vh(38px);
      border: 1px solid #3d3d3d;
      margin-top: vh(20px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: rem(18px);

      label {
        cursor: pointer;
      }

      .router-link-active {
        color: skyblue;
      }

      &:nth-child(1) span,
      &:nth-child(7) span {
        font-size: rem(16px);
      }

      &:nth-child(4) span {
        font-size: rem(20px);
      }

      &:nth-child(5) span {
        font-size: rem(12px);
      }

      &:nth-child(8) span,
      &:nth-child(9) span {
        font-size: rem(20px);
      }
    }
  }
}
</style>