import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { Button, InputItem, WhiteSpace, Flex, WingBlank } from 'antd-mobile'
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
    const usernameErrors = getFieldError('username')
    const passwordErrors = getFieldError('password')
    const emailErrors = getFieldError('email')
    return (
      <div className="page__content">
        <WhiteSpace />
        <form>
          <MyActivityIndicator isFetching={false} />
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
          <InputItem
            type="email"
            {...getFieldProps('email', {
              onChange: this.onEmailChange,
              validateFirst: true,
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
            {emailErrors ? emailErrors.join(',') : null}
          </Flex>
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Button onClick={this.onSubmit} type="primary">
              注 册
            </Button>
          </WingBlank>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postSignUp: payload => {
      dispatch(postSignUpRequest(payload))
    }
  }
}

SignUp.propTypes = {
  postSignUp: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(SignUp)
)
