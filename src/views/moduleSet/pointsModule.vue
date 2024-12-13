<script setup>
// 点位模块
import { poinyListener } from '../../../public/three/mainScene'
import { pointlabelCounterStore } from '@/stores'

let data = pointlabelCounterStore()

// 格式化为保留三位小数
function formatToThreeDecimals(value) {
  const num = parseFloat(value)
  return isNaN(num) ? '0.000' : num.toFixed(3)
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
  <div id="modelpoint">
    <el-checkbox v-model="data.pointlabel" label="标点" size="large" @change="poinyListener(data.pointlabel)" />
    <div>
      <span>坐标:</span>
      <span>{{ formatToThreeDecimals(data.pointcoordinate.x) }}</span>
      <span>{{ formatToThreeDecimals(data.pointcoordinate.y) }}</span>
      <span>{{ formatToThreeDecimals(data.pointcoordinate.z) }}</span>
      <button @click="copypoint(
        formatToThreeDecimals(data.pointcoordinate.x),
        formatToThreeDecimals(data.pointcoordinate.y),
        formatToThreeDecimals(data.pointcoordinate.z)
      )">复制</button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
#modelpoint {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: vh(17px);
  align-items: center;
  color: #fff;
  padding: 0 vw(20px);

  div {
    display: flex;
    align-items: center;

    span {
      font-size: rem(14px);
    }

    &>:nth-of-type(2),
    &>:nth-of-type(3),
    &>:nth-of-type(4) {
      width: 42px;
      height: 19px;
      margin-left: vw(3px);
      text-align: center;
      background-color: #fff;
      color: #000;
      font-size: rem(13px);
    }

    button {
      width: 40px;
      height: 19px;
      margin-left: vw(3px);
      background-color: #0ab0b7;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  }
}
</style>