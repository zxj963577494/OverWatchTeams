import AV from 'leancloud-storage'

// 发送验证码
export function requestSmsCode(payload) {
  const { phone } = payload
  return AV.Cloud.requestSmsCode(phone)
}

// 验证邮箱
export function requestEmailVerify(payload) {
  const { email } = payload
  return AV.User.requestEmailVerify(email)
}
