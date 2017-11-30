import * as http from '../../utils/http'
import * as api from '../../api'

// 获取详细
export function getDetail(payload) {
  const params = {
    include: 1,
    ...payload
  }
  if (payload.t) {
    return http.get(api.PICTURE, { params: params })
  } else {
    return http.get(api.POSTS, { params: params })
  }
}
