import AV from 'leancloud-storage'
import { getAvatar, getNickName } from '../../utils/utils'

// 用户名和密码注册
export function signUp(payload) {
  const { username, password, email } = payload
  const avatar = getAvatar()
  const nickname = getNickName()
  const user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  return user.signUp().then(function(loginedUser) {
    if (!loginedUser.get('userinfo')) {
      const Userinfo = AV.Object.extend('UserInfo')
      const userinfo = new Userinfo()
      userinfo.set('nickname', nickname)
      userinfo.set('contact', email)
      userinfo.set('avatar', avatar)
      userinfo.set('avatar', avatar)
      userinfo.set('isPublic', true)
      userinfo.set('introduction', '这个世界需要更多的英雄')
      loginedUser.set('userinfo', userinfo)
      return loginedUser.save()
    }
  })
}

// 手机号码注册
export function signUpBySmsCode(payload) {
  const { phone, code } = payload
  return AV.User.signUpOrlogInWithMobilePhone(phone, code)
}

// 第三方账号登录
export function signUpOrlogInWithAuthData(payload) {}

// 用户名和密码登录
export function logIn(payload) {
  const { username, password } = payload
  return AV.User.logIn(username, password)
}

// 手机号和密码登录
export function logInWithMobilePhone(payload) {
  const { phone, password } = payload
  return AV.User.logInWithMobilePhone(phone, password)
}

// 手机号和验证码登录
export function requestLoginSmsCode(payload) {
  const { phone, code } = payload
  return AV.User.logInWithMobilePhoneSmsCode(phone, code)
}

// 当前用户
export function getCurrentUser() {
  return AV.User.current()
}

// 验证 SessionToken 是否在有效期内
export function isAuthenticated() {
  var currentUser = AV.User.current()
  return currentUser.isAuthenticated()
}

// 使用 SessionToken 登录
// 登录后可以调用 user.getSessionToken() 方法得到当前登录用户的 sessionToken
export function logInWithSessionToken(payload) {
  const { sessionToken } = payload
  return AV.User.become(sessionToken)
}

// 邮箱重置密码
export function requestPasswordReset(payload) {
  const { email } = payload
  return AV.User.requestPasswordReset(email)
}

// 手机号码重置密码, 发送验证码
export function requestPasswordResetBySmsCode(payload) {
  const { phone } = payload
  return AV.User.requestPasswordResetBySmsCode(phone)
}

// 手机号码重置密码
export function resetPasswordBySmsCode(payload) {
  const { code, password } = payload
  return AV.User.resetPasswordBySmsCode(code, password)
}

// 登出
export function logOut() {
  return AV.User.logOut()
  // 现在的 currentUser 是 null 了
  // var currentUser = AV.User.current()
}

export function putUserInfo(payload) {
  const userinfo = AV.Object.createWithoutData('UserInfo', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      userinfo.set(key, payload[key])
    }
  }
  return userinfo.save()
}

export function getUserInfo() {
  const current = AV.User.current()
  const user = new AV.Query('_User')
  user.equalTo('objectId', current.id)
  user.include('userinfo')
  return user.first().then(function(result) {
    const userinfo = result.get('userinfo')
    return userinfo.toJSON()
  })
}

// 获取会员信息列表
export function getHomeMemberList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const userinfo = new AV.Query('UserInfo')
  userinfo.equalTo('isPublic', true)
  const user = new AV.Query('_User')
  user.limit(pagesize)
  user.skip(pagesize * (page - 1))
  user.include('userinfo')
  user.matchesQuery('userinfo', userinfo)
  return user.find().then(function(result) {
    result.forEach(item => {
      const userinfo = { ...item.get('userinfo').toJSON(), userid: item.id }
      list.push(userinfo)
    })
    return list
  })
}

// 获取会员详细信息
export function getHomeMemberDetail(payload) {
  const { objectId } = payload
  const user = new AV.Query('_User')
  user.equalTo('objectId', objectId)
  user.include('userinfo')
  return user.first().then(function(result) {
    const userinfo = result.get('userinfo')
    return userinfo.toJSON()
  })
}
