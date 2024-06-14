import axiosInstance from '@/utils/http'

// 獲取所有程序
export const getAllPrograms = async () => {
  return axiosInstance({
    url: '/program/all',
    method: 'GET'
  })
}

// 根據程序ID獲取程序
export const getProgramById = (programId) => {
  return axiosInstance({
    url: `/program/${programId}`,
    method: 'GET'
  })
}
export const checkToken = () => {
  return axiosInstance({
    url: '/checkToken',
    method: 'GET'
  })
}

export const getToken = ({ id, password }) => {
  return axiosInstance({
    url: '/token',
    method: 'POST',
    data: {
      id: id,
      password: password
    }
  })
}
