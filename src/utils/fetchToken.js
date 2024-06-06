// 獲取Token並存儲在session中
import axios from 'axios'

// 定義後端URL
const BASE_URL = 'https://80f3-61-221-225-125.ngrok-free.app'
const TOKEN_URL = `${BASE_URL}/token`

// 發出POST請求，提供帳號密碼索取TOKEN，得到token後存在session中
export async function fetchToken(id, password) {
  try {
    const form = { id: id, password: password }
    const response = await axios.post(TOKEN_URL, form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const token = response.data.access_token
    const userType = response.data.user_type
    // const userDataJson = response.data.user_data
    const userDataJSON = JSON.stringify(response.data.user_data)
    const userDataList = JSON.parse(JSON.stringify(response.data.user_data))
    const userData = userDataList[0]
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user_type', userType)
    sessionStorage.setItem('user_id', userData.id)
    sessionStorage.setItem('user_name', userData.name)
    sessionStorage.setItem('user_unit', userData.unit)
    sessionStorage.setItem('user_unit_short', userData.unit_short)
    console.log(`token get, user_type = ${userType}`)
    for (let i = 0; i < sessionStorage.length; i++) {
      console.log(`key: ${sessionStorage.key(i)}, value: ${sessionStorage.getItem(sessionStorage.key(i))}`)
    }
    if (token) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error fetching token:', error)
  }
}
