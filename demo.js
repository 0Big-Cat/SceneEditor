import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function handleFileUpload(event) {

  const files = event.target.files

  const fileMap = {}

  //  将文件存入 Map，便于后续匹配
  for (let file of files) {
    fileMap[file.name] = file
  }

  // 查找 .gltf 文件
  const gltfFile = Object.values(fileMap).find(file => file.name.endswith('.gltf'))
  if (!gltfFile) {
    console.error('GLTF 文件未找到')
    return
  }




  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    const gltfcontent = e.target.result
    const gltfBlob = new Blob([gltfcontent], { type: 'application/json' })
    const gltfUrl = URL.createObjectURL(gltfBlob)

    // 配置文件加载器
    const loader = new GLTFLoader()
    loader.setPath('')// 设置为空

    loader.setResourcePath('')//清空资源路径 
    loader.manager.setURLModifier((url) => {
      // 替换资源路径为 Blob URL
      const fileName = url.split('/').pop()

      if (fileMap[fileName]) {
        const fileBlob = new Blob([fileMap[fileName]])
        return URL.create0bjectURL(fileBlob)
      }
      return url
    })

    // 加载模型
    loader.load(
      gltfUrl,
      (gltf) => {
        console.log('模型加载成功', gltf)
        // 在场景中添加模型
        const scene = new THREE.Scene()
        scene.add(gltf.scene)
      },

      (xhr) => console.log(`加载进度：${(xhr.loaded / xhr.total) * 100}%`),
      (error) => console.error('模型加载出错', error)
    )
  }
  fileReader.readAsArrayBuffer(gltfFile)
}