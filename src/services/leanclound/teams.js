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
export function getTeamsByUser() {
  // 当前用户
  const user = getCurrentUser()

  // 构建 UserTeamMap 的查询
  var query = new AV.Query('UserTeamMap')

  // 查询所有选择了当前用户的战队
  query.equalTo('user', user)

  query.include('user')
  query.include('team')

  // 执行查询
  return query.find().then(function(UserTeamMap) {
    let result = []
    UserTeamMap.forEach(function(scm, i, a) {
      const team = scm.get('team')
      let o = {
        objectId: team.id,
        avatar: team.get('avatar'),
        chineseFullName: team.get('chineseFullName'),
        chineseName: team.get('chineseName'),
        englishFullName: team.get('englishFullName'),
        englishName: team.get('englishName'),
        isRecruit: team.get('isRecruit'),
        createDate: team.get('createDate'),
      }
      result.push(o)
    })
    return result
  })
}
