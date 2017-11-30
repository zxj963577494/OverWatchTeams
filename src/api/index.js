import config from '../config'

const BASE_URL = config.BASE_URL
const BASE_URL_JWT = config.BASE_URL_JWT
const BASE_URL_CUSTOM = config.BASE_URL_CUSTOM
// 文章
export const POSTS = BASE_URL + '/posts'
// 图片
export const PICTURE = BASE_URL + '/picture'
// 类别
export const CATEGORIES = BASE_URL + '/categories'
// 标签
export const TAGS = BASE_URL + '/tags'
// 评论
export const COMMENTS = BASE_URL + '/comments'
// 用户
export const USERS = BASE_URL + '/users'
// 设置
export const SETTINGS = BASE_URL + '/settings'
// 登录
export const LOGIN = BASE_URL_JWT + '/token'
// 一周热点文章
export const HOTWEEK = BASE_URL_CUSTOM + '/hotpostthisweek'
// 一月热点文章
export const HOTMONTH = BASE_URL_CUSTOM + '/hotpostthismonth'
// 全部热点文章
export const HOT = BASE_URL_CUSTOM + '/hotpost'
// 更新文章浏览数
export const VIEW = BASE_URL_CUSTOM + '/addpageview'
// 点赞
export const LIKE = BASE_URL_CUSTOM + '/like'
// 是否已点赞
export const ISLIKE = BASE_URL_CUSTOM + '/islike'
