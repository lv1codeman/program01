import { httpInstance, myInstance } from '@/utils/http'

export function getCategory() {
  return httpInstance({
    url: 'home/category/head'
  })
}

export function getProgramData() {
  return myInstance({
    url: '/program/all'
  })
}
