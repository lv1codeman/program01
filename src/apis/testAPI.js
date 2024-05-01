import { httpInstance, myInstance } from '@/utils/http'

export function getCategory() {
  return httpInstance({
    url: 'home/category/head'
  })
}

export function getServerData() {
  return myInstance({
    url: '/'
  })
}
