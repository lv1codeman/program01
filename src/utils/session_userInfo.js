export const setUserInfo = (userData) => {
  sessionStorage.setItem('user_role', userData.role)
  sessionStorage.setItem('user_id', userData.id)
  sessionStorage.setItem('user_name', userData.name)
  sessionStorage.setItem('user_unit', userData.unit)
  sessionStorage.setItem('user_unit_short', userData.unit_short)
}

export const getUserInfo = ({ userType, userData }) => {
  sessionStorage.getItem('user_type', userType) ?? ''
  sessionStorage.getItem('user_id', userData.id)
  sessionStorage.getItem('user_name', userData.name)
  sessionStorage.getItem('user_unit', userData.unit)
  sessionStorage.getItem('user_unit_short', userData.unit_short)
}

// 沒有remove的話登入其他帳號時可能會出錯
