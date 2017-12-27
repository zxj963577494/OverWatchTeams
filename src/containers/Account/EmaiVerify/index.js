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
  List,
  Toast
} from 'antd-mobile'
import _ from 'lodash'
import { setNavBar, sendEmailRequest } from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { userService } from '../../../services/leanclound'

class AccountEmaiVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerify: _.isEmpty(props.user)
        ? userService.getCurrentUser().get('emailVerified')
        : props.user.emailVerified,
      email: _.isEmpty(props.user)
        ? userService.getCurrentUser().get('email')
        : props.user.email,
      pending: props.app.isFetching
    }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onEmailChange(value) {
    this.setState({
      email: value
    })
  }

  onSubmit() {
    const { sendEmail, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        sendEmail({
          email: this.state.email
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {
    this.props.setNavBar({ title: '邮箱验证', isCanBack: true })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app, pending, user } = this.props
    const { email, isVerify } = this.state
    const emailErrors = getFieldError('email')
    const VerifyMessage = _.isEmpty(user)
      ? userService.getCurrentUser().get('emailVerified') ? '已验证' : '未验证'
      : user.emailVerified ? '已验证' : '未验证'
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <form>
          <List
            renderHeader={() => (
              <span style={{ color: 'red' }}>邮箱地址[{VerifyMessage}]</span>
            )}
          >
            <InputItem
              {...getFieldProps('email', {
                onChange: this.onEmailChange,
                initialValue: this.state.email,
                rules: [
                  {
                    type: 'email',
                    required: true,
                    min: 2,
                    max: 25,
                    message: '邮箱地址:6-25个字符'
                  }
                ]
              })}
              placeholder="请输入邮箱地址"
              value={email}
            />
            <Flex className="error">
              <Flex.Item>
                {emailErrors ? emailErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
        </form>
        <List />
        <WhiteSpace />
        <WingBlank>
          <Button disabled={pending || isVerify} onClick={this.onSubmit} type="primary">
            验 证
          </Button>
          <Flex className="error">
            <Flex.Item>{app.emailError}</Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    user: state.user.account.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
    sendEmail: payload => {
      dispatch(sendEmailRequest(payload))
    }
  }
}

AccountEmaiVerify.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object,
  sendEmail: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountEmaiVerify)
)
