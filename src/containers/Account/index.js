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
  Toast
} from 'antd-mobile'
import { push } from 'react-router-redux'
import _ from 'lodash'
import { postLogoutRequest, setNavBar, getUserInfoRequest } from '../../actions'
import config from '../../config'
import { user } from '../../services/leanclound'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logined: false
    }
  }

  componentDidMount() {
    this.props.setNavBar({ title: '个人中心', isCanBack: false })
    // if (_.isEmpty(this.props.account.user)) {
    //   this.setState({
    //     logined: true
    //   })
    // }
    const users = user.getCurrentUser()
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
              onClick={() => navigateTo('/login')}
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
          <List.Item
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
          </List.Item>
        </List>
        <List renderHeader={() => '战队招募令'}>
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
        <List renderHeader={() => '约战紫禁之巅'}>
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
            发布约战贴
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
            我的约战贴
          </List.Item>
        </List>
        <List renderHeader={() => '组队上分帖'}>
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
