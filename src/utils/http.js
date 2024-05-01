// axios基礎的封裝
import { def } from '@vue/shared'
import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 攔截器

// axios請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)
// axios響應式攔截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

export default httpInstance
