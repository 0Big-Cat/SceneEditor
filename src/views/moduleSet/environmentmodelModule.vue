<script setup>
// 天空模块
import { skyballHDR, ground, linearfog, indexfogexp2, axeshelperFun } from '../../../public/three/mainScene'
import { skyCounterStore, groundCounterStore, fogCounterStore } from '@/stores'

// 天空模块
const skydata = skyCounterStore()

// 地面模块
const { grounddata } = groundCounterStore()

// 雾模块
const { fogdata, fogexp2data } = fogCounterStore()

</script>

<template>
  <div id="environmentmodel">
    <!-- 天空球 -->
    <div class="skybox">
      <div>
        <el-checkbox v-model="skydata.skyvalue" @change="skyballHDR(skydata.skyvalue)" label="天空球" size="large" />
      </div>
    </div>

    <!-- 地面 -->
    <div class="groundboc">
      <el-checkbox v-model="grounddata.showvalue" label="网格地面" size="large"
        @change="ground(grounddata.showvalue, grounddata.sizevalue, grounddata.divisionsvalue)" />
    </div>

    <!-- 坐标辅助器 -->
    <div class="axeshelper">
      <el-checkbox v-model="grounddata.axeshelper" label="坐标辅助器" size="large"
        @click="axeshelperFun(grounddata.axeshelper)" />
    </div>

    <!-- 雾 -->
    <div class="fogbox">
      <div>
        <el-checkbox v-model="fogdata.show" label="线性雾" size="large"
          @change="linearfog(fogdata.show, fogdata.near, fogdata.far, fogdata.color)" />

      </div>
      <div>
        <el-checkbox v-model="fogexp2data.show" label="指数雾" size="large"
          @change="indexfogexp2(fogexp2data.show, fogexp2data.color, fogexp2data.density)" />

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#environmentmodel {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 0 vw(20px);
  margin-top: vh(17px);



  // 地面模块
  .groundboc {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: vw(30px);
      height: vh(19px);
      text-align: center;
      margin-left: vw(5px);

      &:focus {
        outline: none;
        /* 去掉焦点时的外部轮廓 */
      }
    }

    // /* 设置透明的边框，确保只有下边框有渐变效果 */
    // border-top: 1px solid transparent;
    // border-left: 1px solid transparent;
    // border-right: 1px solid transparent;

    // /* 创建渐变的下边框 */
    // background-image: linear-gradient(to right, #0ab0b7, #fff);
    // background-position: bottom left;
    // background-repeat: no-repeat;
    // background-size: 100% 2px;
  }

  // 坐标辅助器
  .axeshelper {
    // /* 设置透明的边框，确保只有下边框有渐变效果 */
    // border-top: 1px solid transparent;
    // border-left: 1px solid transparent;
    // border-right: 1px solid transparent;

    // /* 创建渐变的下边框 */
    // background-image: linear-gradient(to right, #0ab0b7, #fff);
    // background-position: bottom left;
    // background-repeat: no-repeat;
    // background-size: 100% 2px;
  }

  // 雾模块
  .fogbox {
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        width: vw(30px);
        height: vh(19px);
        text-align: center;
        margin-left: vw(5px);

        &:focus {
          outline: none;
          /* 去掉焦点时的外部轮廓 */
        }
      }

    }


    // /* 设置透明的边框，确保只有下边框有渐变效果 */
    // border-top: 1px solid transparent;
    // border-left: 1px solid transparent;
    // border-right: 1px solid transparent;

    // /* 创建渐变的下边框 */
    // background-image: linear-gradient(to right, #0ab0b7, #fff);
    // background-position: bottom left;
    // background-repeat: no-repeat;
    // background-size: 100% 2px;
  }
}
</style>
