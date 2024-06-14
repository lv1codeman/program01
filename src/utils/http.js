import axios from 'axios'
import { ElMessage } from 'element-plus'
// 定義後端URL
const BASE_URL = 'https://80f3-61-221-225-125.ngrok-free.app'

// 創建Axios實例，可根據不同的BASE_URL對應創建
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '11'
  }
})

// 設置Axios攔截器來自動附加Token，從session拿取token附加在即將送出的request上
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (e) => {
    // 統一錯誤提示
    ElMessage({
      showClose: true,
      message: e.response.data.message,
      type: 'error',
      duration: 3000,
      offset: window.screen.height / 50
    })
    return Promise.reject(e)
  }
)

export default axiosInstance

// // 處理Token過期的情況
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const token = sessionStorage.getItem('token')
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//       return axiosInstance(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )
