<script setup>
// 灯光模块
import { lightCounterStore } from '@/stores'
import { changeLightStrength, lightShdow } from '../../../public/three/mainScene'

const { lightSet, toggleLight } = lightCounterStore()

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
        <!-- 光照强度 -->
        <div v-if="item.lightcolor && item.lightshow" class="lightvalue">
          <span>强度:</span>
          <el-slider v-model="item.lightstrength" :precision="2" :step="0.1" :max="100" :min="1"
            @input="changeLightStrength(item.lightname, item.lightstrength)" />
        </div>
        <!-- 光源坐标 -->
        <div v-if="item.x && item.lightshow" class="lightpoint">
          <span>坐标:</span>
          <input v-model="item.x" />
          <input v-model="item.y" />
          <input v-model="item.z" />
        </div>
        <!-- 新增光源 -->
        <div v-if="item.lightadd && item.lightshow" class="newlight">
          <span>新增:</span>
          <span>+</span>
        </div>
        <!-- 是否启用阴影 (显示与否，与新增一致)-->
        <div v-if="item.lightadd && item.lightshow" class="lightshadow">
          <el-checkbox v-model="item.lightshodow" label="阴影" size="large"
            @change="lightShdow(item.lightshodow, item.lightname)" />
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

    li {
      display: flex;
      flex-direction: column;

      // 光照强度
      .lightvalue {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        // padding-top: vh(5px);
        // margin: vh(10px) 0;

        span {
          width: vw(50px);
          margin-right: vw(5px);
        }


        /* 设置透明的边框，确保只有下边框有渐变效果 */
        border-bottom: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;

        /* 创建渐变的下边框 */
        background-image: linear-gradient(to right, #0ab0b7, #fff);
        background-position: top left;
        background-repeat: no-repeat;
        background-size: 100% 2px;

      }

      // 光源坐标
      .lightpoint {
        display: flex;
        margin-bottom: vh(10px);

        input {
          width: 40px;
          height: 19px;
          margin-left: vw(5px);

          &:focus {
            outline: none;
            /* 去掉焦点时的外部轮廓 */
          }
        }
      }

      // 新增光源
      .newlight {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .newlight :nth-of-type(2) {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #0ab0b7;
        margin-left: vw(5px);
        cursor: pointer;
      }


      // 阴影
      .lightshadow {
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
    }
  }

  .el-checkbox:last-of-type {
    margin-right: 30px;
  }

}
</style>