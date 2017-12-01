import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { MyTabBar } from '../../components'
// eslint-disable-next-line
import globalcss from '../../assets/css/style.css'

class App extends Component {
  render() {
    return (
      <div>
        <MyTabBar
          navbar = {this.props.navbar}
          history={this.props.history}
          children={this.props.children}
          navigateTo={this.props.navigateTo}
        />
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
