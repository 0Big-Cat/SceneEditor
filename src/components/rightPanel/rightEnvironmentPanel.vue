<script setup>
// 场景模块右侧操作面板
import { ref } from 'vue'
import { changeskyHDR, sizeFun, divisionsFun, nearFun, farFun, colorFun, densityFun, color2Fun, updateaxeshelperFun } from '../../../public/three/mainScene'
import { skyCounterStore, groundCounterStore, fogCounterStore } from '@/stores'

// 天空模块
const skydata = skyCounterStore()
const { skyimgs } = skyCounterStore()
// 地面模块
const { grounddata } = groundCounterStore()
// 雾模块
const { fogdata, fogexp2data } = fogCounterStore()

// 新增的响应式变量，存储选中的图片ID
const selectedImage = ref(null)
// 处理点击事件，设置选中的图片
const handleImageClick = (id) => {
  selectedImage.value = id
  changeskyHDR(id, skydata.skyvalue)
}
</script>

<template>
  <transition name="rightenvironment">
    <div v-if="skydata.rightpanel" id="rightenvironmentpanel">

      <!-- 天空球模块 -->
      <!-- <div>
        <h5>天空球</h5> -->
      <div v-if="skydata.skyvalue" class="hdrcompilations">
        <img v-for="item in skyimgs" :key="item.id" :src="item.url" :class="{ 'selected': selectedImage === item.id }"
          @click="handleImageClick(item.id)">
      </div>
      <!-- </div> -->

      <!-- 地面网格模块 -->
      <div v-if="grounddata.showvalue">
        <div>
          <div>
            <h5>width</h5>
          </div>
          <div>
            <el-slider v-model="grounddata.sizevalue" @input="sizeFun(grounddata.sizevalue)" :precision="2" :step="1"
              :max="200" :min="1" />
            <input type="number" v-model="grounddata.sizevalue" @input="sizeFun(grounddata.sizevalue)" max="200"
              min="1">
          </div>
        </div>
        <div>
          <div>
            <h5>width</h5>
          </div>
          <div>
            <el-slider v-model="grounddata.divisionsvalue" @input="divisionsFun(grounddata.divisionsvalue)"
              :precision="2" :step="1" :max="100" :min="1" />
            <input type="number" v-model="grounddata.divisionsvalue" @input="divisionsFun(grounddata.divisionsvalue)"
              max="100" min="1">
          </div>
        </div>
      </div>

      <!-- 坐标辅助器 -->
      <div v-if="grounddata.axeshelper">
        <div>
          <div>
            <h5>size</h5>
          </div>
          <div>
            <el-slider v-model="grounddata.axeshelpersize" @input="updateaxeshelperFun(grounddata.axeshelpersize)"
              :precision="2" :step="0.01" :max="200" :min="1" />
            <input type="number" v-model="grounddata.axeshelpersize"
              @input="updateaxeshelperFun(grounddata.axeshelpersize)" max="200" min="1">
          </div>
        </div>
      </div>

      <!-- 线性雾 -->
      <div v-if="fogdata.show">

        <div>
          <div>
            <h5>color</h5>
          </div>
          <div>
            <input type="color" v-model="fogdata.color" @input="colorFun(fogdata.color)">
            <input type="text" v-model="fogdata.color" @input="colorFun(fogdata.color)">
          </div>
        </div>

        <div>
          <div>
            <h5>near</h5>
          </div>
          <div>
            <el-slider v-model="fogdata.near" @input="nearFun(fogdata.near)" :precision="2" :step="1" :max="100"
              :min="1" />
            <input type="number" v-model="fogdata.near" @input="nearFun(fogdata.near)" max="100" min="1">
          </div>
        </div>

        <div>
          <div>
            <h5>far</h5>
          </div>
          <div>
            <el-slider v-model="fogdata.far" @input="farFun(fogdata.far)" :precision="2" :step="1" :max="100"
              :min="1" />
            <input type="number" v-model="fogdata.far" @input="farFun(fogdata.far)" max="100" min="1">
          </div>
        </div>

      </div>

      <!-- 指数雾 -->
      <div v-if="fogexp2data.show">
        <div>
          <div>
            <h5>color</h5>
          </div>
          <div>
            <input type="color" v-model="fogexp2data.color" @input="color2Fun(fogexp2data.color)">
            <input type="text" v-model="fogexp2data.color" @input="color2Fun(fogexp2data.color)">
          </div>
        </div>

        <div>
          <div>
            <h5>density</h5>
          </div>
          <div>
            <el-slider v-model="fogexp2data.density" @input="densityFun(fogexp2data.density)" :precision="3"
              :step="0.001" :max="1" :min="0" />
            <input type="number" v-model="fogexp2data.density" @input="densityFun(fogexp2data.density)">
          </div>
        </div>

      </div>

    </div>
  </transition>
</template>

<style lang="scss" scoped>
#rightenvironmentpanel {
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
    padding: 0 vw(10px);
    margin-bottom: vh(10px);

    >div {
      display: flex;
      justify-content: space-between;


      >div {
        display: flex;
        align-items: center;
      }
    }
  }
}

input {
  width: 40px;
  height: 20px;
  margin-left: vw(3px);
  text-align: center;
  background-color: #333333;
  color: #0ab0b7;
  border: none;

  &:focus {
    outline: none;
  }
}

h5 {
  color: #606266;
  font-weight: 400;
}

// 天空球模块
.hdrcompilations {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: vh(5px);
  width: 100%;
  height: vh(144px);
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  place-items: center;

  img {
    width: vw(80px);
    height: vh(50px);
    border: 1px solid #3d3d3d;
    cursor: pointer;
    transition: border-color 0.3s;
  }

  img.selected {
    border: 2px solid #0ab0b7;
    /* 给选中的图片加上蓝色边框 */
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

input[type="text"] {
  width: 60px;
}

/* 隐藏默认的颜色选择框 */
input[type="color"] {
  appearance: none;
  /* 隐藏默认样式 */
  border: none;
  /* 移除边框 */
  width: 60px !important;
  height: 20px;
  padding: 0;
  cursor: pointer;
}

/* 自定义样式 */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  /* 移除内部间距 */
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  /* 移除内置边框 */
}

input[type="color"] {
  width: 40px;
  height: 20px;
  margin-bottom: vh(2px);
}


// 组件动画
.rightenvironment-enter-from,
.rightenvironment-leave-to {
  transform: translateX(100%);
}

.rightenvironment-enter-to,
.rightenvironment-leave-from {
  transform: translateX(0);
}

.rightenvironment-enter-active,
.rightenvironment-leave-active {
  transition: transform 0.3s linear;
}
</style>