import { myInstance } from '@/utils/http'

export function getProgramData() {
  return myInstance({
    url: '/program/all',
    method: 'get' //可以不寫，預設就是get
  })
}
