<script setup>
// 上传模型模块（二维）
import { ref, onMounted } from 'vue'
import { initThreeScene } from '../../../docs/three/mainScene'

// const initthreescene = initThreeScene()

// // const emit = defineEmits(['model-uploaded'])
// const onFileChange = (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     // 将文件通过 `model-uploaded` 事件传递出去
//     // emit('model-uploaded', file)
//     // initthreescene.loadModel(file)
//   }
// }
// 使用ref存储loadModel函数
const loadModel = ref(null)

// 在组件挂载时初始化 Three.js 场景
onMounted(() => {
  // 这种写法会重新创建一个canvas出来
  const { loadModel: loadModelFn } = initThreeScene()
  loadModel.value = loadModelFn
  // const initthreescene = initThreeScene()
  // console.log(initthreescene)

  // loadModel.value = loadModelFn
})

// 处理文件上传
// const handleFileChange = (event) => {
//   const file = event.target.files[0]
//   if (file && loadModel.value) {
//     loadModel.value(file)  // 使用loadModel加载模型
//   }
// }
</script>

<template>
  <div id="uploadmodule">
    <input type="file" id="fileInput" accept=".obj,.glb,.fbx,.stl,.gltf" @change="handleFileChange" />
  </div>
</template>
<style lang="scss" scoped>
#uploadmodule {
  position: absolute
}
</style>