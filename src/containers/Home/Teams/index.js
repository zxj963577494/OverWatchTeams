import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getHomeTeamListRequest } from '../../../actions'
import { HomeTeamsListView, MyActivityIndicator } from '../../../components'

class HomeTeams extends Component {
  constructor(props) {
    super(props)
    console.log(123)
  }
  componentDidMount() {
    if (this.props.teams.list.length === 0) {
      this.props.getHomeTeams({ page: 1 })
    }
  }

  render() {
    const { teams, navigateTo, getHomeTeams } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator
          isFetching={teams.isFetching}
          text={teams.fetchingText}
        />
        <HomeTeamsListView
          teams={teams}
          navigateTo={navigateTo}
          getHomeTeams={getHomeTeams}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.root.teams
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
  teams: PropTypes.object.isRequired,
  getHomeTeams: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeams)
