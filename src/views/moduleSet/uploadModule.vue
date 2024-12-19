<script setup>
import { loadModelScen, deleteModel, pointMoodel, scaleMoodel, wireframeMoodel, clickListener } from '../../../public/three/mainScene'
import { uploadCounterStore, loadingCounterStore } from '@/stores'

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
        s: 1,
        showhidden: true // 显示隐藏模型
      }
      filename.uploadvalue.push(modelData)
    })

  loadval.loadingvalue = 0
  loadval.loadingshow = true
  loadModelScen(file)  // 使用loadModel加载模型

  // console.log(filename.uploadvalue)

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

// 模型坐标
const pointmodel = (name, point) => {
  const model = filename.uploadvalue.find(item => item.name === name)
  if (model) {
    model.x = Number(point.x)
    model.y = Number(point.y)
    model.z = Number(point.z)
    pointMoodel(name, { x: model.x, y: model.y, z: model.z })
  }
}

// 模型缩放
const scalemodel = (name, point) => {
  const model = filename.uploadvalue.find(item => item.name === name)
  if (model) {
    model.s = Number(point.s)
    scaleMoodel(name, { s: model.s })
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
    pointMoodel(name, { x: model.x, y: model.y, z: model.z }) // 更新模型位置
    scaleMoodel(name, { s: model.s })
  }
}

// 隐藏模型
const wireframemoodel = name => {
  const model = filename.uploadvalue.find(item => item.name === name)
  if (model) {
    model.showhidden = !model.showhidden
    wireframeMoodel(name, model.showhidden)
  }
}
</script>

<template>
  <div id="uploadmodule">
    <!-- 模型上传按钮 -->
    <div>
      <label class="custom-file-upload">
        上传模型
        <input type="file" id="fileInput" multiple @change="handleFileChange" />
      </label>
      <h6>Tips: gltf 需与.bin 纹理一同上传</h6>
    </div>
    <!-- 模型坐标、缩放、删除等 -->
    <ul>
      <li v-for="item in filename.uploadvalue" :key="item.name">
        <div class="modelName">模型名称:{{ item.name }}</div>
        <div>
          <span>坐标:</span>
          <input v-for="axis in ['x', 'y', 'z']" :key="axis" type="text" v-model="item[axis]"
            @change="pointmodel(item.name, { x: item.x, y: item.y, z: item.z })">
        </div>
        <div>
          <span>缩放:</span>
          <input type="text" v-model="item['s']" @change="scalemodel(item.name, { s: item.s })">
        </div>
        <div>
          <el-switch v-model="filename.panelValue" class="ml-2" inline-prompt style="--el-switch-on-color: #13ce66; 
            --el-switch-off-color: #ff4949" active-text="选中子网格" inactive-text="选中子网格"
            @change="clickListener(filename.panelValue)" />
        </div>
        <div>
          <button @click="deletemodel(item.name)">删除</button>
          <button @click="restoremoodel(item.name)">还原</button>
          <button @click="wireframemoodel(item.name)">{{ item.showhidden ? '隐藏' : '显示' }}</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
#uploadmodule {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  div {

    input[type="file"] {
      display: none;
    }

    .custom-file-upload {
      display: inline-block;
      width: vw(159px);
      height: vh(58px);
      line-height: vh(70px);
      background: url('../../assets/imgs/upload.png') no-repeat center/100% 100%;
      border-radius: 5px;
      text-align: center;
      font-size: rem(18px);
      cursor: pointer;

      &:hover {
        color: #0ab0b7;
      }
    }

    h6 {
      font-size: rem(12px);
      color: yellow;
      margin-top: vh(5px);
      font-weight: 400;
      text-align: center;
    }
  }

  ul {
    li {
      font-size: rem(16px);
      margin: vh(50px) 0;

      input {
        margin-top: vh(10px);
        width: 40px;
        height: 19px;
        margin-right: vw(5px);
        text-align: center;

        &:focus {
          outline: none;
          /* 去掉焦点时的外部轮廓 */
        }
      }

      .modelName {
        position: relative;
        bottom: 5px;
        width: 100%;
        height: vh(30px);
        line-height: vh(26px);
        font-size: rem(18px);
        padding-bottom: vh(5px);
        /* 设置透明的边框，确保只有下边框有渐变效果 */
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;

        /* 创建渐变的下边框 */
        background-image: linear-gradient(to right, #0ab0b7, #fff);
        background-position: bottom left;
        background-repeat: no-repeat;
        background-size: 100% 2px;

      }

      span {
        font-size: rem(14px);
        margin-right: vw(5px);
      }

      button {
        margin-top: vh(5px);
        margin-right: vw(10px);
        width: vw(60px);
        height: vh(36px);
        line-height: vh(36px);
        color: #fff;
        border: none;
        background: url('../../assets/imgs/buttonback.png') no-repeat center/100% 100%;
        cursor: pointer;

        &:hover {
          color: #0ab0b7;
        }
      }

      &>div:nth-of-type(4) {
        margin-top: vh(5px);
      }
    }
  }
}
</style>
