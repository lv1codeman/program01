// axios基礎的封裝
import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

const myInstance = axios.create({
  baseURL: 'http://localhost:8000/',
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

export { httpInstance, myInstance }
