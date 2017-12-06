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

  return userTeamMap.save()
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
  return team.save()
}

// 根据个人获取战队
export function getTeamsByUser(payload) {
  // 当前用户
  const user = getCurrentUser()

  // 构建 UserTeamMap 的查询
  const query = new AV.Query('UserTeamMap')

  // 查询所有选择了当前用户的战队
  query.equalTo('user', user)

  // 是否是战队创建者
  // if (payload.t === 1) {
  //   query.equalTo('leader', true)
  // }
  query.descending('createdAt')
  query.include('team')

  let result = []

  // 获取当前用户所在的所有战队
  return query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(item, i, a) {
      const team = item.get('team')
      let o = {
        objectId: team.id,
        avatar: team.get('avatar'),
        chineseFullName: team.get('chineseFullName'),
        chineseName: team.get('chineseName'),
        englishFullName: team.get('englishFullName'),
        englishName: team.get('englishName'),
        isRecruit: team.get('isRecruit'),
        createDate: team.get('createDate'),
        slogan: team.get('slogan'),
        introduction: team.get('introduction'),
        rank: team.get('rank'),
        createCity: team.get('createCity'),
        contact: team.get('contact'),
        honor: team.get('honor'),
        match: team.get('match'),
        members: members
      }
      result.push(o)
    })
    return result
  })
}

// 根据战队获取成员
export function getUsersByTeam(payload) {
  const teams = []
  const promises = []
  payload.forEach(function(item) {
    promises.push(getTeams(item))
  })
  return Promise.all(promises)
    .then(function(data, error) {
      teams.push(data)
    })
    .then(function() {
      return teams
    })
}

function getUserInfo(id, item) {
  return new Promise(function(resolve) {
    const user = AV.Object.createWithoutData('_User', id)
    user
      .fetch({
        include: ['userinfo']
      })
      .then(function(data) {
        const objectId = id
        const userinfo = data.get('userinfo')
        const avatar = userinfo.get('avatar')
        const nickname = userinfo.get('nickname')
        const position = userinfo.get('position')
        const contact = userinfo.get('contact')
        const heros = userinfo.get('heros')
        const introduction = userinfo.get('introduction')
        const match = userinfo.get('match')
        const rank = userinfo.get('rank')
        const leader = item.get('leader')
        const obj = {
          objectId,
          avatar,
          nickname,
          position,
          contact,
          heros,
          introduction,
          match,
          rank,
          leader
        }
        resolve(obj)
      })
  })
}

function getTeams(payload) {
  return new Promise(function(resolve) {
    const query = new AV.Query('UserTeamMap')
    const team = AV.Object.createWithoutData('Teams', payload.objectId)
    query.equalTo('team', team)
    query.include('user')
    query.find().then(function(UserTeamMap) {
      const promises = []

      UserTeamMap.forEach(function(item, ii, aa) {
        const user = item.get('user')
        promises.push(getUserInfo(user.id, item))
      })

      Promise.all(promises)
        .then(function(data, error) {
          for (let i = 0; i < data.length; i++) {
            payload.members.splice(i, 1, data[i])
          }
        })
        .then(function() {
          resolve(payload)
        })
    })
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
          )
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
  return query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(scm, i, a) {
      if (scm.get('leader')) {
        return AV.Query.doCloudQuery(
          `delete from UserTeamMap where team=${teamid}`
        )
      } else {
        throw new Error('您不是战队管理者，无法执行该操作')
      }
    })
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
