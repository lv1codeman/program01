import axiosInstance from '@/utils/http'

export async function login(id, password) {
  try {
    const loginData = { id: id, password: password }
    const response = await axiosInstance.post(`/login`, loginData)
    const token = response.access_token

    const userData = JSON.parse(JSON.stringify(response.user_data))[0]

    const sessionItems = {
      token,
      user_id: userData.member_id,
      user_role: userData.member_role,
      user_name: userData.member_name,
      user_unit: userData.member_unit,
      user_unit_short: userData.member_unit_short
    }

    Object.entries(sessionItems).forEach(([key, value]) => {
      sessionStorage.setItem(key, value)
    })

    // 把sessionStorage的內容印在console檢查
    // for (let i = 0; i < sessionStorage.length; i++) {
    //   console.log(`key: ${sessionStorage.key(i)}, value: ${sessionStorage.getItem(sessionStorage.key(i))}`)
    // }
    return true
  } catch (error) {
    console.error(error.response.data.detail)
    return false
  }
}

export async function checkToken() {
  try {
    let tokenObj =
      sessionStorage.getItem('token') == null ? { token: '沒有token' } : { token: sessionStorage.getItem('token') }
    const response = await axiosInstance.post(`/checkToken`, tokenObj)

    if (response.status == 'error') {
      sessionStorage.clear()
    }

    return response
  } catch (error) {
    sessionStorage.clear()
    console.error(error)
    return false
    // throw error
  }
}
