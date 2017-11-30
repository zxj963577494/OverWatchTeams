import * as http from '../../utils/http'
import * as api from '../../api'

// 登录
export function postLogin(payload) {
  const data = {
    username: payload.username,
    password: payload.password
  }
  return http.post(api.LOGIN, { data: data })
}
