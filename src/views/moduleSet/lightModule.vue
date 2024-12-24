<script setup>
// 灯光模块
import { lightCounterStore } from '@/stores'
import {
  cameraHelperFun,
  assistDeviceFun,
  lightPointFun,
  directionalLightFun,
  spotLightFun,
  hemisphereLightFun,
  ambientLightFun,
  rectangleLightFun,
  lightShdow
} from '../../../public/three/mainScene'

const { lightSet } = lightCounterStore()

// 光源类型选择函数
const toggleLight = (lightname) => {
  // 根据不同的光源类型，调用对应的函数
  switch (lightname) {
    case 'assistcamera':
      cameraHelperFun()
      break
    case 'assistdevice':
      assistDeviceFun()
      break
    case 'pointlight':
      lightPointFun()
      break
    case 'directionallight':
      directionalLightFun()
      break
    case 'spotlight':
      spotLightFun()
      break
    case 'hemispherelight':
      hemisphereLightFun()
      break
    case 'ambientlight':
      ambientLightFun()
      break
    case 'rectanglelight':
      rectangleLightFun()
      break
    case 'shadow':
      lightShdow()
      break
    default:
      break
  }
}

</script>

<template>
  <div id="lightmodel">
    <ul>
      <li v-for="item in lightSet " :key="item.lightname">
        <!-- 是否启用 -->
        <div>
          <el-checkbox v-model="item.lightshow" :label="item.lightlabel" size="large"
            @change="toggleLight(item.lightname)" />
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
  padding: 0 vw(20px);
  font-size: rem(14px);

  ul {
    margin-top: vh(17px);
    width: 100%;
  }

  .el-checkbox:last-of-type {
    margin-right: 30px;
  }

}
</style>