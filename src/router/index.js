import { createRouter, createWebHistory } from 'vue-router'
import { checkToken } from '@/apis/loginAPI.js'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Programs from '@/views/Programs/index.vue'
import Result from '@/views/Result/result.vue'
import MiniPrograms from '@/views/MiniPrograms/index.vue'
import managePrograms from '@/views/Agent/managePrograms.vue'
import loadStructure from '@/views/Agent/loadStructure.vue'
import createStructure from '@/views/Agent/createStructure.vue'
import setSubject from '@/views/Agent/setSubject.vue'
import checkStructure from '@/views/Agent/checkStructure.vue'

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
        { path: 'managePrograms', component: managePrograms },
        { path: 'loadStructure', component: loadStructure },
        { path: 'createStructure', component: createStructure },
        { path: 'result', component: Result },
        {
          path: 'setSubject/:category_name/:domain_name?/:isFromLoad?',
          name: 'setSubject',
          component: setSubject,
          props: (route) => ({
            category_name: route.params.category_name,
            domain_name: route.params.domain_name || ''
          })
        },
        { path: 'checkStructure', component: checkStructure },
        {
          name: '404',
          path: '/:catchAll(.*)',
          component: () => import(`@/views/Error/404.vue`)
        }
      ]
    },
    { path: '/login', component: Login }
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
