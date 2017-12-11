import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setNavBar, getHomeTeamListRequest } from '../../../actions'
import { HomeTeamsListView, MyActivityIndicator } from '../../../components'

class HomeTeams extends Component {
  componentDidMount() {
    if (this.props.team.list.length === 0) {
      this.props.getHomeTeams({ page: 1 })
    }
    this.props.setNavBar({ title: '战队库', isCanBack: true })
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
    },
    setNavBar: payload => {
      dispatch(
        setNavBar({ title: payload.title, isCanBack: payload.isCanBack })
      )
    },
  }
}

HomeTeams.propTypes = {
  team: PropTypes.object.isRequired,
  getHomeTeams: PropTypes.func.isRequired,
  setNavBar: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTeams)
