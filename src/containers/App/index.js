import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { push } from 'react-router-redux'
import { MyNavBar } from '../../components'
import { getHomeRoutes, getAccountRoutes } from '../../routes'
// eslint-disable-next-line
import globalcss from '../../assets/css/style.css'

class App extends Component {
  componentDidMount() {
    // 请求根目录是转至/home
    if (this.props.history.location.pathname === '/') {
      setTimeout(() => {
        this.props.history.replace('/home')
      }, 0)
    }
  }

  render() {
    const pathname = this.props.history.location.pathname
    return (
      <div>
        <MyNavBar  navbar={this.props.navbar} history={this.props.history} />
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
              {getHomeRoutes()}
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="account"
              icon={require('../../assets/images/tar-person.png')}
              selectedIcon={require('../../assets/images/tar-person-on.png')}
              selected={pathname.startsWith('/account')}
              onPress={() => {
                this.props.navigateTo('/account')
              }}
            >
              {getAccountRoutes()}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.location,
    navbar: state.root.navbar
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
