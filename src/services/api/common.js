import * as http from '../../utils/http'
import * as api from '../../api'

// 增加浏览量
export function postViewCount(payload) {
  return http.get(api.VIEW + '/' + payload.id, {params:{}})
}
