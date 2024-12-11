<script setup>
// 灯光模块
import { lightCounterStore } from '@/stores'
import {
  changeLightStrength,
  lightShdow,
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

const { lightSet, toggleLight } = lightCounterStore()

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
  <div id="lightmodel">
    <ul>
      <li v-for="(item, index) in lightSet " :key="item.lightname">
        <!-- 是否启用 -->
        <div>
          <el-checkbox v-model="item.lightshow" :label="item.lightlabel" size="large"
            @change="toggleLight(item.lightname)" />
        </div>
        <!-- 光照强度 -->
        <div v-if="item.lightcolor && item.lightshow" class="lightvalue">
          <span>强度:</span>
          <el-slider v-model="item.lightstrength" :precision="2" :step="0.1" :max="100" :min="1"
            @input="changeLightStrength(item.lightname, item.lightstrength)" />
        </div>
        <!-- 光源坐标 -->
        <div v-if="item.lightxyz && item.lightshow" class="lightpoint">
          <span>坐标:</span>
          <input v-model="item.x" @input="lightcoordinatesXFun(item.lightname, item.x)" />
          <input v-model="item.y" @input="lightcoordinatesYFun(item.lightname, item.y)" />
          <input v-model="item.z" @input="lightcoordinatesZFun(item.lightname, item.z)" />
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
                <el-slider v-model="itemmin.lightstrength" :precision="2" :step="0.1" :max="100" :min="1"
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
        <!-- 是否启用阴影 (显示与否，与新增一致)-->
        <div v-if="item.lightadd && item.lightshow" class="lightshadow">
          <el-checkbox v-model="item.lightshodow" label="阴影" size="large"
            @change="lightShdow(item.lightshodow, item.lightname)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#lightmodel {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  padding: 0 vw(20px);
  font-size: rem(14px);

  ul {
    margin-top: vh(17px);
    width: 100%;

    li {
      // display: flex;
      // flex-direction: column;

      // 光照强度
      .lightvalue {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        // padding-top: vh(5px);
        // margin: vh(10px) 0;

        span {
          width: vw(50px);
          margin-right: vw(5px);
        }


        /* 设置透明的边框，确保只有下边框有渐变效果 */
        border-bottom: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;

        /* 创建渐变的下边框 */
        background-image: linear-gradient(to right, #0ab0b7, #fff);
        background-position: top left;
        background-repeat: no-repeat;
        background-size: 100% 2px;

      }

      // 光源坐标
      .lightpoint {
        display: flex;
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

  .el-checkbox:last-of-type {
    margin-right: 30px;
  }

}
</style>