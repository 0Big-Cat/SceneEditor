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
import { pointCounterStore, loadingCounterStore, lightCounterStore } from '@/stores'


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
    // scene.background = texture
  })


  // 创建GLTF加载器对象
  gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')
  gltfLoader.setDRACOLoader(dracoLoader)


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


let models = [] // 储存模型
let model // 当前传入的模型
// 上传模型
export const loadModelScen = files => {

  const loadval = loadingCounterStore()

  const fileMap = {}

  //  将文件存入 Map，便于后续匹配
  for (let file of files) {
    fileMap[file.name] = file
  }

  // 查找 .gltf 文件
  const gltfFile = Object.values(fileMap).find(file => file.name.endsWith('.gltf'))
  if (!gltfFile) {
    // console.error('GLTF 文件未找到')
    gltfLoader.load(URL.createObjectURL(files[0]), gltf => {
      model = gltf.scene
      models.push(model)
      scene.add(model)
      model.name = files[0].name
      loadval.loadingshow = false
    }, (xhr) => {
      const percent = parseInt((xhr.loaded / xhr.total) * 100)
      loadval.loadingvalue = percent
    })
    return
  }

  const fileReader = new FileReader()

  fileReader.onload = () => {
    const arrayBuffer = fileReader.result // 获取读取的 ArrayBuffer
    const gltfBlob = new Blob([arrayBuffer], { type: 'model/gltf+json' })
    const gltfUrl = URL.createObjectURL(gltfBlob)
    gltfLoader.setPath('')// 设置为空
    gltfLoader.setResourcePath('')// 清空资源路径
    gltfLoader.manager.setURLModifier((url) => {
      // 替换资源路径为 Blob URL
      const fileName = url.split('/').pop()
      if (fileMap[fileName]) {
        const fileBlob = new Blob([fileMap[fileName]])
        return URL.createObjectURL(fileBlob)
      }
      return url
    })
    // 加载模型
    gltfLoader.load(
      gltfUrl,
      (gltf) => {
        // 在场景中添加模型
        model = gltf.scene
        models.push(model)
        scene.add(model)
        console.log(files)
        loadval.loadingshow = false
        Array.from(files)
          .filter(file => file.name.endsWith('.gltf') || file.name.endsWith('.glb'))
          .map(file => {
            model.name = file.name
          })

      },
      (xhr) => {
        const percent = parseInt((xhr.loaded / xhr.total) * 100)
        loadval.loadingvalue = percent
      },
      (error) => console.error('模型加载出错', error)
    )
  }
  fileReader.readAsArrayBuffer(gltfFile)
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
}

// 修改模型位置
export const pointMoodel = (name, point) => {
  models.forEach(item => {
    if (item.name === name) {
      item.position.set(point.x, point.y, point.z)
      item.scale.set(point.s, point.s, point.s)
    }
  })
}

// 隐藏模型
export const wireframeMoodel = (name, vision) => {
  models.forEach(item => {
    if (item.name === name) {
      item.visible = vision
    }
  })
}

// 还原相机坐标
export const cameraPoint = () => {
  camera.position.set(5, 5, 5)
}

// 还原旋转中心坐标
export const controlsPoint = () => {
  controls.target.set(0, 0, 0)
}


let pointLight // 点光源
let pointLightHelper // 点光源辅助器
let directionallight // 平行光
let directionallightHelper // 点光源辅助器
let spotlight // 聚光灯
let spotlightHelper // 聚光灯辅助器
let hemispherelight // 半球光
let hemispherelightHelper // 半球光辅助器
let ambientlight // 环境光
// 光源辅助器函数
export const assistDeviceFun = () => {
  const { lightSet } = lightCounterStore()

  let anyLightEnabled = false  // 用来检查是否至少有一个光源被启用

  // 若启用点光源
  if (pointLight) {
    if (lightSet[0].lightshow && lightSet[1].lightshow) {
      // 如果点光源已启用且未创建辅助器，则创建它
      if (!pointLightHelper) {
        pointLightHelper = new THREE.PointLightHelper(pointLight)
        scene.add(pointLightHelper)
      }
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果点光源未启用或辅助器已创建，则移除辅助器
      if (pointLightHelper) {
        scene.remove(pointLightHelper)
        pointLightHelper = null
      }
    }
  }

  // 若启用平行光源
  if (directionallight) {
    if (lightSet[0].lightshow && lightSet[2].lightshow) {
      // 如果平行光源已启用且未创建辅助器，则创建它
      if (!directionallightHelper) {
        directionallightHelper = new THREE.DirectionalLightHelper(directionallight)
        scene.add(directionallightHelper)
      }
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果平行光源未启用或辅助器已创建，则移除辅助器
      if (directionallightHelper) {
        scene.remove(directionallightHelper)
        directionallightHelper = null
      }
    }
  }

  // 若启用聚光灯
  if (spotlight) {
    if (lightSet[0].lightshow && lightSet[3].lightshow) {
      // 如果聚光灯已启用且未创建辅助器，则创建它
      if (!spotlightHelper) {
        spotlightHelper = new THREE.SpotLightHelper(spotlight)
        scene.add(spotlightHelper)
      }
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果聚光灯未启用或辅助器已创建，则移除辅助器
      if (spotlightHelper) {
        scene.remove(spotlightHelper)
        spotlightHelper = null
      }
    }
  }

  // 若启用半球光
  if (hemispherelight) {
    if (lightSet[0].lightshow && lightSet[4].lightshow) {
      // 如果聚光灯已启用且未创建辅助器，则创建它
      if (!hemispherelightHelper) {
        hemispherelightHelper = new THREE.HemisphereLightHelper(hemispherelight, 5)
        scene.add(hemispherelightHelper)
      }
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果聚光灯未启用或辅助器已创建，则移除辅助器
      if (hemispherelightHelper) {
        scene.remove(hemispherelightHelper)
        hemispherelightHelper = null
      }
    }
  }

  // 如果没有任何光源被启用，则将 assistdevice 设置为 false
  if (!anyLightEnabled) {
    lightSet[0].lightshow = false
  }
}

// 点光源函数
export const lightPointFun = () => {
  const { lightSet } = lightCounterStore()
  if (!pointLight) {
    pointLight = new THREE.PointLight('#fff', 1, 100)
    pointLight.position.set(0, 0, 0)
  }
  if (lightSet[1].lightshow) {
    scene.add(pointLight)
  } else {
    scene.remove(pointLight)
  }
  // 在这里调用辅助器函数，确保启用或禁用光源时自动更新辅助器
  assistDeviceFun()
}

// 平行光源函数
export const directionalLightFun = () => {
  const { lightSet } = lightCounterStore()
  if (!directionallight) {
    directionallight = new THREE.DirectionalLight('#fff', 1)
    directionallight.position.set(5, 0, 0)
  }
  if (lightSet[2].lightshow) {
    scene.add(directionallight)
  } else {
    scene.remove(directionallight)
  }
  assistDeviceFun()
}

// 聚光灯函数
export const spotLightFun = () => {
  const { lightSet } = lightCounterStore()
  if (!spotlight) {
    spotlight = new THREE.SpotLight('#fff', 10)
    spotlight.position.set(2, 2, 2)
  }
  if (lightSet[3].lightshow) {
    scene.add(spotlight)
  } else {
    scene.remove(spotlight)
  }
  assistDeviceFun()
}

// 半球光函数
export const hemisphereLightFun = () => {
  const { lightSet } = lightCounterStore()
  if (!hemispherelight) {
    hemispherelight = new THREE.HemisphereLight('#fff', '#000', 1)
  }
  if (lightSet[4].lightshow) {
    scene.add(hemispherelight)
  } else {
    scene.remove(hemispherelight)
  }
  assistDeviceFun()
}

// 环境光函数
export const ambientLightFun = () => {
  const { lightSet } = lightCounterStore()
  // 如果环境光未初始化，则初始化
  if (!ambientlight) {
    ambientlight = new THREE.AmbientLight(
      lightSet[5].lightcolor, // 动态光照颜色
      lightSet[5].lightstrength // 动态光照强度
    )
    // ambientlight = new THREE.AmbientLight(
    //   '#fff', // 动态光照颜色
    //   1 // 动态光照强度
    // )
  }
  // 根据环境光是否开启来添加或移除光源
  if (lightSet[5].lightshow) {
    scene.add(ambientlight)
  } else {
    scene.remove(ambientlight)
  }
  assistDeviceFun()  // 其他设备功能调用
}

// 更新环境光强度
export const changeLightStrength = (lightname, strengthvalue) => {
  switch (lightname) {
    case 'pointlight':
      pointLight.intensity = strengthvalue // 更新光照强
      break
    case 'directionallight':
      directionallight.intensity = strengthvalue // 更新光照强
      break
    case 'spotlight':
      spotlight.intensity = strengthvalue // 更新光照强
      break
    case 'hemispherelight':
      hemispherelight.intensity = strengthvalue // 更新光照强
      break
    case 'ambientlight':
      ambientlight.intensity = strengthvalue // 更新光照强
      break
    default:
      break
  }
}