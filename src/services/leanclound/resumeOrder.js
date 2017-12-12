import AV from 'leancloud-storage'
import { getCurrentUser } from './user'

// 创建战队自荐帖
export function cerateResumeOrder(payload) {
  const user = getCurrentUser()
  const resumeOrders = new AV.Object('ResumeOrders')
  resumeOrders.set('title', payload.title)
  resumeOrders.set('description', payload.description)
  resumeOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  resumeOrders.set('endDate', endDate)
  resumeOrders.set('user', user)
  resumeOrders.set('stick', 0)
  resumeOrders.set('show', 1)
  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(user, true)

  resumeOrders.setACL(acl)

  return resumeOrders.save().then(function(result) {
    return result.toJSON()
  })
}

export function updateResumeOrder(payload) {
  const user = getCurrentUser()
  const recruitOrders = AV.Object.createWithoutData(
    'ResumeOrders',
    payload.objectId
  )
  recruitOrders.set('title', payload.title)
  recruitOrders.set('description', payload.description)
  recruitOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  recruitOrders.set('endDate', endDate)
  recruitOrders.set('user', user)

  return recruitOrders.save().then(function(result) {
    return {
      ...result.toJSON()
    }
  })
}

export function removeResumeOrder(payload) {
  var recruitOrders = AV.Object.createWithoutData('ResumeOrders', payload.objectId)
  return recruitOrders.destroy().then(function(success) {
    return success.toJSON()
  })
}

export function getAccountResumeOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const user = getCurrentUser()
  const query = new AV.Query('ResumeOrders')
  query.descending('updatedAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.equalTo('user', user)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.include('user')
  query.include('user.userinfo')
  return query.find().then(function(result) {
    result.forEach(item => {
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const res = { ...item.toJSON(), userinfo }
      list.push(res)
    })
    return list
  })
}

export function getHomeResumeOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('ResumeOrders')
  query.equalTo('show', 1)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.descending('stick')
  query.descending('createdAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.include('user')
  query.include('user.userinfo')
  query.include('team')
  return query.find().then(function(result) {
    result.forEach(item => {
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const res = { ...item.toJSON(), userinfo }
      list.push(res)
    })
    return list
  })
}
