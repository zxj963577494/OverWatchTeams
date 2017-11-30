import React, { Component } from 'react'

export default class Welcome extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.replace('/home')
    }, 0)
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}
