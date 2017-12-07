import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getHomeTeamListRequest } from '../../../actions'
import { HomeTeamsListView, MyActivityIndicator } from '../../../components'

class HomeTeams extends Component {
  componentDidMount() {
    if (this.props.team.list.length === 0) {
      this.props.getHomeTeams({ page: 1 })
    }
  }

  render() {
    const { team, navigateTo, getHomeTeams } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={team.isFetching}
          text={team.fetchingText}
        />
        <HomeTeamsListView
          team={team}
          navigateTo={navigateTo}
          getHomeTeams={getHomeTeams}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    team: state.root.team.home.team
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHomeTeams: payload => {
      dispatch(getHomeTeamListRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

HomeTeams.propTypes = {
  team: PropTypes.object.isRequired,
  getHomeTeams: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeams)
