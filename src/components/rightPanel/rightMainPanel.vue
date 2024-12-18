<script setup>
// 右侧面板主体
import { ref } from 'vue'
import { allModelChildName, childMesh } from '../../../public/three/mainScene'
import { uploadCounterStore } from '@/stores'

// 面板显示隐藏变量
let data = uploadCounterStore()

// 展开所有子网格
const expandedIndex = ref(null)
// 点击具体的子网格
const activeIndex = ref(null)

// 展开显示所有子网格名称
const toggleChild = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
// 展开后被点击的子网格名称
const setActive = (index, childname) => {
  activeIndex.value = index
  childMesh(childname)
  data.modelchildName = childname
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
    <div v-if="data.panelValue" id="rightmainpanel">
      <div>子网格名称:</div>
      <div @dblclick="copyText">
        <span>{{ data.modelchildName }}</span>
      </div>
      <div>
        <el-checkbox v-model="data.checkedValue" label="获取所有子网格" size="large"
          @change="allModelChildName(data.checkedValue)" />
      </div>
      <div>
        <ul v-for="(item, index) in data.allChildName" :key="index">
          <li @click="toggleChild(index)">
            模型{{ index + 1 }}{{ expandedIndex === index ? '收起' : '展开' }}
          </li>
          <li v-if="expandedIndex === index" class="child-container">
            <div v-for="(itemchild, childIndex) in item" :key="itemchild" @click="setActive(childIndex, itemchild)"
              :class="{ active: activeIndex === childIndex }">
              {{ itemchild }}
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
  top: vh(17px);
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: vw(250px);
  height: 100%;
  z-index: 1;
  background-color: #0d0d0d;
  color: #fff;

  &>div:nth-of-type(1) {
    margin-bottom: vh(5px);
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

      .child-container {
        height: vh(800px);
        overflow-y: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }

        div {
          width: 90%;
          margin: 10px auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          font-size: 14px;

          &:hover {
            background: linear-gradient(to right, #0ab0b7, #333);
          }

          &.active {
            background: linear-gradient(to right, #0ab0b7, #333);
          }
        }
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