import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getHomeUserInfoListRequest } from '../../../actions'
import { HomeUserInfoListView, MyActivityIndicator } from '../../../components'

class HomeUserInfos extends Component {
  componentDidMount() {
    if (this.props.userinfo.list.length === 0) {
      this.props.getHomeUsers({ page: 1 })
    }
    this.props.setNavBar({ title: '个人列表', isCanBack: true })
  }

  render() {
    const { userinfo, navigateTo, getHomeUsers } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={userinfo.isFetching}
          text={userinfo.fetchingText}
        />
        <HomeUserInfoListView
          userinfo={userinfo}
          navigateTo={navigateTo}
          getHomeUsers={getHomeUsers}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userinfo: state.root.user.home.userinfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeUsers: payload => {
      dispatch(getHomeUserInfoListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    }
  }
}

HomeUserInfos.propTypes = {
  userinfo: PropTypes.object.isRequired,
  getHomeUsers: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUserInfos)
