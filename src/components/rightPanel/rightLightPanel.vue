<script setup>
// 右侧灯光操作面板
import {
  changeLightStrength,
  changeLightColor,
  changeLightDistance,
  lightcoordinatesXFun,
  lightcoordinatesYFun,
  lightcoordinatesZFun,
  lightaddFun,
  lightremoveFun,
  changenewlight,
  newlightXFun,
  newlightYFun,
  newlightZFun
} from '../../../public/three/mainScene'

import { lightCounterStore } from '@/stores'

const { lightpanel, lightSet } = lightCounterStore()

// 复制光源坐标
const copylightpoint = (itemx, itemy, itemz) => {
  const cameraString = `${itemx},${itemy},${itemz}`
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

// 删除新增的光源
const deleatlight = (index, lightname, indexmin) => {
  lightSet[index].lightadd.splice(indexmin, 1)
  // 调用三维的函数，删除对应的光源
  lightremoveFun(indexmin, lightname)
}
</script>

<template>
  <transition name="rightlight">
    <div v-if="lightpanel.lightshow" id="rightlightpanel">
      <ul>
        <li v-for="(item, index) in lightSet " :key="item.lightname">

          <!-- 光源类型（这里根据是否有颜色来显示有无光照范围调整） -->
          <span v-if="item.lightcolor && item.lightshow">{{ item.lightlabel }}</span>

          <!-- 光源颜色 -->
          <div v-if="item.lightcolor && item.lightshow" class="lightcolor">
            <span>color:</span>
            <input type="color" v-model="item.lightcolor" @input="changeLightColor(item.lightname, item.lightcolor)">
            <span>{{ item.lightcolor }}</span>
          </div>

          <!-- 光照强度 -->
          <div v-if="item.lightstrength && item.lightshow" class="lightvalue">
            <span>intensity:</span>
            <el-slider v-model="item.lightstrength" :precision="2" :step="0.1" :max="10" :min="1"
              @input="changeLightStrength(item.lightname, item.lightstrength)" />
          </div>

          <!-- 光照范围（值为0时即无限远） -->
          <div v-if="item.distance && item.lightshow" class="lightdistance">
            <span>distance:</span>
            <el-slider v-model="item.lightdistance" :precision="2" :step="0.1" :max="10" :min="0"
              @input="changeLightDistance(item.lightname, item.lightdistance)" />
          </div>

          <!-- 光源坐标 -->
          <div v-if="item.lightxyz && item.lightshow" class="lightpoint">
            <!-- X -->
            <div>
              <span>x:</span>
              <el-slider v-model="item.x" :precision="2" :step="0.1" :max="20" :min="-20"
                @input="lightcoordinatesXFun(item.lightname, item.x)" />
              <input type="number" v-model="item.x" max="20" min="-20" required
                @input="lightcoordinatesXFun(item.lightname, item.x)">
            </div>
            <!-- Y -->
            <div>
              <span>y:</span>
              <el-slider v-model="item.y" :precision="2" :step="0.1" :max="20" :min="-20"
                @input="lightcoordinatesYFun(item.lightname, item.y)" />
              <input type="number" v-model="item.y" max="20" min="-20" required
                @input="lightcoordinatesXFun(item.lightname, item.y)">
            </div>
            <!-- Z -->
            <div>
              <span>z:</span>
              <el-slider v-model="item.z" :precision="2" :step="0.1" :max="20" :min="-20"
                @input="lightcoordinatesZFun(item.lightname, item.z)" />
              <input type="number" v-model="item.z" max="20" min="-20" required
                @input="lightcoordinatesXFun(item.lightname, item.z)">
            </div>
            <!-- 复制光源坐标 -->
            <button @click="copylightpoint(item.x, item.y, item.z)">复制</button>
          </div>

          <!-- 新增光源 -->
          <div v-if="item.lightadd && item.lightshow" class="newlight">
            <div>
              <span>新增:</span>
              <span @click="lightaddFun(item.lightname)">+</span>
            </div>
            <div v-if="item.lightadd.length > 0">
              <ul v-for="(itemmin, indexmin) in item.lightadd" :key="itemmin">
                <li>
                  <span>强度:</span>
                  <el-slider v-model="itemmin.lightstrength" :precision="2" :step="0.1" :max="200" :min="1"
                    @input="changenewlight(indexmin, itemmin.lightstrength, itemmin.lightname)" />
                </li>
                <li>
                  <span>坐标:</span>
                  <input v-model="itemmin.x" @input="newlightXFun(indexmin, itemmin.x, itemmin.lightname)" />
                  <input v-model="itemmin.y" @input="newlightYFun(indexmin, itemmin.y, itemmin.lightname)" />
                  <input v-model="itemmin.z" @input="newlightZFun(indexmin, itemmin.z, itemmin.lightname)" />
                  <button @click="copylightpoint(itemmin.x, itemmin.y, itemmin.z)">复制</button>
                </li>
                <li>
                  <span>删除:</span>
                  <span @click="deleatlight(index, itemmin.lightname, indexmin)">-</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
#rightlightpanel {
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

  ul {
    margin-top: vh(17px);
    width: 100%;

    li {
      // display: flex;
      // flex-direction: column;

      // 光源颜色
      .lightcolor {
        display: flex;
        align-items: center;
      }

      // 光照强度
      .lightvalue {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        // padding-top: vh(5px);
        // margin: vh(10px) 0;

        span {
          width: vw(50px);
          margin-right: vw(5px);
        }


        // /* 设置透明的边框，确保只有下边框有渐变效果 */
        // border-bottom: 1px solid transparent;
        // border-left: 1px solid transparent;
        // border-right: 1px solid transparent;

        // /* 创建渐变的下边框 */
        // background-image: linear-gradient(to right, #0ab0b7, #fff);
        // background-position: top left;
        // background-repeat: no-repeat;
        // background-size: 100% 2px;

      }

      // 光源范围
      .lightdistance {
        display: flex;
        align-items: center;
      }

      // 光源坐标
      .lightpoint {
        // display: flex;
        margin-bottom: vh(10px);

        input {
          width: 40px;
          height: 19px;
          margin-left: vw(3px);
          text-align: center;

          &:focus {
            outline: none;
            /* 去掉焦点时的外部轮廓 */
          }
        }

        button {
          width: 40px;
          height: 19px;
          margin-left: vw(3px);
          background-color: #0ab0b7;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      }

      // 新增光源
      .newlight {
        display: flex;
        flex-direction: column;
        width: 100%;

        li:nth-of-type(1) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;

          span {
            width: vw(50px);
            margin-right: vw(5px);
          }
        }

        li:nth-of-type(2) {
          // display: flex;
          // margin-bottom: vh(10px);

          input {
            width: 40px;
            height: 19px;
            margin-left: vw(3px);
            text-align: center;

            &:focus {
              outline: none;
              /* 去掉焦点时的外部轮廓 */
            }
          }

          button {
            width: 40px;
            height: 19px;
            margin-left: vw(3px);
            background-color: #0ab0b7;
            color: #fff;
            border: none;
            cursor: pointer;
          }
        }

        li:nth-of-type(3) {
          margin-top: vh(10px);
        }
      }

      .newlight span:nth-of-type(2) {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #0ab0b7;
        margin-left: vw(5px);
        cursor: pointer;
      }

      // 阴影
      .lightshadow {
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

/* 隐藏默认的颜色选择框 */
input[type="color"] {
  appearance: none;
  /* 隐藏默认样式 */
  border: none;
  /* 移除边框 */
  width: 50px;
  height: 30px;
  padding: 0;
  cursor: pointer;
}

/* 自定义样式 */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  /* 移除内部间距 */
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  /* 移除内置边框 */
}

input[type="color"] {
  width: 40px;
  height: 20px;
}

// 组件动画
.rightlight-enter-active,
.rightlight-leave-active {
  /* 只保留平移效果 */
  transition: transform 0.5s ease;
}

.rightlight-enter-from,
.rightlight-leave-to {
  /* 初始位置设定为左侧 100% */
  transform: translateX(100%);
}
</style>