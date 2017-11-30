import * as http from '../../utils/http'
import * as api from '../../api'

// 获取评论
export function getComments(payload) {
  const params = {
    parent: 0,
    per_page: 10,
    orderby: 'date',
    order: 'desc',
    post: 1,
    page: 1,
    ...payload
  }
  return http.get(api.COMMENTS, { params: params })
}