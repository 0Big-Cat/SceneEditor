// // 引入gltf模型加载库GLTFLoader.js
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// // 引入gltf解析器（压缩过的模型要使用解析器！！！）
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

// export const modelmodule = gltf => {
//   // 创建GLTF加载器对象
//   const gltfLoader = new GLTFLoader()
//   // 创建解析器对象
//   const dracoLoader = new DRACOLoader()

//   dracoLoader.setDecoderPath('./draco/')
//   gltfLoader.setDRACOLoader(dracoLoader)

//   let model
//   gltfLoader.load(gltf, (data) => {
//     model = data.scene
//   })

//   return model
// }