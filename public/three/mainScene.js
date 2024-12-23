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
// 引入帧率查看器
import Stats from 'three/addons/libs/stats.module.js'
// 引入后期库
// import { EffectComposer, UnrealBloomPass } from 'postprocessing'
// 引入相机位置+旋转中心位置模块变量
import { pointCounterStore, loadingCounterStore, lightCounterStore, skyCounterStore, animateCounterStore, uploadCounterStore, pointlabelCounterStore } from '@/stores'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// 将关键变量提出
let scene, camera, render, controls, gltfLoader, axesHelper

// 打印场景图函数
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─'
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`)
  const newPrefix = prefix + (isLast ? '  ' : '│ ')
  const lastNdx = obj.children.length - 1
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx
    dumpObject(child, lines, isLast, newPrefix)
  })
  return lines
}

// 主场景
export const initThreeScene = () => {

  // 初始化三维场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#333')


  // 相机位置+旋转中心位置模块
  const point = pointCounterStore()
  // 初始化相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  )
  camera.position.set(0, 15, 15)


  // 初始化渲染器
  render = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(render.domElement)
  // 启用渲染器的阴影
  render.shadowMap.enabled = true
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
  const container = document.querySelector('.logobox')
  container.appendChild(stats.dom)
  stats.dom.style.width = '100%' // 宽度占满容器
  stats.dom.style.height = '100%' // 高度占满容器
  stats.dom.style.position = 'relative' // 如果需要定位
  stats.dom.style.left = '0'
  stats.dom.style.top = '0'
  stats.dom.style.transform = 'scale(1.3)' // 按比例缩小
  stats.dom.style.transformOrigin = 'top left' // 缩放的基点

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
  axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)

  // 创建渲染器
  // const composer = new EffectComposer(render)
  // composer.addPass(new RenderPass(scene, camera))
  // // 设置描边效果
  // const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
  // outlinePass.edgeStrength = 10 // 描边强度
  // outlinePass.edgeGlow = 0.5 // 描边发光效果
  // outlinePass.visibleEdgeColor.set(0xff0000) // 可见边颜色
  // outlinePass.hiddenEdgeColor.set(0x000000) // 隐藏边颜色
  // composer.addPass(outlinePass)
}


// 模型板块

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
      // console.log(model)
      console.log(dumpObject(model).join('\n'))
      model.name = files[0].name
      loadval.loadingshow = false

      // 设置动画
      const mixer = new THREE.AnimationMixer(model)
      mixers.push(mixer)

      // 获取动画动作
      actions.push(gltf.animations.map((clip) => mixer.clipAction(clip)))

      // console.log(actions)

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
          progress: 0, // 动画进度
          animateloop: 0 // 动画运行次数
        }))

        // 播放所有动画
        if (actions && actions.length > 0) {
          actions.forEach(item => {
            item.forEach(action => {
              action.loop = THREE.LoopOnce // 播放一次后停止
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
  let data = uploadCounterStore()

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
    data.allChildName.splice(index, 1)
    if (data.allChildName.length === 0) {
      data.checkedValue = false
    }
  }
}

// 模型坐标
export const pointMoodel = (name, point) => {
  models.forEach(item => {
    if (item.name === name) {
      item.position.set(point.x, point.y, point.z)
    }
  })
}

// 模型缩放
export const scaleMoodel = (name, point) => {
  models.forEach(item => {
    if (item.name === name) {
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


// 相机板块

// 还原相机坐标
export const cameraPoint = () => {
  camera.position.set(15, 15, 15)
}

// 还原旋转中心坐标
export const controlsPoint = () => {
  controls.target.set(0, 0, 0)
}


// 灯光板块

let pointLight // 点光源
let directionallight // 平行光
let spotlight // 聚光灯
let hemispherelight // 半球光
let ambientlight // 环境光
// 点光源函数
export const lightPointFun = () => {
  const { lightpanel, lightSet } = lightCounterStore()
  if (!pointLight && lightSet[2].lightshow) {
    pointLight = new THREE.PointLight('#fff', 1, 100)
    pointLight.position.set(0, 1, 0)
    pointLight.castShadow = true // 开启阴影
    pointLight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    pointLight.shadow.mapSize.height = 2048
    lightSet[2].x = pointLight.position.x
    lightSet[2].y = pointLight.position.y
    lightSet[2].z = pointLight.position.z
  }
  if (lightSet[2].lightshow) {
    lightpanel.lightshow = true // 显示右侧灯光操作面板
    lightSet[1].lightshow = true // 选中光源辅助器按钮
    scene.add(pointLight)
  } else {
    // lightpanel.lightshow = false // 隐藏右侧灯光操作面板
    scene.remove(pointLight)
    scene.remove(plane) // 移除阴影地面
    lightSet[2].lightshodow = false // 取消勾选阴影
  }
  // 在这里调用辅助器函数，确保启用或禁用光源时自动更新辅助器
  assistDeviceFun()
  cameraHelperFun()
}

// 平行光源函数
export const directionalLightFun = () => {
  const { lightpanel, lightSet } = lightCounterStore()
  if (!directionallight) {
    directionallight = new THREE.DirectionalLight('#fff', 1)
    directionallight.position.set(5, 5, 0)
    directionallight.castShadow = true // 开启阴影
    directionallight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    directionallight.shadow.mapSize.height = 2048
    lightSet[3].x = directionallight.position.x
    lightSet[3].y = directionallight.position.y
    lightSet[3].z = directionallight.position.z
  }
  if (lightSet[3].lightshow) {
    lightpanel.lightshow = true // 显示右侧灯光操作面板
    scene.add(directionallight)
    lightSet[1].lightshow = true // 选中光源辅助器按钮
  } else {
    // lightpanel.lightshow = false // 隐藏右侧灯光操作面板
    scene.remove(directionallight)
    scene.remove(plane) // 移除阴影地面
    lightSet[3].lightshodow = false // 取消勾选阴影
  }
  assistDeviceFun()
  cameraHelperFun()
}

// 聚光灯函数
export const spotLightFun = () => {
  const { lightpanel, lightSet } = lightCounterStore()
  if (!spotlight) {
    spotlight = new THREE.SpotLight('#fff', 50)
    spotlight.position.set(0, 5, 0)
    // spotlight.distance = 100 // 聚光灯的影响范围
    spotlight.castShadow = true // 开启阴影
    spotlight.shadow.mapSize.width = 2048  // 设置阴影分辨率
    spotlight.shadow.mapSize.height = 2048
    lightSet[4].x = spotlight.position.x
    lightSet[4].y = spotlight.position.y
    lightSet[4].z = spotlight.position.z
  }
  if (lightSet[4].lightshow) {
    lightpanel.lightshow = true // 显示右侧灯光操作面板
    scene.add(spotlight)
    lightSet[1].lightshow = true // 选中光源辅助器按钮
  } else {
    // lightpanel.lightshow = false // 隐藏右侧灯光操作面板
    scene.remove(spotlight)
    scene.remove(plane) // 移除阴影地面
    lightSet[4].lightshodow = false // 取消勾选阴影
  }
  assistDeviceFun()
  cameraHelperFun()
}

// 半球光函数
export const hemisphereLightFun = () => {
  const { lightpanel, lightSet } = lightCounterStore()
  if (!hemispherelight) {
    hemispherelight = new THREE.HemisphereLight('#fff', '#000', 1)
  }
  if (lightSet[5].lightshow) {
    lightpanel.lightshow = true // 显示右侧灯光操作面板
    scene.add(hemispherelight)
    lightSet[1].lightshow = true // 选中光源辅助器按钮
  } else {
    scene.remove(hemispherelight)
  }
  assistDeviceFun()
}

// 环境光函数
export const ambientLightFun = () => {
  const { lightpanel, lightSet } = lightCounterStore()
  // 如果环境光未初始化，则初始化
  if (!ambientlight) {
    ambientlight = new THREE.AmbientLight(
      lightSet[6].lightcolor, // 动态光照颜色
      lightSet[6].lightstrength // 动态光照强度
    )
    // ambientlight = new THREE.AmbientLight(
    //   '#fff', // 动态光照颜色
    //   1 // 动态光照强度
    // )
  }
  // 根据环境光是否开启来添加或移除光源
  if (lightSet[6].lightshow) {
    lightpanel.lightshow = true // 显示右侧灯光操作面板
    scene.add(ambientlight)
  } else {
    scene.remove(ambientlight)
  }
  assistDeviceFun()  // 其他设备功能调用
}

let pointLightHelper // 点光源辅助器
let directionallightHelper // 平行光源辅助器
let spotlightHelper // 聚光灯辅助器
let hemispherelightHelper // 半球光辅助器
// 光源辅助器函数
export const assistDeviceFun = () => {
  const { lightSet } = lightCounterStore()

  // 用于检查是否至少有一个光源被启用
  let anyLightEnabled = false

  // 处理每种光源的辅助器
  const manageLightHelper = (light, helper, setIndex, helperClass, additionalHelpers = [], args = []) => {
    if (light) {
      if (lightSet[1].lightshow && lightSet[setIndex].lightshow) {
        // 如果光源启用且辅助器未创建，则创建它
        if (!helper) {
          helper = args.length > 0 ? new helperClass(...args) : new helperClass(light)
          scene.add(helper)
          // 添加额外的辅助器
          additionalHelpers.forEach((item) => scene.add(item))
        }
        if (helper.update) helper.update() // 更新辅助器位置（如果支持）
        anyLightEnabled = true // 标记至少有一个光源启用
      } else {
        // 如果光源未启用或辅助器已创建，则移除辅助器
        if (helper) {
          scene.remove(helper)
          helper = null
          // 移除额外的辅助器
          additionalHelpers.forEach((item) => scene.remove(item))
        }
      }
    }
    return helper // 返回最新的辅助器状态
  }

  // 处理点光源
  pointLightHelper = manageLightHelper(
    pointLight,
    pointLightHelper,
    2,
    THREE.PointLightHelper,
    lightaddHelperArry
  )

  // 处理平行光源
  directionallightHelper = manageLightHelper(
    directionallight,
    directionallightHelper,
    3,
    THREE.DirectionalLightHelper,
    directionalHelperArry
  )

  // 处理聚光灯
  spotlightHelper = manageLightHelper(
    spotlight,
    spotlightHelper,
    4,
    THREE.SpotLightHelper,
    spotHelperArry
  )

  // 处理半球光源
  hemispherelightHelper = manageLightHelper(
    hemispherelight,
    hemispherelightHelper,
    5,
    THREE.HemisphereLightHelper,
    [], // 无额外辅助器
    [hemispherelight, 5] // 特殊参数
  )

  // 如果没有任何光源被启用，则关闭 assistdevice
  if (!anyLightEnabled) {
    lightSet[1].lightshow = false
  }
}

// 阴影
let plane
let planeGeometry // 地面几何体
let planeMaterial // 地面材质
export const lightShdow = () => {
  if (!plane) {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true // 允许模型投射阴影
        // child.receiveShadow = true // 如果模型需要接收阴影（例如模型自身上投影）
      }
    })
    // 创建地面并使其接收阴影
    planeGeometry = new THREE.PlaneGeometry(currentSize, currentSize)
    planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 })
    plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = - Math.PI / 2
    plane.position.y = -0.01
    plane.receiveShadow = true  // 使地面接收阴影
    scene.add(plane)

    return
  }
  scene.remove(plane)
  plane = null
}

let pointLightCameraHelper // 点光源阴影相机辅助器
let directionalLightCameraHelper // 平行光源阴影相机辅助器
let spotLightCameraHelper // 聚光灯阴影相机辅助器
// 阴影相机辅助器函数
export const cameraHelperFun = () => {
  const { lightSet } = lightCounterStore()

  // 用于检查是否至少有一个光源被启用
  let anyCameraEnabled = false

  // 处理每种光源的阴影相机辅助器
  const manageCameraHelper = (light, helper, setIndex) => {
    if (light) {
      if (lightSet[0].lightshow && lightSet[setIndex].lightshow) {
        if (!helper) {
          helper = new THREE.CameraHelper(light.shadow.camera)
          scene.add(helper)
        }
        anyCameraEnabled = true
      } else if (helper) {
        scene.remove(helper)
        helper = null
      }
    }
    return helper
  }

  // 处理点光源
  pointLightCameraHelper = manageCameraHelper(pointLight, pointLightCameraHelper, 2)

  // 处理平行光
  directionalLightCameraHelper = manageCameraHelper(directionallight, directionalLightCameraHelper, 3)

  // 处理聚光灯
  spotLightCameraHelper = manageCameraHelper(spotlight, spotLightCameraHelper, 4)

  // 如果没有任何光源被启用，则关闭主开关
  if (!anyCameraEnabled) {
    lightSet[0].lightshow = false
  }
}

// 更新光源颜色
export const changeLightColor = (lightname, lightcolor) => {
  switch (lightname) {
    case 'pointlight':
      pointLight.color.set(lightcolor) // 更新光照强
      pointLightHelper.material.color.set(lightcolor) // 同步辅助器颜色
      break
    case 'directionallight':
      directionallight.color.set(lightcolor) // 更新光照强
      directionallightHelper.update()   // 更新辅助器几何数据
      directionallightHelper.material.color.set(lightcolor) // 同步辅助器颜色
      break
    case 'spotlight':
      spotlight.color.set(lightcolor) // 更新光照强
      spotlightHelper.update()   // 更新辅助器几何数据
      spotlightHelper.material.color.set(lightcolor) // 同步辅助器颜色
      break
    case 'hemispherelight':
      hemispherelight.color.set(lightcolor) // 更新光照强
      hemispherelightHelper.material.color.set(lightcolor) // 同步辅助器颜色
      break
    case 'ambientlight':
      ambientlight.color.set(lightcolor) // 更新光照强
      break
    default:
      break
  }
}

// 更新光源强度
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

// 更新光源范围
export const changeLightDistance = (lightname, lightdistance) => {
  switch (lightname) {
    case 'pointlight':
      pointLight.distance = lightdistance // 更新光照强
      break
    case 'directionallight':
      directionallight.distance = lightdistance // 更新光照强
      break
    case 'spotlight':
      spotlight.distance = lightdistance // 更新光照强
      break
    case 'hemispherelight':
      hemispherelight.distance = lightdistance // 更新光照强
      break
    case 'ambientlight':
      ambientlight.distance = lightdistance // 更新光照强
      break
    default:
      break
  }
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
    lightSet[2].lightadd.push({
      lightname: 'pointlight',
      lightstrength: 1,
      x: pointLight.position.x,
      y: pointLight.position.y,
      z: pointLight.position.z
    }) // 新建光源存入数组管理
    // 新增的光源辅助器，先存到数组中，暂不添加到场景中，由辅助器那块统一管理
    const pointLightHelper = new THREE.PointLightHelper(pointLight)
    scene.add(pointLight)
    if (lightSet[1].lightshow) {
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
    lightSet[3].lightadd.push({
      lightname: 'directionallight',
      lightstrength: 1,
      x: directionallight.position.x,
      y: directionallight.position.y,
      z: directionallight.position.z
    }) // 新建光源存入数组管理
    // 新增的光源辅助器，先存到数组中，暂不添加到场景中，由辅助器那块统一管理
    const directionallightHelper = new THREE.DirectionalLightHelper(directionallight)

    scene.add(directionallight)
    if (lightSet[1].lightshow) {
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
    lightSet[4].lightadd.push({
      lightname: 'spotlight',
      lightstrength: 1,
      x: spotlight.position.x,
      y: spotlight.position.y,
      z: spotlight.position.z
    }) // 新建光源存入数组管理
    // 新增的光源辅助器，先存到数组中，暂不添加到场景中，由辅助器那块统一管理
    const spotlightHelper = new THREE.SpotLightHelper(spotlight)
    scene.add(spotlight)
    if (lightSet[1].lightshow) {
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
    lightaddArry[indexmin].update()
  }
  if (lightname === 'directionallight') {
    directionalArry[indexmin].position.x = xvalue  // 平行光
    directionalHelperArry[indexmin].update()
  }
  if (lightname === 'spotlight') {
    spotArry[indexmin].position.x = xvalue  // 聚光灯
    spotHelperArry[indexmin].update()
  }
}
// Y坐标
export const newlightYFun = (indexmin, xvalue, lightname) => {
  if (lightname === 'pointlight') {
    lightaddArry[indexmin].position.y = xvalue  // 点光源
    lightaddArry[indexmin].update()
  }
  if (lightname === 'directionallight') {
    directionalArry[indexmin].position.y = xvalue  // 平行光
    directionalHelperArry[indexmin].update()
  }
  if (lightname === 'spotlight') {
    spotArry[indexmin].position.y = xvalue  // 聚光灯
    spotHelperArry[indexmin].update()
  }
}
// Z坐标
export const newlightZFun = (indexmin, xvalue, lightname) => {
  if (lightname === 'pointlight') {
    lightaddArry[indexmin].position.z = xvalue  // 点光源
    lightaddArry[indexmin].update()
  }
  if (lightname === 'directionallight') {
    directionalArry[indexmin].position.z = xvalue  // 平行光
    directionalHelperArry[indexmin].update()
  }
  if (lightname === 'spotlight') {
    spotArry[indexmin].position.z = xvalue  // 聚光灯
    spotHelperArry[indexmin].update()
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
  scene.background = new THREE.Color('#333')
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
let currentSize = 100  // 初始大小
let currentDivisions = 25  // 初始格子数
// 地面模块
export const ground = (value, size, divisions) => {
  if (value) {
    if (!gridHelper) {  // 确保只在没有初始化时创建 gridHelper
      gridHelper = new THREE.GridHelper(size, divisions, 0x888888, 0x555555)
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
    scene.remove(plane) // 移除当前接收阴影的地面
    currentSize = size  // 保存新的尺寸
    gridHelper = new THREE.GridHelper(currentSize, currentDivisions, 0x888888, 0x555555)  // 创建新的 GridHelper
    scene.add(gridHelper)  // 添加新的网格到场景
    if (plane) {
      // 创建新的地面并使其接收阴影
      planeGeometry = new THREE.PlaneGeometry(currentSize, currentSize)
      planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 })
      plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = - Math.PI / 2
      plane.position.y = -0.01
      plane.receiveShadow = true  // 使地面接收阴影
      scene.add(plane)
    }
  }
}
// 格子数量函数
export const divisionsFun = divisions => {
  if (gridHelper) {
    scene.remove(gridHelper)  // 移除当前网格
    currentDivisions = divisions  // 保存新的 divisions
    gridHelper = new THREE.GridHelper(currentSize, currentDivisions, 0x888888, 0x555555)  // 创建新的 GridHelper
    scene.add(gridHelper)  // 添加新的网格到场景
  }
}

// 坐标辅助器
export const axeshelperFun = value => {
  if (value) {
    scene.remove(axesHelper)
    return
  }
  scene.add(axesHelper)
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
  // console.log(value)

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
  // console.log(mixers)

  const action = mixers[number]._actions.find((item) => {
    // console.log(item) // 输出每个 action 的信息
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
    // console.log(item)
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
    // console.log(item)
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
    // console.log(item)
    return item._clip.uuid === uuid
  })
  if (action) {
    if (value) {
      action.setLoop(THREE.LoopRepeat, value)
    }
  }
}


// 创建 Raycaster 和鼠标向量
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// 定义监听器函数
export const handleClick = event => {
  let childname = uploadCounterStore()
  // 计算鼠标位置归一化设备坐标 (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  // 使用摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)
  // 检测与场景中物体的交互
  const intersects = raycaster.intersectObjects(scene.children, true).filter(
    intersect =>
      !(intersect.object instanceof THREE.LineSegments) && // 排除描边
      !(intersect.object instanceof THREE.GridHelper)     // 排除网格辅助线
  )
  if (intersects.length > 0) {
    // 获取第一个被点击的对象
    const clickedObject = intersects[0].object
    // 仅点击模型生效
    if (clickedObject.isMesh) {
      // 将子网格名称传递给右侧面板展示
      childname.modelchildName = clickedObject.name
      // 如果已经有描边的物体不同于当前点击的物体，移除上一个描边
      if (childname.currentOutline && childname.currentOutline !== clickedObject) {
        removeOutline(childname.currentOutline)
      }
      // 立即为该物体添加描边
      addOutline(clickedObject)
      // 更新当前描边的物体
      childname.currentOutline = clickedObject
    }
  }
}

// 为物体添加描边
function addOutline(object) {
  // 先移除已有描边（防止重复添加）
  removeOutline(object)
  const edges = new THREE.EdgesGeometry(object.geometry)
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#0ab0b7', linewidth: 5 }))
  object.add(line) // 将描边添加到物体中
}

// 为物体移除描边
export const removeOutline = (object) => {
  const outline = object.children.find(child => child instanceof THREE.LineSegments)
  if (outline) {
    object.remove(outline)
  }
}

// 添加/移除子网格监听事件
export const clickListener = value => {
  let childname = uploadCounterStore()
  if (value) {
    window.addEventListener('click', handleClick)
    return
  }
  window.removeEventListener('click', handleClick)
  removeOutline(childname.currentOutline)
}

// 是否展示所有子网格名称
export const allModelChildName = (value) => {
  const dataName = uploadCounterStore() // 获取状态管理实例

  if (value) {
    models.forEach((model) => {
      const nameArray = []
      model.traverse((child) => {
        if (child.isMesh) {
          // 缓存子网格的原始透明属性和透明度
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = {
              transparent: child.material.transparent,
              opacity: child.material.opacity
            }
          }
          // 存储子网格名称
          nameArray.push(child.name)
        }
      })
      // 将当前模型的所有子网格名称存储
      dataName.allChildName.push([...nameArray])
    })
    clickListener(false) // 移除监听
    return
  }

  // 恢复所有子网格材质属性
  dataName.allChildName.forEach((nameArray, index) => {
    models[index].traverse((child) => {
      if (child.isMesh) {
        const original = child.userData.originalMaterial
        if (original) {
          child.material.transparent = original.transparent
          child.material.opacity = original.opacity
        }
      }
    })
  })
  removeOutline(lastOutlinedMesh)
  dataName.allChildName = []
  clickListener(true) // 开启监听
}

// 根据点击的子网格名称给予对应网格高亮效果
let lastOutlinedMesh = null
export const childMesh = (name) => {
  models.forEach((item) => {
    item.traverse((child) => {
      if (child.isMesh) {
        if (child.name === name) {
          // 如果有上一个被描边的 Mesh，移除描边效果并恢复原始材质
          if (lastOutlinedMesh && lastOutlinedMesh !== child) {
            const original = lastOutlinedMesh.userData.originalMaterial
            if (original) {
              lastOutlinedMesh.material.transparent = original.transparent
              lastOutlinedMesh.material.opacity = original.opacity
            }
            removeOutline(lastOutlinedMesh)
          }

          // 设置当前匹配的子网格为不透明并添加描边效果
          child.material.transparent = false
          child.material.opacity = 1.0
          addOutline(child)

          // 更新最后一个被描边的 Mesh
          lastOutlinedMesh = child
        } else {
          // 设置不匹配的子网格为透明，但不改变其透明材质本身
          child.material.transparent = true
          child.material.opacity = 0.2 // 透明度可根据需求调整
        }
      }
    })
  })
}




let points = [] // 存储点位
let lines = []  // 存储线段
export const pointClick = event => {
  let data = pointlabelCounterStore()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  // 使用摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)
  // 检测与场景中物体的交互
  const intersects = raycaster.intersectObjects(scene.children, true).filter(
    intersect =>
      !(intersect.object instanceof THREE.LineSegments) && // 排除描边
      !(intersect.object instanceof THREE.GridHelper)     // 排除网格辅助线
  )
  if (intersects.length > 0) {
    // 获取第一个被点击的对象
    const clickedObject = intersects[0].object
    // 仅点击模型生效
    if (clickedObject.isMesh) {
      const point = intersects[0].point
      data.pointcoordinate = point

      // 删除旧的倒锥体
      if (currentConeMarker) {
        scene.remove(currentConeMarker)
        currentConeMarker.geometry.dispose()
        currentConeMarker.material.dispose()
      }
      // 创建新的倒锥体并记录
      currentConeMarker = createConeMarker(point)

      // 如果点的数量大于1，连接之前的点
      if (data.pathlabel) {
        // 将点添加到记录数组
        points.push(point)
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 })
        const geometry = new THREE.BufferGeometry().setFromPoints([points[points.length - 2], points[points.length - 1]])
        const line = new THREE.Line(geometry, material)
        scene.add(line)

        // 将新生成的线段保存到 lines 数组中
        lines.push(line)
      }
    }
  }
}

// 创建一个倒椎体的函数
let currentConeMarker = null // 用于存储当前的倒锥体
const createConeMarker = (position) => {
  const height = 1 // 锥体的高度
  const geometry = new THREE.ConeGeometry(0.5, height, 4) // 半径0.1，高0.2，4分段
  const material = new THREE.MeshStandardMaterial({
    color: '#0ab0b7',        // 主颜色
    emissive: '#00ffff',    // 自发光颜色
    emissiveIntensity: 1    // 发光强度
  })
  const cone = new THREE.Mesh(geometry, material)
  // 倒转锥体，使尖端朝下
  cone.rotation.x = Math.PI
  // 设置位置，并向上偏移高度的一半
  cone.position.copy(position)
  cone.position.y += height / 2
  scene.add(cone)
  return cone // 返回创建的锥体
}

// 导出点和连线信息的 JSON 文件
export const exportPointsToJson = () => {
  const jsonData = points.map(point => ({
    x: point.x,
    y: point.y,
    z: point.z
  }))
  const jsonString = JSON.stringify(jsonData, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'pointCollection.json'
  link.click()
}

// 清空所有的点和线
export const clearPointsAndLines = () => {
  points = []  // 清空记录的点
  lines.forEach(line => {
    scene.remove(line)      // 删除所有线段
    line.geometry.dispose()  // 释放几何体资源
    line.material.dispose()  // 释放材质资源
  })
  lines = []  // 清空线段数组
}

// 删除上一段线段
export const clearLastLine = () => {
  if (lines.length > 0) {
    const lastLine = lines.pop()  // 获取并移除最后一条线段
    scene.remove(lastLine)        // 从场景中移除线段
    lastLine.geometry.dispose()   // 释放几何体资源
    lastLine.material.dispose()   // 释放材质资源
    // 移除点数组中的最后一个点
    points.pop()
  }
}

// 添加/移除点位监听事件
export const poinyListener = value => {
  if (value) {
    window.addEventListener('click', pointClick) // dblclick双击
    return
  }
  window.removeEventListener('click', pointClick)
  scene.remove(currentConeMarker) // 移除椎体
}



// 导出场景功能模块（暂未使用）

export const sceneDataFun = () => {
  // 获取场景数据
  const sceneData = scene.toJSON()
  const jsonStr = JSON.stringify(sceneData, null, 2)

  // 创建一个 Blob 对象，用于保存 JSON 数据
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const sceneJsonFile = new File([blob], 'scene.json')

  // 获取纹理资源（如果有）
  const resources = []
  scene.traverse((object) => {
    if (object.material && object.material.map) {
      const texture = object.material.map
      if (texture.isTexture && texture.image && texture.image.src) {
        resources.push(texture.image.src)  // 纹理路径
      }
    }
  })

  // 如果有纹理资源，输出资源路径
  if (resources.length > 0) {
    console.log('需要导出的资源文件:', resources)
  } else {
    console.log('没有找到纹理资源')
  }

  // 创建 ZIP 文件
  createZipFile([sceneJsonFile, ...resources])
}

const createZipFile = (files) => {
  const zip = new JSZip()

  // 添加场景 JSON 文件
  zip.file('scene.json', files[0])

  // 加载所有纹理资源并添加到压缩包
  const texturePromises = files.slice(1).map((texturePath, index) => {
    return fetch(texturePath)
      .then(response => response.blob())
      .then(blob => {
        zip.file(`assets/texture${index + 1}.jpg`, blob)
      })
  })

  // 等待所有纹理加载完成后生成 ZIP 文件
  Promise.all(texturePromises).then(() => {
    // 添加 HTML 文件
    zip.file('index.html', generateHtmlFile())

    // 打包 ZIP
    zip.generateAsync({ type: 'blob' })
      .then(function (content) {
        saveAs(content, 'scene-package.zip')
      })
      .catch((error) => {
        console.error('生成 ZIP 文件失败:', error)
      })
  }).catch((error) => {
    console.error('纹理资源加载失败:', error)
  })
}

const generateHtmlFile = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Three.js Scene</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    </head>
    <body>
      <script>
        // 加载场景数据
        fetch('scene.json')
          .then(response => response.json())
          .then(sceneData => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            const loader = new THREE.ObjectLoader();
            loader.parse(sceneData, (object) => {
              scene.add(object);
            });

            // 加载纹理资源
            scene.traverse((object) => {
              if (object.material && object.material.map) {
                const textureURL = 'assets/texture1.jpg'; // 确保纹理路径正确
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(textureURL, (texture) => {
                  object.material.map = texture;
                  object.material.needsUpdate = true;
                });
              }
            });

            camera.position.z = 5;

            const animate = () => {
              requestAnimationFrame(animate);
              renderer.render(scene, camera);
            };
            animate();
          })
          .catch(error => {
            console.error('加载场景数据失败:', error);
          });
      </script>
    </body>
    </html>
  `
}