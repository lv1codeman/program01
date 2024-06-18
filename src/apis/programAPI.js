import axiosInstance from '@/utils/http'

// 獲取所有程序
export async function getAllPrograms() {
  try {
    const response = await axiosInstance.get('/program/all')
    return response
  } catch (error) {
    console.error('Error fetching programs:', error)
    throw error
  }
}

export async function getfakePrograms() {
  try {
    const response = await axiosInstance.get('/fakeprogram/all')
    return response
  } catch (error) {
    console.error('Error fetching programs:', error)
    throw error
  }
}

// 根據程序ID獲取程序
export async function getProgramById(programId) {
  try {
    const response = await axiosInstance.get(`/program/${programId}`)
    return response
  } catch (error) {
    console.error(`Error fetching program with ID ${programId}:`, error)
    throw error
  }
}

export async function submitProgram(programJSON) {
  try {
    console.log('programJSON=', programJSON)
    const response = await axiosInstance.post(`/program/submit`, programJSON)
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function getUnitPrograms(unit) {
  try {
    const response = await axiosInstance.post(`/program/getUnitPrograms`, unit)
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function getUnitProgramById(unit, program_id) {
  try {
    const response = await axiosInstance.post(`/program/getUnitPrograms`, unit, program_id)
    return response
  } catch (error) {
    console.error(error)
  }
}
