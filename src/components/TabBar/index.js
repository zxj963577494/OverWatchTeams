import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'

export default class MyTabBar extends Component {
  render() {
    const pathname = this.props.history.location.pathname
    const children = this.props.children
    return (
      <div style={{ position: 'fixed', height: '93%', width: '100%', top: '7%' }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {this.props.tabbars.map(item => (
            <TabBar.Item
              title={item.title}
              key={item.key}
              icon={this.renderIcon(item.icon)}
              selectedIcon={this.renderIcon(item.selectedIcon)}
              selected={pathname === '/' + item.key}
              onPress={() => {
                this.props.changeTabBar(item.key)
                this.props.navigateTo(item.key)
              }}
            >
              {pathname === '/' + item.key ? children : null}
            </TabBar.Item>
          ))}
        </TabBar>
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
  tabbars: PropTypes.array.isRequired,
  changeTabBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
}
