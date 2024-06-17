// createRouter: 創建router實例對象
// createWebHistory: 創建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Programs from '@/views/Programs/index.vue'
import Result from '@/views/Result/result.vue'
import MiniPrograms from '@/views/MiniPrograms/index.vue'
import loadStructure from '@/views/Agent/loadStructure.vue'
import createStructure from '@/views/Agent/createStructure.vue'
import setSubject from '@/views/Agent/setSubject.vue'
import checkStructure from '@/views/Agent/checkStructure.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component對象關係的位置
  routes: [
    {
      path: '/',
      component: Layout, //children都會套用Layout index(@/views/Layout/index.vue)
      children: [
        {
          // 這邊path留空會默認當訪問parent時也會顯示這個children
          path: '',
          component: Home
        },
        {
          path: 'programs',
          component: Programs
        },
        {
          path: 'miniprograms',
          component: MiniPrograms
        },
        {
          path: 'loadStructure',
          component: loadStructure
        },
        {
          path: 'createStructure',
          component: createStructure
        },
        {
          path: 'result',
          component: Result
        },
        {
          // path: 'setSubject/:categoryName',
          // name: 'setSubject',
          // component: setSubject
          path: 'setSubject/:category_name/:domain_name?',
          name: 'setSubject',
          component: setSubject,
          props: (route) => ({
            category_name: route.params.category_name,
            domain_name: route.params.domain_name || '' // 使 domainName 为可选参数
          })
        },
        {
          path: 'checkStructure',
          component: checkStructure
        },
        {
          name: '404',
          path: '/:catchAll(.*)',
          component: () => import(`@/views/Error/404.vue`)
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
export default router
