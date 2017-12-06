import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getHomeMemberListRequest } from '../../../actions'
import { HomeMembersListView, MyActivityIndicator } from '../../../components'

class HomeMembers extends Component {
  componentDidMount() {
    if (this.props.members.list.length === 0) {
      this.props.getHomeMembers({ page: 1 })
    }
  }

  render() {
    const { members, navigateTo, getHomeMembers } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator isFetching={members.isFetching} text={members.fetchingText} />
        <HomeMembersListView
          members={members}
          navigateTo={navigateTo}
          getHomeMembers={getHomeMembers}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    members: state.root.members
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeMembers: payload => {
      dispatch(getHomeMemberListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

HomeMembers.propTypes = {
  members: PropTypes.object.isRequired,
  getHomeMembers: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMembers)
