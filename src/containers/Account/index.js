import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Result,
  WhiteSpace,
  Flex,
  Button,
  List,
  WingBlank,
  Toast,
  Modal
} from 'antd-mobile'
import { push } from 'react-router-redux'
import _ from 'lodash'
import {
  postLogoutRequest,
  setNavBar,
  getUserInfoRequest,
  sendPasswordResetRequest
} from '../../actions'
import config from '../../config'
import { userService } from '../../services/leanclound'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logined: false
    }
  }

  componentDidMount() {
    // if (_.isEmpty(this.props.account.user)) {
    //   this.setState({
    //     logined: true
    //   })
    // }
    this.props.setNavBar({ title: '个人中心', isCanBack: false })
    const users = userService.getCurrentUser()
    if (!_.isEmpty(users)) {
      this.setState({
        logined: true
      })
    }
    if (!this.props.account.userinfo.isLoaded) {
      this.props.getUserInfo()
    }
  }

  render() {
    const { logined } = this.state
    const { postLogout, navigateTo, userinfo } = this.props
    return (
      <div>
        <WhiteSpace />
        <Result
          img={
            <img
              width="60px"
              height="60px"
              style={{ borderRadius: '50%' }}
              src={
                logined
                  ? userinfo.avatar
                    ? userinfo.avatar
                    : config.BASE_DEFAULT_PIC_URL
                  : config.BASE_DEFAULT_PIC_URL
              }
              onClick={() => (logined ? null : navigateTo('/login'))}
              alt="登录成功"
            />
          }
          title={
            logined
              ? userinfo.nickname ? userinfo.nickname : '昵称'
              : '登录/注册'
          }
          message={
            logined
              ? userinfo.introduction ? userinfo.introduction : '个人介绍'
              : ''
          }
        />
        <WhiteSpace />
        <List renderHeader={() => '个人'}>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/mime')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            个人简介
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/emailverify')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            验证邮箱
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                Modal.alert('提示', '是否重置密码？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  {
                    text: '确定',
                    onPress: () => {
                      const isVerify = _.isEmpty(this.props.user)
                        ? userService.getCurrentUser().get('emailVerified')
                        : this.props.user.emailVerified
                      if (isVerify) {
                        const email = _.isEmpty(this.props.user)
                          ? userService.getCurrentUser().get('email')
                          : this.props.user.email
                        this.props.sendPasswordReset({ email: email })
                      } else {
                        Toast.info('邮箱未验证，无法重置密码', 1.5)
                      }
                    }
                  }
                ])
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            重置密码
          </List.Item>
        </List>
        <List renderHeader={() => '战队'}>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/myteams')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            我的战队
          </List.Item>
          {/* <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/inteams')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            所在战队
          </List.Item> */}
        </List>
        <List renderHeader={() => '寻找战队'}>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/resumeorders/create')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            发布自荐帖
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/resumeorders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            我的自荐帖
          </List.Item>
        </List>
        <List renderHeader={() => '战队招募'}>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/recruitorders/create')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            发布招募令
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/recruitorders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            我的招募令
          </List.Item>
        </List>
        <List renderHeader={() => '决战紫禁之巅'}>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/warorders/create')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            发布约战帖
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/warorders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            我的约战帖
          </List.Item>
        </List>
        <List renderHeader={() => '组队上分'}>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/grouporders/create')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            发布组队帖
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              if (logined) {
                navigateTo('/account/grouporders')
              } else {
                Toast.info('请先登录', 1)
              }
            }}
          >
            我的组队帖
          </List.Item>
        </List>
        <List renderHeader={() => '关于'}>
          <List.Item
            arrow="horizontal"
            extra="OverWatchTeams"
            onClick={() => {
              window.location.href =
                'https://github.com/zxj963577494/OverWatchTeams'
            }}
          >
            项目地址
          </List.Item>
          <List.Item
            arrow="horizontal"
            extra="zxj963577494"
            onClick={() => {
              window.location.href =
                'https://github.com/zxj963577494'
            }}
          >
            作者主页
          </List.Item>
          <List.Item arrow="horizontal" extra="963577494@qq.com">
            联系作者
          </List.Item>
        </List>
        <WhiteSpace />
        {logined ? (
          <WingBlank>
            <Flex>
              <Flex.Item>
                <Button onClick={() => postLogout()} type="warning">
                  注 销
                </Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.root.user.account,
    userinfo: state.root.user.account.userinfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfoRequest())
    },
    sendPasswordReset: payload => {
      dispatch(sendPasswordResetRequest(payload))
    },
    postLogout: () => {
      dispatch(postLogoutRequest())
    },
    navigateTo: location => {
      dispatch(push(location))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

Account.propTypes = {
  account: PropTypes.object.isRequired,
  userinfo: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
