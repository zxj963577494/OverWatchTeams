import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getArticlesRequest } from '../../actions'
import { ArticlesListView, MyActivityIndicator } from '../../components'

class Articles extends Component {
  componentDidMount() {
    this.props.getArticles({ page: 1 })
  }

  render() {
    const { articles, navigateTo, getArticles } = this.props
    return [
      <div style={{height:'100%'}}>
        <MyActivityIndicator isFetching={articles.isFetching} />
        <ArticlesListView
          articles={articles}
          navigateTo={navigateTo}
          getArticles={getArticles}
        />
      </div>
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles: state.root.articles
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getArticles: payload => {
      dispatch(getArticlesRequest(payload))
    },
    navigateTo: location => {
      dispatch(push(location))
    }
  }
}

Articles.propTypes = {
  articles: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
