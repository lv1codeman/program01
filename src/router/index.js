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
import { ElMessage } from 'element-plus'

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

const whiteList = ['/', '/login']
const whiteList_staff = [/^\/agent/] // 使用正则表达式匹配/agent及其所有子路径
const whiteList_student = ['/programs', '/miniprograms', '/result']

const userRoles = {
  ADMIN: 'admin',
  STAFF: 'staff',
  STUDENT: 'student'
}

function hasAccess(role, path) {
  switch (role) {
    case userRoles.ADMIN:
      return true
    case userRoles.STAFF:
      return whiteList_staff.some((regex) => regex.test(path))
    case userRoles.STUDENT:
      return whiteList_student.includes(path)
    default:
      return false
  }
}

router.beforeEach(async (to, from, next) => {
  console.log('即將前往：', to)

  if (whiteList.includes(to.path)) {
    next()
  } else {
    const isValid = await checkToken()
    if (isValid) {
      const userRole = sessionStorage['user_role']
      if (hasAccess(userRole, to.path)) {
        next()
      } else {
        console.log('無訪問權限, stay where you at')
        ElMessage({
          type: 'warning',
          message: '無訪問權限，已將您導向網站首頁',
          showClose: true,
          duration: 3000,
          offset: window.screen.height / 50
        })
        next('/')
      }
    } else {
      sessionStorage.clear()
      next('/login')
    }
  }
})

export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import { checkToken } from '@/apis/loginAPI.js'
// import Login from '@/views/Login/index.vue'
// import Layout from '@/views/Layout/index.vue'
// import Home from '@/views/Home/index.vue'
// import Programs from '@/views/Programs/index.vue'
// import Result from '@/views/Result/result.vue'
// import MiniPrograms from '@/views/MiniPrograms/index.vue'
// import Browse from '@/views/Agent/Browse.vue'
// import Edit from '@/views/Agent/Edit.vue'
// import Create from '@/views/Agent/Create.vue'
// import setSubject from '@/views/Agent/setSubject.vue'
// import Check from '@/views/Agent/Check.vue'
// import { ElMessage } from 'element-plus'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       component: Layout,
//       children: [
//         { path: '', component: Home },
//         { path: 'programs', component: Programs },
//         { path: 'miniprograms', component: MiniPrograms },
//         { path: 'result', component: Result },
//         {
//           name: '404',
//           path: '/:catchAll(.*)',
//           component: () => import(`@/views/Error/404.vue`)
//         }
//       ]
//     },
//     { path: '/login', component: Login },
//     {
//       path: '/agent',
//       component: Layout,
//       children: [
//         { path: '', component: Browse }, //首頁預設為Browse，管理介面
//         { path: 'create', component: Create },
//         { path: 'check', component: Check },
//         { path: 'edit', component: Edit },
//         {
//           path: 'setSubject/:category_name/:domain_name?/:isFromLoad?',
//           name: 'setSubject',
//           component: setSubject,
//           props: (route) => ({
//             category_name: route.params.category_name,
//             domain_name: route.params.domain_name || ''
//           })
//         }
//       ]
//     }
//   ]
// })

// router.beforeEach(async (to, from, next) => {
//   const whiteList = ['/', '/login']
//   const whiteList_staff = ['/agent']
//   const whiteList_student = ['/programs', '/miniprograms']
//   console.log('即將前往：', to)

//   if (whiteList.includes(to.path)) {
//     // 如果是去whiteList的路徑，都允許
//     next()
//   } else {
//     // 去白名單以外的路徑
//     // 先確認有登入取得token
//     const isValid = await checkToken()
//     if (isValid) {
//       if (sessionStorage['user_role'] == 'admin') {
//         // 如果user_role是admin，直接通過
//         next()
//       } else if (sessionStorage['user_role'] == 'staff' && whiteList_staff.includes(to.path)) {
//         // 如果user_role是staff，而且是訪問staff白名單
//         next()
//       } else if (sessionStorage['user_role'] == 'student' && whiteList_student.includes(to.path)) {
//         next()
//       } else {
//         console.log('無訪問權限, stay where you at')
//         ElMessage({
//           type: 'warning',
//           message: '無訪問權限，已將您導向網站首頁',
//           showClose: true,
//           duration: 3000,
//           offset: window.screen.height / 50
//         })
//         next('/')
//       }
//     } else {
//       sessionStorage.clear()
//       next('/login')
//     }
//   }
// })

// export default router
