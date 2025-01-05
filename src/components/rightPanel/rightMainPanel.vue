<script setup>
// 右侧面板主体
import { ref } from 'vue'
import { childMesh, object3dMesh, cancelTransform, transformState } from '../../../public/three/mainScene.js'
import { uploadCounterStore } from '@/stores'

// 面板显示隐藏变量
let data = uploadCounterStore()

const setActiveParent = (index) => {
  data.activeParentIndex = index // 设置父级的活动索引
  data.activeChildIndices[index] = null // 重置该父级的子级索引
}

const setActiveChild = (parentIndex, childIndex) => {
  data.activeChildIndices[parentIndex] = childIndex // 设置父级对应的子级索引
}

// 是否展开Mesh
const meshshow = ref(true)
// 展开Mesh函数
const toggleChild = () => {
  meshshow.value = !meshshow.value
}

// object3d对象
const obj3dActive = (itemchild, item, parentindex) => {
  data.allObject3DName.forEach(group => {
    group.forEach(child => child.meshshow = false)
  })
  object3dMesh(item)
  data.modelchildName = item
  setActiveParent(parentindex)
  itemchild.meshshow = true // 控制+ - 号
}

// 展开后被点击的子网格名称
const setActive = (item, parentindex, childindex) => {
  childMesh(item)
  data.modelchildName = item
  setActiveChild(parentindex, childindex)
}

// 复制文本的方法
const copyText = () => {
  // 格式化相机坐标为字符串
  const cameraString = data.modelchildName
  // 使用 Clipboard API 将相机坐标复制到剪贴板
  navigator.clipboard.writeText(cameraString).then(() => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }).catch(() => {
    ElMessage({
      message: '复制失败',
      type: 'warning'
    })
  })
}

</script>

<template>
  <transition name="right">
    <div v-if="data.rightmodelpanel" id="rightmainpanel">

      <div>Mesh名称:</div>

      <div @dblclick="copyText">
        <span>{{ data.modelchildName }}</span>
      </div>

      <div>
        <el-checkbox v-model="data.transformctrl" @change="cancelTransform()" label="控制器" size="large" />
        <el-radio-group v-model="data.transformstatevalue">
          <el-radio @click="transformState('1')" value="1" size="small">移动</el-radio>
          <el-radio @click="transformState('2')" value="2" size="small">旋转</el-radio>
          <el-radio @click="transformState('3')" value="3" size="small">缩放</el-radio>
        </el-radio-group>
      </div>

      <div>
        <ul v-for="(item, index) in data.allObject3DName" :key="index">

          <li @click="toggleChild()">
            <span class="iconfont icon-xiala" :class="meshshow ? 'pulldown' : 'packup'"></span>
            <span>{{ item[0].objectName }}</span>
          </li>

          <li v-show="meshshow" class="child-container">

            <!-- 这里循环的是 模型里面的 isObject3D对象 -->
            <div v-for="(itemchild, parentindex) in item" :key="itemchild">
              <!-- :class="{ active: activeIndex === index }" -->
              <div v-if="itemchild.meshNames.length > 0">
                <div @click="obj3dActive(itemchild, itemchild.objectName, parentindex)"
                  :class="{ active: data.activeParentIndex === parentindex }">
                  <span class="unfold"> {{ itemchild.meshshow ? '-' : '+' }}</span>
                  <span> {{ itemchild.objectName }}</span>
                </div>
              </div>

              <!-- 这里循环的是 isObject3D 对象里面的 Mesh对象 -->
              <div v-show="itemchild.meshshow" v-for="(item, childindex) in itemchild.meshNames" :key="item">
                <div @click="setActive(item, parentindex, childindex)"
                  :class="{ active: data.activeChildIndices[parentindex] === childindex, highlighted: data.modelchildName === item }">
                  <i></i>
                  <span :id="'mesh-' + parentindex + '-' + childindex"> {{ item }}</span>
                </div>
              </div>

            </div>

          </li>
        </ul>

      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
#rightmainpanel {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: vw(250px);
  height: 100%;
  padding-top: vh(17px);
  z-index: 1;
  background-color: #0d0d0d;
  color: #fff;


  &>div:nth-of-type(1) {
    margin-bottom: vh(5px);
    font-size: rem(14px);
    color: #606266;
  }

  &>div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: vw(230px);
    height: vh(115px);
    border: 1px solid #3d3d3d;
    cursor: pointer;

    span {
      width: 100%;
      text-align: center;
      word-wrap: break-word;
      font-size: rem(14px);
    }

  }

  &>div:nth-of-type(3) {
    display: flex;
    align-items: center;
  }

  &>div:nth-of-type(4) {
    width: vw(230px);
    height: vh(860px);
    border: 1px solid #3d3d3d;
    overflow-y: auto;
    scrollbar-width: thin;
    /* Firefox滚动条样式 */
    scrollbar-color: #0ab0b7 #3d3d3d;
    /* Firefox 滚动条颜色，前者是滚动条，后者是轨道背景 */



    ul {
      &>li:nth-of-type(1) {
        cursor: pointer;
        margin: vh(5px) vw(5px);
      }

      li {
        font-size: rem(14px);

        >span:nth-of-type(1) {
          transition: all 0.3s ease;
        }
      }

      >li:nth-of-type(1) {
        display: flex;
        align-items: center;
      }

      .child-container {
        // height: vh(800px);
        // overflow-y: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }

        >div {
          >div {
            width: 90%;
            margin: 5px auto;
            overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            cursor: pointer;
            font-size: 14px;

            >div {
              display: flex;
              align-items: center;

              &:hover {
                background: linear-gradient(to right, #0ab0b7, #0d0d0d);

                i {
                  background-color: #fff;
                }

                span {
                  color: #fff;
                }
              }

              &.active {
                background: linear-gradient(to right, #0ab0b7, #0d0d0d);

                i {
                  background-color: #fff;
                }

                span {
                  color: #fff;
                }
              }

              &.highlighted {
                background: linear-gradient(to right, #0ab0b7, #0d0d0d);

                i {
                  background-color: #fff;
                }

                span {
                  color: #fff;
                }
              }

              span[id*='mesh'] {
                width: 100%;
                overflow: hidden;
              }

            }

          }
        }

        span {
          color: #606266;
        }

        i {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #0ab0b7;
          margin-left: vw(10px);
          margin-right: vw(5px);
        }

        .unfold {
          margin-right: vw(2px);
          font-size: rem(20px);
        }

        // }
      }
    }
  }

}

// 下拉
.pulldown {
  transform: rotate(0deg) !important;
}

// 收起
.packup {
  transform: rotate(-90deg) !important;
}

// 组件动画
.right-enter-active,
.right-leave-active {
  /* 只保留平移效果 */
  transition: transform 0.5s ease;
}

.right-enter-from,
.right-leave-to {
  /* 初始位置设定为左侧 100% */
  transform: translateX(100%);
}
</style>