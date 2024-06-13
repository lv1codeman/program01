import axiosInstance from '@/utils/http'

export async function getAllSubjects() {
  try {
    const response = await axiosInstance.get('/subject/all')
    return response
  } catch (error) {
    console.error('Error fetching programs:', error)
    throw error
  }
}
