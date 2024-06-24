import { createRouter, createWebHistory } from 'vue-router'
import { checkToken } from '@/apis/loginAPI.js'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Programs from '@/views/Programs/index.vue'
import Result from '@/views/Result/result.vue'
import MiniPrograms from '@/views/MiniPrograms/index.vue'
import Browse from '@/views/Agent/Browse.vue'
import Edit from '@/views/Agent/Edit.vue'
import Create from '@/views/Agent/Create.vue'
import setSubject from '@/views/Agent/setSubject.vue'
import Check from '@/views/Agent/Check.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: 'programs', component: Programs },
        { path: 'miniprograms', component: MiniPrograms },
        { path: 'result', component: Result },
        {
          name: '404',
          path: '/:catchAll(.*)',
          component: () => import(`@/views/Error/404.vue`)
        }
      ]
    },
    { path: '/login', component: Login },
    {
      path: '/agent',
      component: Layout,
      children: [
        { path: '', component: Browse }, //首頁預設為Browse，管理介面
        { path: 'create', component: Create },
        { path: 'check', component: Check },
        { path: 'edit', component: Edit },
        {
          path: 'setSubject/:category_name/:domain_name?/:isFromLoad?',
          name: 'setSubject',
          component: setSubject,
          props: (route) => ({
            category_name: route.params.category_name,
            domain_name: route.params.domain_name || ''
          })
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const whiteList = ['/', '/login']

  if (whiteList.includes(to.path)) {
    next()
  } else {
    const isValid = await checkToken()

    if (isValid) {
      next()
    } else {
      sessionStorage.clear()
      next('/login')
    }
  }
})

export default router
