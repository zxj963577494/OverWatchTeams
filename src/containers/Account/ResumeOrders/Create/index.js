import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { push } from 'react-router-redux'
import {
  Button,
  InputItem,
  WhiteSpace,
  Flex,
  WingBlank,
  List,
  TextareaItem,
  Toast,
  DatePicker
} from 'antd-mobile'
import { setNavBar, postResumeOrderRequest } from '../../../../actions'
import { MyActivityIndicator } from '../../../../components'

let date = new Date()
date.setDate(date.getDate() + 3)

class AccountResumeOrdersCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      endDate: date,
      contact: props.userinfo.contact || ''
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onContactChange = this.onContactChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onTitleChange(value) {
    this.setState({
      title: value
    })
  }

  onDescriptionChange(value) {
    this.setState({
      description: value
    })
  }

  onContactChange(value) {
    this.setState({
      contact: value
    })
  }

  onSubmit() {
    const { postResume, form } = this.props
    form.validateFields((error, value) => {
      if (!error) {
        postResume({
          contact: this.state.contact,
          title: this.state.title,
          description: this.state.description,
          endDate: this.state.endDate
        })
      } else {
        Toast.fail('格式错误，请检查后提交', 1.5)
      }
    })
  }

  componentDidMount() {
    this.props.setNavBar({ title: '新建自荐帖', isCanBack: true })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { app } = this.props
    const { pending } = this.props.resumeOrder
    const { title, description, contact, endDate } = this.state
    const titleErrors = getFieldError('title')
    const descriptionErrors = getFieldError('description')
    const contactErrors = getFieldError('contact')
    const endDateErrors = getFieldError('endDate')
    return (
      <div className="page--scrolltop">
        <MyActivityIndicator isFetching={app.isFetching} text={app.text} />
        <form>
          <List renderHeader={() => '自荐标题'}>
            <InputItem
              {...getFieldProps('title', {
                onChange: this.onTitleChange,
                initialValue: title,
                rules: [
                  {
                    required: true,
                    min: 2,
                    max: 25,
                    message: '标题:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入自荐标题"
              value={title}
            />
            <Flex className="error">
              <Flex.Item>
                {titleErrors ? titleErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '自荐内容'}>
            <TextareaItem
              {...getFieldProps('description', {
                onChange: this.onDescriptionChange,
                initialValue: description,
                rules: [
                  {
                    type: 'string',
                    required: true,
                    min: 2,
                    max: 200,
                    message: '自荐内容:2-200个字符'
                  }
                ]
              })}
              rows={6}
              placeholder="请输入自荐内容"
              value={description}
            />
            <Flex className="error">
              <Flex.Item>
                {descriptionErrors ? descriptionErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '联系方式'}>
            <InputItem
              {...getFieldProps('contact', {
                onChange: this.onContactChange,
                initialValue: contact,
                rules: [
                  {
                    type: 'string',
                    required: true,
                    min: 2,
                    max: 25,
                    message: '联系方式:2-25个字符'
                  }
                ]
              })}
              placeholder="请输入联系方式"
              value={contact}
            />
            <Flex className="error">
              <Flex.Item>
                {contactErrors ? contactErrors.join(',') : null}
              </Flex.Item>
            </Flex>
          </List>
          <List renderHeader={() => '有效日期'}>
            <DatePicker
              {...getFieldProps('endDate', {
                initialValue: endDate,
                rules: [{ required: true, message: '必须选择一个日期' }]
              })}
              mode="date"
              title="选择日期"
              value={endDate}
              onChange={date => this.setState({ endDate: date })}
            >
              <List.Item arrow="horizontal">有效日期</List.Item>
            </DatePicker>
            <Flex className="error">
              <Flex.Item>
                {endDateErrors ? endDateErrors.join(',') : null}
              </Flex.Item>
            </Flex>
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
    app: state.app,
    userinfo: state.user.account.userinfo,
    resumeOrder: state.resumeOrder.account.resumeOrder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
    postResume: payload => {
      dispatch(postResumeOrderRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

AccountResumeOrdersCreate.propTypes = {
  app: PropTypes.object.isRequired,
  userinfo: PropTypes.object,
  resumeOrder: PropTypes.object,
  postResume: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  form: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountResumeOrdersCreate)
)
