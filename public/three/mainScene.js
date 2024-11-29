// 引入three
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// 引入gltf解析器（压缩过的模型要使用解析器！！！）
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore } from '@/stores'


// 导出三维场景函数
export function initThreeScene() {
  // 初始化三维场景
  const scene = new THREE.Scene()


  // 初始化相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(-3.23, 2.98, 4.06)


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
  controls.enableDamping = true
  // 阻尼系数
  controls.dampingFactor = 0.05


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


  // 创建渲染函数
  const animate = () => {
    requestAnimationFrame(animate)
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
  // 监听文件上传事件
  document.querySelector('#fileInput').addEventListener('change',
    event => {
      const file = event.target.files[0]
      if (file) {
        loadModel(file)
      }
    }
  )


  // 相机位置+旋转中心位置模块
  const point = pointCounterStore()

  point.camerapoint = [camera.position.x, camera.position.y, camera.position.z]
  point.controlspoint = [controls.target.x, controls.target.y, controls.target.z]

  // 监听坐标是否被修改
  document.querySelector('#camerapointX').addEventListener('change', () => {
    camera.position.x = point.camerapoint[0]
  })
  document.querySelector('#camerapointY').addEventListener('change', () => {
    camera.position.y = point.camerapoint[1]
  })
  document.querySelector('#camerapointZ').addEventListener('change', () => {
    camera.position.z = point.camerapoint[2]
  })
}

// 在pinia中设置变量
// store.js
// import { defineStore } from 'pinia';

// export const useCameraStore = defineStore('camera', {
//   state: () => ({
//     position: { x: 0, y: 0, z: 0 },
//   }),
//   actions: {
//     updatePosition(x, y, z) {
//       this.position.x = x;
//       this.position.y = y;
//       this.position.z = z;
//     },
//   },
// });


// 在three中的animate中调用那个函数
// scene.js
// import { useCameraStore } from './store';

// const cameraStore = useCameraStore();

// // 假设你有一个动画循环
// function animate() {
//   requestAnimationFrame(animate);

//   // 更新相机位置（示例）
//   camera.position.x += 0.01; // 这里可以是任何相机移动的逻辑

//   // 更新 Pinia store 中的相机坐标
//   cameraStore.updatePosition(camera.position.x, camera.position.y, camera.position.z);

//   // 渲染场景
//   renderer.render(scene, camera);
// }

// animate();


// 在组件中使用
//  <template>
//   <div>
//     <p>Camera Position: X: {{ cameraPosition.x }}, Y: {{ cameraPosition.y }}, Z: {{ cameraPosition.z }}</p>
//   </div>
// </template>

// <script>
// import { useCameraStore } from './store';
// import { computed } from 'vue';

// export default {
//   setup() {
//     const cameraStore = useCameraStore();
    
//     // 使用计算属性来实时获取相机坐标
//     const cameraPosition = computed(() => cameraStore.position);

//     return {
//       cameraPosition,
//     };
//   },
// };
// </script> 
