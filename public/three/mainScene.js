// 引入three
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// 引入gltf解析器（压缩过的模型要使用解析器！！！）
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
// 引入帧率查看器
import Stats from 'three/addons/libs/stats.module.js'
// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore } from '@/stores'


// 将关键变量提出
let scene, camera, render, controls, gltfLoader
// 导出三维场景函数
export const initThreeScene = () => {

  // 初始化三维场景
  scene = new THREE.Scene()


  // 相机位置+旋转中心位置模块
  const point = pointCounterStore()
  // 初始化相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(5, 5, 5)


  // 初始化渲染器
  render = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(render.domElement)


  // 初始化轨道控制器
  controls = new OrbitControls(camera, render.domElement)


  const textureloader = new THREE.TextureLoader()
  let texture = textureloader.load('./textures/imgs/skyback.jpg', () => {
    // 开启色彩空间
    texture.colorSpace = THREE.SRGBColorSpace
    scene.background = texture
  })


  // 创建GLTF加载器对象
  gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')
  gltfLoader.setDRACOLoader(dracoLoader)


  // 添加平行光
  const ligth = new THREE.DirectionalLight(0xffffff, 1)
  ligth.position.set(0, 50, 0)
  scene.add(ligth)


  // 设置画布自适应屏幕大小
  window.addEventListener('resize', () => {
    render.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })


  // 帧率查看器
  const stats = new Stats()
  // document.body.appendChild(stats.domElement)

  // 创建渲染函数
  const animate = () => {
    requestAnimationFrame(animate)
    // 实时传递camera坐标
    point.updateCameraPosition(camera.position.x, camera.position.y, camera.position.z)
    point.updateControlPoint(controls.target.x, controls.target.y, controls.target.z)
    stats.update()
    render.render(scene, camera)
    controls.update()
  }
  animate()


  // 辅助坐标系
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
}


// 模型上传模块
let models = []
let model
// 加载并显示模型
export const loadModelScen = file => {
  gltfLoader.load(URL.createObjectURL(file), gltf => {
    model = gltf.scene
    models.push(model)
    scene.add(model)
    model.name = file.name
  }, undefined, error => {
    console.error(error)
  })
  return { loadModelScen }
}

// 删除模型
export const deleteModel = (name) => {
  models.forEach((item, index) => {
    if (item.name === name) {
      // 删除指定模型
      scene.remove(item)
      // 删除数组中对应的元素
      models.splice(index, 1)
    }
  })
  return { deleteModel }
}

// 修改模型位置
export const pointMoodel = (name, point) => {
  models.forEach(item => {
    if (item.name === name) {
      item.position.set(point.x, point.y, point.z)
      item.scale.set(point.s, point.s, point.s)
    }
  })
  return { pointMoodel }
}

// 隐藏模型
export const wireframeMoodel = (name, vision) => {
  models.forEach(item => {
    if (item.name === name) {
      item.visible = vision
    }
  })
  return { wireframeMoodel }
}

// 还原相机坐标
export const cameraPoint = () => {
  camera.position.set(5, 5, 5)
}

// 还原旋转中心坐标
export const controlsPoint = () => {
  controls.target.set(0, 0, 0)
}