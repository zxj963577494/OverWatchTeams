import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Result, WhiteSpace, Flex, Button, List, WingBlank } from 'antd-mobile'
import { push } from 'react-router-redux'
import { postLogoutRequest, setNavBar, getUserInfoRequest } from '../../actions'
import { user } from '../../services/leanclound'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logined: null
    }
  }

  componentDidMount() {
    const users = user.getCurrentUser()
    this.props.setNavBar({ title: '个人中心', isCanBack: false })
    if (users) {
      this.props.getUserInfo()
      this.setState({
        logined: users
      })
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
                    : require('../../assets/images/logo-80.png')
                  : require('../../assets/images/logo-80.png')
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
        <List>
          <List.Item
            arrow="horizontal"
            onClick={() => navigateTo('/account/mime')}
          >
            个人简介
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => navigateTo('/account/teams')}
          >
            我的战队
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
    user: state.root.user,
    userinfo: state.root.userinfo
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
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
