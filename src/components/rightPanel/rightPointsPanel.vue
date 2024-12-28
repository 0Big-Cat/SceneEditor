<script setup>
// 点位右侧操作面板
import { pointlabelCounterStore } from '@/stores'
import { clearPointsAndLines, clearLastLine, exportPointsToJson } from '../../../public/three/mainScene'

const data = pointlabelCounterStore()

// 格式化为保留三位小数
function formatToThreeDecimals(value) {
  const num = parseFloat(value)
  return isNaN(num) ? '0.000000' : num.toFixed(6)
}

// 复制点位坐标
const copypoint = (itemx, itemy, itemz) => {
  const cameraString = `${itemx},${itemy},${itemz}`
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
</script>

<template>
  <transition name="rightpoint">
    <div v-if="data.rightpanel" id="rightpointspanel">
      <!-- 标题 -->
      <!-- <div>
        <div>
          <span class="iconfont icon-xiala" :class="data.pathlabel ? 'pulldown' : 'packup'"></span>
          <span>标点</span>
        </div>
        <div>
          <button @click="copypoint(
            formatToThreeDecimals(data.pointcoordinate.x),
            formatToThreeDecimals(data.pointcoordinate.y),
            formatToThreeDecimals(data.pointcoordinate.z)
          )">复制</button>
        </div>
      </div> -->

      <!-- 点位标注 -->
      <div v-if="data.pointlabel">
        <div>
          <h5>position-x</h5>
          <span>{{ formatToThreeDecimals(data.pointcoordinate.x) }}</span>
        </div>
        <div>
          <h5>position-y</h5>
          <span>{{ formatToThreeDecimals(data.pointcoordinate.y) }}</span>
        </div>
        <div>
          <h5>position-z</h5>
          <span>{{ formatToThreeDecimals(data.pointcoordinate.z) }}</span>
        </div>
        <div>
          <h5>复制坐标</h5>
          <button @click="copypoint(
            formatToThreeDecimals(data.pointcoordinate.x),
            formatToThreeDecimals(data.pointcoordinate.y),
            formatToThreeDecimals(data.pointcoordinate.z)
          )">复制</button>
        </div>
      </div>

      <!-- 路线标注 -->
      <div v-if="data.pathlabel" class="pathbutton">
        <div>
          <h5>删除全部线段</h5>
          <button @click="clearPointsAndLines()">删除</button>
        </div>
        <div>
          <h5>撤销上一条线段</h5>
          <button @click="clearLastLine()">回撤</button>
        </div>
        <div>
          <h5>JSON格式导出路径</h5>
          <button @click="exportPointsToJson()">导出</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
#rightpointspanel {
  position: absolute;
  right: 0;
  padding-top: vh(17px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: vw(250px);
  height: 100%;
  z-index: 1;
  background-color: #0d0d0d;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  >div {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 vw(20px);

    >div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: vh(5px);
    }
  }
}

h5 {
  color: #606266;
  font-weight: 400;
}

span {
  width: 86px;
  height: 20px;
  line-height: 20px;
  margin-left: vw(3px);
  text-align: center;
  background-color: #333;
  color: #0ab0b7;
  font-size: rem(13px);
}

button {
  width: 43px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-left: vw(3px);
  background-color: #333;
  color: #0ab0b7;
  border: none;
  cursor: pointer;
}

// 组件动画
.rightpoint-enter-from,
.rightpoint-leave-to {
  transform: translateX(100%);
}

.rightpoint-enter-to,
.rightpoint-leave-from {
  transform: translateX(0);
}

.rightpoint-enter-active,
.rightpoint-leave-active {
  transition: transform 0.3s linear;
}
</style>