// https://80f3-61-221-225-125.ngrok-free.app
// axios基礎的封裝
import axios from 'axios'

// 定義後端URL
const BASE_URL = 'https://80f3-61-221-225-125.ngrok-free.app'
const TOKEN_URL = `${BASE_URL}/token`

// 創建Axios實例
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '11'
  }
})

// 獲取Token並存儲在session中
async function fetchToken() {
  try {
    // const form = new FormData()
    // form.append('id', 'S12345678')
    // form.append('name', 'S12345678')
    // form.append('password', '0000')

    const form = { id: 'S0000001', password: '0001' }
    // console.log('aaaaa' + JSON.stringify(form))
    const response = await axios.post(TOKEN_URL, form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const token = response.data.access_token
    sessionStorage.setItem('token', token)
    console.log('Token:', token)
  } catch (error) {
    console.error('Error fetching token:', error)
  }
}

// 設置Axios攔截器來自動附加Token
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem('token')
    if (!token) {
      await fetchToken()
      token = sessionStorage.getItem('token')
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 處理Token過期的情況
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await fetchToken()
      const token = sessionStorage.getItem('token')
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return axiosInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
