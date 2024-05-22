import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//切換vue時滑至頁面頂部
router.afterEach((to, from, next)=>{
  window.scrollTo(0,0);
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
  faLink
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
  faLink
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
