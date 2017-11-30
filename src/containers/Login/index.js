import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { Button, InputItem, WhiteSpace, Flex } from 'antd-mobile'
import Cookies from 'universal-cookie'
import { replace } from 'react-router-redux'
import { postLoginRequest } from '../../actions'
import { MyActivityIndicator } from '../../components'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.login.username,
      password: props.login.password
    }
    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onBackHome = this.onBackHome.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onUserNameChange(value) {
    this.setState({
      username: value
    })
  }

  onPasswordChange(value) {
    this.setState({
      password: value
    })
  }

  onSubmit = () => {
    this.props.postLogin({
      username: this.state.username,
      password: this.state.password
    })
  }

  onBackHome() {
    this.props.navigateTo('/home')
  }

  componentDidMount() {
    const cookies = new Cookies()
    if (cookies.get('token') && this.props.login.isLogin) {
      this.props.navigateTo('/account')
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const usernameErrors = getFieldError('username')
    const passwordErrors = getFieldError('password')
    return (
      <div className="page__content">
        <WhiteSpace />
        <form>
          <MyActivityIndicator isFetching={this.props.login.isFetching} />
          <InputItem
            {...getFieldProps('username', {
              onChange: this.onUserNameChange,
              validateFirst: true,
              rules: [
                { type: 'string', required: true, message: '用户名不能为空' }
              ]
            })}
            placeholder="请输入用户名"
            value={this.state.username}
          >
            用户名
          </InputItem>
          <Flex className="error">
            {usernameErrors ? usernameErrors.join(',') : null}
          </Flex>
          <InputItem
            type="password"
            {...getFieldProps('password', {
              onChange: this.onPasswordChange,
              validateFirst: true,
              rules: [
                { type: 'string', required: true, message: '密码不能为空' }
              ]
            })}
            placeholder="请输入密码"
            value={this.state.password}
          >
            密码
          </InputItem>
          <Flex className="error">
            {passwordErrors ? passwordErrors.join(',') : null}
          </Flex>
          <WhiteSpace />
          <WhiteSpace />
          <Flex>
            <Flex.Item />
            <Flex.Item>
              <Button onClick={this.onBackHome} type="warning">
                回到首页
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button onClick={this.onSubmit} type="primary">
                登录
              </Button>
            </Flex.Item>
            <Flex.Item />
          </Flex>
        </form>
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
    postLogin: payload => {
      dispatch(postLoginRequest(payload))
    },
    navigateTo: location => {
      dispatch(replace(location))
    }
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  postLogin: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Login))
