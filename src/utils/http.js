// axios基礎的封裝
import axios from 'axios'

const myInstance = axios.create({
  // baseURL: 'http://localhost:8000/',
  baseURL: 'https://80f3-61-221-225-125.ngrok-free.app',
  timeout: 5000
})
const token = ''
myInstance.interceptors.request.use(
  (config) => {
    ;(config.headers['ngrok-skip-browser-warning'] = '69420'), (config.headers['Authorization'] = `Bearer ${token}`)

    return config
  },
  (e) => Promise.reject(e)
)
// axios響應式攔截器
myInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)
export { myInstance }

// 不拆成http.js和testAPI.js的寫法
// const url = 'https://c54c-61-221-225-124.ngrok-free.app/program/all'
// fetch(url, {
//   method: 'get',
//   headers: new Headers({
//     'ngrok-skip-browser-warning': '69420'
//   })
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(`data= ${data}`)
//     pd.value = data
//     console.log(pd.value)
//   })
//   .catch((err) => console.log(err))
