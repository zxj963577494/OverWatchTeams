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
          style={{ position: 'fixed', width: '100%', height: '7%' }}
        >
          {navbar.title}
        </NavBar>
      )
    } else {
      return (
        <NavBar
          mode="light"
          style={{ position: 'fixed', width: '100%', height: '7%' }}
        >
          {navbar.title}
        </NavBar>
      )
    }
  }
}
