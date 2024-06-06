import axiosInstance from '@/utils/http'

// 獲取所有程序
export async function getAllPrograms() {
  try {
    const response = await axiosInstance.get('/program/all')
    return response.data
  } catch (error) {
    console.error('Error fetching programs:', error)
    throw error
  }
}

// 根據程序ID獲取程序
export async function getProgramById(programId) {
  try {
    const response = await axiosInstance.get(`/program/${programId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching program with ID ${programId}:`, error)
    throw error
  }
}

export async function checkToken() {
  try {
    const response = await axiosInstance.get(`/checkToken`)
    console.log(`response data = ${response.data}`)
    return response.data
  } catch (error) {
    console.error(error.response.data.detail)
    return false
    // throw error
  }
}

// export async function login() {
//   try {
//     const response = await axiosInstance.get(`/login`)
//     return response.data
//   } catch (error) {
//     console.error(`login failed.`, error)
//     throw error
//   }
// }
