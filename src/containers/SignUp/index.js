import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  NavBar,
  Icon
} from 'antd-mobile'
import { goBack } from 'react-router-redux'
import { postSignUpRequest } from '../../actions'
import { MyActivityIndicator } from '../../components'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
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

  onEmailChange(value) {
    this.setState({
      email: value
    })
  }

  onSubmit = () => {
    this.props.postSignUp({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
  }

  componentDidMount() {}

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app, user_home, goBack } = this.props
    const usernameErrors = getFieldError('username')
    const passwordErrors = getFieldError('password')
    const emailErrors = getFieldError('email')
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => goBack()}
          mode="light"
        >
          登录
        </NavBar>
        <WhiteSpace />
        <form>
          <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
          <InputItem
            {...getFieldProps('username', {
              onChange: this.onUserNameChange,
              rules: [
                {
                  type: 'string',
                  required: true,
                  pattern: /\w{5,25}$/,
                  message: '6-25个字符'
                }
              ]
            })}
            placeholder="请输入用户名"
            value={this.state.username}
          >
            用户名
          </InputItem>
          <Flex className="error">
            <Flex.Item>
              {usernameErrors ? usernameErrors.join(',') : null}
            </Flex.Item>
          </Flex>
          <InputItem
            type="password"
            {...getFieldProps('password', {
              onChange: this.onPasswordChange,
              rules: [
                {
                  type: 'string',
                  required: true,
                  pattern: /\w{5,25}$/,
                  message: '6-25个字符'
                }
              ]
            })}
            placeholder="请输入密码"
            value={this.state.password}
          >
            密码
          </InputItem>
          <Flex className="error">
            <Flex.Item>
              {passwordErrors ? passwordErrors.join(',') : null}
            </Flex.Item>
          </Flex>
          <InputItem
            type="email"
            {...getFieldProps('email', {
              onChange: this.onEmailChange,
              rules: [
                { type: 'email', required: true, message: '邮箱格式不正确' }
              ]
            })}
            placeholder="请输入邮箱地址"
            value={this.state.email}
          >
            邮箱
          </InputItem>
          <Flex className="error">
            <Flex.Item>{emailErrors ? emailErrors.join(',') : null}</Flex.Item>
          </Flex>
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Button onClick={this.onSubmit} type="primary">
              注 册
            </Button>
          </WingBlank>
          <WhiteSpace />
          <Flex className="error">
            {user_home ? user_home.signupError : null}
          </Flex>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    user_home: state.root.user.home
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postSignUp: payload => {
      dispatch(postSignUpRequest(payload))
    },
    goBack: () => {
      dispatch(goBack())
    }
  }
}

SignUp.propTypes = {
  app: PropTypes.object.isRequired,
  user_home: PropTypes.object.isRequired,
  postSignUp: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(SignUp)
)
