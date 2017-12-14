import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getHomeUserInfoListRequest } from '../../../actions'
import { HomeUsersListView, MyActivityIndicator } from '../../../components'

class HomeUsers extends Component {
  componentDidMount() {
    if (this.props.user.list.length === 0) {
      this.props.getHomeUsers({ page: 1 })
    }
    this.props.setNavBar({ title: '个人列表', isCanBack: true })
  }

  render() {
    const { user, navigateTo, getHomeUsers } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={user.isFetching}
          text={user.fetchingText}
        />
        <HomeUsersListView
          user={user}
          navigateTo={navigateTo}
          getHomeUsers={getHomeUsers}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.root.user.home.user
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
    },
  }
}

HomeUsers.propTypes = {
  user: PropTypes.object.isRequired,
  getHomeUsers: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUsers)
