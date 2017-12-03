import AV from 'leancloud-storage'
import { getCurrentUser } from './user'

// 创建战队
export function cerateTeam(payload) {
  const teams = new AV.Object('Teams')
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      teams.set(key, payload[key])
    }
  }

  const user = getCurrentUser()

  const userTeamMap = new AV.Object('UserTeamMap')
  userTeamMap.set('user', user)
  userTeamMap.set('team', teams)
  userTeamMap.set('leader', true)

  return userTeamMap.save()
}

// 根据个人获取战队
export function getTeamsByUser(payload) {
  // 当前用户
  const user = getCurrentUser()

  // 构建 UserTeamMap 的查询
  var query = new AV.Query('UserTeamMap')

  // 查询所有选择了当前用户的战队
  query.equalTo('user', user)

  query.include('user')
  query.include('team')

  // 执行查询
  query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(scm, i, a) {
      console.log(scm)
      console.log(scm.get('team'))
      const team = scm.get('team')
      var query2 = new AV.Query('UserTeamMap')
      query2.equalTo('team', team)
      query2.include('user')
      query2.include('team')
      query.find().then(function(UserTeamMap2) {
        UserTeamMap2.forEach(function(scm, i, a) {
          console.log(scm)
        })
      })
      console.log(scm.get('user'))
      console.log(scm.get('leader'))
    })
  })
}
