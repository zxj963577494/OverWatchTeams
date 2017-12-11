import AV from 'leancloud-storage'
import { getCurrentUser } from './user'

// 创建招募令
export function cerateRecruitOrder(payload) {
  const user = getCurrentUser()
  const team = AV.Object.createWithoutData('Teams', payload.teamid)
  const recruitOrders = new AV.Object('RecruitOrders')
  recruitOrders.set('title', payload.title)
  recruitOrders.set('description', payload.description)
  recruitOrders.set('contact', payload.contact)
  recruitOrders.set('stick', 0)
  const endDate = new Date(payload.endDate)
  recruitOrders.set('endDate', endDate)
  recruitOrders.set('user', user)
  recruitOrders.set('team', team)

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(user, true)

  recruitOrders.setACL(acl)

  return recruitOrders.save().then(function(result) {
    return result.toJSON()
  })
}

export function updateRecruitOrder(payload, team) {
  const user = getCurrentUser()
  const recruitOrders = AV.Object.createWithoutData(
    'RecruitOrders',
    payload.objectId
  )
  recruitOrders.set('title', payload.title)
  recruitOrders.set('description', payload.description)
  recruitOrders.set('contact', payload.contact)
  const endDate = new Date(payload.endDate)
  recruitOrders.set('endDate', endDate)
  recruitOrders.set('user', user)
  recruitOrders.set('team', team)

  return recruitOrders.save().then(function(result) {
    return {
      ...result.toJSON(),
      team: team.toJSON()
    }
  })
}

export function removeRecruitOrder(payload) {
  var recruitOrders = AV.Object.createWithoutData('RecruitOrders', payload.objectId)
  return recruitOrders.destroy().then(function(success) {
    return success.toJSON()
  })
}

export function getAccountRecruitOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const user = getCurrentUser()
  const query = new AV.Query('RecruitOrders')
  query.descending('updatedAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.equalTo('user', user)
  query.greaterThanOrEqualTo('endDate', new Date())
  query.include('user')
  query.include('user.userinfo')
  query.include('team')
  return query.find().then(function(result) {
    result.forEach(item => {
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const team = item.get('team').toJSON()
      const res = { ...item.toJSON(), userinfo, team }
      list.push(res)
    })
    return list
  })
}

export function getHomeRecruitOrderList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const query = new AV.Query('RecruitOrders')
  query.descending('stick')
  query.descending('createdAt')
  query.limit(pagesize)
  query.skip(pagesize * (page - 1))
  query.greaterThanOrEqualTo('endDate', new Date())
  query.include('user')
  query.include('user.userinfo')
  query.include('team')
  return query.find().then(function(result) {
    result.forEach(item => {
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const team = item.get('team').toJSON()
      const res = { ...item.toJSON(), userinfo, team }
      list.push(res)
    })
    return list
  })
}
