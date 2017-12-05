import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import MyNavBar from '../NavBar'

export default class MyTabBar extends Component {
  render() {
    const pathname = this.props.history.location.pathname
    const { children, navbar, history } = this.props
    return (
      <div>
        <MyNavBar navbar={navbar} history={history} />
        <div
          style={{ position: 'fixed', height: '93%', width: '100%', top: '7%' }}
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="首页"
              key="home"
              icon={require('../../assets/images/tar-home.png')}
              selectedIcon={require('../../assets/images/tar-home-on.png')}
              selected={pathname.startsWith('/home')}
              onPress={() => {
                this.props.navigateTo('/home')
              }}
            >
              {pathname.startsWith('/home') ? children : null}
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="account"
              icon={require('../../assets/images/tar-topic.png')}
              selectedIcon={require('../../assets/images/tar-topic-on.png')}
              selected={pathname.startsWith('/account')}
              onPress={() => {
                this.props.navigateTo('/account')
              }}
            >
              {pathname.startsWith('/account') ? children : null}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }

  renderIcon(imgUrl) {
    return (
      <div
        style={{
          width: '22px',
          height: '22px',
          background: 'url(' + imgUrl + ') center center /  21px 21px no-repeat'
        }}
      />
    )
  }
}

MyTabBar.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.object
}
