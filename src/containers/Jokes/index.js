import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getJokesRequest } from '../../actions'
import { JokesListView, MyActivityIndicator } from '../../components'

class Jokes extends Component {
  componentDidMount() {
    this.props.getJokes({})
  }

  render() {
    const { jokes, navigateTo, getJokes } = this.props
    return (
      <div style={{ height: '100%' }}>
        <MyActivityIndicator isFetching={jokes.isFetching} />
        <JokesListView
          jokes={jokes}
          navigateTo={navigateTo}
          getJokes={getJokes}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jokes: state.root.jokes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getJokes: payload => {
      dispatch(getJokesRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

Jokes.propTypes = {
  jokes: PropTypes.object.isRequired,
  getJokes: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Jokes)
