import { createRouter, createWebHistory } from 'vue-router'

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

export default router
