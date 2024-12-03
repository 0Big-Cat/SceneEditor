<script setup>
import { loadModelScen, deleteModel, pointMoodel, wireframeMoodel } from '../../../public/three/mainScene'
import { uploadCounterStore, loadingCounterStore, showhiddenCounterStore } from '@/stores'

const loadval = loadingCounterStore()

let filename = uploadCounterStore()

// 处理文件上传
const handleFileChange = event => {

  const file = event.target.files
  // 检查并删除空的 name 项
  filename.uploadvalue = filename.uploadvalue.filter(item => item.name !== '')

  Array.from(file)
    .filter(file => file.name.endsWith('.gltf') || file.name.endsWith('.glb'))
    .map(file => {

      const modelData = {
        name: file.name,
        x: 0,
        y: 0,
        z: 0,
        s: 1 // 默认缩放值
      }
      filename.uploadvalue.push(modelData)
    })

  loadval.loadingshow = true
  loadModelScen(file)  // 使用loadModel加载模型

  console.log(filename.uploadvalue)

}

// 删除模型
const deletemodel = name => {
  if (name) {
    filename.uploadvalue = filename.uploadvalue.filter(item => item.name !== name)
    deleteModel(name)
  }
  if (filename.uploadvalue.length === 0) {
    filename.uploadvalue.push({
      name: '',
      x: 0,
      y: 0,
      z: 0,
      s: 1
    })
  }
}

// 修改模型位置
const pointmodel = (name, point) => {
  const model = filename.uploadvalue.find(item => item.name === name)
  if (model) {
    model.x = Number(point.x)
    model.y = Number(point.y)
    model.z = Number(point.z)
    model.s = Number(point.s)
    pointMoodel(name, { x: model.x, y: model.y, z: model.z, s: model.s })
  }
}

// 还原模型相关修改
const restoremoodel = name => {
  const model = filename.uploadvalue.find(item => item.name === name)
  if (model) {
    model.x = 0
    model.y = 0
    model.z = 0
    model.s = 1
    pointMoodel(name, { x: model.x, y: model.y, z: model.z, s: model.s }) // 更新模型位置
  }
}

// 隐藏模型
const vision = showhiddenCounterStore()
const wireframemoodel = name => {
  vision.showhiddenmodel = !vision.showhiddenmodel // 切换 vision 的值
  wireframeMoodel(name, vision.showhiddenmodel)
}
</script>

<template>
  <div id="uploadmodule">
    <label class="custom-file-upload">
      上传模型
      <input type="file" id="fileInput" multiple @change="handleFileChange" />
    </label>

    <ul>
      <li v-for="item in filename.uploadvalue" :key="item.name">
        <span>模型名称: {{ item.name }}</span>
        <div v-for="axis in ['x', 'y', 'z', 's']" :key="axis">
          <label>
            <span>{{ axis }}:</span>
            <el-slider type="range" step="0.1" :min="axis === 's' ? 1 : -100" :max="axis === 's' ? 100 : 100"
              v-model="item[axis]" @input="pointmodel(item.name, { x: item.x, y: item.y, z: item.z, s: item.s })" />

          </label>
        </div>
        <button @click="deletemodel(item.name)">删除</button>
        <button @click="restoremoodel(item.name)">还原</button>
        <button @click="wireframemoodel(item.name)">{{ vision.showhiddenmodel ? '隐藏' : '显示' }}</button>
      </li>
    </ul>

  </div>
</template>


<style lang="scss" scoped>
#uploadmodule {
  position: absolute;
  top: vh(17px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    display: inline-block;
    width: vw(159px);
    height: vh(38px);
    line-height: vh(38px);
    color: skyblue;
    border: 1px solid skyblue;
    border-radius: 5px;
    text-align: center;
    font-size: rem(18px);
    cursor: pointer;
  }

  ul {
    display: flex;
    flex-direction: column;
    font-size: rem(16px);

    li {
      margin-top: vh(20px);
      padding-top: vh(20px);
      border-top: 5px solid #3d3d3d;
      ;

      input {
        margin-top: vh(10px);
      }

      label {
        display: flex;
        align-items: baseline;

        span {
          font-size: rem(16px);
          margin-right: vw(10px);
        }
      }

      button {
        margin-top: vh(15px);
        margin-right: vw(10px);
        width: vw(40px);
        height: vh(32px);
        line-height: vh(32px);
        color: #fff;
        border: 1px solid skyblue;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }
}
</style>
