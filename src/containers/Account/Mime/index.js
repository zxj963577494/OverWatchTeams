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
  Checkbox,
  Radio,
  List,
  TextareaItem,
  ImagePicker,
  Toast
} from 'antd-mobile'
import { goBack } from 'react-router-redux'
import { postSignUpRequest } from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { TEAMPOSITIONS, HEROS } from '../../../constants'

class Mime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: '',
      position: 'DPS',
      contact: '',
      introduction: '',
      email: '',
      files: [],
      heros: HEROS
    }
    this.onNickNameChange = this.onNickNameChange.bind(this)
    this.onContactChange = this.onContactChange.bind(this)
    this.onIntroductionChange = this.onIntroductionChange.bind(this)
    this.onMatchChange = this.onMatchChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onImagePickerChange = this.onImagePickerChange.bind(this)
    
    this.onSubmit = this.onSubmit.bind(this)
  }

  onNickNameChange(value) {
    this.setState({
      nickname: value
    })
  }

  onPositionChange(value) {
    this.setState({
      position: value
    })
  }

  onContactChange(value) {
    this.setState({
      contact: value
    })
  }

  onIntroductionChange(value) {
    this.setState({
      introduction: value
    })
  }

  onEmailChange(value) {
    this.setState({
      email: value
    })
  }

  onMatchChange(value) {
    this.setState({
      match: value
    })
  }

  onHeroChange(value) {
    if (this.state.heros.filter(item => item.checked === true).length >= 3) {
      Toast.info('最多选择3位擅长英雄', 1)
      return
    }
    this.state.heros.forEach(item => {
      if (item.value === value) {
        item.checked = !item.checked
      }
    })
    this.setState({ heros: this.state.heros })
  }

  onImagePickerChange(files, type, index) {
    console.log(files, type, index)
    this.setState({
      files
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
    const { app, user, goBack } = this.props
    const { position, files, heros } = this.state
    const nicknameErrors = getFieldError('nickname')
    const contactErrors = getFieldError('contact')
    const introductionErrors = getFieldError('introduction')
    const emailErrors = getFieldError('email')
    const matchErrors = getFieldError('match')
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} />
        <WhiteSpace />
        <form>
          <List renderHeader={() => '上传头像'}>
            <ImagePicker
              files={files}
              onChange={this.onImagePickerChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 1}
            />
          </List>
          <List renderHeader={() => '基本信息'}>
            <InputItem
              {...getFieldProps('nickname', {
                onChange: this.onNickNameChange,
                validateFirst: true,
                rules: [
                  {
                    type: 'string',
                    required: true,
                    pattern: /\w{4,25}$/,
                    message: '4-25个字符'
                  }
                ]
              })}
              placeholder="请输入战网昵称"
              value={this.state.username}
            >
              战网昵称
            </InputItem>
            <Flex className="error">
              {nicknameErrors ? nicknameErrors.join(',') : null}
            </Flex>
            <InputItem
              type="password"
              {...getFieldProps('contact', {
                onChange: this.onContactChange,
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
              placeholder="请输入QQ，微信或战网账号(带#)"
              value={this.state.contact}
            >
              联系方式
            </InputItem>
            <Flex className="error">
              {contactErrors ? contactErrors.join(',') : null}
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
          </List>
          <List renderHeader={() => '个人介绍'}>
            <TextareaItem
              {...getFieldProps('introduction', {
                onChange: this.onIntroductionChange,
                validateFirst: true,
                rules: [
                  {
                    type: 'string',
                    required: false,
                    pattern: /\w{5,25}$/,
                    message: '6-25个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="请输入个人介绍"
              value={this.state.introduction}
            />
            <Flex className="error">
              {introductionErrors ? introductionErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '个人比赛经历'}>
            <TextareaItem
              {...getFieldProps('match', {
                onChange: this.onMatchChange,
                validateFirst: true,
                rules: [
                  {
                    type: 'string',
                    required: false,
                    pattern: /\w{5,25}$/,
                    message: '6-25个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="请输入个人比赛经历，包括OWOD、战队训练赛等其它任何比赛经历"
              value={this.state.match}
            />
            <Flex className="error">
              {matchErrors ? matchErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '团队定位'}>
            {TEAMPOSITIONS.map(i => (
              <Radio.RadioItem
                key={i.value}
                onChange={() => this.onPositionChange(i.value)}
                checked={position === i.value}
              >
                {i.label}
              </Radio.RadioItem>
            ))}
          </List>
          <List renderHeader={() => '擅长英雄'}>
            {heros.map(i => (
              <Checkbox.CheckboxItem
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                key={i.value}
                onChange={() => this.onHeroChange(i.value)}
                checked={i.checked}
              >
                {i.label}
              </Checkbox.CheckboxItem>
            ))}
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Button onClick={this.onSubmit} type="primary">
              保 存
            </Button>
          </WingBlank>
          <WhiteSpace />
          <Flex className="error">{user ? user.signupError : null}</Flex>
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
    postSignUp: payload => {
      dispatch(postSignUpRequest(payload))
    },
    goBack: () => {
      dispatch(goBack())
    }
  }
}

Mime.propTypes = {
  app: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postSignUp: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Mime))
