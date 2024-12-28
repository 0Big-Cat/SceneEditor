<script setup>
// 点位模块
import { poinyListener } from '../../../public/three/mainScene'
import { pointlabelCounterStore } from '@/stores'

const data = pointlabelCounterStore()

</script>

<template>
  <div id="modelpoint">
    <el-checkbox v-model="data.pointlabel" label="标点" size="large" @change="poinyListener(data.pointlabel)" />
    <el-checkbox v-model="data.pathlabel" @change="poinyListener(data.pathlabel)" label="路径" size="large" />
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>