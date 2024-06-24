// https://f201-1-170-73-91.ngrok-free.app
// axios基礎的封裝
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { fetchToken } from '@/utils/fetchToken.js'
// 定義後端URL
const BASE_URL = 'https://8b3c-61-221-225-124.ngrok-free.app'

// 創建Axios實例
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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
  (res) => res.data,
  (e) => {
    if (e.code == 'ERR_NETWORK') {
      // console.log('ERR_NETWORK', e)
      ElMessage({
        type: 'error',
        message: '連線異常，請聯絡系統管理員。',
        showClose: true,
        duration: 3000,
        offset: window.screen.height / 50
      })
    }

    if (e.response.status == 422) {
      console.log('e.response.status = 422')
    } else if (e.response.status == 401) {
      console.log('e.response.status = 401', e.response.data.detail)
      ElMessage({
        type: 'error',
        //message: e.response.data.detail,
        message: '請先登入',
        showClose: true,
        duration: 3000,
        offset: window.screen.height / 50
      })
    } else {
      ElMessage({
        type: 'warning',
        message: '使用者未登入',
        showClose: true,
        duration: 3000,
        offset: window.screen.height / 50
      })
    }
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
