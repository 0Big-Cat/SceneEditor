// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// 引入gltf解析器（压缩过的模型要使用解析器！！！）
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { threeScene } from './threescene'

export function modelloading(model) {
  const scene = threeScene()
  // 创建GLTF加载器对象
  const gltfLoader = new GLTFLoader()
  // 创建解析器对象
  const dracoLoader = new DRACOLoader()
  // 解析器位置
  dracoLoader.setDecoderPath('./draco/')
  // 给加载器指定解析器
  gltfLoader.setDRACOLoader(dracoLoader)
  // 注意！！：默认是在public中找模型，写路径的时候不能再写public
  gltfLoader.load(model, (gltf) => {
    // console.log(gltf)
    scene.add(gltf.scene)
  })
} 