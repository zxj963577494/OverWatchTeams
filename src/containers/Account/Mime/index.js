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
  Toast,
  Switch
} from 'antd-mobile'
import {
  postUploadRequest,
  putUserInfoRequest,
  setNavBar
} from '../../../actions'
import { MyActivityIndicator } from '../../../components'
import { TEAMPOSITIONS, RANKS, HEROS } from '../../../constants'
// eslint-disable-next-line
import styles from './style.css'

class AccountMime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objectId: props.userinfo.objectId,
      nickname: props.userinfo.nickname,
      position: props.userinfo.position,
      contact: props.userinfo.contact,
      introduction: props.userinfo.introduction,
      match: props.userinfo.match,
      files: [{ url: props.userinfo.avatar }],
      avatar: props.userinfo.avatar,
      heros: props.userinfo.heros ? props.userinfo.heros : HEROS,
      rank: props.userinfo.rank,
      rankscore: props.userinfo.rankscore,
      mouse: props.userinfo.mouse,
      keyboard: props.userinfo.keyboard,
      headphones: props.userinfo.headphones,
      pending: props.userinfo.pending,
      isPublic: props.userinfo.isPublic
    }
    this.onNickNameChange = this.onNickNameChange.bind(this)
    this.onContactChange = this.onContactChange.bind(this)
    this.onRankScoreChange = this.onRankScoreChange.bind(this)
    this.onIntroductionChange = this.onIntroductionChange.bind(this)
    this.onMatchChange = this.onMatchChange.bind(this)
    this.onMouseChange = this.onMouseChange.bind(this)
    this.onKeyboardChange = this.onKeyboardChange.bind(this)
    this.onHeadPhonesChange = this.onHeadPhonesChange.bind(this)
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

  onMatchChange(value) {
    this.setState({
      match: value
    })
  }

  onRankChange(value) {
    this.setState({
      rank: value
    })
  }

  onRankScoreChange(value) {
    this.setState({
      rankscore: value
    })
  }

  onMouseChange(value) {
    this.setState({
      mouse: value
    })
  }

  onKeyboardChange(value) {
    this.setState({
      keyboard: value
    })
  }

  onHeadPhonesChange(value) {
    this.setState({
      headphones: value
    })
  }

  onPublicChange(value) {
    this.setState({
      isPublic: value
    })
  }

  onHeroChange(value) {
    this.state.heros.forEach(item => {
      if (item.value === value) {
        if (!item.checked) {
          if (
            this.state.heros.filter(item => item.checked === true).length >= 3
          ) {
            Toast.info('最多选择3位擅长英雄', 1)
            return
          }
        }
        item.checked = !item.checked
      }
    })
    this.setState({ heros: this.state.heros })
  }

  onImagePickerChange(files, type, index) {
    if (type === 'add') {
      const { postUpload } = this.props
      const name = files[0].file.name
      const base64 = files[0].url
      postUpload({ name, base64 })
    }
    this.setState({
      files
    })
  }

  onSubmit = () => {
    const { app, putUserInfo, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        putUserInfo({
          objectId: this.state.objectId,
          nickname: this.state.nickname,
          position: this.state.position,
          contact: this.state.contact,
          introduction: this.state.introduction,
          avatar: app.file.url || this.state.avatar,
          heros: this.state.heros.filter(item => {
            return item.checked === true
          }),
          match: this.state.match,
          rank: this.state.rank,
          rankscore: this.state.rankscore,
          mouse: this.state.mouse,
          keyboard: this.state.keyboard,
          headphones: this.state.headphones,
          isPublic: this.state.isPublic
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 2)
      }
    })
  }

  componentDidMount() {
    this.props.setNavBar({ title: '个人简介', isCanBack: true })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app } = this.props
    const { position, files, heros, rank, pending, isPublic } = this.state
    const nicknameErrors = getFieldError('nickname')
    const contactErrors = getFieldError('contact')
    const rankscoreErrors = getFieldError('rankscore')
    const introductionErrors = getFieldError('introduction')
    const matchErrors = getFieldError('match')
    const mouseErrors = getFieldError('mouse')
    const keyboardErrors = getFieldError('keyboard')
    const headphonesErrors = getFieldError('headphones')
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
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
                initialValue: this.state.nickname,
                rules: [
                  {
                    required: true,
                    min: 2,
                    max: 10,
                    message: '昵称:2-10个字符'
                  }
                ]
              })}
              placeholder="请输入昵称"
              value={this.state.nickname}
            >
              昵称
            </InputItem>
            <Flex className="error">
              <Flex.Item>
                {nicknameErrors ? nicknameErrors.join(',') : null}
              </Flex.Item>
            </Flex>
            <InputItem
              type="number"
              {...getFieldProps('rankscore', {
                onChange: this.onRankScoreChange,
                initialValue: this.state.rankscore,
                rules: [
                  {
                    type: 'number',
                    min: 1,
                    max: 5000,
                    message: '天梯分数:1-5000数字',
                    transform: value => +value
                  }
                ]
              })}
              placeholder="请输入天梯分数"
              value={this.state.rankscore}
            >
              天梯分
            </InputItem>
            <Flex className="error">
              <Flex.Item>
                {rankscoreErrors ? rankscoreErrors.join(',') : null}
              </Flex.Item>
            </Flex>
            <InputItem
              {...getFieldProps('contact', {
                onChange: this.onContactChange,
                initialValue: this.state.contact,
                rules: [
                  {
                    type: 'string',
                    min: 6,
                    max: 25,
                    message: '联系方式:6-25个字符'
                  }
                ]
              })}
              placeholder="请输入QQ，微信或战网账号(带#)"
              value={this.state.contact}
            >
              联系方式
            </InputItem>
            <Flex className="error">
              <Flex.Item>
                {contactErrors ? contactErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '个人介绍'}>
            <TextareaItem
              {...getFieldProps('introduction', {
                onChange: this.onIntroductionChange,
                initialValue: this.state.introduction,
                rules: [
                  {
                    type: 'string',
                    min: 4,
                    max: 25,
                    message: '个人介绍:4-25个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="一句话个人介绍"
              value={this.state.introduction}
            />
            <Flex className="error">
              <Flex.Item>
                {introductionErrors ? introductionErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '比赛经历'}>
            <TextareaItem
              {...getFieldProps('match', {
                onChange: this.onMatchChange,
                initialValue: this.state.match,
                rules: [
                  {
                    type: 'string',
                    min: 4,
                    max: 100,
                    message: '比赛经历:4-100个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="比赛经历，包括OWOD、战队训练赛等其它任何比赛经历"
              value={this.state.match}
            />
            <Flex className="error">
              <Flex.Item>
                {matchErrors ? matchErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '天梯段位'}>
            {RANKS.map(i => (
              <Radio.RadioItem
                key={i.value}
                onChange={() => this.onRankChange(i.value)}
                checked={rank === i.value}
              >
                {`${i.label} (${i.score})`}
              </Radio.RadioItem>
            ))}
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
          <List className="am-list-hero" renderHeader={() => '擅长英雄'}>
            {heros.map(i => (
              <Checkbox.CheckboxItem
                style={{ backgroundImage: `url(${i.image})` }}
                key={i.value}
                onChange={() => this.onHeroChange(i.value)}
                checked={i.checked}
              >
                {i.label}
              </Checkbox.CheckboxItem>
            ))}
          </List>
          <List renderHeader={() => '其它'}>
            <InputItem
              {...getFieldProps('mouse', {
                onChange: this.onMouseChange,
                initialValue: this.state.mouse,
                rules: [
                  {
                    type: 'string',
                    min: 3,
                    max: 20,
                    message: '鼠标:3-20个字符'
                  }
                ]
              })}
              placeholder="请输入鼠标品牌、型号"
              value={this.state.mouse}
            >
              鼠标
            </InputItem>
            <Flex className="error">
              <Flex.Item>
                {mouseErrors ? mouseErrors.join(',') : null}
              </Flex.Item>
            </Flex>
            <InputItem
              {...getFieldProps('keyboard', {
                onChange: this.onKeyboardChange,
                initialValue: this.state.keyboard,
                rules: [
                  {
                    type: 'string',
                    min: 3,
                    max: 20,
                    message: '键盘:3-20个字符'
                  }
                ]
              })}
              placeholder="请输入键盘品牌、型号"
              value={this.state.keyboard}
            >
              键盘
            </InputItem>
            <Flex className="error">
              <Flex.Item>
                {keyboardErrors ? keyboardErrors.join(',') : null}
              </Flex.Item>
            </Flex>
            <InputItem
              {...getFieldProps('headphones', {
                onChange: this.onHeadPhonesChange,
                initialValue: this.state.headphones,
                rules: [
                  {
                    type: 'string',
                    min: 3,
                    max: 20,
                    message: '耳机:3-20个字符'
                  }
                ]
              })}
              placeholder="请输入耳机品牌、型号"
              value={this.state.headphones}
            >
              耳机
            </InputItem>
            <Flex className="error">
              <Flex.Item>
                {headphonesErrors ? headphonesErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '是否公开信息(联系方式不公开)'}>
            <List.Item
              extra={
                <Switch
                  {...getFieldProps('isPublic', {
                    initialValue: isPublic,
                    valuePropName: 'checked'
                  })}
                  onClick={checked => {
                    this.onPublicChange(checked)
                  }}
                />
              }
            >
              是否公开信息
            </List.Item>
          </List>
          <WhiteSpace />
          <WingBlank>
            <Button disabled={pending} onClick={this.onSubmit} type="primary">
              保 存
            </Button>
          </WingBlank>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app,
    userinfo: state.user.account.userinfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postUpload: payload => {
      dispatch(postUploadRequest(payload))
    },
    putUserInfo: payload => {
      dispatch(putUserInfoRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

AccountMime.propTypes = {
  app: PropTypes.object.isRequired,
  userinfo: PropTypes.object,
  postUpload: PropTypes.func.isRequired,
  putUserInfo: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountMime)
)
