// 獲取Token並存儲在session中
import axios from 'axios'

// 定義後端URL
const BASE_URL = 'https://80f3-61-221-225-125.ngrok-free.app'
const TOKEN_URL = `${BASE_URL}/token`

export async function fetchToken() {
  try {
    const form = { id: 'S0000001', password: '0001' }
    const response = await axios.post(TOKEN_URL, form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const token = response.data.access_token
    sessionStorage.setItem('token', token)
    console.log('Token:', token)
  } catch (error) {
    console.error('Error fetching token:', error)
  }
}
