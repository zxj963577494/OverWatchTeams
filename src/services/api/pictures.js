import * as http from '../../utils/http'
import * as api from '../../api'

// 获取图片列表
export function getPictures(payload) {
  const params = {
    per_page: 10,
    page: 1,
    orderby: 'date',
    order: 'desc',
    ...payload
  }
  return http.get(api.PICTURE, { params: params })
}