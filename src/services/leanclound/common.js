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

// 上传图片
export function uploadPic(payload) {
  const { base64, name } = payload
  const data = { base64: base64 }
  const file = new AV.File(name, data)
  return file.save()
}
