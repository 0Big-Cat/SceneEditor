<script setup>
// 天空模块
import { ref } from 'vue'
import { skyballHDR, changeskyHDR, ground, linearfog, indexfogexp2 } from '../../../public/three/mainScene'
import { skyCounterStore, groundCounterStore, fogCounterStore } from '@/stores'

// 天空模块
const skydata = skyCounterStore()
const { skyimgs } = skyCounterStore()
// 新增的响应式变量，存储选中的图片ID
const selectedImage = ref(null)
// 处理点击事件，设置选中的图片
const handleImageClick = (id) => {
  selectedImage.value = id
  changeskyHDR(id, skydata.skyvalue)
}

// 地面模块
const grounddata = groundCounterStore()

// 雾模块
const fogdata = fogCounterStore()

</script>

<template>
  <div id="environmentmodel">
    <!-- 天空球 -->
    <div class="skybox">
      <div>
        <el-checkbox v-model="skydata.skyvalue" label="天空球" size="large" @change="skyballHDR(skydata.skyvalue)" />
      </div>
      <div class="hdrcompilations">
        <img v-for="item in skyimgs" :key="item.id" :src="item.url" :class="{ 'selected': selectedImage === item.id }"
          @click="handleImageClick(item.id)">
      </div>
    </div>

    <!-- 地面 -->
    <div class="groundboc">
      <el-checkbox v-model="grounddata.groundvalue" label="网格地面" size="large"
        @change="ground(grounddata.groundvalue)" />
    </div>

    <!-- 雾 -->
    <div class="fogbox">
      <el-checkbox v-model="fogdata.fogvalue" label="线性雾" size="large" @change="linearfog(fogdata.fogvalue)" />
      <el-checkbox v-model="fogdata.fogexp2value" label="指数雾" size="large"
        @change="indexfogexp2(fogdata.fogexp2value)" />
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

  // 天空球模块
  .hdrcompilations {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: vh(5px);
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    place-items: center;

    /* 设置透明的边框，确保只有下边框有渐变效果 */
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;

    /* 创建渐变的下边框 */
    background-image: linear-gradient(to right, #0ab0b7, #fff);
    background-position: bottom left;
    background-repeat: no-repeat;
    background-size: 100% 2px;

    img {
      width: vw(80px);
      height: vh(50px);
      border: 1px solid #3d3d3d;
      margin: vh(10px) 0;
      cursor: pointer;
      transition: border-color 0.3s;
    }

    img.selected {
      border: 2px solid skyblue;
      /* 给选中的图片加上蓝色边框 */
    }
  }

  // 地面模块
  .groundboc {
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

  // 雾模块
  .fogbox {
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
</style>
