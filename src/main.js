import '@/styles/common.scss'
import '@/styles/mystyle.scss'

// elementplus message組件需要導入的SCSS
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/el-message-box.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import print from 'print-js'
import App from './App.vue'
import router from './router'

//切換vue時滑至頁面頂部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
// 測試接口函數
// import { getCategory } from '@/apis/testAPI'

// getCategory().then((res) => {
//   console.log(res)
// })

/* import font awesome icon component */

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {
  faCirclePlus,
  faCircleXmark,
  faScaleBalanced,
  faMagnifyingGlass,
  faBuildingColumns,
  faBook,
  faPhone,
  faLink,
  faPalette,
  faPrint
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCartShopping,
  faCirclePlus,
  faTrashCan,
  faCircleXmark,
  faScaleBalanced,
  faMagnifyingGlass,
  faBuildingColumns,
  faBook,
  faPhone,
  faLink,
  faPalette,
  faPrint
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
// app.use(print)
app.use(createPinia())
app.use(router)

app.mount('#app')
