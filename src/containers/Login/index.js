import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { Button, InputItem, WhiteSpace, Flex, WingBlank } from 'antd-mobile'
import { replace } from 'react-router-redux'
import { postLoginRequest } from '../../actions'
import { MyActivityIndicator } from '../../components'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
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

  onSignUp() {
    this.props.navigateTo('/signup')
  }

  componentDidMount() {}

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app, user } = this.props
    const usernameErrors = getFieldError('username')
    const passwordErrors = getFieldError('password')
    return (
      <div className="page__content">
        <WhiteSpace />
        <form>
          <MyActivityIndicator isFetching={app.isFetching} />
          <InputItem
            {...getFieldProps('username', {
              onChange: this.onUserNameChange,
              validateFirst: true,
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
            {usernameErrors ? usernameErrors.join(',') : null}
          </Flex>
          <InputItem
            type="password"
            {...getFieldProps('password', {
              onChange: this.onPasswordChange,
              validateFirst: true,
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
            {passwordErrors ? passwordErrors.join(',') : null}
          </Flex>
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Flex>
              <Flex.Item>
                <Button onClick={this.onSignUp} type="warning">
                  注 册
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button onClick={this.onSubmit} type="primary">
                  登 录
                </Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
          <WhiteSpace />
          <Flex className="error">{user ? user.loginError : null}</Flex>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    user: state.root.user
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
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postLogin: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Login))
