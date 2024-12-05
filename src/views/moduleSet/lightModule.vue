<script setup>
// 灯光模块
import { lightCounterStore } from '@/stores'
import { changeLightStrength } from '../../../public/three/mainScene'

const { lightSet, toggleLight } = lightCounterStore()

</script>

<template>
  <div id="lightmodel">
    <ul>
      <li v-for="item in lightSet " :key="item.lightname">
        <div>
          <el-checkbox v-model="item.lightshow" :label="item.lightlabel" size="large"
            @change="toggleLight(item.lightname)" />
        </div>
        <div v-if="item.lightcolor && item.lightshow">
          <span>强度:</span>
          <el-slider v-model="item.lightstrength" :precision="2" size="small" :step="0.5" :max="10" :min="0"
            @input="changeLightStrength(item.lightname, item.lightstrength)" />
        </div>
        <div v-if="item.lightcolor && item.lightshow">
          <span>光源坐标:</span><br>
          <span>x:<input v-model="num3" /></span><br>
          <span>y:<input v-model="num3" /></span><br>
          <span>z:<input v-model="num3" /></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#lightmodel {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    li {
      display: flex;
      flex-direction: column;
    }
  }

  .el-checkbox:last-of-type {
    margin-right: 30px;
  }

}
</style>