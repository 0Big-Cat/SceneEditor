<script setup>
// 相机位置+旋转中心位置模块
import { ElMessage } from 'element-plus'

// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore } from '@/stores'
import { cameraPoint, controlsPoint } from '../../../public/three/mainScene'

const point = pointCounterStore()

// 复制相机坐标函数
const copycamerapoint = () => {

  // 格式化相机坐标为字符串
  const cameraString = `${point.camerapoint.x},${point.camerapoint.y},${point.camerapoint.z}`
  // 使用 Clipboard API 将相机坐标复制到剪贴板
  navigator.clipboard.writeText(cameraString).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }).catch(() => {
    ElMessage({
      message: '复制失败',
      type: 'warning'
    })
  })
}

// 复制旋转中心坐标函数
const copycontrolspoint = () => {
  // 格式化旋转中心坐标为字符串
  const controlsString = `${point.controlspoint.x},${point.controlspoint.y},${point.controlspoint.z}`
  // 使用 Clipboard API 将旋转中心坐标复制到剪贴板
  navigator.clipboard.writeText(controlsString).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }).catch(() => {
    ElMessage({
      message: '复制失败',
      type: 'warning'
    })
  })
}

// 还原相机坐标
const camerapoint = () => {
  cameraPoint()
}

// 还原旋转中心坐标
const controlspoint = () => {
  controlsPoint()
}
</script>

<template>
  <div id="pointmodule">
    <div class="titlebox">
      <h4>相机坐标</h4>
      <div>
        <button @click="camerapoint" class="iconfont icon-zhongzhi">
          <!-- <span class="hinttext1">重置position坐标</span> -->
        </button>
        <button @click="copycamerapoint" class="iconfont icon-fuzhi">
          <!-- <span class="hinttext2">复制position坐标</span> -->
        </button>
      </div>
    </div>
    <div><span>position-x</span><input type="number" v-model="point.camerapoint.x"></div>
    <div><span>position-y</span><input type="number" v-model="point.camerapoint.y"></div>
    <div><span>position-z</span><input type="number" v-model="point.camerapoint.z"></div>


    <div class="titlebox">
      <h4>旋转中心坐标</h4>
      <div>
        <button @click="controlspoint" class="iconfont icon-zhongzhi">
          <!-- <span class="hinttext3">重置target坐标</span> -->
        </button>
        <button @click="copycontrolspoint" class="iconfont icon-fuzhi">
          <!-- <span class="hinttext4">复制target坐标</span> -->
        </button>
      </div>
    </div>
    <div><span>target-x</span><input type="number" v-model="point.controlspoint.x"></div>
    <div><span>target-y</span><input type="number" v-model="point.controlspoint.y"></div>
    <div><span>target-z</span><input type="number" v-model="point.controlspoint.z"></div>

  </div>
</template>

<style lang="scss" scoped>
#pointmodule {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: rem(16px);
  padding: 0 vw(20px);
  margin-top: vh(17px);

  >div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: vh(15px);

    >div {
      display: flex;
      align-items: center;
    }
  }

  h4 {
    font-size: rem(14px);
    font-weight: 400;
    // margin: vh(17px) 0;
    width: 100%;
    height: vh(30px);

  }

  span {
    font-size: rem(14px);
    color: #606266;
  }

  input {
    width: vw(100px);
    text-align: center;
    background-color: #333;
    color: #0ab0b7;
    border: none;

    &:focus {
      outline: none;
      /* 去掉焦点时的外部轮廓 */
    }

  }

  button {
    color: #fff;
    background-color: transparent;
    border: none;
    margin-left: vw(5px);
    cursor: pointer;

    &:hover {
      color: #0ab0b7;
    }
  }

  .titlebox {
    /* 设置透明的边框，确保只有下边框有渐变效果 */
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;

    /* 创建渐变的下边框 */
    background-image: linear-gradient(to right, #0ab0b7, #fff);
    background-position: bottom left;
    background-repeat: no-repeat;
    background-size: 100% 2px;
  }

  .hinttext1,
  .hinttext2 {
    display: none;
    position: fixed;
    top: vh(20px);
    left: vw(300px);
    font-size: rem(12px);
    z-index: 3;
    color: #0ab0b7;
  }

  .hinttext3,
  .hinttext4 {
    display: none;
    position: fixed;
    top: vh(175px);
    left: vw(300px);
    font-size: rem(12px);
    z-index: 3;
    color: #0ab0b7;
  }

  [class="iconfont icon-zhongzhi"] {
    &:hover .hinttext1 {
      display: block;
    }
  }

  [class="iconfont icon-fuzhi"] {
    &:hover .hinttext2 {
      display: block;
    }
  }

  [class="iconfont icon-zhongzhi"] {
    &:hover .hinttext3 {
      display: block;
    }
  }

  [class="iconfont icon-fuzhi"] {
    &:hover .hinttext4 {
      display: block;
    }
  }

  /* 去掉 Chrome 和 Safari 的小箭头 */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 去掉 Firefox 的小箭头 */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>