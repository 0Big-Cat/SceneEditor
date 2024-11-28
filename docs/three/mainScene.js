// 引入three
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// // 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// // 引入gltf解析器（压缩过的模型要使用解析器！！！）
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

// 获取上传的模型名称
// import { modelsCounterStore } from '@/stores'

import { threeScene } from './threescene'

// 导出三维场景函数
export function initThreeScene() {
  // 初始化三维场景
  // const scene = new THREE.Scene()
  const scene = threeScene()

  // 初始化相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // 设置相机位置
  camera.position.set(-3.23, 2.98, 4.06)


  // 初始化渲染器
  const render = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true
  })
  // 设置渲染器大小
  render.setSize(window.innerWidth, window.innerHeight)
  // 将渲染器放置到body页面中
  document.body.appendChild(render.domElement)


  // 初始化轨道控制器
  const controls = new OrbitControls(camera, render.domElement)
  // 开启阻尼效果
  controls.enableDamping = true
  // 设置阻尼系数
  controls.dampingFactor = 0.05


  const textureloader = new THREE.TextureLoader()
  let texture = textureloader.load('./textures/imgs/skyback.jpg', () => {
    // 纹理要开启色彩空间(否则颜色会有偏差)
    texture.colorSpace = THREE.SRGBColorSpace
    // 设置场景背景图片
    scene.background = texture
  })


  // 实例化模型上传变量
  // const data = modelsCounterStore()


  // 创建GLTF加载器对象
  const gltfLoader = new GLTFLoader()
  // 创建解析器对象
  const dracoLoader = new DRACOLoader()
  // 解析器位置
  dracoLoader.setDecoderPath('./draco/')
  // 给加载器指定解析器
  gltfLoader.setDRACOLoader(dracoLoader)
  // // 注意！！：默认是在public中找模型，写路径的时候不能再写public
  // gltfLoader.load('', (gltf) => {
  //   // console.log(gltf)
  //   scene.add(gltf.scene)
  // })


  // 添加平行光
  const ligth = new THREE.DirectionalLight(0xffffff, 1)
  ligth.position.set(0, 50, 0)
  scene.add(ligth)


  // 设置画布自适应屏幕大小
  window.addEventListener('resize', () => {
    // 重置渲染器输出画布canvas尺寸
    render.setSize(window.innerWidth, window.innerHeight)
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix()
  })


  // 创建渲染函数
  const animate = () => {
    // 请求动画帧
    requestAnimationFrame(animate)
    // 渲染
    render.render(scene, camera)
    controls.update()
  }
  // 调用渲染函数
  animate()

  // AxesHelper：辅助观察的坐标系[可选] AxesHelper中参数为坐标线长度
  const axesHelper = new THREE.AxesHelper(5)

  //将坐标轴添加到创建的三维场景中
  scene.add(axesHelper)

  let model
  // 加载并显示模型
  function loadModel(file) {
    // 确保 GLTFLoader 实例化正确
    // const loader = new THREE.GLTFLoader()

    gltfLoader.load(URL.createObjectURL(file), function (gltf) {
      // 将模型添加到场景
      if (model) {
        scene.remove(model)
      }
      model = gltf.scene
      scene.add(model)
      model.position.set(0, 0, 0) // 设置模型位置
    }, undefined, function (error) {
      console.error(error)
    })
  }

  // 监听文件上传事件
  document.querySelector('#fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0]
    if (file) {
      loadModel(file)
    }
  })
}