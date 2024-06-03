import { myInstance } from '@/utils/http'

export function getProgramData() {
  return myInstance({
    url: '/program/all',
    method: 'get' //可以不寫，預設就是get
  })
}

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
