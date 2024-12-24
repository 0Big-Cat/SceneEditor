<script setup>
// 右侧灯光操作面板
// import { ref } from 'vue'
import {
  changeLightStrength,
  changeLightColor,
  changeLightDistance,
  lightcoordinatesXFun,
  lightcoordinatesYFun,
  lightcoordinatesZFun,
  lightaddFun,
  lightremoveFun,
  changenewlightcolor,
  changenewlight,
  changenewdistance,
  newlightXFun,
  newlightYFun,
  newlightZFun,
  changeSpotLightFun
} from '../../../public/three/mainScene'

import { lightCounterStore } from '@/stores'

const { lightpanel, lightSet } = lightCounterStore()

// const unflod = ref(true)

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

// 显示、隐藏光源设置
const unflodFun = index => {
  // unflod.value = !unflod.value
  lightSet[index].unflod = !lightSet[index].unflod
}
</script>

<template>
  <transition name="rightlight">
    <div v-if="lightpanel.lightshow" id="rightlightpanel">
      <ul>
        <li v-for="(item, index) in lightSet " :key="item.lightname">

          <!-- 光源类型（这里根据是否有颜色来显示有无光照范围调整） -->
          <div v-if="item.lightcolor && item.lightshow">
            <div>
              <div>
                <span class="iconfont icon-xiala" :class="item.unflod ? 'pulldown' : 'packup'"></span>
                <span @click="unflodFun(index)">{{ item.lightlabel }}</span>
              </div>
              <!-- <div>
                <button @click="lightaddFun(item.lightname)">新增</button>
              </div> -->
            </div>
          </div>

          <transition name="slide">
            <div v-show="item.unflod" class="lightmain">
              <!-- 光源颜色 -->
              <div v-if="item.lightcolor && item.lightshow" class="lightcolor">
                <span>color</span>
                <div>
                  <input type="color" v-model="item.lightcolor"
                    @input="changeLightColor(item.lightname, item.lightcolor)">
                  <input type="text" v-model="item.lightcolor"
                    @input="changeLightColor(item.lightname, item.lightcolor)">
                  <!-- <span>{{ item.lightcolor }}</span> -->
                </div>
              </div>

              <!-- 光照强度 -->
              <div v-if="item.lightstrength && item.lightshow" class="lightvalue">
                <span>intensity</span>
                <div>
                  <el-slider v-model="item.lightstrength" :precision="2" :step="0.01" :max="100" :min="1"
                    @input="changeLightStrength(item.lightname, item.lightstrength)" />

                  <input type="number" v-model="item.lightstrength" max="100" min="1" required
                    @input="changeLightStrength(item.lightname, item.lightstrength)">
                </div>
              </div>

              <!-- 光照范围（值为0时即无限远） -->
              <div v-if="item.distance && item.lightshow" class="lightdistance">
                <span>distance</span>
                <div>
                  <el-slider v-model="item.lightdistance" :precision="2" :step="0.1" :max="10" :min="0"
                    @input="changeLightDistance(item.lightname, item.lightdistance)" />
                  <input type="number" v-model="item.lightdistance" max="10" min="0" required
                    @input="changeLightDistance(item.lightname, item.lightdistance)">
                </div>
              </div>

              <!-- 光照范围的角度(聚光灯独有配置) -->
              <div v-if="item.llightangle && item.lightshow" class="llightangle">
                <span>angle</span>
                <div>
                  <el-slider v-model="item.llightangle" :precision="2" :step="0.01" :max="100" :min="1"
                    @input="changeSpotLightFun('llightangle', item.llightangle)" />
                  <input type="number" v-model="item.llightangle" max="100" min="1" required
                    @input="changeSpotLightFun('llightangle', item.llightangle)">
                </div>
              </div>

              <!-- 聚光追半影衰减百分比(聚光灯独有配置) -->
              <div v-if="item.penumbra && item.lightshow" class="lightpenumbra">
                <span>penumbra</span>
                <div>
                  <el-slider v-model="item.lightpenumbra" :precision="2" :step="0.01" :max="1" :min="0"
                    @input="changeSpotLightFun('lightpenumbra', item.lightpenumbra)" />
                  <input type="number" v-model="item.lightpenumbra" max="1" min="0" required
                    @input="changeSpotLightFun('lightpenumbra', item.lightpenumbra)">
                </div>
              </div>

              <!-- 沿着光照的衰减量(聚光灯独有配置) -->
              <div v-if="item.lightdecay && item.lightshow" class="lightdecay">
                <span>decay</span>
                <div>
                  <el-slider v-model="item.lightdecay" :precision="2" :step="1" :max="10" :min="2"
                    @input="changeSpotLightFun('lightdecay', item.lightdecay)" />
                  <input type="number" v-model="item.lightdecay" max="10" min="2" required
                    @input="changeSpotLightFun('lightdecay', item.lightdecay)">
                </div>
              </div>

              <!-- 光源目标坐标 -->
              <div v-if="item.lighttarget && item.lightshow" class="lighttarget">
                <!-- X -->
                <div>
                  <span>target-x</span>
                  <div>
                    <el-slider v-model="item.tarx" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightcoordinatesXFun(item.lightname, item.tarx, 'target')" />
                    <input type="number" v-model="item.tarx" max="20" min="-20" required
                      @input="lightcoordinatesXFun(item.lightname, item.tarx, 'target')">
                  </div>
                </div>
                <!-- Y -->
                <div>
                  <span>target-y</span>
                  <div>
                    <el-slider v-model="item.tary" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightcoordinatesYFun(item.lightname, item.tary, 'target')" />
                    <input type="number" v-model="item.tary" max="20" min="-20" required
                      @input="lightcoordinatesYFun(item.lightname, item.tary, 'target')">
                  </div>
                </div>
                <!-- Z -->
                <div>
                  <span>target-z</span>
                  <div>
                    <el-slider v-model="item.tarz" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightcoordinatesZFun(item.lightname, item.tarz, 'target')" />
                    <input type="number" v-model="item.tarz" max="20" min="-20" required
                      @input="lightcoordinatesZFun(item.lightname, item.tarz, 'target')">
                  </div>
                </div>
                <!-- 复制光源坐标 -->
                <div>
                  <div></div>
                  <div>
                    <button @click="copylightpoint(item.x, item.y, item.z)">复制</button>
                    <button>重置</button>
                  </div>
                </div>
              </div>

              <!-- 光源坐标 -->
              <div v-if="item.lightxyz && item.lightshow" class="lightpoint">
                <!-- X -->
                <div>
                  <span>position-x</span>
                  <div>
                    <el-slider v-model="item.x" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightcoordinatesXFun(item.lightname, item.x, 'position')" />
                    <input type="number" v-model="item.x" max="20" min="-20" required
                      @input="lightcoordinatesXFun(item.lightname, item.x, 'position')">
                  </div>
                </div>
                <!-- Y -->
                <div>
                  <span>position-y</span>
                  <div>
                    <el-slider v-model="item.y" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightcoordinatesYFun(item.lightname, item.y, 'position')" />
                    <input type="number" v-model="item.y" max="20" min="-20" required
                      @input="lightcoordinatesYFun(item.lightname, item.y, 'position')">
                  </div>
                </div>
                <!-- Z -->
                <div>
                  <span>position-z</span>
                  <div>
                    <el-slider v-model="item.z" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightcoordinatesZFun(item.lightname, item.z, 'position')" />
                    <input type="number" v-model="item.z" max="20" min="-20" required
                      @input="lightcoordinatesZFun(item.lightname, item.z, 'position')">
                  </div>
                </div>
                <!-- 复制光源坐标 -->
                <div>
                  <div></div>
                  <div>
                    <button @click="lightaddFun(item.lightname)">新增</button>
                    <button @click="copylightpoint(item.x, item.y, item.z)">复制</button>
                    <button>重置</button>
                  </div>
                </div>
              </div>

              <!-- 新增光源 -->
              <div v-if="item.lightadd && item.lightshow" class="newlight">
                <!-- 新增光源按钮 -->
                <div>
                  <!-- <span>新增:</span>
                  <span @click="lightaddFun(item.lightname)">+</span> -->
                </div>
                <!-- 新增光源主体区域 -->
                <div v-if="item.lightadd.length > 0">
                  <ul v-for="(itemmin, indexmin) in item.lightadd" :key="itemmin">
                    <!-- 新增光源颜色 -->
                    <li v-if="itemmin.lightcolor">
                      <span>color:</span>
                      <input type="color" v-model="itemmin.lightcolor"
                        @input="changenewlightcolor(indexmin, itemmin.lightcolor, itemmin.lightname)">
                      <span>{{ itemmin.lightcolor }}</span>
                    </li>
                    <!-- 新增光照强度 -->
                    <li v-if="itemmin.lightstrength">
                      <span>intensity:</span>
                      <el-slider v-model="itemmin.lightstrength" :precision="2" :step="0.01" :max="10" :min="1"
                        @input="changenewlight(indexmin, itemmin.lightstrength, itemmin.lightname)" />
                    </li>
                    <!-- 新增光源范围 -->
                    <li v-if="itemmin.distance">
                      <span>distance:</span>
                      <el-slider v-model="itemmin.lightdistance" :precision="2" :step="0.1" :max="10" :min="0"
                        @input="changenewdistance(indexmin, itemmin.lightdistance, itemmin.lightname)" />
                    </li>
                    <!-- 新增光源坐标 -->
                    <li v-if="itemmin.lightxyz">
                      <!-- X -->
                      <div>
                        <span>x:</span>
                        <el-slider v-model="itemmin.x" :precision="2" :step="0.01" :max="20" :min="-20"
                          @input="newlightXFun(indexmin, itemmin.x, itemmin.lightname)" />
                        <input type="number" v-model="itemmin.x" max="20" min="-20" required
                          @input="newlightXFun(indexmin, itemmin.x, itemmin.lightname)">
                      </div>
                      <!-- Y -->
                      <div>
                        <span>y:</span>
                        <el-slider v-model="itemmin.y" :precision="2" :step="0.01" :max="20" :min="-20"
                          @input="newlightYFun(indexmin, itemmin.y, itemmin.lightname)" />
                        <input type="number" v-model="itemmin.y" max="20" min="-20" required
                          @input="newlightYFun(indexmin, itemmin.y, itemmin.lightname)">
                      </div>
                      <!-- Z -->
                      <div>
                        <span>z:</span>
                        <el-slider v-model="itemmin.z" :precision="2" :step="0.01" :max="20" :min="-20"
                          @input="newlightZFun(indexmin, itemmin.z, itemmin.lightname)" />
                        <input type="number" v-model="itemmin.z" max="20" min="-20" required
                          @input="newlightZFun(indexmin, itemmin.z, itemmin.lightname)">
                      </div>
                      <!-- 复制新增光源坐标 -->
                      <button @click="copylightpoint(itemmin.x, itemmin.y, itemmin.z)">复制</button>
                    </li>
                    <li>
                      <span>删除:</span>
                      <span @click="deleatlight(index, itemmin.lightname, indexmin)">-</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
#rightlightpanel {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: vw(250px);
  height: 100%;
  z-index: 1;
  background-color: #0d0d0d;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  ul {
    margin-top: vh(17px);
    width: 100%;

    li {
      margin-top: vh(10px);

      >div:first-of-type {
        margin-bottom: vh(10px);

        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: vw(5px)
        }

        span {
          color: #fff;
        }

        span:nth-of-type(1) {
          transition: all 0.2s linear;
        }
      }

      input {
        width: 40px;
        height: 20px;
        margin-left: vw(3px);
        text-align: center;
        background-color: #333333;
        color: #0ab0b7;
        border: none;

        &:focus {
          outline: none;
          /* 去掉焦点时的外部轮廓 */
        }
      }

      input[type="text"] {
        width: 60px;
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

      span {
        cursor: pointer;
        color: #606266;
        font-size: 14px;
      }

      .lightmain {
        padding: 0 vw(10px);

        >div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      .lightcolor,
      .lightvalue,
      .lightdistance,
      .llightangle,
      .lightpenumbra,
      .lightdecay {
        >div {
          display: flex;
          align-items: center;
        }
      }

      // 光源坐标
      .lightpoint,
      .lighttarget {
        display: flex;
        flex-direction: column !important;
        align-items: flex-start !important;

        >div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          >div {
            display: flex;
            align-items: center;
          }
        }
      }

      // 新增光源
      .newlight {
        // display: flex;
        // flex-direction: column;
        width: 100%;


        li:nth-of-type(1) {
          display: flex;
          // justify-content: center;
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
          display: flex;
          align-items: center;

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


        }

        li:nth-of-type(3) {
          display: flex;
          align-items: center;
          margin-top: vh(10px);

          // button {
          //   width: 40px;
          //   height: 19px;
          //   margin-left: vw(3px);
          //   background-color: #0ab0b7;
          //   color: #fff;
          //   border: none;
          //   cursor: pointer;
          // }
        }

        li:nth-of-type(4) {
          div {
            display: flex;
            align-items: center;
          }
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

// 下拉
.pulldown {
  transform: rotate(0deg) !important;
}

// 收起
.packup {
  transform: rotate(90deg) !important;
}

li {
  transition: transform 0.3s linear;
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
  width: 60px !important;
  height: 20px;
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

// 光源操作面板下拉动画
/* 进入和离开的起始状态 */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 进入和离开的结束状态 */
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* 过渡效果 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s linear, opacity 0.3s linear;
}



// 组件动画
.rightlight-enter-from,
.rightlight-leave-to {
  transform: translateX(100%);
}

.rightlight-enter-to,
.rightlight-leave-from {
  transform: translateX(0);
}

.rightlight-enter-active,
.rightlight-leave-active {
  transition: transform 0.3s linear;
}
</style>