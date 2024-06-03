// axios基礎的封裝
import axios from 'axios'

console.log('https start...')

const token = sessionStorage.getItem['token']

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXRhX2FjY2VzcyIsImV4cCI6MTcxNzQwMjkwMn0.6BhlMViuIoZtXOQPRkYPs3MmSynH-M3-9UXQpQDuyzE'

console.log(`token https.js = ${token}`)

const myInstance = axios.create({
  // baseURL: 'http://localhost:8000/',
  baseURL: 'https://80f3-61-221-225-125.ngrok-free.app',
  timeout: 5000,
  headers: { 'ngrok-skip-browser-warning': '11', Authorization: `Bearer ${token}` }
  // headers: { 'ngrok-skip-browser-warning': '11' }
})

myInstance.interceptors.request.use(
  (config) => {
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
