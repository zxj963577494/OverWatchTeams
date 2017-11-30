import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Result, WhiteSpace, Flex, Button } from 'antd-mobile'
import Cookies from 'universal-cookie'
import { replace } from 'react-router-redux'
import { postLogoutRequest } from '../../actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.onBackHome = this.onBackHome.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onBackHome() {
    this.props.navigateTo('/home')
  }

  onLogout() {
    this.props.postLogout()
  }

  componentDidMount() {
    const cookies = new Cookies()
    if (!(cookies.get('token') && this.props.login.isLogin)) {
      this.props.navigateTo('/login')
    }
  }

  render() {
    return (
      <div className="page__content">
        <Result
          img={
            <img
              width="60px"
              height="60px"
              style={{ borderRadius: '50%' }}
              src={require('../../assets/images/logo-80.png')}
              alt="登录成功"
            />
          }
          title="登录成功"
          message={this.props.username}
        />
        <WhiteSpace />
        <WhiteSpace />
        <Flex>
          <Flex.Item />
          <Flex.Item>
            <Button onClick={this.onBackHome} type="primary">
              回到首页
            </Button>
          </Flex.Item>
          <Flex.Item>
            <Button onClick={this.onLogout} type="warning">
              退出登录
            </Button>
          </Flex.Item>
          <Flex.Item />
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.root.login
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postLogout: () => {
      dispatch(postLogoutRequest())
    },
    navigateTo: location => {
      dispatch(replace(location))
    }
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
