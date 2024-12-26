<script setup>
// 右侧灯光操作面板
import {
  changeLightStrength,
  changeLightColor,
  changeLightDistance,
  lightPositionFun,
  lightaddFun,
  lightremoveFun,
  changenewlightcolor,
  changenewlight,
  changenewdistance,
  newlightPositionFun,
  changeSpotLightFun,
  rectanglelightwhFun,
  assistcaremaFun,
  newSpotLightFun,
  newrectanglelightwhFun,
  planeshadowFun
} from '../../../public/three/mainScene'

import { lightCounterStore } from '@/stores'

const { lightpanel, lightSet } = lightCounterStore()

// 删除新增的光源
const deleatlight = (index, lightname, indexmin) => {
  lightSet[index].lightadd.splice(indexmin, 1)
  // 调用三维的函数，删除对应的光源
  lightremoveFun(indexmin, lightname)
}

// 显示、隐藏光源设置
const unflodFun = index => {
  lightSet[index].unflod = !lightSet[index].unflod
}
</script>

<template>
  <transition name="rightlight">
    <div v-if="lightpanel.rightpanel" id="rightlightpanel">
      <ul>
        <li v-for="(item, index) in lightSet " :key="item.lightname">

          <!-- 光源类型（这里根据是否有颜色来显示有无光照范围调整） -->
          <div v-if="item.name && item.lightshow">
            <div>
              <div>
                <span class="iconfont icon-xiala" :class="item.unflod ? 'pulldown' : 'packup'"></span>
                <span @click="unflodFun(index)">{{ item.lightlabel }}</span>
              </div>
              <div v-if="item.color">
                <button @click="lightaddFun(item.lightname, index)">新增</button>
                <!-- <button @click="copylightpoint(item.x, item.y, item.z)">复制</button> -->
              </div>
            </div>
          </div>

          <transition name="slide">
            <div v-show="item.unflod" class="lightmain">
              <!-- 光源颜色 -->
              <div v-if="item.color && item.lightshow" class="lightcolor">
                <span>color</span>
                <div>
                  <input type="color" v-model="item.lightcolor"
                    @input="changeLightColor(item.lightname, item.lightcolor)">
                  <input type="text" v-model="item.lightcolor"
                    @input="changeLightColor(item.lightname, item.lightcolor)">
                </div>
              </div>

              <!-- 光照强度 -->
              <div v-if="item.intensity && item.lightshow" class="lightvalue">
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
              <div v-if="item.angle && item.lightshow" class="llightangle">
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
              <div v-if="item.decay && item.lightshow" class="lightdecay">
                <span>decay</span>
                <div>
                  <el-slider v-model="item.lightdecay" :precision="2" :step="1" :max="10" :min="2"
                    @input="changeSpotLightFun('lightdecay', item.lightdecay)" />
                  <input type="number" v-model="item.lightdecay" max="10" min="2" required
                    @input="changeSpotLightFun('lightdecay', item.lightdecay)">
                </div>
              </div>

              <!-- 设置矩形区域光的宽（矩形区域光独有） -->
              <div v-if="item.lightwidth && item.lightshow" class="lightdecay">
                <span>width</span>
                <div>
                  <el-slider v-model="item.lightwidth" :precision="2" :step="1" :max="20" :min="1"
                    @input="rectanglelightwhFun('width', item.lightwidth)" />
                  <input type="number" v-model="item.lightwidth" max="20" min="1" required
                    @input="rectanglelightwhFun('width', item.lightwidth)">
                </div>
              </div>

              <!-- 设置矩形区域光的宽（矩形区域光独有） -->
              <div v-if="item.lightheight && item.lightshow" class="lightdecay">
                <span>height</span>
                <div>
                  <el-slider v-model="item.lightheight" :precision="2" :step="1" :max="20" :min="1"
                    @input="rectanglelightwhFun('height', item.lightheight)" />
                  <input type="number" v-model="item.lightheight" max="20" min="1" required
                    @input="rectanglelightwhFun('height', item.lightheight)">
                </div>
              </div>

              <!-- 光源目标坐标 -->
              <div v-if="item.lighttarget && item.lightshow" class="lighttarget">
                <!-- X -->
                <div>
                  <span>target-x</span>
                  <div>
                    <el-slider v-model="item.tarx" :precision="2" :step="0.01" :max="180" :min="-180"
                      @input="lightPositionFun(item.lightname, item.tarx, 'target', 'x')" />
                    <input type="number" v-model="item.tarx" max="20" min="-20" required
                      @input="lightPositionFun(item.lightname, item.tarx, 'target', 'x')">
                  </div>
                </div>
                <!-- Y -->
                <div>
                  <span>target-y</span>
                  <div>
                    <el-slider v-model="item.tary" :precision="2" :step="0.01" :max="180" :min="-180"
                      @input="lightPositionFun(item.lightname, item.tary, 'target', 'y')" />
                    <input type="number" v-model="item.tary" max="20" min="-20" required
                      @input="lightPositionFun(item.lightname, item.tary, 'target', 'y')">
                  </div>
                </div>
                <!-- Z -->
                <div>
                  <span>target-z</span>
                  <div>
                    <el-slider v-model="item.tarz" :precision="2" :step="0.01" :max="180" :min="-180"
                      @input="lightPositionFun(item.lightname, item.tarz, 'target', 'z')" />
                    <input type="number" v-model="item.tarz" max="20" min="-20" required
                      @input="lightPositionFun(item.lightname, item.tarz, 'target', 'z')">
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
                      @input="lightPositionFun(item.lightname, item.x, 'position', 'x')" />
                    <input type="number" v-model="item.x" max="20" min="-20" required
                      @input="lightPositionFun(item.lightname, item.x, 'position', 'x')">
                  </div>
                </div>
                <!-- Y -->
                <div>
                  <span>position-y</span>
                  <div>
                    <el-slider v-model="item.y" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightPositionFun(item.lightname, item.y, 'position', 'y')" />
                    <input type="number" v-model="item.y" max="20" min="-20" required
                      @input="lightPositionFun(item.lightname, item.y, 'position', 'y')">
                  </div>
                </div>
                <!-- Z -->
                <div>
                  <span>position-z</span>
                  <div>
                    <el-slider v-model="item.z" :precision="2" :step="0.01" :max="20" :min="-20"
                      @input="lightPositionFun(item.lightname, item.z, 'position', 'z')" />
                    <input type="number" v-model="item.z" max="20" min="-20" required
                      @input="lightPositionFun(item.lightname, item.z, 'position', 'z')">
                  </div>
                </div>
              </div>

              <!-- 接收阴影的地面 -->
              <!-- 宽 -->
              <div v-if="item.planewh && item.lightshow" class="lightdecay">
                <span>width</span>
                <div>
                  <el-slider v-model="item.planewidth" :precision="2" :step="0.01" :max="500" :min="1"
                    @input="planeshadowFun('width', item.planewidth)" />
                  <input type="number" v-model="item.planewidth" max="500" min="1" required
                    @input="planeshadowFun('width', item.planewidth)">
                </div>
              </div>
              <!-- 高 -->
              <div v-if="item.planewh && item.lightshow" class="lightdecay">
                <span>height</span>
                <div>
                  <el-slider v-model="item.planeheight" :precision="2" :step="0.01" :max="500" :min="1"
                    @input="planeshadowFun('height', item.planeheight)" />
                  <input type="number" v-model="item.planeheight" max="500" min="1" required
                    @input="planeshadowFun('height', item.planeheight)">
                </div>
              </div>

              <!-- 设置阴影相机辅助器 -->
              <!-- 宽 -->
              <div v-if="item.lightassist && item.assistwandh" class="lightdecay">
                <span>width</span>
                <div>
                  <el-slider v-model="item.assistwidth" :precision="2" :step="0.01" :max="100" :min="1"
                    @input="assistcaremaFun('width', item.lightname, item.assistwidth)" />
                  <input type="number" v-model="item.assistwidth" max="100" min="1" required
                    @input="assistcaremaFun('width', item.lightname, item.assistwidth)">
                </div>
              </div>
              <!-- 高 -->
              <div v-if="item.lightassist && item.assistwandh" class="lightdecay">
                <span>height</span>
                <div>
                  <el-slider v-model="item.assistheight" :precision="2" :step="0.01" :max="100" :min="1"
                    @input="assistcaremaFun('height', item.lightname, item.assistheight)" />
                  <input type="number" v-model="item.assistheight" max="100" min="1" required
                    @input="assistcaremaFun('height', item.lightname, item.assistheight)">
                </div>
              </div>
              <!-- near -->
              <div v-if="item.lightassist" class="lightdecay">
                <span>near</span>
                <div>
                  <el-slider v-model="item.assistnear" :precision="2" :step="0.01" :max="50" :min="0.1"
                    @input="assistcaremaFun('near', item.lightname, item.assistnear)" />
                  <input type="number" v-model="item.assistnear" max="50" min="0.1" required
                    @input="assistcaremaFun('near', item.lightname, item.assistnear)">
                </div>
              </div>
              <!-- far -->
              <div v-if="item.lightassist" class="lightdecay">
                <span>far</span>
                <div>
                  <el-slider v-model="item.assistfar" :precision="2" :step="0.01" :max="500" :min="1"
                    @input="assistcaremaFun('far', item.lightname, item.assistfar)" />
                  <input type="number" v-model="item.assistfar" max="500" min="1" required
                    @input="assistcaremaFun('far', item.lightname, item.assistfar)">
                </div>
              </div>
              <!-- zoom -->
              <div v-if="item.lightassist" class="lightdecay">
                <span>zoom</span>
                <div>
                  <el-slider v-model="item.assistzoom" :precision="2" :step="0.01" :max="1.5" :min="0.01"
                    @input="assistcaremaFun('zoom', item.lightname, item.assistzoom)" />
                  <input type="number" v-model="item.assistzoom" max="1.5" min="0.01" required
                    @input="assistcaremaFun('zoom', item.lightname, item.assistzoom)">
                </div>
              </div>

              <!-- 新增光源 -->
              <div class="newlight">
                <!-- 新增光源主体区域 -->
                <div v-if="item.lightadd && item.lightshow && item.lightadd.length > 0">
                  <div v-for="(itemmin, indexmin) in item.lightadd" :key="itemmin">

                    <!-- 新增光源名称 -->
                    <div class="newlightname">
                      <span class="newligntname" @click="itemmin.unflod = !itemmin.unflod"><i
                          class="iconfont icon-xiala" :class="itemmin.unflod ? 'pulldown' : 'packup'"></i>{{
                            itemmin.lightlabel }}-{{ indexmin +
                          1 }}</span>
                      <div>
                        <button @click="deleatlight(index, itemmin.lightname, indexmin)">删除</button>
                      </div>
                    </div>

                    <transition name="slide">
                      <!-- 新增光源操作面板主体 -->
                      <div v-show="itemmin.unflod">

                        <!-- 新增光源颜色 -->
                        <div v-if="itemmin.lightcolor">
                          <span>color</span>
                          <div>
                            <input type="color" v-model="itemmin.lightcolor"
                              @input="changenewlightcolor(indexmin, itemmin.lightcolor, itemmin.lightname)">
                            <input type="text" v-model="itemmin.lightcolor"
                              @input="changenewlightcolor(indexmin, itemmin.lightcolor, itemmin.lightname)">
                          </div>
                        </div>

                        <!-- 新增光照强度 -->
                        <div v-if="itemmin.lightstrength">
                          <span>intensity</span>
                          <div>
                            <el-slider v-model="itemmin.lightstrength" :precision="2" :step="0.01" :max="10" :min="1"
                              @input="changenewlight(indexmin, itemmin.lightstrength, itemmin.lightname)" />
                            <input type="number" v-model="itemmin.lightstrength"
                              @input="changenewlight(indexmin, itemmin.lightstrength, itemmin.lightname)">
                          </div>
                        </div>

                        <!-- 新增光源范围 -->
                        <div v-if="itemmin.distance">
                          <span>distance</span>
                          <div>
                            <el-slider v-model="itemmin.lightdistance" :precision="2" :step="0.1" :max="10" :min="0"
                              @input="changenewdistance(indexmin, itemmin.lightdistance, itemmin.lightname)" />
                            <input type="number" v-model="itemmin.lightdistance"
                              @input="changenewdistance(indexmin, itemmin.lightdistance, itemmin.lightname)">
                          </div>
                        </div>

                        <!-- 光照范围的角度(聚光灯独有配置) -->
                        <div v-if="itemmin.llightangle">
                          <span>angle</span>
                          <div>
                            <el-slider v-model="itemmin.llightangle" :precision="2" :step="0.01" :max="100" :min="1"
                              @input="newSpotLightFun(indexmin, itemmin.llightangle, 'llightangle')" />
                            <input type="number" v-model="itemmin.llightangle" max="100" min="1" required
                              @input="newSpotLightFun(indexmin, itemmin.llightangle, 'llightangle')">
                          </div>
                        </div>

                        <!-- 聚光追半影衰减百分比(聚光灯独有配置) -->
                        <div v-if="itemmin.penumbra">
                          <span>penumbra</span>
                          <div>
                            <el-slider v-model="itemmin.lightpenumbra" :precision="2" :step="0.01" :max="1" :min="0"
                              @input="newSpotLightFun(indexmin, itemmin.lightpenumbra, 'lightpenumbra')" />
                            <input type="number" v-model="itemmin.lightpenumbra" max="1" min="0" required
                              @input="newSpotLightFun(indexmin, itemmin.lightpenumbra, 'lightpenumbra')">
                          </div>
                        </div>

                        <!-- 沿着光照的衰减量(聚光灯独有配置) -->
                        <div v-if="itemmin.lightdecay">
                          <span>decay</span>
                          <div>
                            <el-slider v-model="itemmin.lightdecay" :precision="2" :step="1" :max="10" :min="2"
                              @input="newSpotLightFun(indexmin, itemmin.lightdecay, 'lightdecay')" />
                            <input type="number" v-model="itemmin.lightdecay" max="10" min="2" required
                              @input="newSpotLightFun(indexmin, itemmin.lightdecay, 'lightdecay')">
                          </div>
                        </div>

                        <!-- 设置矩形区域光的宽（矩形区域光独有） -->
                        <div v-if="itemmin.lightwidth">
                          <span>width</span>
                          <div>
                            <el-slider v-model="itemmin.lightwidth" :precision="2" :step="1" :max="20" :min="1"
                              @input="newrectanglelightwhFun(indexmin, 'width', itemmin.lightwidth)" />
                            <input type="number" v-model="itemmin.lightwidth" max="20" min="1" required
                              @input="newrectanglelightwhFun(indexmin, 'width', itemmin.lightwidth)">
                          </div>
                        </div>

                        <!-- 设置矩形区域光的宽（矩形区域光独有） -->
                        <div v-if="itemmin.lightheight">
                          <span>height</span>
                          <div>
                            <el-slider v-model="itemmin.lightheight" :precision="2" :step="1" :max="20" :min="1"
                              @input="newrectanglelightwhFun(indexmin, 'height', itemmin.lightheight)" />
                            <input type="number" v-model="itemmin.lightheight" max="20" min="1" required
                              @input="newrectanglelightwhFun(indexmin, 'height', itemmin.lightheight)">
                          </div>
                        </div>

                        <!-- 新增光源目标坐标 -->
                        <div v-if="itemmin.lighttarget" class="newlightposition">
                          <!-- X -->
                          <div>
                            <span>target-x</span>
                            <div>
                              <el-slider v-model="itemmin.tarx" :precision="2" :step="0.01" :max="180" :min="-180"
                                @input="newlightPositionFun(indexmin, itemmin.tarx, itemmin.lightname, 'target', 'x')" />
                              <input type="number" v-model="itemmin.tarx" max="20" min="-20" required
                                @input="newlightPositionFun(indexmin, itemmin.tarx, itemmin.lightname, 'target', 'x')">
                            </div>
                          </div>
                          <!-- Y -->
                          <div>
                            <span>target-y</span>
                            <div>
                              <el-slider v-model="itemmin.tary" :precision="2" :step="0.01" :max="180" :min="-180"
                                @input="newlightPositionFun(indexmin, itemmin.tary, itemmin.lightname, 'target', 'y')" />
                              <input type="number" v-model="itemmin.tary" max="20" min="-20" required
                                @input="newlightPositionFun(indexmin, itemmin.tary, itemmin.lightname, 'target', 'y')">
                            </div>
                          </div>
                          <!-- Z -->
                          <div>
                            <span>target-z</span>
                            <div>
                              <el-slider v-model="itemmin.tarz" :precision="2" :step="0.01" :max="180" :min="-180"
                                @input="newlightPositionFun(indexmin, itemmin.tarz, itemmin.lightname, 'target', 'z')" />
                              <input type="number" v-model="itemmin.tarz" max="20" min="-20" required
                                @input="newlightPositionFun(indexmin, itemmin.tarz, itemmin.lightname, 'target', 'z')">
                            </div>
                          </div>

                        </div>

                        <!-- 新增光源坐标 -->
                        <div v-if="itemmin.lightxyz" class="newlightposition">
                          <!-- X -->
                          <div>
                            <span>position-x</span>
                            <div>
                              <el-slider v-model="itemmin.x" :precision="2" :step="0.01" :max="20" :min="-20"
                                @input="newlightPositionFun(indexmin, itemmin.x, itemmin.lightname, 'position', 'x')" />
                              <input type="number" v-model="itemmin.x" max="20" min="-20" required
                                @input="newlightPositionFun(indexmin, itemmin.x, itemmin.lightname, 'position', 'x')">
                            </div>
                          </div>
                          <!-- Y -->
                          <div>
                            <span>position-y</span>
                            <div>
                              <el-slider v-model="itemmin.y" :precision="2" :step="0.01" :max="20" :min="-20"
                                @input="newlightPositionFun(indexmin, itemmin.y, itemmin.lightname, 'position', 'y')" />
                              <input type="number" v-model="itemmin.y" max="20" min="-20" required
                                @input="newlightPositionFun(indexmin, itemmin.y, itemmin.lightname, 'position', 'y')">
                            </div>
                          </div>
                          <!-- Z -->
                          <div>
                            <span>position-z</span>
                            <div>
                              <el-slider v-model="itemmin.z" :precision="2" :step="0.01" :max="20" :min="-20"
                                @input="newlightPositionFun(indexmin, itemmin.z, itemmin.lightname, 'position', 'z')" />
                              <input type="number" v-model="itemmin.z" max="20" min="-20" required
                                @input="newlightPositionFun(indexmin, itemmin.z, itemmin.lightname, 'position', 'z')">
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
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
  }

  li {
    // margin-top: vh(10px);
    // padding-bottom: vh(5px);
  }

  li>div:first-of-type {
    // padding: vh(5px) 0;
    margin-top: vh(5px);

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
    }
  }

  input[type="text"] {
    width: 60px;
    margin-bottom: vh(2px);
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

  .lightcolor {
    margin-top: vh(5px);
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

        // &:last-child() {
        //   // margin-bottom: vh(5px);
        // }
      }

    }
  }

  // 新增光源
  .newlight {
    // 确保父容器的样式允许子元素填充
    width: 100%;

    .newligntname {
      display: block;
      color: #fff;

      i {
        display: inline-block;
        font-style: normal;
        font-size: 12px;
        transition: all 0.2s linear;
      }
    }

    >div {
      width: 100%;
    }

    .newlightname {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: vh(5px) 0;
    }

    div>div>div>div {
      display: flex;
      justify-content: space-between;
    }

    div>div>div>div {
      display: flex;
      align-items: center;
    }

    .newlightposition {
      display: flex;
      flex-direction: column;

      >div {
        width: 100%;
        display: flex;
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
  margin-bottom: vh(2px);
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