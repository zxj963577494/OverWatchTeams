import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getHomeUserListRequest } from '../../../actions'
import { HomeUsersListView, MyActivityIndicator } from '../../../components'

class HomeUsers extends Component {
  componentDidMount() {
    if (this.props.user.list.length === 0) {
      this.props.getHomeUsers({ page: 1 })
    }
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
      dispatch(getHomeUserListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

HomeUsers.propTypes = {
  user: PropTypes.object.isRequired,
  getHomeUsers: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUsers)
