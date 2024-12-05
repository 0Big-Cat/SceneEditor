<script setup>
// 天空模块
import { ref } from 'vue'
import { skyballHDR, changeskyHDR } from '../../../public/three/mainScene'
import { skyCounterStore } from '@/stores'

const skydata = skyCounterStore()
const { skyimgs } = skyCounterStore()

// 新增的响应式变量，存储选中的图片ID
const selectedImage = ref(null)

// 处理点击事件，设置选中的图片
const handleImageClick = (id) => {
  selectedImage.value = id
  changeskyHDR(id, skydata.skyvalue)
}
</script>

<template>
  <div id="skymodel">

    <div>
      <el-checkbox v-model="skydata.skyvalue" label="天空球" size="large" @change="skyballHDR(skydata.skyvalue)" />
    </div>

    <div class="hdrcompilations">
      <span>素材:</span>
      <img v-for="item in skyimgs" :key="item.id" :src="item.url" :class="{ 'selected': selectedImage === item.id }"
        @click="handleImageClick(item.id)">
    </div>
  </div>
</template>

<style lang="scss" scoped>
#skymodel {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  .hdrcompilations {
    display: flex;
    flex-direction: column;

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
}
</style>
