import AV from 'leancloud-storage'
import { getCurrentUser } from './user'
import config from '../../config'

let members = [
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  },
  {
    avatar: config.TEAM_DEFAULT_AVATAR,
    nickname: '暂无',
    leader: false
  }
]

// 创建战队
export function cerateTeam(payload) {
  const teams = new AV.Object('Teams')
  for (let key of Object.keys(payload)) {
    teams.set(key, payload[key])
  }

  if (!payload['avatar']) {
    teams.set('avatar', config.BASE_PIC_URL + '/logo.png')
  }

  const user = getCurrentUser()

  const userTeamMap = new AV.Object('UserTeamMap')
  userTeamMap.set('user', user)
  userTeamMap.set('team', teams)
  userTeamMap.set('leader', true)

  var acl = new AV.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(AV.User.current(), true)

  userTeamMap.setACL(acl)

  return userTeamMap.save().then(function(result) {
    const user = getCurrentUser()
    user.equalTo('objectId', user.id)
    user.include('userinfo')
    return user.first().then(function(result) {
      const userinfo = result.get('userinfo')
      const r = members.splice(0, 1, {
        objectId: user.id,
        avatar: userinfo.get('avatar'),
        nickname: userinfo.get('nickname'),
        leader: true
      })
      return { ...result.get('team').toJSON(), members: r }
    })
  })
}

// 更新战队
export function updateTeams(payload) {
  const team = AV.Object.createWithoutData('Teams', payload.objectId)
  for (let key of Object.keys(payload)) {
    if (key !== 'objectId') {
      team.set(key, payload[key])
    }
  }
  if (!payload['avatar']) {
    team.set('avatar', config.BASE_DEFAULT_PIC_URL)
  }
  return team.save().then(function(result) {
    return result.toJSON()
  })
}

// 获取我的战队
export function getMyTeams() {
  const user = getCurrentUser()
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('leader', true)
  query.descending('createdAt')
  query.include('team')
  query.include('user')
  query.include('user.userinfo')
  return query.find().then(function(UserTeamMap) {
    const teams = []
    UserTeamMap.forEach(function(item, i, a) {
      let teaminfo = item.get('team').toJSON()
      teaminfo = { ...teaminfo, members: members }
      const userid = item.get('user').id
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const result = {
        ...userinfo,
        userid: userid,
        leader: item.get('leader')
      }
      teaminfo.members.splice(i, 1, result)
      teams.push(teaminfo)
    })
    return teams
  })
}

// 获取我所在战队
export function getInTeams() {
  const user = getCurrentUser()
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('leader', false)
  query.descending('createdAt')
  query.include('team')
  query.include('user')
  query.include('user.userinfo')
  return query.find().then(function(UserTeamMap) {
    const teams = []
    UserTeamMap.forEach(function(item, i, a) {
      let teaminfo = item.get('team').toJSON()
      teaminfo = { ...teaminfo, members: members }
      const userid = item.get('user').id
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const result = {
        ...userinfo,
        userid: userid,
        leader: item.get('leader')
      }
      teaminfo.members.splice(i, 1, result)
      teams.push(teaminfo)
    })
    return teams
  })
}

// 移除队员
export function removeMember(payload) {
  const { teamid, memberid } = payload
  // 当前登录用户
  const currentUser = AV.User.current()
  const user = AV.Object.createWithoutData('_User', currentUser.id)
  const team = AV.Object.createWithoutData('Teams', teamid)
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('team', team)
  query.include('user')
  return query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(scm, i, a) {
      if (scm.get('leader')) {
        if (scm.get('user').id === memberid) {
          return AV.Query.doCloudQuery(
            `delete from UserTeamMap where user=${memberid} && team=${teamid}`
          ).then(function(result) {
            return result.toJSON()
          })
        } else {
          throw new Error('该队员不在该战队中，无法移除')
        }
      } else {
        throw new Error('您不是战队管理者，无法执行该操作')
      }
    })
  })
}

// 解散战队
export function removeTeam(payload) {
  const { teamid } = payload
  const currentUser = AV.User.current()
  const user = AV.Object.createWithoutData('_User', currentUser.id)
  const team = AV.Object.createWithoutData('Teams', teamid)
  const query = new AV.Query('UserTeamMap')
  query.equalTo('user', user)
  query.equalTo('team', team)
  return query.first().then(function(UserTeamMap) {
    if (UserTeamMap.get('leader')) {
      const cql = 'delete from UserTeamMap where objectId=?'
      const pvalues = [UserTeamMap.id]
      return AV.Query.doCloudQuery(cql, pvalues).then(function(result) {
        return { objectId: pvalues }
      })
    } else {
      throw new Error('您不是战队管理者，无法执行该操作')
    }
  })
}

// 获取战队列表
export function getHomeTeamsList(payload) {
  let list = []
  let { page, pagesize } = payload
  pagesize = pagesize || 20
  const teams = new AV.Query('Teams')
  teams.limit(pagesize)
  teams.skip(pagesize * (page - 1))
  return teams.find().then(function(result) {
    result.forEach(item => {
      list.push(item.toJSON())
    })
    return list
  })
}

// 获取战队信息
export function getHomeTeamDetail(payload) {
  const { objectId } = payload
  const team = AV.Object.createWithoutData('Teams', objectId)

  // 构建 UserTeamMap 的查询
  const query = new AV.Query('UserTeamMap')
  query.equalTo('team', team)
  query.descending('createdAt')
  query.include('team')
  query.include('user')
  query.include('user.userinfo')
  // 获取当前用户所在的所有战队
  return query.find().then(function(UserTeamMap) {
    // 获取战队
    let teaminfo = UserTeamMap[0].get('team').toJSON()
    teaminfo = { ...teaminfo, members: members }
    UserTeamMap.forEach(function(item, i, a) {
      const userid = item.get('user').id
      const userinfo = item
        .get('user')
        .get('userinfo')
        .toJSON()
      const result = { ...userinfo, userid: userid, leader: item.get('leader') }
      teaminfo.members.splice(i, 1, result)
    })
    return teaminfo
  })
}
