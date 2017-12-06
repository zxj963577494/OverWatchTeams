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
  Switch,
  Radio,
  List,
  TextareaItem,
  ImagePicker,
  Toast
} from 'antd-mobile'
import { RANKS } from '../../../../constants'
import { setNavBar, postTeamsRequest, postUploadRequest } from '../../../../actions'
import { MyActivityIndicator } from '../../../../components'
// eslint-disable-next-line
import styles from './style.css'

class AccountTeamsCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chineseFullName: '',
      englishFullName: '',
      chineseName: '',
      englishName: '',
      slogan: '',
      introduction: '',
      files: [],
      rank: 'top500',
      avatar: '',
      createDate: '',
      createCity: '',
      contact: '',
      honor: '',
      match: '',
      isRecruit: false,
      pending: false
    }
    this.onChineseNameChange = this.onChineseNameChange.bind(this)
    this.onChineseFullNameChange = this.onChineseFullNameChange.bind(this)
    this.onContactChange = this.onContactChange.bind(this)
    this.onIntroductionChange = this.onIntroductionChange.bind(this)
    this.onImagePickerChange = this.onImagePickerChange.bind(this)
    this.onMatchChange = this.onMatchChange.bind(this)
    this.onEnglishNameChange = this.onEnglishNameChange.bind(this)
    this.onEnglishFullNameChange = this.onEnglishFullNameChange.bind(this)
    this.onCreateCityChange = this.onCreateCityChange.bind(this)
    this.onSloganChange = this.onSloganChange.bind(this)
    this.onHonorChange = this.onHonorChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onChineseFullNameChange(value) {
    this.setState({
      chineseFullName: value
    })
  }

  onChineseNameChange(value) {
    this.setState({
      chineseName: value
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

  onEnglishNameChange(value) {
    this.setState({
      englishName: value
    })
  }

  onEnglishFullNameChange(value) {
    this.setState({
      englishFullName: value
    })
  }

  onCreateCityChange(value) {
    this.setState({
      createCity: value
    })
  }

  onRankChange(value) {
    this.setState({
      rank: value
    })
  }

  onSloganChange(value) {
    this.setState({
      slogan: value
    })
  }

  onHonorChange(value) {
    this.setState({
      honor: value
    })
  }

  onRecruitChange(value) {
    this.setState({
      isRecruit: value
    })
  }

  onSubmit() {
    const { common, postTeam, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        postTeam({
          chineseFullName: this.state.chineseFullName,
          englishFullName: this.state.englishFullName,
          chineseName: this.state.chineseName,
          englishName: this.state.englishName,
          slogan: this.state.slogan,
          introduction: this.state.introduction,
          rank: this.state.rank,
          avatar: common.file || this.state.avatar,
          createDate: this.state.createDate,
          createCity: this.state.createCity,
          contact: this.state.contact,
          honor: this.state.honor,
          match: this.state.match,
          isRecruit: this.state.isRecruit
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {
    this.props.setNavBar({ title: '新建战队', isCanBack: true })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app } = this.props
    const { files, rank, pending, isRecruit } = this.state
    const chineseFullNameErrors = getFieldError('chineseFullName')
    const englishFullNameErrors = getFieldError('englishFullName')
    const chineseNameErrors = getFieldError('chineseName')
    const englishNameErrors = getFieldError('englishName')
    const sloganErrors = getFieldError('slogan')
    const introductionErrors = getFieldError('introduction')
    const createCityErrors = getFieldError('createCity')
    const contactErrors = getFieldError('contact')
    const honorErrors = getFieldError('honor')
    const matchErrors = getFieldError('match')
    return (
      <div>
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <form>
          <List renderHeader={() => '上传Logo'}>
            <ImagePicker
              files={files}
              onChange={this.onImagePickerChange}
              selectable={files.length < 1}
            />
          </List>
          <List renderHeader={() => '基本信息'}>
            <InputItem
              {...getFieldProps('chineseName', {
                onChange: this.onChineseNameChange,
                initialValue: this.state.chineseName,
                rules: [
                  {
                    required: true,
                    min: 2,
                    max: 25,
                    message: '战队中文简称:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入战队中文简称"
              value={this.state.chineseName}
            >
              中文简称
            </InputItem>
            <Flex className="error">
              {chineseNameErrors ? chineseNameErrors.join(',') : null}
            </Flex>
            <InputItem
              {...getFieldProps('chineseFullName', {
                onChange: this.onChineseFullNameChange,
                rules: [
                  {
                    type: 'string',
                    min: 2,
                    max: 25,
                    message: '战队中文全称:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入战队中文全称"
              value={this.state.chineseFullName}
            >
              中文全称
            </InputItem>
            <Flex className="error">
              {chineseFullNameErrors ? chineseFullNameErrors.join(',') : null}
            </Flex>
            <InputItem
              {...getFieldProps('englishName', {
                onChange: this.onEnglishNameChange,
                rules: [
                  {
                    type: 'string',
                    min: 2,
                    max: 25,
                    message: '战队英文简称:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入战队英文简称"
              value={this.state.englishName}
            >
              英文简称
            </InputItem>
            <Flex className="error">
              {englishNameErrors ? englishNameErrors.join(',') : null}
            </Flex>
            <InputItem
              {...getFieldProps('englishFullName', {
                onChange: this.onEnglishFullNameChange,
                rules: [
                  {
                    type: 'string',
                    min: 2,
                    max: 25,
                    message: '战队英文全称:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入战队英文全称"
              value={this.state.englishFullName}
            >
              英文全称
            </InputItem>
            <Flex className="error">
              {englishFullNameErrors ? englishFullNameErrors.join(',') : null}
            </Flex>
            <InputItem
              {...getFieldProps('contact', {
                onChange: this.onContactChange,
                rules: [
                  {
                    type: 'string',
                    min: 2,
                    max: 25,
                    message: '联系方式:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入联系方式"
              value={this.state.contact}
            >
              联系方式
            </InputItem>
            <Flex className="error">
              {contactErrors ? contactErrors.join(',') : null}
            </Flex>
            <InputItem
              {...getFieldProps('createCity', {
                onChange: this.onCreateCityChange,
                rules: [
                  {
                    type: 'string',
                    min: 2,
                    max: 25,
                    message: '战队地点:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入线上或线下城市"
              value={this.state.createCity}
            >
              战队地点
            </InputItem>
            <Flex className="error">
              {createCityErrors ? createCityErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '是否招募队员'}>
            <List.Item
              extra={
                <Switch
                  {...getFieldProps('isRecruit', {
                    initialValue: isRecruit,
                    valuePropName: 'checked'
                  })}
                  onClick={checked => {
                    this.onRecruitChange(checked)
                  }}
                />
              }
            >
              是否招募队员
            </List.Item>
          </List>
          <List renderHeader={() => '战队口号'}>
            <TextareaItem
              {...getFieldProps('slogan', {
                onChange: this.onSloganChange,
                validateFirst: true,
                rules: [
                  {
                    type: 'string',
                    min: 2,
                    max: 100,
                    message: '战队口号:2-100个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="请输入战队口号"
              value={this.state.slogan}
            />
            <Flex className="error">
              {sloganErrors ? sloganErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '战队介绍'}>
            <TextareaItem
              {...getFieldProps('introduction', {
                onChange: this.onIntroductionChange,
                validateFirst: true,
                rules: [
                  {
                    min: 2,
                    max: 400,
                    message: '战队介绍:4-400个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="请输入战队介绍"
              value={this.state.introduction}
            />
            <Flex className="error">
              {introductionErrors ? introductionErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '比赛经历'}>
            <TextareaItem
              {...getFieldProps('match', {
                onChange: this.onMatchChange,
                rules: [
                  {
                    min: 2,
                    max: 200,
                    message: '比赛经历:4-400个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="请输入战队比赛经历，包括OWOD、战队训练赛等其它任何比赛经历"
              value={this.state.match}
            />
            <Flex className="error">
              {matchErrors ? matchErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '主要荣耀'}>
            <TextareaItem
              {...getFieldProps('honor', {
                onChange: this.onHonorChange,
                rules: [
                  {
                    min: 2,
                    max: 400,
                    message: '主要荣耀:4-400个字符'
                  }
                ]
              })}
              rows={3}
              labelNumber={5}
              placeholder="请输入主要荣耀"
              value={this.state.honor}
            />
            <Flex className="error">
              {honorErrors ? honorErrors.join(',') : null}
            </Flex>
          </List>
          <List renderHeader={() => '平均段位'}>
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
        </form>
        <WhiteSpace />
        <WingBlank>
          <Button disabled={pending} onClick={this.onSubmit} type="primary">
            保 存
          </Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.root.app,
    common: state.root.common
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postUpload: payload => {
      dispatch(postUploadRequest(payload))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
    postTeam: payload => {
      dispatch(postTeamsRequest(payload))
    }
  }
}

AccountTeamsCreate.propTypes = {
  app: PropTypes.object.isRequired,
  common: PropTypes.object,
  postUpload: PropTypes.func.isRequired,
  postTeam: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountTeamsCreate)
)
