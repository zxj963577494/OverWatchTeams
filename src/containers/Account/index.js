import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Result, WhiteSpace, Flex, Button, List, WingBlank } from 'antd-mobile'
import { push } from 'react-router-redux'
import { postLogoutRequest, setNavBar } from '../../actions'
import { user } from '../../services/leanclound'

class Account extends Component {
  componentDidMount() {}

  render() {
    const logined = user.getCurrentUser()
    const { postLogout, navigateTo } = this.props
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
                  ? require('../../assets/images/logo-80.png')
                  : require('../../assets/images/logo-80.png')
              }
              onClick={() => navigateTo('/login')}
              alt="登录成功"
            />
          }
          title={logined ? '登录/注册' : ''}
          message={logined ? '' : ''}
        />
        <WhiteSpace />
        <List>
          <List.Item arrow="horizontal" onClick={() => navigateTo('/account/mime')}>
            个人介绍
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>
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
    user: state.root.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postLogout: () => {
      dispatch(postLogoutRequest())
    },
    navigateTo: location => {
      dispatch(push(location))
    },
    setNavBar: () => {
      dispatch(setNavBar({ title: '登录', isCanBack: true }))
    }
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
