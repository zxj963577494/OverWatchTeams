import React, { PureComponent } from 'react'
import { NavBar, Icon } from 'antd-mobile'

export default class MyNavBar extends PureComponent {
  render() {
    const { navbar, history } = this.props
    if (navbar.isCanBack) {
      return (
        <NavBar
          mode="light"
          leftContent={<Icon type="left" />}
          onLeftClick={() => {
            history.goBack()
          }}
        >
          {navbar.title}
        </NavBar>
      )
    } else {
      return (
        <NavBar
          mode="light"
        >
          {navbar.title}
        </NavBar>
      )
    }
  }
}
