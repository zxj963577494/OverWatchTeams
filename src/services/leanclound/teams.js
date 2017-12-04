import AV from 'leancloud-storage'
import { getCurrentUser } from './user'
import config from '../../config'

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
    team.set('avatar', config.BASE_PIC_URL + '/logo.png')
  }
  return team.save()
}

// 根据个人获取战队
export function getTeamsByUser() {
  // 当前用户
  const user = getCurrentUser()

  // 构建 UserTeamMap 的查询
  const query = new AV.Query('UserTeamMap')

  // 查询所有选择了当前用户的战队
  query.equalTo('user', user)

  query.include('team')

  let result = []

  // 获取当前用户所在的所有战队
  return query.find().then(function(UserTeamMap) {
    UserTeamMap.forEach(function(item, i, a) {
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
        const leader = item.get('leader')
        const obj = {
          objectId,
          avatar,
          nickname,
          position,
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

// // 根据个人获取战队
// export function getTeamsByUser() {
//   // 当前用户
//   const user = getCurrentUser()

//   // 构建 UserTeamMap 的查询
//   const query = new AV.Query('UserTeamMap')

//   // 查询所有选择了当前用户的战队
//   query.equalTo('user', user)

//   query.include('team')

//   let result = []

//   // 获取当前用户所在的所有战队
//   query.find().then(function(UserTeamMap) {
//     UserTeamMap.forEach(function(scm, i, a) {
//       let members = [
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         },
//         {
//           avator: config.TEAM_DEFAULT_AVATAR,
//           nickname: '暂无',
//           leader: false,
//           position: ''
//         }
//       ]
//       const team = scm.get('team')
//       let o = {
//         objectId: team.id,
//         avatar: team.get('avatar'),
//         chineseFullName: team.get('chineseFullName'),
//         chineseName: team.get('chineseName'),
//         englishFullName: team.get('englishFullName'),
//         englishName: team.get('englishName'),
//         isRecruit: team.get('isRecruit'),
//         createDate: team.get('createDate'),
//         members: members
//       }
//       result.push(o)

//       const query = new AV.Query('UserTeamMap')

//       query.equalTo('team', team)

//       query.include('user')
//       query.include('team')

//       // 获取战队的所有成员
//       return query.find().then(function(UserTeamMap) {
//         UserTeamMap.forEach(function(scmscm, ii, aa) {
//           const user = scmscm.get('user')
//           var user1 = AV.Object.createWithoutData('_User', user.id)
//           user1
//             .fetch({
//               include: ['userinfo']
//             })
//             .then(function(user) {
//               const userinfo = user.get('userinfo')
//               result[i].members[ii].avatar = userinfo.get('avatar')
//               result[i].members[ii].nickname = userinfo.get('nickname')
//               result[i].members[ii].position = userinfo.get('position')
//               result[i].members[ii].leader = scmscm.get('leader')
//             })
//         })
//       })
//     })
//   })
// }
