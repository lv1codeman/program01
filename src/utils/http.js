// axios基礎的封裝
import { def } from '@vue/shared'
import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

//攔截器

export default httpInstance
