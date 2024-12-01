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


// 导出三维场景函数
export const initThreeScene = () => {

  // 初始化三维场景
  const scene = new THREE.Scene()


  // 相机位置+旋转中心位置模块
  const point = pointCounterStore()
  // 初始化相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(5, 5, 5)


  // 初始化渲染器
  const render = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(render.domElement)


  // 初始化轨道控制器
  const controls = new OrbitControls(camera, render.domElement)
  // 阻尼效果
  // controls.enableDamping = true
  // 阻尼系数
  // controls.dampingFactor = 0.05


  const textureloader = new THREE.TextureLoader()
  let texture = textureloader.load('./textures/imgs/skyback.jpg', () => {
    // 开启色彩空间
    texture.colorSpace = THREE.SRGBColorSpace
    scene.background = texture
  })


  // 创建GLTF加载器对象
  const gltfLoader = new GLTFLoader()
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



  // 模型上传模块
  let model
  // 加载并显示模型
  function loadModel(file) {
    gltfLoader.load(URL.createObjectURL(file), gltf => {
      if (model) {
        scene.remove(model)
      }
      model = gltf.scene
      scene.add(model)
      model.position.set(0, 0, 0)
    }, undefined, error => {
      console.error(error)
    })
  }
  // // 监听文件上传事件
  // document.querySelector('#fileInput').addEventListener('change',
  //   event => {
  //     const file = event.target.files[0]
  //     if (file) {
  //       loadModel(file)
  //     }
  //   }
  // )

  return { loadModel }

}