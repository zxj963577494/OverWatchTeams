import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import fonts from '../../assets/font/font.css'

export default class MyNavBar extends Component {
  render() {
    const { navbar, history } = this.props
    if (navbar.isCanBack) {
      return (
        <NavBar
          mode="light"
          leftContent={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          style={{ position: 'fixed', width: '100%', height: '7%' }}
          rightContent={<span style={{fontSize: '22px'}} className={fonts.iconfont + ' ' + fonts['icon-my_light']}></span>}
        >
          {navbar.title}
        </NavBar>
      )
    } else {
      return (
        <NavBar
          mode="light"
          style={{ position: 'fixed', width: '100%', height: '7%' }}
          rightContent={<span onClick={()=>history.push('login')} style={{fontSize: '22px'}} className={fonts.iconfont + ' ' + fonts['icon-my_light']}></span>}
        >
          {navbar.title}
        </NavBar>
      )
    }
  }
}
