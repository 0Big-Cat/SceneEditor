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
        <div v-if="item.lightcolor && item.lightshow" class="lightvalue">
          <span>强度:</span>
          <el-slider v-model="item.lightstrength" :precision="2" :step="0.5" :max="10" :min="1"
            @input="changeLightStrength(item.lightname, item.lightstrength)" />
        </div>
        <!-- <div v-if="item.lightcolor && item.lightshow">
          <span>光源坐标:</span><br>
          <span>x:<input v-model="num3" /></span><br>
          <span>y:<input v-model="num3" /></span><br>
          <span>z:<input v-model="num3" /></span>
        </div> -->
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

  ul {
    margin-top: vh(17px);
    width: 100%;

    li {
      display: flex;
      flex-direction: column;

      .lightvalue {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding-top: vh(5px);
        margin: vh(10px) 0;

        /* 设置透明的边框，确保只有下边框有渐变效果 */
        border-bottom: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;

        /* 创建渐变的下边框 */
        background-image: linear-gradient(to right, #0ab0b7, #fff);
        background-position: top left;
        background-repeat: no-repeat;
        background-size: 100% 2px;

        span {
          width: 50px;
          margin-right: vw(5px);
        }
      }
    }
  }

  .el-checkbox:last-of-type {
    margin-right: 30px;
  }

}
</style>