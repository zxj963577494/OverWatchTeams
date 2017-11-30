import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'antd-mobile'

export default class MyActivityIndicator extends Component {
  constructor(props) {
    super(props)
    const doc = window.document
    this.node = doc.createElement('div')
    doc.body.appendChild(this.node)
  }

  render() {
    return createPortal(
      <div>
        <ActivityIndicator
          toast
          text="加载中..."
          animating={this.props.isFetching}
        />
      </div>,
      this.node
    )
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node)
  }
}

MyActivityIndicator.propTypes = {
  isFetching: PropTypes.bool.isRequired
}
