// 引入three
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// 引入gltf解析器（压缩过的模型要使用解析器！！！）
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
// 引入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// 引入拖拽控件
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

// import { DragControls } from 'three/examples/js/controls/DragControls'
// 引入帧率查看器
import Stats from 'three/addons/libs/stats.module.js'
// 引入后期库
// import { EffectComposer, UnrealBloomPass } from 'postprocessing'
// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore, loadingCounterStore, lightCounterStore, skyCounterStore, animateCounterStore } from '@/stores'


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
  camera.position.set(15, 15, 15)


  // 初始化渲染器
  render = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(render.domElement)
  // 启用渲染器的阴影
  render.shadowMap.enabled = true
  // 渲染器背景色
  render.setClearColor('#000', 1)
  // 设置渲染器的色彩空间
  render.outputEncoding = THREE.SRGBColorSpace



  // 初始化轨道控制器
  controls = new OrbitControls(camera, render.domElement)
  // 开启阻尼效果
  controls.enableDamping = true
  // 设置阻尼系数
  controls.dampingFactor = 0.05


  const textureloader = new THREE.TextureLoader()
  let texture = textureloader.load('./textures/imgs/skyback.jpg', () => {
    // 开启色彩空间
    texture.colorSpace = THREE.SRGBColorSpace
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

  // 创建EffectComposer
  // composer = new EffectComposer(render)

  // 帧率查看器
  const stats = new Stats()
  // document.body.appendChild(stats.domElement)

  // 创建一个时钟对象来计算时间差
  const clock = new THREE.Clock()

  // 创建渲染函数
  const animate = () => {
    requestAnimationFrame(animate)
    // 实时传递camera坐标
    point.updateCameraPosition(camera.position.x, camera.position.y, camera.position.z)
    point.updateControlPoint(controls.target.x, controls.target.y, controls.target.z)
    stats.update()

    // 让 mixer.update 调用共享相同的时间增量！
    const delta = clock.getDelta()
    // 更新每个 AnimationMixer
    mixers.forEach(mixer => mixer.update(delta))

    // 动画进度
    logProgress()

    render.render(scene, camera)
    controls.update()
  }
  animate()

  // 辅助坐标系
  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)
}




let model // 当前传入的模型
let modelnumber = -1 // 用于记录上传的第几个模型
let models = [] // 储存模型
let actions = [] // 动画的控制列表
const mixers = []
// 上传模型
export const loadModelScen = files => {

  const loadval = loadingCounterStore()
  const animateal = animateCounterStore()

  const fileMap = {}

  //  将文件存入 Map，便于后续匹配
  for (let file of files) {
    fileMap[file.name] = file
  }

  // 查找 .gltf 文件
  const gltfFile = Object.values(fileMap).find(file => file.name.endsWith('.gltf'))

  // 非GLTF模型
  if (!gltfFile) {
    gltfLoader.load(URL.createObjectURL(files[0]), gltf => {
      model = gltf.scene
      // model.castShadow = true  // 使模型投射阴影
      models.push(model)
      scene.add(model)
      model.name = files[0].name
      loadval.loadingshow = false

      // 设置动画
      const mixer = new THREE.AnimationMixer(model)
      mixers.push(mixer)

      // 获取动画动作
      actions.push(gltf.animations.map((clip) => mixer.clipAction(clip)))

      console.log(actions)

      // 为 gltf.animations 的每个动画对象添加一个响应式变量
      const animationsWithControl = gltf.animations.map((animation) => ({
        ...animation, // 保留原始动画对象的属性
        startandstop: true,
        pauserecovery: false,
        positivenegative: true,
        progress: 0, // 动画进度
        animateloop: 0 // 动画运行次数
      }))

      // 播放所有动画
      if (actions && actions.length > 0) {
        actions.forEach(item => {
          item.forEach(action => {
            action.loop = THREE.LoopOnce // 播放一次后停止
            // action.clampWhenFinished = true // 动画结束时，停留在最后一帧
            action.play()
          })
        })
      }

      modelnumber += 1 // 上传一次，计数就+1

      animateal.animatevalue.push({
        animateData: animationsWithControl,
        modelName: model.name,
        serialnumber: modelnumber
      })


    }, (xhr) => {
      const percent = parseInt((xhr.loaded / xhr.total) * 100)
      loadval.loadingvalue = percent
    },
      (error) => console.error('模型加载出错', error)
    )
    return
  }

  // GLTF模型
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
        Array.from(files)
          .filter(file => file.name.endsWith('.gltf') || file.name.endsWith('.glb'))
          .map(file => {
            model.name = file.name
          })
        loadval.loadingshow = false

        // 设置动画
        const mixer = new THREE.AnimationMixer(model)
        mixers.push(mixer)

        // 获取动画动作
        actions.push(gltf.animations.map((clip) => mixer.clipAction(clip)))

        // 为 gltf.animations 的每个动画对象添加一个响应式变量
        const animationsWithControl = gltf.animations.map((animation) => ({
          ...animation, // 保留原始动画对象的属性
          startandstop: true,
          pauserecovery: false,
          positivenegative: true,
          progress: 0
        }))

        // 播放所有动画
        if (actions && actions.length > 0) {
          actions.forEach(item => {
            item.forEach(action => {
              action.play()
              // actions[0].play() //播放单个
            })
          })
        }

        modelnumber += 1 // 上传一次，计数就+1

        animateal.animatevalue.push({
          animateData: animationsWithControl,
          modelName: model.name,
          serialnumber: modelnumber
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
  const animateal = animateCounterStore()
  const index = models.findIndex((item) => item.name === name)

  if (index !== -1) {
    // 删除指定模型
    scene.remove(models[index])
    // 删除数组中对应的元素
    models.splice(index, 1)
    // 删除数组中对应的模型动画
    mixers.splice(index, 1)
    // 删除数组中对应的动画合集
    actions.splice(index, 1)
    // 删除数组中对应的模型动画
    animateal.animatevalue.splice(index, 1)
    // 如果删除的是最后一个模型，设置 modelnumber 为 -1
    if (models.length === 0) {
      modelnumber = -1
    } else {
      // 调整后续元素的 serialnumber
      animateal.animatevalue.slice(index).forEach((item) => {
        if (item.serialnumber !== undefined) {
          item.serialnumber -= 1
        }
      })
    }
  }
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
  camera.position.set(15, 15, 15)
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
        // 开启新增点光源的辅助器
        lightaddHelperArry.forEach(item => {
          scene.add(item)
        })
      }
      pointLightHelper.update()  // 更新辅助器位
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果点光源未启用或辅助器已创建，则移除辅助器
      if (pointLightHelper) {
        scene.remove(pointLightHelper)
        pointLightHelper = null
        // 移除新增点光源的辅助器
        lightaddHelperArry.forEach(item => {
          scene.remove(item)
        })
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
        // 开启新增平行光源的辅助器
        directionalHelperArry.forEach(item => {
          scene.add(item)
        })
      }
      directionallightHelper.update()  // 更新辅助器位
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果平行光源未启用或辅助器已创建，则移除辅助器
      if (directionallightHelper) {
        scene.remove(directionallightHelper)
        directionallightHelper = null
        // 移除新增平行光源的辅助器
        directionalHelperArry.forEach(item => {
          scene.remove(item)
        })
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
        // 开启新增聚光灯的辅助器
        spotHelperArry.forEach(item => {
          scene.add(item)
        })
      }
      spotlightHelper.update()  // 更新辅助器位
      anyLightEnabled = true // 至少有一个光源启用
    } else {
      // 如果聚光灯未启用或辅助器已创建，则移除辅助器
      if (spotlightHelper) {
        scene.remove(spotlightHelper)
        spotlightHelper = null
        // 移除新增聚光灯的辅助器
        spotHelperArry.forEach(item => {
          scene.remove(item)
        })
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
    pointLight.position.set(0, 1, 0)
    pointLight.castShadow = true // 开启阴影
    pointLight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    pointLight.shadow.mapSize.height = 2048
    lightSet[1].x = pointLight.position.x
    lightSet[1].y = pointLight.position.y
    lightSet[1].z = pointLight.position.z
  }
  if (lightSet[1].lightshow) {
    scene.add(pointLight)
  } else {
    scene.remove(pointLight)
    scene.remove(plane) // 移除阴影地面
    lightSet[1].lightshodow = false // 取消勾选阴影
  }
  // 在这里调用辅助器函数，确保启用或禁用光源时自动更新辅助器
  assistDeviceFun()
}

// 平行光源函数
export const directionalLightFun = () => {
  const { lightSet } = lightCounterStore()
  if (!directionallight) {
    directionallight = new THREE.DirectionalLight('#fff', 1)
    directionallight.position.set(5, 5, 0)
    directionallight.castShadow = true // 开启阴影
    directionallight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    directionallight.shadow.mapSize.height = 2048
    lightSet[2].x = directionallight.position.x
    lightSet[2].y = directionallight.position.y
    lightSet[2].z = directionallight.position.z
  }
  if (lightSet[2].lightshow) {
    scene.add(directionallight)
  } else {
    scene.remove(directionallight)
    scene.remove(plane) // 移除阴影地面
    lightSet[2].lightshodow = false // 取消勾选阴影
  }
  assistDeviceFun()
}

// 聚光灯函数
export const spotLightFun = () => {
  const { lightSet } = lightCounterStore()
  if (!spotlight) {
    spotlight = new THREE.SpotLight('#fff', 50)
    spotlight.position.set(0, 5, 0)
    spotlight.castShadow = true // 开启阴影
    spotlight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    spotlight.shadow.mapSize.height = 2048
    lightSet[3].x = spotlight.position.x
    lightSet[3].y = spotlight.position.y
    lightSet[3].z = spotlight.position.z
  }
  if (lightSet[3].lightshow) {
    scene.add(spotlight)
  } else {
    scene.remove(spotlight)
    scene.remove(plane) // 移除阴影地面
    lightSet[3].lightshodow = false // 取消勾选阴影
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

// 阴影
let plane
export const lightShdow = value => {
  if (value) {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true // 允许模型投射阴影
        // child.receiveShadow = true // 如果模型需要接收阴影（例如模型自身上投影）
      }
    })
    // 创建地面并使其接收阴影
    const planeGeometry = new THREE.PlaneGeometry(100, 100)
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 })
    plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = - Math.PI / 2
    plane.position.y = -0.01
    plane.receiveShadow = true  // 使地面接收阴影
    scene.add(plane)

    return
  }
  scene.remove(plane)
}

// 修改光源坐标，反控光源位置
// X坐标
export const lightcoordinatesXFun = (lightName, lightXValue) => {
  switch (lightName) {
    case 'pointlight':
      pointLight.position.x = lightXValue
      assistDeviceFun()
      break
    case 'directionallight':
      directionallight.position.x = lightXValue
      assistDeviceFun()
      break
    case 'spotlight':
      spotlight.position.x = lightXValue
      assistDeviceFun()
      break
    default:
      break
  }
}
// Y坐标
export const lightcoordinatesYFun = (lightName, lightYValue) => {
  switch (lightName) {
    case 'pointlight':
      pointLight.position.y = lightYValue
      assistDeviceFun()
      break
    case 'directionallight':
      directionallight.position.y = lightYValue
      assistDeviceFun()
      break
    case 'spotlight':
      spotlight.position.y = lightYValue
      assistDeviceFun()
      break
    default:
      break
  }
}
// Z坐标
export const lightcoordinatesZFun = (lightName, lightZValue) => {
  switch (lightName) {
    case 'pointlight':
      pointLight.position.z = lightZValue
      assistDeviceFun()
      break
    case 'directionallight':
      directionallight.position.z = lightZValue
      assistDeviceFun()
      break
    case 'spotlight':
      spotlight.position.z = lightZValue
      assistDeviceFun()
      break
    default:
      break
  }
}

// 新增光源
const lightaddArry = [] // 点光源
const lightaddHelperArry = []
const directionalArry = [] // 平行光
const directionalHelperArry = []
const spotArry = [] // 聚光灯
const spotHelperArry = []
export const lightaddFun = (lightName) => {
  const { lightSet } = lightCounterStore()
  // 点光源
  if (lightName === 'pointlight') {
    const pointLight = new THREE.PointLight('#fff', 1, 100)
    pointLight.position.set(0, 1, 0)
    pointLight.castShadow = true // 开启阴影
    pointLight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    pointLight.shadow.mapSize.height = 2048
    lightSet[1].lightadd.push({
      lightname: 'pointlight',
      lightstrength: 1,
      x: pointLight.position.x,
      y: pointLight.position.y,
      z: pointLight.position.z
    }) // 新建光源存入数组管理
    // 新增的光源辅助器，先存到数组中，暂不添加到场景中，由辅助器那块统一管理
    const pointLightHelper = new THREE.PointLightHelper(pointLight)
    scene.add(pointLight)
    if (lightSet[0].lightshow) {
      scene.add(pointLightHelper)
    }
    lightaddArry.push(pointLight)
    lightaddHelperArry.push(pointLightHelper)
  }
  // 平行光
  if (lightName === 'directionallight') {
    const directionallight = new THREE.DirectionalLight('#fff', 1)
    directionallight.position.set(5, 5, 0)
    directionallight.castShadow = true // 开启阴影
    directionallight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    directionallight.shadow.mapSize.height = 2048
    lightSet[2].lightadd.push({
      lightname: 'directionallight',
      lightstrength: 1,
      x: directionallight.position.x,
      y: directionallight.position.y,
      z: directionallight.position.z
    }) // 新建光源存入数组管理
    // 新增的光源辅助器，先存到数组中，暂不添加到场景中，由辅助器那块统一管理
    const directionallightHelper = new THREE.DirectionalLightHelper(directionallight)

    scene.add(directionallight)
    if (lightSet[0].lightshow) {
      scene.add(directionallightHelper)
    }
    directionalArry.push(directionallight)
    directionalHelperArry.push(directionallightHelper)
  }
  // 聚光灯
  if (lightName === 'spotlight') {
    const spotlight = new THREE.SpotLight('#fff', 50)
    spotlight.position.set(0, 5, 0)
    spotlight.castShadow = true // 开启阴影
    spotlight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    spotlight.shadow.mapSize.height = 2048
    lightSet[3].lightadd.push({
      lightname: 'spotlight',
      lightstrength: 1,
      x: spotlight.position.x,
      y: spotlight.position.y,
      z: spotlight.position.z
    }) // 新建光源存入数组管理
    // 新增的光源辅助器，先存到数组中，暂不添加到场景中，由辅助器那块统一管理
    const spotlightHelper = new THREE.SpotLightHelper(spotlight)
    scene.add(spotlightHelper)
    if (lightSet[0].lightshow) {
      scene.add(spotlightHelper)
    }
    spotArry.push(spotlight)
    spotHelperArry.push(spotlightHelper)
  }
}

// 删除新增的光源
export const lightremoveFun = (indexmin, lightname) => {
  // 点光源
  if (lightname === 'pointlight') {
    scene.remove(lightaddArry[indexmin])
    lightaddArry.splice(indexmin, 1) // 删除数据对应数据
    scene.remove(lightaddHelperArry[indexmin])
    lightaddHelperArry.splice(indexmin, 1) // 删除数据对应数据
  }
  // 平行光
  if (lightname === 'directionallight') {
    scene.remove(directionalArry[indexmin])
    directionalArry.splice(indexmin, 1) // 删除数据对应数据
    scene.remove(directionalHelperArry[indexmin])
    directionalHelperArry.splice(indexmin, 1) // 删除数据对应数据
  }
  // 聚光灯
  if (lightname === 'spotlight') {
    scene.remove(spotArry[indexmin])
    spotArry.splice(indexmin, 1) // 删除数据对应数据
    scene.remove(spotHelperArry[indexmin])
    spotHelperArry.splice(indexmin, 1) // 删除数据对应数据
  }

}

// 调节新增光源强度
export const changenewlight = (indexmin, changevalue, lightname) => {
  // 点光源
  if (lightname === 'pointlight') {
    lightaddArry[indexmin].intensity = changevalue
  }
  // 平行光
  if (lightname === 'directionallight') {
    directionalArry[indexmin].intensity = changevalue
  }
  // 聚光灯
  if (lightname === 'spotlight') {
    spotArry[indexmin].intensity = changevalue
  }
}

// 修改新增光源坐标
// X坐标
export const newlightXFun = (indexmin, xvalue, lightname) => {
  if (lightname === 'pointlight') {
    lightaddArry[indexmin].position.x = xvalue  // 点光源
  }
  if (lightname === 'directionallight') {
    directionalArry[indexmin].position.x = xvalue  // 平行光
    // directionallightHelper.update()  // 更新辅助器位
    //  directionalArry[indexmin].directionallightHelper.update() 明天试试这个
  }
  if (lightname === 'spotlight') {
    spotArry[indexmin].position.x = xvalue  // 聚光灯
  }
}
// Y坐标
export const newlightYFun = (indexmin, xvalue, lightname) => {
  if (lightname === 'pointlight') {
    lightaddArry[indexmin].position.y = xvalue  // 点光源
  }
  if (lightname === 'directionallight') {
    directionalArry[indexmin].position.y = xvalue  // 平行光
  }
  if (lightname === 'spotlight') {
    spotArry[indexmin].position.y = xvalue  // 聚光灯
  }
}
// Z坐标
export const newlightZFun = (indexmin, xvalue, lightname) => {
  if (lightname === 'pointlight') {
    lightaddArry[indexmin].position.z = xvalue  // 点光源
  }
  if (lightname === 'directionallight') {
    directionalArry[indexmin].position.z = xvalue  // 平行光
  }
  if (lightname === 'spotlight') {
    spotArry[indexmin].position.z = xvalue  // 聚光灯
  }
}




let rgbeloader
// 天空球模块
export const skyballHDR = (value) => {
  const loadval = loadingCounterStore()
  const skyurl = skyCounterStore()

  if (value) {
    loadval.loadingvalue = 0
    loadval.loadingshow = true

    // 加载HDR贴图
    rgbeloader = new RGBELoader()
    rgbeloader.load(skyurl.skyhdrurl, (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping
      scene.background = envMap
      scene.environment = envMap
      loadval.loadingshow = false
    }, (xhr) => {
      const percent = parseInt((xhr.loaded / xhr.total) * 100)
      loadval.loadingvalue = percent
    })
    return
  }

  // 清空场景背景
  scene.background = ''
  scene.environment = ''
}

// 切换天空球
export const changeskyHDR = (id, value) => {
  if (value) {
    const skyurl = skyCounterStore()
    const hdrUrl = skyurl.getSkyhdrById(id)
    if (hdrUrl) {
      skyurl.skyhdrurl = hdrUrl
      skyballHDR(true)
    }
  }
}



let gridHelper
let currentSize = 10  // 初始大小
let currentDivisions = 10  // 初始格子数
// 地面模块
export const ground = (value, size, divisions) => {
  if (value) {
    if (!gridHelper) {  // 确保只在没有初始化时创建 gridHelper
      gridHelper = new THREE.GridHelper(size, divisions, '#37373d', '#37373d')
      scene.add(gridHelper)
      currentSize = size
      currentDivisions = divisions
    }
    return
  }
  // 引出网格地面
  if (gridHelper) {
    scene.remove(gridHelper)
    gridHelper = null  // 删除后，设置为 null，避免后续出错
  }
}
// 尺寸函数
export const sizeFun = size => {
  if (gridHelper) {
    scene.remove(gridHelper)  // 移除当前网格
    currentSize = size  // 保存新的尺寸
    gridHelper = new THREE.GridHelper(currentSize, currentDivisions, '#37373d', '#37373d')  // 创建新的 GridHelper
    scene.add(gridHelper)  // 添加新的网格到场景
  }
}
// 格子数量函数
export const divisionsFun = divisions => {
  if (gridHelper) {
    scene.remove(gridHelper)  // 移除当前网格
    currentDivisions = divisions  // 保存新的 divisions
    gridHelper = new THREE.GridHelper(currentSize, currentDivisions, '#37373d', '#37373d')  // 创建新的 GridHelper
    scene.add(gridHelper)  // 添加新的网格到场景
  }
}





// 线性雾
let fognear = 1  // 开始距离
let fogfar = 100  // 结束距离
let fogcolor = '' // 初始颜色
export const linearfog = (value, near, far, color) => {
  if (value) {
    scene.fog = new THREE.Fog(color, near, far) //（颜色，,距离到50的时候完全被雾笼罩）
    fognear = near
    fogfar = far
    fogcolor = color
    return
  }
  // 移除雾
  scene.fog = null
}
export const nearFun = near => {
  // 移除雾
  scene.fog = null
  fognear = near
  scene.fog = new THREE.Fog(fogcolor, fognear, fogfar)
}
export const farFun = far => {
  // 移除雾
  scene.fog = null
  fogfar = far
  scene.fog = new THREE.Fog(fogcolor, fognear, fogfar)
}
export const colorFun = color => {
  // 移除雾
  scene.fog = null
  fogcolor = color
  scene.fog = new THREE.Fog(fogcolor, fognear, fogfar)
}

// 指数雾
let fogexp2density = 0.1  // 初始浓度
let fogexp2color = '' // 初始颜色
export const indexfogexp2 = (value, color, density) => {
  if (value) {
    scene.fog = new THREE.FogExp2(color, density)//（颜色，雾的浓度）
    fogexp2color = color
    fogexp2density = density
    return
  }
  // 移除雾
  scene.fog = null
}
export const densityFun = density => {
  // 移除雾
  scene.fog = null
  fogexp2density = density
  scene.fog = new THREE.FogExp2(fogexp2color, fogexp2density)//（颜色，雾的浓度）
}
export const color2Fun = color => {
  // 移除雾
  scene.fog = null
  fogexp2color = color
  scene.fog = new THREE.FogExp2(fogexp2color, fogexp2density)//（颜色，雾的浓度）
}



// let bloomPass
// 辉光效果
export const anaphaseBloom = value => {
  console.log(value)

  if (value) {
    // bloomPass = new UnrealBloomPass(
    //   new THREE.Vector2(window.innerWidth, window.innerHeight),
    //   10,   // 强度
    //   10,   // 半径
    //   0.85   // 阈值
    // )
    // composer.addPass(bloomPass)

    return
  }
  // composer.passes = composer.passes.filter(pass => pass !== bloomPass)
}

// 景深效果

// 胶片颗粒效果



// 动画模块
// 播放、停止指定动画
export const playAnimation = (uuid, value, number) => {
  console.log(mixers)

  const action = mixers[number]._actions.find((item) => {
    console.log(item) // 输出每个 action 的信息
    return item._clip.uuid === uuid // 比较 _clip.uuid 是否与传入的 uuid 匹配
  })
  if (action) {
    if (value) {
      action.play()
    } else {
      action.stop()
    }
  }
}

// 暂停指定动画
export const pauseAnimation = (uuid, value, number) => {
  const action = mixers[number]._actions.find((item) => {
    console.log(item)
    return item._clip.uuid === uuid
  })
  if (action) {
    if (value) {
      action.paused = true
    } else {
      action.paused = false
    }
  }
}

// 继续指定动画
export const normalPlayAnimation = (uuid, value, number) => {
  const action = mixers[number]._actions.find((item) => {
    console.log(item)
    return item._clip.uuid === uuid
  })
  if (action) {
    if (value) {
      action.timeScale = 1
    } else {
      action.timeScale = -1
    }
  }
}




// 动画进度
const logProgress = () => {
  let progressArray = []
  let uuidexArray = []
  actions.forEach(item => {
    item.forEach(action => {
      const progress = (action.time / action.getClip().duration) * 100
      const uuidex = action._clip.uuid
      // 将每个动画的 progress 和 uuidex 存储到数组中
      progressArray.push(progress)
      uuidexArray.push(uuidex)
    })
  })
  const { animatevalue } = animateCounterStore()
  animatevalue.forEach(item => {
    item.animateData.forEach(itemex => {
      const matchedIndex = uuidexArray.indexOf(itemex.uuid)
      if (matchedIndex !== -1) {
        itemex.progress = progressArray[matchedIndex]
      }
    })
  })
}

// 动画次数
export const animatecishu = (uuid, value, number) => {
  const action = mixers[number]._actions.find((item) => {
    console.log(item)
    return item._clip.uuid === uuid
  })
  if (action) {
    if (value) {
      action.setLoop(THREE.LoopRepeat, value)
    }
  }
}
