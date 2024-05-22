const reg_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
const reg_url = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
// const reg_ip =
//   /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const reg_html_tag = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/
const reg_1to4 = /^[1-4]$/

export default { reg_email, reg_url, reg_html_tag, reg_1to4 }
