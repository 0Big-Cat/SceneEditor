<script setup>
// 右侧面板主体
import { ref } from 'vue'
import { allModelChildName, childMesh, object3dMesh } from '../../../public/three/mainScene'
import { uploadCounterStore } from '@/stores'

// 面板显示隐藏变量
let data = uploadCounterStore()

// 展开所有子网格
const expandedIndex = ref(null)
// 点击具体的子网格
const activeIndex = ref(null)

// 是否展开Mesh
// const meshshow = ref(false)

// 展开显示所有子网格名称
const toggleChild = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
// object3d对象
const obj3dActive = (item) => {
  object3dMesh(item)
  data.modelchildName = item
}
// 展开后被点击的子网格名称
const setActive = (index, item) => {
  activeIndex.value = index // 这个是用于被点击项改变背景色的
  childMesh(item)
  data.modelchildName = item
}

// 控制Mesh是否显示
const meshShowFun = (itemchild) => {
  itemchild.meshshow = !itemchild.meshshow
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
        <el-checkbox v-model="data.checkedValue" label="获取所有Mesh" size="large"
          @change="allModelChildName(data.checkedValue)" />
      </div>

      <div>
        <ul v-for="(item, index) in data.allObject3DName" :key="index">
          <!-- {{ item }} -->

          <li @click="toggleChild(index)">
            {{ item[0].objectName }}--{{ expandedIndex === index ? '收起' : '展开' }}
          </li>

          <li v-if="expandedIndex === index" class="child-container">

            <!-- 这里循环的是 模型里面的 isObject3D对象 -->
            <div v-for="itemchild in item" :key="itemchild">
              <!-- :class="{ active: activeIndex === index }" -->
              <div v-if="itemchild.meshNames.length > 0">
                <div :class="{ active: activeIndex === index }">
                  <span @click="meshShowFun(itemchild)" class="unfold"> {{ itemchild.meshshow ? '-' : '+' }}</span>
                  <span @click="obj3dActive(itemchild.objectName)"> {{ itemchild.objectName }}</span>
                </div>
              </div>

              <!-- 这里循环的是 isObject3D 对象里面的 Mesh对象 -->
              <div v-show="itemchild.meshshow" v-for="(item, index) in itemchild.meshNames" :key="item">
                <div>
                  <i></i>
                  <span @click="setActive(index, item)"> {{ item }}</span>
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

  &>div:nth-of-type(4) {
    width: vw(230px);
    height: vh(860px);
    border: 1px solid #3d3d3d;
    overflow: hidden;

    ul {
      &>li:nth-of-type(1) {
        cursor: pointer;
        margin: vh(5px) vw(5px);
      }

      li {
        font-size: rem(14px);
      }

      .child-container {
        height: vh(800px);
        overflow-y: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }

        >div {
          >div {
            width: 90%;
            margin: 5px auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            font-size: 14px;

            &:hover {
              background: linear-gradient(to right, #0ab0b7, #333);

              i {
                background-color: #fff;
              }

              span {
                color: #fff;
              }
            }

            &.active {
              background: linear-gradient(to right, #0ab0b7, #333);

              i {
                background-color: #fff;
              }

              span {
                color: #fff;
              }
            }

            >div {
              // display: flex;
              // align-items: center;
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