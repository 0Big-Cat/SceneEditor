<script setup>
import { loadModelScen, deleteModel, pointMoodel, scaleMoodel, wireframeMoodel, clickListener } from '../../../public/three/mainScene'
import { uploadCounterStore, loadingCounterStore } from '@/stores'

const loadval = loadingCounterStore()

const filename = uploadCounterStore()

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
      <!-- <h6>Tips: gltf 需与.bin 纹理放入同一文件夹内</h6> -->
    </div>
    <!-- 模型坐标、缩放、删除等 -->
    <ul>
      <li v-for="item in filename.uploadvalue" :key="item.name">
        <div class="modelName">模型名称-{{ item.name }}</div>
        <div>
          <!-- <span>坐标:</span> -->
          <div v-for="axis in ['x', 'y', 'z']" :key="axis">
            <span>position-{{ axis }}</span>
            <div>
              <el-slider v-model="item[axis]" :precision="2" :step="0.01" :max="100" :min="-100"
                @input="pointmodel(item.name, { x: item.x, y: item.y, z: item.z })" />
              <input type="number" v-model="item[axis]" max="100" min="0"
                @input="pointmodel(item.name, { x: item.x, y: item.y, z: item.z })">
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>scale</span>
            <div>
              <el-slider v-model="item['s']" :precision="2" :step="0.01" :max="10" :min="0"
                @input="scalemodel(item.name, { s: item.s })" />
              <input type="number" v-model="item['s']" @change="scalemodel(item.name, { s: item.s })">
            </div>
          </div>
        </div>
        <div>
          <div>
            <el-switch v-model="filename.panelValue" class="ml-2" inline-prompt style="--el-switch-on-color: #13ce66; 
            --el-switch-off-color: #ff4949" active-text="查看Mesh" inactive-text="查看Mesh"
              @change="clickListener(filename.panelValue)" />
            <div>
              <button @click="deletemodel(item.name)">删除</button>
              <button @click="restoremoodel(item.name)">重置</button>
              <button @click="wireframemoodel(item.name)">{{ item.showhidden ? '隐藏' : '显示' }}</button>
            </div>
          </div>
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
      line-height: vh(58px);
      text-align: center;
      background: url('../../assets/imgs/upload.png') no-repeat center/100% 100%;
      margin-top: vh(17px);
      font-size: rem(18px);
      color: #0ab0b7;
      cursor: pointer;
    }

    h6 {
      font-size: rem(10px);
      color: yellow;
      margin-top: vh(5px);
      font-weight: 400;
      // text-align: center;
    }
  }

  ul {
    li {
      font-size: rem(16px);
      margin: vh(20px) 0;

      input {
        // margin-top: vh(10px);
        width: 40px;
        height: 20px;
        margin-left: vw(5px);
        text-align: center;
        color: #0ab0b7;
        background-color: #333;
        border: none;

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
        font-size: rem(14px);
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
        margin-left: vw(5px);
        width: vw(40px);
        height: vh(20px);
        border: none;
        color: #0ab0b7;
        background-color: #333;
        cursor: pointer;
      }

      >div:nth-of-type(4) {
        margin-top: vh(5px);
      }

      >div {
        >div {
          display: flex;
          justify-content: space-between;
          color: #606266;

          >div {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

/* 去掉 Chrome 和 Safari 的小箭头 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 去掉 Firefox 的小箭头 */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
