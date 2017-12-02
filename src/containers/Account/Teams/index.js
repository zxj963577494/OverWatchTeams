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
import { setNavBar } from '../../../actions'

class AccountTeams extends Component {
  componentDidMount() {
    this.props.setNavBar({ title: '我的战队', isCanBack: true })
  }
  render() {
    return (
      <div>
        <h1>Teams</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

AccountTeams.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(
  createForm()(AccountTeams)
)
