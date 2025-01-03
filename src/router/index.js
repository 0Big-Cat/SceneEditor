import { createRouter, createWebHistory } from 'vue-router'
import { lightCounterStore, pointlabelCounterStore, skyCounterStore, groundCounterStore, fogCounterStore, uploadCounterStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/upload',
      component: () => import('@/views/moduleSet/uploadModule.vue')
    },
    {
      path: '/camera',
      component: () => import('@/views/moduleSet/cameraModule.vue')
    },
    {
      path: '/light',
      component: () => import('@/views/moduleSet/lightModule.vue')
    },
    {
      path: '/environmentmodel',
      component: () => import('@/views/moduleSet/environmentmodelModule.vue')
    },
    // {
    //   path: '/ground',
    //   component: () => import('@/views/moduleSet/groundModule.vue')
    // },
    // {
    //   path: '/fog',
    //   component: () => import('@/views/moduleSet/fogModule.vue')
    // },
    {
      path: '/anaphase',
      component: () => import('@/views/moduleSet/anaphaseModule.vue')
    },
    {
      path: '/nimate',
      component: () => import('@/views/moduleSet/animateModule.vue')
    },
    {
      path: '/point',
      component: () => import('@/views/moduleSet/pointsModule.vue')
    },
    {
      path: '/specialeffects',
      component: () => import('@/views/moduleSet/specialeffectsModule.vue')
    }
  ]
})

router.beforeEach((to) => {

  // 模型板块右侧面板的显示
  const filename = uploadCounterStore()
  if (to.path === '/upload') {
    if (filename.panelValue) {
      filename.rightmodelpanel = true
    }
  } else {
    filename.rightmodelpanel = false
  }

  const { lightpanel, lightSet } = lightCounterStore()
  // 灯光模块右侧面板的显示
  if (to.path === '/light') {
    // 需满足有一个光源类型为开启状态
    if (lightSet[2].lightshow || lightSet[3].lightshow || lightSet[4].lightshow || lightSet[5].lightshow || lightSet[6].lightshow || lightSet[7].lightshow || lightSet[8].lightshow) {
      lightpanel.rightpanel = true
    }
  } else {
    // 跳转至其他路由地址隐藏
    lightpanel.rightpanel = false
  }

  // 点位模块右侧面板的显示
  const data = pointlabelCounterStore()
  if (to.path === '/point') {
    if (data.pointlabel || data.pathlabel) {
      data.rightpanel = true
    }
  } else {
    data.rightpanel = false
  }

  // 场景模块的右侧面板显示
  const skydata = skyCounterStore()
  const { grounddata } = groundCounterStore()
  const { fogdata, fogexp2data } = fogCounterStore()
  if (to.path === '/environmentmodel') {
    if (skydata.skyvalue || grounddata.showvalue || grounddata.axeshelper || fogdata.show || fogexp2data.data) {
      skydata.rightpanel = true
    }
  } else {
    skydata.rightpanel = false
  }
})

export default router
