import * as http from '../../utils/http'
import * as api from '../../api'

// 获取段子列表
export function getJokes(payload) {
  const params = {
    categories: 2,
    per_page: 10,
    page: 1,
    orderby: 'date',
    order: 'desc',
    ...payload
  }
  return http.get(api.POSTS, { params: params })
}